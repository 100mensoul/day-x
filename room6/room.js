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

  // 最新が上に来るよう逆順で表示
  data.slice().reverse().forEach(entry => {
    const wrapper = document.createElement('div');
    wrapper.className = 'chat-entry';

    const content = document.createElement('div');
    content.textContent = entry.text;

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
  data.push(entry); // pushし、表示時にreverseする
  localStorage.setItem(`room_${roomId}`, JSON.stringify(data));

  input.value = '';
  loadRoom();
}

document.getElementById('sendButton').addEventListener('click', sendEntry);
loadRoom();
