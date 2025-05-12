function loadAdminView() {
  const container = document.getElementById("adminTableContainer");
  const notes = JSON.parse(localStorage.getItem("dayx_notes") || "[]");

  if (notes.length === 0) {
    container.innerHTML = "<p>登録されたトピックがありません。</p>";
    return;
  }

  const table = document.createElement("table");
  table.style.width = "100%";
  table.style.borderCollapse = "collapse";
  table.innerHTML = `
    <thead>
      <tr>
        <th style="border-bottom:1px solid #ccc;">選択</th>
        <th style="border-bottom:1px solid #ccc;">ID</th>
        <th style="border-bottom:1px solid #ccc;">内容</th>
        <th style="border-bottom:1px solid #ccc;">日時</th>
        <th style="border-bottom:1px solid #ccc;">メッセージ数</th>
        <th style="border-bottom:1px solid #ccc;">操作</th>
      </tr>
    </thead>
    <tbody id="adminBody"></tbody>
  `;
  container.appendChild(table);

  const tbody = table.querySelector("#adminBody");

  notes.forEach(note => {
    const row = document.createElement("tr");

    const checkCell = document.createElement("td");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.className = "row-check";
    check.dataset.noteId = note.id;
    checkCell.appendChild(check);

    const idCell = document.createElement("td");
    idCell.textContent = note.id;

    const textCell = document.createElement("td");
    textCell.textContent = note.text.slice(0, 30) + (note.text.length > 30 ? "..." : "");

    const timeCell = document.createElement("td");
    timeCell.textContent = note.timestamp;

    const roomKey = `room_${note.id}`;
    const roomData = JSON.parse(localStorage.getItem(roomKey) || "[]");

    const countCell = document.createElement("td");
    countCell.textContent = roomData.length;

    const controlCell = document.createElement("td");

    const openBtn = document.createElement("button");
    openBtn.textContent = "確認";
    openBtn.onclick = () => {
      window.open(`room.html?id=${note.id}`, "_blank");
    };

    const exportBtn = document.createElement("button");
    exportBtn.textContent = "出力";
    exportBtn.style.marginLeft = "0.5rem";
    exportBtn.onclick = () => {
      const formatted = roomData.map(entry => ({
        text: entry.text,
        timestamp: entry.timestamp
      }));

      const blob = new Blob([JSON.stringify(formatted, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `room_${note.id}.json`;
      a.click();
      URL.revokeObjectURL(url);
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "削除";
    deleteBtn.style.marginLeft = "0.5rem";
    deleteBtn.onclick = () => {
      const confirmDelete = confirm(`トピック「${note.text.slice(0, 20)}...」を削除しますか？`);
      if (!confirmDelete) return;

      const updatedNotes = notes.filter(n => n.id !== note.id);
      localStorage.setItem("dayx_notes", JSON.stringify(updatedNotes));
      localStorage.removeItem(roomKey);
      location.reload();
    };

    controlCell.appendChild(openBtn);
    controlCell.appendChild(exportBtn);
    controlCell.appendChild(deleteBtn);

    row.appendChild(checkCell);
    row.appendChild(idCell);
    row.appendChild(textCell);
    row.appendChild(timeCell);
    row.appendChild(countCell);
    row.appendChild(controlCell);

    tbody.appendChild(row);
  });
}

window.onload = loadAdminView;

document.getElementById("applyBulkAction").addEventListener("click", () => {
  const action = document.getElementById("bulkActionSelector").value;
  const checks = document.querySelectorAll(".row-check:checked");

  if (action === "selectAll") {
    document.querySelectorAll(".row-check").forEach(c => c.checked = true);
    return;
  }

  if (checks.length === 0) {
    alert("操作するトピックを選択してください。");
    return;
  }

  const allNotes = JSON.parse(localStorage.getItem("dayx_notes") || "[]");
  let updatedNotes = [...allNotes];

  if (action === "export") {
    checks.forEach(c => {
      const noteId = c.dataset.noteId;
      const roomData = JSON.parse(localStorage.getItem(`room_${noteId}`) || "[]");

      const formatted = roomData.map(entry => ({
        text: entry.text,
        timestamp: entry.timestamp
      }));

      const blob = new Blob([JSON.stringify(formatted, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `room_${noteId}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (action === "delete") {
    if (!confirm("選択されたトピックをすべて削除しますか？")) return;

    checks.forEach(c => {
      const noteId = c.dataset.noteId;
      updatedNotes = updatedNotes.filter(n => n.id != noteId);
      localStorage.removeItem(`room_${noteId}`);
    });

    localStorage.setItem("dayx_notes", JSON.stringify(updatedNotes));
    location.reload();
  }
});
