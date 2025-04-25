import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// スマホ用：読み込み確認
alert("✅ auth-check.js 読み込まれた");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("❌ 未ログイン → login.html に移動します");
    window.location.href = "login.html";
  } else {
    alert("✅ ログイン済み → index.html 表示継続");
  }
});