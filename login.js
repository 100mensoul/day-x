import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.getElementById("login").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("ログイン成功！");
    window.location.href = "index.html"; // ログイン後に移動する先
  } catch (error) {
    alert("ログイン失敗：" + error.message);
  }
});