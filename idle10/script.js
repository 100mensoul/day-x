const gearColors = {
  LOW: '#0d47a1',
  SECOND: '#4fc3f7',
  '3rd': '#26a69a',
  '4th': '#66bb6a',
  '5th': '#ffb74d',
  TOP: '#f06292'
};

const gearSpeeds = {
  LOW: '5s',
  SECOND: '4s',
  '3rd': '3s',
  '4th': '2s',
  '5th': '1.5s',
  TOP: '1s'
};

const gearMessages = {
  LOW: '完全アイドリングモードがおすすめ',
  SECOND: '低速巡航モードでゆるっと',
  '3rd': '安定走行でコツコツ',
  '4th': 'ウキウキ気分で軽快に',
  '5th': 'やる気全開でGO',
  TOP: '全力疾走で突き抜けろ！'
};

const dailyQuotes = [
  "深呼吸して、ゆっくりいこう。",
  "何もしない時間も大事。",
  "今日できなくても、明日がある。",
  "心のエンジンは静かに温めよう。",
  "休むことは前進の一部。",
  "今日はオールクリア、発進OK！",
  "ドクター承認済み、フルスロットル！"
];

let selectedGear = '';

function setGear(gear) {
  const gearEl = document.querySelector('.gear');
  const labelEl = document.querySelector('.gear-label');
  const messageEl = document.querySelector('.gear-message');
  gearEl.style.border = `6px solid ${gearColors[gear]}`;
  gearEl.style.borderTop = `6px solid #fdd835`;
  gearEl.style.animation = `spin ${gearSpeeds[gear]} linear infinite`;
  labelEl.textContent = gear;
  labelEl.style.color = gearColors[gear];
  messageEl.textContent = gearMessages[gear];
}

function openModal() {
  // modal開閉コードがあればここに挿入（今は省略）
}

function closeModal() {
  // modal閉鎖コードがあればここに挿入（今は省略）
}

function confirmGear() {
  if (selectedGear) {
    setGear(selectedGear);
    closeModal();
    selectedGear = '';
  } else {
    alert('気分を選んでください！');
  }
}

// Doctor's Call（今日の癒しの言葉）
document.addEventListener('DOMContentLoaded', function() {
  const quoteEl = document.getElementById('dailyQuote');
  const todayIndex = new Date().getDay() % dailyQuotes.length;
  quoteEl.textContent = dailyQuotes[todayIndex];
});