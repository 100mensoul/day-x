import { auth } from './firebase-config.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      signOut(auth).then(() => {
        alert("ログアウトしました");
        window.location.href = "login.html";
      }).catch((error) => {
        alert("ログアウトに失敗しました: " + error.message);
      });
    });
  }
});