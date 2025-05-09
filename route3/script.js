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

        const data = scheduleData[isoDate] || {};
        const area = data.area || "-";
        const mission = data.mission || "-";
        const plan = data.plan || "-";
        const notes = data.notes || "-";
        const feeling = data.feeling || "-";
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="date-cell" data-date="${isoDate}" data-area="${area}" data-mission="${mission}" data-plan="${plan}" data-notes="${notes}" data-feeling="${feeling}" data-weekday="${weekday}">
            ${day} <span class="weekday">${weekday}</span>
          </td>
          <td>${area}</td>
        `;
        tbody.appendChild(tr);
      }

      // クリックイベント
      document.querySelectorAll('.date-cell').forEach(cell => {
        cell.addEventListener('click', () => {
          const date = cell.dataset.date;
          const area = cell.dataset.area;
          const mission = cell.dataset.mission;
          const plan = cell.dataset.plan;
          const notes = cell.dataset.notes;
          const feeling = cell.dataset.feeling;
          const weekday = cell.dataset.weekday;

          modalBody.innerHTML = `
            <p><strong>📅 ${date} (${weekday})</strong></p>
            <p><strong>📍 AREA:</strong> ${area}</p>
            <p><strong>🎯 MISSION:</strong> ${mission}</p>
            <p><strong>🚦 PLAN:</strong> ${plan}</p>
            <p><strong>🔧 NOTES:</strong> ${notes}</p>
            <p><strong>🧠 FEELING:</strong> ${feeling}</p>
          `;
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
