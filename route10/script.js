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
      const detailBtn = document.getElementById('detail-btn');
      const detailModal = document.getElementById('detail-modal');
      const detailModalBody = document.getElementById('detail-modal-body');
      const detailTranslateBtn = document.getElementById('detail-translate-btn');
      const closeDetailModal = document.getElementById('close-detail-modal');
      const commentTextarea = document.getElementById('comment');

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

      translateBtn.addEventListener('click', toggleLanguage);
      detailTranslateBtn.addEventListener('click', toggleLanguage);

      detailBtn.addEventListener('click', () => {
        showDetailModal();
        detailModal.classList.remove('hidden');
        loadComment();
      });

      closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
      });

      closeDetailModal.addEventListener('click', () => {
        detailModal.classList.add('hidden');
      });

      window.addEventListener('click', e => {
        if (e.target === modal) modal.classList.add('hidden');
        if (e.target === detailModal) detailModal.classList.add('hidden');
      });

      window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          modal.classList.add('hidden');
          detailModal.classList.add('hidden');
        }
      });

      commentTextarea.addEventListener('input', () => {
        const key = `${selectedData.date}_comment`;
        localStorage.setItem(key, commentTextarea.value);
      });

      function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'ja' : 'en';
        translateBtn.textContent = currentLang === 'en' ? 'Translation' : 'English';
        detailTranslateBtn.textContent = currentLang === 'en' ? 'Translation' : 'English';
        showModalContent();
        showDetailModal();
      }

      function showModalContent() {
        const { date, area, weekday, missions } = selectedData;
        let missionsHtml = '';
        missions.forEach((m, index) => {
          missionsHtml += `
            <p><strong>MISSION ${index + 1}:</strong> ${m[`title_${currentLang}`]}</p>
            <p><strong>PLAN:</strong> ${m[`plan_${currentLang}`]}</p>
            <p><strong>BRIEFING:</strong> ${m[`briefing_${currentLang}`]}</p>
            <p><strong>CONDITION:</strong> ${m[`condition_${currentLang}`]}</p>
            <hr style="border-color:#333;">
          `;
        });
        modalBody.innerHTML = `
          <p><strong>DATE:</strong> ${date} (${weekday})</p>
          <p><strong>AREA:</strong> ${area}</p>
          ${missionsHtml || '<p>No missions.</p>'}
        `;
      }

      function showDetailModal() {
        const { missions } = selectedData;
        let detailsHtml = '';
        missions.forEach((m, index) => {
          detailsHtml += `
  <p><strong>MORNING TIME:</strong> ${m.details.morning_time}</p>
  <p><strong>DEPARTURE TIME:</strong> ${m.details.departure_time}</p>
  <p><strong>TRANSPORT:</strong> ${m.details.transport}</p>
  <p><strong>DURATION:</strong> ${m.details.duration}</p>
  <p><strong>ARRIVAL TIME:</strong> ${m.details.arrival_time}</p>
  <p><strong>START TIME:</strong> ${m.details.start_time}</p>
  <p><strong>MAP:</strong> <a href="${m.details.map_url}" target="_blank">${m.details.map_url}</a></p>
  <p><strong>RELATED PAGE:</strong> <a href="${m.details.related_url}" target="_blank">${m.details.related_url}</a></p>
  <hr style="border-color:#333;">
`;
        });
        detailModalBody.innerHTML = detailsHtml;
        loadComment();
      }

      function loadComment() {
        const key = `${selectedData.date}_comment`;
        commentTextarea.value = localStorage.getItem(key) || '';
      }
    })
    .catch(error => {
      console.error('Failed to load schedule.json:', error);
    });
});