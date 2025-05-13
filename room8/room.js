const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

if (!roomId) {
  alert("トピックIDが指定されていません。");
  throw new Error("No room ID.");
}

let roomData = [];

function loadRoom() {
  const log = document.getElementById('chatLog');
  roomData = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
  log.innerHTML = '';

  const reversedData = roomData.slice().reverse();

  reversedData.forEach((entry, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-entry align-right';

    if (index === 0) {
      wrapper.classList.add('newest');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'export-check';
    checkbox.checked = true;
    checkbox.style.display = 'none';
    checkbox.dataset.index = roomData.length - 1 - index;

    const content = document.createElement('div');
    content.textContent = entry.text;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(content);
    log.appendChild(wrapper);
  });

  // 確実に描画後スクロール位置を上に戻す
  setTimeout(() => {
    requestAnimationFrame(() => {
      scrollToTop();
    });
  }, 0);
}

function scrollToTop() {
  const log = document.getElementById('chatLog');
  requestAnimationFrame(() => {
    log.scrollTop = 0;
    requestAnimationFrame(() => {
      log.scrollTop = 0;
    });
  });
}

function sendEntry() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  const entry = {
    text,
    timestamp: new Date().toLocaleString()
  };

  const data = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
  data.push(entry);
  localStorage.setItem(`room_${roomId}`, JSON.stringify(data));

  input.value = '';
  loadRoom();
}

document.getElementById('sendButton').addEventListener('click', sendEntry);

document.getElementById('chatInput').addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendEntry();
  }
});

document.getElementById('toggleExport').addEventListener('click', () => {
  const checks = document.querySelectorAll('.export-check');
  const exportBtn = document.getElementById('exportSelected');

  if (checks.length === 0) return;

  const isVisible = checks[0].style.display === 'inline-block';
  checks.forEach(c => {
    c.style.display = isVisible ? 'none' : 'inline-block';
    c.checked = true;
  });

  exportBtn.style.display = isVisible ? 'none' : 'inline-block';
});

document.getElementById('exportSelected').addEventListener('click', () => {
  const selected = [];
  const checks = document.querySelectorAll('.export-check');

  checks.forEach(c => {
    if (c.checked) {
      const idx = parseInt(c.dataset.index);
      selected.push(roomData[idx]);
    }
  });

  if (selected.length === 0) {
    alert("出力するコメントを選択してください。");
    return;
  }

  const formatted = selected.map(entry => ({
    text: entry.text,
    timestamp: entry.timestamp
  }));

  const blob = new Blob([JSON.stringify(formatted, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `room_${roomId}_selected.json`;
  a.click();
  URL.revokeObjectURL(url);
});

loadRoom();