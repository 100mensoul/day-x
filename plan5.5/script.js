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
        const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${day} <span class="weekday">${weekday}</span></td>
          <td>${area}</td>
        `;
        tbody.appendChild(tr);
      }
    })
    .catch(error => {
      console.error('Failed to load schedule.json:', error);
    });
});