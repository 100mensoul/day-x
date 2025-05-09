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
      const translateBtn = document.getElementById('translate-btn');

      const missionsMap = {};
      let currentLang = 'en';
      let selectedData = {};

      for (let i = 0; i < 14; i++) {
        const date = new Date(year, todayMonth - 1, todayDate + i);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const data = scheduleData[isoDate] || {};
        const area = data.area || "-";
        const missions = data.missions || [];
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        missionsMap[isoDate] = { area, weekday, missions };

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td class="date-cell" data-date="${isoDate}">
            ${day} <span class="weekday">${weekday}</span>
          </td>
          <td>${area}</td>
        `;
        tbody.appendChild(tr);
      }

      document.querySelectorAll('.date-cell').forEach(cell => {
        cell.addEventListener('click', () => {
          const date = cell.dataset.date;
          selectedData = { date, ...missionsMap[date] };
          currentLang = 'en';
          showModalContent();
          modal.classList.remove('hidden');
        });
      });

      translateBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ja' : 'en';
        translateBtn.textContent = currentLang === 'en' ? 'Translation' : 'English';
        showModalContent();
      });

      function showModalContent() {
        const { date, area, weekday, missions } = selectedData;
        let missionsHtml = '';
        missions.forEach((m, index) => {
          missionsHtml += `
            <p><strong>MISSION ${index + 1}:</strong> ${m[`title${currentLang === 'ja' ? '_ja' : ''}`]}</p>
            <p><strong>PLAN:</strong> ${m[`plan${currentLang === 'ja' ? '_ja' : ''}`]}</p>
            <p><strong>BRIEFING:</strong> ${m[`briefing${currentLang === 'ja' ? '_ja' : ''}`]}</p>
            <p><strong>CONDITION:</strong> ${m[`condition${currentLang === 'ja' ? '_ja' : ''}`]}</p>
            <hr style="border-color:#333;">
          `;
        });

        modalBody.innerHTML = `
          <p><strong>DATE:</strong> ${date} (${weekday})</p>
          <p><strong>AREA:</strong> ${area}</p>
          ${missionsHtml || '<p>No missions.</p>'}
        `;
      }

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
