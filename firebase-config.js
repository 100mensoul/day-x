// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAwI5j4G2xjhJiQqQZrcOpVqWD1TVFykgE",
  authDomain: "day-x-abdc6.firebaseapp.com",
  projectId: "day-x-abdc6",
  storageBucket: "day-x-abdc6.firebasestorage.app",
  messagingSenderId: "760087385735",
  appId: "1:760087385735:web:6ffd4d3c004591d64aca22",
  measurementId: "G-EVWNDXP6RS"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);