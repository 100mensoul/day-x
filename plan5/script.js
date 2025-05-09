document.addEventListener('DOMContentLoaded', () => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const year = today.getFullYear();

  const rows = document.querySelectorAll('tbody tr');
  let count = 0;

  rows.forEach(row => {
    const day = parseInt(row.dataset.day);
    const month = parseInt(row.dataset.month);

    // 曜日を英語で設定
    const dateObj = new Date(year, month - 1, day);
    const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' }); // 英語（例：Thu）
    row.querySelector('.weekday').textContent = weekday;

    // 今日以降の表示判定
    if (month > todayMonth || (month === todayMonth && day >= todayDate)) {
      if (count < 7) {
        row.classList.remove('hidden');
        count++;
      } else {
        row.classList.add('hidden');
        row.classList.add('next-week');
      }
    } else {
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
