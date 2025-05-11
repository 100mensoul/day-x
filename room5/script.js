let editingIndex = null;

function saveNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (!text) return;

  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');

  if (editingIndex !== null) {
    notes[editingIndex].text = text;
    localStorage.setItem('dayx_notes', JSON.stringify(notes));
    editingIndex = null;
  } else {
    const id = Date.now();
    const note = {
      id,
      text,
      timestamp: new Date().toLocaleString()
    };
    notes.unshift(note);
    localStorage.setItem('dayx_notes', JSON.stringify(notes));

    // 初期ルーム作成
    localStorage.setItem(`room_${id}`, JSON.stringify([
      { text, timestamp: note.timestamp }
    ]));
  }

  input.value = '';
  renderNotes();
}

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

    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'つづきを書く';
    continueBtn.onclick = () => {
      window.location.href = `room.html?id=${note.id}`;
    };

    controls.appendChild(continueBtn);
    controls.appendChild(editBtn);
    controls.appendChild(deleteBtn);

    entry.appendChild(time);
    entry.appendChild(controls);
    entry.appendChild(text);
    list.appendChild(entry);
  });
}

function editNote(index) {
  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  document.getElementById('noteInput').value = notes[index].text;
  editingIndex = index;
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('dayx_notes') || '[]');
  if (!confirm('このトピックを削除しますか？')) return;
  const deleted = notes.splice(index, 1);
  localStorage.removeItem(`room_${deleted[0].id}`);
  localStorage.setItem('dayx_notes', JSON.stringify(notes));
  renderNotes();
}

document.getElementById('saveButton').addEventListener('click', saveNote);
renderNotes();
