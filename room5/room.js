// URLからID取得
const urlParams = new URLSearchParams(window.location.search);
const roomId = urlParams.get('id');

if (!roomId) {
  alert("トピックIDが指定されていません。");
  throw new Error("No room ID.");
}

function loadRoom() {
  const log = document.getElementById('chatLog');
  const data = JSON.parse(localStorage.getItem(`room_${roomId}`) || '[]');
  log.innerHTML = '';

  data.forEach(entry => {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-entry';

    const time = document.createElement('div');
    time.className = 'chat-timestamp';
    time.textContent = entry.timestamp;

    const content = document.createElement('div');
    content.textContent = entry.text;

    wrapper.appendChild(time);
    wrapper.appendChild(content);
    log.appendChild(wrapper);
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
loadRoom();
