document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const todayDate = today.getDate();

  const rows = document.querySelectorAll('tbody tr');
  let count = 0;

  rows.forEach(row => {
    const day = parseInt(row.dataset.day);
    if (day >= todayDate && count < 7) {
      row.classList.remove('hidden');
      count++;
    } else if (day >= todayDate) {
      row.classList.add('hidden');
      row.classList.add('next-week');
    } else {
      row.classList.add('hidden');
    }
  });

  document.querySelector('#next-week-btn').addEventListener('click', () => {
    document.querySelectorAll('.next-week').forEach(row => row.classList.remove('hidden'));
    document.querySelector('#next-week-btn').style.display = 'none';
  });
});