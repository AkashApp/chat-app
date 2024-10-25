import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyDUQ_BHTB7-vLLsrnm_Pxw3OGnXCJ9VPZ8",
    authDomain: "chat-app-gs-3d184.firebaseapp.com",
    projectId: "chat-app-gs-3d184",
    storageBucket: "chat-app-gs-3d184.appspot.com",
    messagingSenderId: "384965152966",
    appId: "1:384965152966:web:39b18cb273d0823c7047c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name: "",
            avatar: "",
            bio: "Hey, I'm using Chat App",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData: []
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("auth/")[1].split("-").join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("auth/")[1].split("-").join(" "));
    }
}

const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
        toast.error(error.code.split("auth/")[1].split("-").join(" "));
    }
}

const restPass = async (email) =>{
    if(!email){
        toast.error("Enter your email");
        return null;
    }
    try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where("email", "==", email));
        const querySnap = await getDocs(q);
        if(!querySnap.empty){
            await sendPasswordResetEmail(auth, email);
            toast.success("Reset email sent");
        }
        else{
            toast.error("Email doesn't exist");
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

export { signup, login, logout, auth, db, restPass }