const form = document.getElementById('itemForm');
const input = document.getElementById('itemInput');
const select = document.getElementById('categorySelect');
const itemList = document.getElementById('itemList');
const filterButtons = document.querySelectorAll('nav button');

let items = JSON.parse(localStorage.getItem('items')) || [];

function renderList(filter = "ALL") {
  itemList.innerHTML = '';
  items
    .filter(item => filter === "ALL" || item.category === filter)
    .forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} <span class="category">[${item.category}]</span>
        <button onclick="deleteItem(${index})">削除</button>
      `;
      itemList.appendChild(li);
    });
}

form.onsubmit = e => {
  e.preventDefault();
  const name = input.value.trim();
  const category = select.value;
  if (!name) return;

  items.push({ name, category });
  localStorage.setItem('items', JSON.stringify(items));
  input.value = '';
  renderList();
};

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
  renderList();
}

filterButtons.forEach(btn => {
  btn.onclick = () => {
    const filter = btn.dataset.filter;
    renderList(filter);
  };
});

renderList();
