const gearColors = {
  LOW: '#0d47a1',
  SECOND: '#4fc3f7',
  '3rd': '#26a69a',
  '4th': '#fdd835',
  '5th': '#ffb74d',
  TOP: '#f06292'
};

let selectedGear = '';

const gearWords = {
  LOW: ['だるい', '寝ていたい', '休みたい', '重い腰', '動けない'],
  SECOND: ['何もしたくない', 'ぼちぼちかな', 'スロースタート', '低空飛行'],
  '3rd': ['普通', 'まあまあ', 'やれる気がする', '平常運転'],
  '4th': ['ウキウキ', 'やや上向き', '前向き気分', '軽快', 'いけそう'],
  '5th': ['やる気マンマン', 'アクセル全開', '火がついた', '集中モード'],
  TOP: ['前回フルスロットル', '無敵', '覚醒モード', '限界突破', '神モード']
};

function setGear(gear) {
  document.querySelector('.gear').style.borderColor = gearColors[gear];
  document.querySelector('.gear-label').textContent = gear;
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  const modalButtons = document.getElementById('modal-buttons');
  modalButtons.innerHTML = '';

  // ランダム並び
  const entries = Object.entries(gearWords).flatMap(([gear, words]) => 
    words.map(word => ({ gear, word }))
  );
  entries.sort(() => Math.random() - 0.5);

  entries.forEach(entry => {
    const btn = document.createElement('button');
    btn.textContent = entry.word;
    btn.onclick = () => selectedGear = entry.gear;
    modalButtons.appendChild(btn);
  });
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function confirmGear() {
  if (selectedGear) {
    setGear(selectedGear);
    closeModal();
  } else {
    alert('気分を選んでください！');
  }
}