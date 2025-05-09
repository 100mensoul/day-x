document.addEventListener('DOMContentLoaded', () => {
  fetch('schedule.json')
    .then(response => response.json())
    .then(scheduleData => {
      const today = new Date();
      const year = today.getFullYear();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth() + 1;

      const tbody = document.getElementById('schedule-body');
      const modal = document.getElementById('modal');
      const modalBody = document.getElementById('modal-body');
      const closeModal = document.getElementById('close-modal');

      for (let i = 0; i < 14; i++) {
        const date = new Date(year, todayMonth - 1, todayDate + i);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const area = scheduleData[isoDate]?.area || "-";
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="date-cell" data-date="${isoDate}">${day} <span class="weekday">${weekday}</span></td>
          <td>${area}</td>
        `;
        tbody.appendChild(tr);
      }

      // クリックイベント
      document.querySelectorAll('.date-cell').forEach(cell => {
        cell.addEventListener('click', () => {
          const date = cell.dataset.date;
          modalBody.textContent = `詳細情報： ${date}`;
          modal.classList.remove('hidden');
        });
      });

      // モーダルを閉じる
      closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
      });

      window.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });

      window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          modal.classList.add('hidden');
        }
      });
    })
    .catch(error => {
      console.error('Failed to load schedule.json:', error);
    });
});
