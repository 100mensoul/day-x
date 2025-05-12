document.getElementById('merge-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const area = document.getElementById('area').value;

  const mission = {
    title_en: document.getElementById('title_en').value,
    title_ja: document.getElementById('title_ja').value,
    plan_en: document.getElementById('plan_en').value,
    plan_ja: document.getElementById('plan_ja').value,
    briefing_en: document.getElementById('briefing_en').value,
    briefing_ja: document.getElementById('briefing_ja').value,
    condition_en: document.getElementById('condition_en').value,
    condition_ja: document.getElementById('condition_ja').value,
    details: {
      departure_time: document.getElementById('departure_time').value,
      meeting_time: document.getElementById('meeting_time').value,
      transport: document.getElementById('transport').value,
      duration: document.getElementById('duration').value,
      arrival_time: document.getElementById('arrival_time').value,
      start_time: document.getElementById('start_time').value,
      map_url: document.getElementById('map_url').value,
      related_url: document.getElementById('related_url').value
    }
  };

  try {
    const response = await fetch('schedule.json');
    const data = await response.json();

    if (!data[date]) {
      data[date] = { area: area, missions: [mission] };
    } else {
      data[date].area = area;
      data[date].missions.push(mission);
    }

    const jsonString = JSON.stringify(data, null, 2);
    document.getElementById('output').value = jsonString;

    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('downloadLink');
    link.href = url;
    link.style.display = 'inline';
  } catch (err) {
    alert('JSONの読み込みまたはマージに失敗しました。');
    console.error(err);
  }
});