let editingIndex = null;

// 保存 or 更新
function saveNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');

  if (editingIndex !== null) {
    // 編集中
    notes[editingIndex].text = text;
    localStorage.setItem('dayx_notes', JSON.stringify(notes));
    editingIndex = null;
  } else {
    // 新規保存
    const note = {
      text,
      timestamp: new Date().toLocaleString()
    };
    notes.unshift(note);
    localStorage.setItem('dayx_notes', JSON.stringify(notes));
  }

  input.value = '';
  renderNotes();
}

// 表示
function renderNotes() {
  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  const list = document.getElementById('noteList');
  list.innerHTML = '';

  notes.forEach((note, index) => {
    const entry = document.createElement('div');
    entry.className = 'entry';

    const time = document.createElement('div');
    time.className = 'timestamp';
    time.textContent = note.timestamp;

    const text = document.createElement('div');
    text.textContent = note.text;

    const controls = document.createElement('div');
    controls.className = 'controls';

    const editBtn = document.createElement('button');
    editBtn.textContent = '編集';
    editBtn.onclick = () => editNote(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '削除';
    deleteBtn.onclick = () => deleteNote(index);

    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);

    entry.appendChild(time);
    entry.appendChild(controls);
    entry.appendChild(text);
    list.appendChild(entry);
  });
}

// 編集
function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  document.getElementById('noteInput').value = notes[index].text;
  editingIndex = index;
}

// 削除
function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  if (!confirm('このメモを削除しますか？')) return;
  notes.splice(index, 1);
  localStorage.setItem('dayx_notes', JSON.stringify(notes));
  renderNotes();
}

// 初期化
document.getElementById('saveButton').addEventListener('click', saveNote);
renderNotes();
