// 1. URLパラメータ取得
const params = new URLSearchParams(window.location.search);
const sectionId = params.get('id') || 'unknown';
const [unit, section] = sectionId.split('-').slice(-2);

// 2. タイトルと色クラス設定
const titleMap = {
  wear: 'WEAR（服）',
  ec: 'EC（電子機器）',
  doc: 'DOC（書類）'
};

const unitMap = {
  'unit-a': 'UNIT-A / MOVE',
  'unit-b': 'UNIT-B / TOKYO',
  'unit-c': 'UNIT-C / HIMEJI'
};

document.title = `${titleMap[section] || 'セクション'} | ${unitMap[sectionId.split('-').slice(0, 2).join('-')] || ''}`;
document.getElementById('section-title').textContent = titleMap[section] || '未定義セクション';
document.getElementById('section-subtitle').textContent = unitMap[sectionId.split('-').slice(0, 2).join('-')] || '';

document.body.classList.add(section);

// 3. 写真＋タグのデータ構造と保存キー
let photoData = JSON.parse(localStorage.getItem(sectionId)) || [];

// 4. 表示処理
function renderPhotos() {
  const grid = document.getElementById('photo-grid');
  grid.innerHTML = '';

  photoData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'photo-card';

    const img = document.createElement('img');
    img.src = item.image;

    const tagsDiv = document.createElement('div');
    tagsDiv.className = 'tags';
    item.tags.forEach(tag => {
      const tagEl = document.createElement('span');
      tagEl.className = 'tag';
      tagEl.textContent = tag.trim();
      tagsDiv.appendChild(tagEl);
    });

    card.appendChild(img);
    card.appendChild(tagsDiv);
    grid.appendChild(card);
  });
}

// 5. 写真追加処理
function addPhoto() {
  const fileInput = document.getElementById('imageInput');
  const tagInput = document.getElementById('tagInput');

  const file = fileInput.files[0];
  const tags = tagInput.value.split(',');

  if (!file) return alert('画像を選択してください');

  const reader = new FileReader();
  reader.onload = function (e) {
    const newEntry = {
      image: e.target.result,
      tags: tags.map(t => t.trim()).filter(t => t)
    };

    photoData.push(newEntry);
    localStorage.setItem(sectionId, JSON.stringify(photoData));
    renderPhotos();

    fileInput.value = '';
    tagInput.value = '';
  };

  reader.readAsDataURL(file);
}

// 6. 初期表示
renderPhotos();

// グローバル関数化
window.addPhoto = addPhoto;