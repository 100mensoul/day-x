document.addEventListener('DOMContentLoaded', () => {
  fetch('schedule.json')
    .then(response => response.json())
    .then(scheduleData => {
      const today = new Date();
      const year = today.getFullYear();
      const todayDate = today.getDate();
      const todayMonth = today.getMonth() + 1;

      const tbody = document.getElementById('schedule-body');

      for (let i = 0; i < 14; i++) {
        const date = new Date(year, todayMonth - 1, todayDate + i);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const isoDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        const area = scheduleData[isoDate]?.area || "-";
        const mission = scheduleData[isoDate]?.mission || "-";
        const route = scheduleData[isoDate]?.route || "-";
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        const tr = document.createElement('tr');
        if (i >= 7) tr.classList.add('next-week', 'hidden');
        tr.innerHTML = `
          <td>${day} <span class="weekday">${weekday}</span></td>
          <td>${area}</td>
          <td class="mission-label">${mission}</td>
          <td>${route}</td>
        `;
        tbody.appendChild(tr);
      }

      const nextWeekBtn = document.querySelector('#next-week-btn');
      if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', () => {
          document.querySelectorAll('.next-week').forEach(row => row.classList.remove('hidden'));
          nextWeekBtn.style.display = 'none';
          document.querySelector('.table-container').classList.add('no-fade');
        });
      }
    })
    .catch(error => {
      console.error('Failed to load schedule.json:', error);
    });
});
