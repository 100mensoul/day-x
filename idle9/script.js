function showMessage(msg) {
  document.getElementById('message').textContent = msg;
}

const quotes = [
  "深呼吸して、ゆっくりいこう。",
  "何もしない時間も大事。",
  "今日できなくても、明日がある。",
  "心のエンジンは静かに温めよう。",
  "休むことは前進の一部。"
];
document.getElementById('dailyQuote').textContent = quotes[new Date().getDay()];

const bgmSelect = document.getElementById('bgmSelect');
const bgmPlayer = document.getElementById('bgmPlayer');
const bgmSource = document.getElementById('bgmSource');
const logo = document.getElementById('logo');
const nightMessage = document.getElementById('nightMessage');
const gear = document.querySelector('.gear-svg polygon');

const tracks = {
  '1': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  '2': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  '3': 'your-rain-sound.mp3',  // ← 雨音ファイルを自分のURLに変更
  '4': 'your-insect-sound.mp3' // ← 虫の声ファイルを自分のURLに変更
};

bgmSelect.addEventListener('change', function() {
  bgmSource.src = tracks[this.value];
  bgmPlayer.load();
});

document.getElementById('darkModeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const gradient = document.body.classList.contains('dark-mode') ? 'url(#nightGradient)' : 'url(#dayGradient)';
  gear.setAttribute('stroke', gradient);

  if (document.body.classList.contains('dark-mode')) {
    bgmSource.src = tracks['3'];
    bgmPlayer.load();
    logo.textContent = "Idle Mode ✧ Night";
    nightMessage.textContent = "夜空の下、ゆっくり休んでね。";
  } else {
    bgmSource.src = tracks['1'];
    bgmPlayer.load();
    logo.textContent = "Idle Mode";
    nightMessage.textContent = "";
  }
});

window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  });
});