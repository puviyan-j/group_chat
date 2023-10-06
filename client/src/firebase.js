
import{initializeApp}from "firebase/app"
import{getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAqVwG_ePxXTV56l_5V8Ab5Hnv9QTcvYq4",
  authDomain: "whatsapp-mern-puvi.firebaseapp.com",
  projectId: "whatsapp-mern-puvi",
  storageBucket: "whatsapp-mern-puvi.appspot.com",
  messagingSenderId: "573339305866",
  appId: "1:573339305866:web:bcc62f982d447217a9aa73"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth()
const provider = new GoogleAuthProvider();

export{app,auth,provider}