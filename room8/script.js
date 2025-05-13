document.getElementById("saveButton").addEventListener("click", () => {
  const text = document.getElementById("noteInput").value.trim();
  if (!text) return;

  const notes = JSON.parse(localStorage.getItem("dayx_notes") || "[]");
  const id = Date.now();
  const timestamp = new Date().toLocaleString();

  notes.push({ id, text, timestamp });
  localStorage.setItem("dayx_notes", JSON.stringify(notes));
  document.getElementById("noteInput").value = "";
  renderNotes();
});

function renderNotes() {
  const noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  const notes = JSON.parse(localStorage.getItem("dayx_notes") || "[]");

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "entry";

    const time = document.createElement("div");
    time.className = "timestamp";
    time.textContent = note.timestamp;

    const content = document.createElement("div");
    content.textContent = note.text;

    const controls = document.createElement("div");
    controls.className = "controls";

    const open = document.createElement("button");
    open.textContent = "記入"; // ← room8対応：中身を見る → 記入
    open.onclick = () => {
      window.location.href = `room.html?id=${note.id}`;
    };

    const del = document.createElement("button");
    del.textContent = "削除";
    del.onclick = () => {
      const updated = notes.filter(n => n.id !== note.id);
      localStorage.setItem("dayx_notes", JSON.stringify(updated));
      renderNotes();
    };

    controls.appendChild(open);
    controls.appendChild(del);

    div.appendChild(time);
    div.appendChild(content);
    div.appendChild(controls);

    noteList.appendChild(div);
  });
}

window.onload = renderNotes;