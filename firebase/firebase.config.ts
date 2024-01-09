import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBlo_L8MBY-33nhLqCGyUjRKZHmazTSTSc",
    authDomain: "shared-folders-25e96.firebaseapp.com",
    projectId: "shared-folders-25e96",
    storageBucket: "shared-folders-25e96.appspot.com",
    messagingSenderId: "571834952525",
    appId: "1:571834952525:web:2ac7fcfd65f15b0a536504",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
