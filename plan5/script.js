document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1; // getMonth() は0始まりなので+1

  const rows = document.querySelectorAll('tbody tr');
  let count = 0;

  rows.forEach(row => {
    const day = parseInt(row.dataset.day);
    const month = parseInt(row.dataset.month);

    if (
      month > todayMonth || 
      (month === todayMonth && day >= todayDate)
    ) {
      // 今日以降のデータ
      if (count < 7) {
        row.classList.remove('hidden');
        count++;
      } else {
        row.classList.add('hidden');
        row.classList.add('next-week');
      }
    } else {
      // 今日以前のデータ
      row.classList.add('hidden');
    }
  });

  const nextWeekBtn = document.querySelector('#next-week-btn');
  if (nextWeekBtn) {
    nextWeekBtn.addEventListener('click', () => {
      document.querySelectorAll('.next-week').forEach(row => row.classList.remove('hidden'));
      nextWeekBtn.style.display = 'none';
      document.querySelector('.table-container').classList.add('no-fade');
    });
  }
});
