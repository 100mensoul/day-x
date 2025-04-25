import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// デバッグログ（読み込み確認）
console.log("✅ auth-check.js 読み込まれた");

onAuthStateChanged(auth, (user) => {
  console.log("ログイン状態:", user);
  if (!user) {
    console.log("❌ 未ログイン → login.html にリダイレクトします");
    window.location.href = "login.html";
  } else {
    console.log("✅ ログイン済み → index.html 表示継続");
  }
});