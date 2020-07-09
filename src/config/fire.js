import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAvHwQlWy8DFA0jvNZPVllUEThTaIGvYdY",
  authDomain: "musictest1-e3845.firebaseapp.com",
  databaseURL: "https://musictest1-e3845.firebaseio.com",
  projectId: "musictest1-e3845",
  storageBucket: "musictest1-e3845.appspot.com",
  messagingSenderId: "628517113128",
  appId: "1:628517113128:web:25272cf80ffdb7f1a7d41d",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
