// 保存処理
function saveNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const note = {
    text,
    timestamp: new Date().toLocaleString()
  };

  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  notes.unshift(note); // 新しいものを先頭に
  localStorage.setItem('dayx_notes', JSON.stringify(notes));
  input.value = '';
  renderNotes();
}

// 表示処理
function renderNotes() {
  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  const list = document.getElementById('noteList');
  list.innerHTML = '';

  notes.forEach(note => {
    const entry = document.createElement('div');
    entry.className = 'entry';

    const time = document.createElement('div');
    time.className = 'timestamp';
    time.textContent = note.timestamp;

    const text = document.createElement('div');
    text.textContent = note.text;

    entry.appendChild(time);
    entry.appendChild(text);
    list.appendChild(entry);
  });
}

// 初期化
document.getElementById('saveButton').addEventListener('click', saveNote);
renderNotes();
