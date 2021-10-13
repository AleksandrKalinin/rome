  window.onload = function() {
    getItems()
      .then(items => console.log("Items fetched"))
      .catch(err => console.log(err));
  }
  
  let data;

  async function getItems() {
    try {
      let res = await fetch('http://localhost:3000/items');
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      data = await res.json();
      renderData(data.entries);
      getCategories(data.entries)
    } catch ({ error }) {
      throw new Error(error);
    }
  }

async function renderData(data) {
  let root = document.getElementById('root');
  root.innerHTML = '';
  for (var i = 0; i < data.length; i++) {
    let row = document.createElement('tr');
    let id = document.createElement('td');
    id.innerText = i;
    let title = document.createElement('td');
    title.innerText = data[i].API;
    let category = document.createElement('td');
    category.innerText = data[i].Category;
    row.setAttribute('dataId', i);
    row.appendChild(id);
    row.appendChild(title);
    row.appendChild(category);
    root.appendChild(row);
  } 
}

async function getCategories(data) {
  let select = document.createElement('select');
  let select2 = document.createElement('select');
  let head = document.getElementById('head');
  const uniqueItems = [...new Set(data.map(item => item.Category))];
  for (var i = 0; i < unique.length; i++) {
    let option = document.createElement('option');
    option.innerText = unique[i];
    option.setAttribute('value', unique[i]);
    select.appendChild(option);
  }

  for (var i = 0; i < data.length; i++) {
    let option = document.createElement('option');
    option.innerText = data[i].API;
    option.setAttribute('value', data[i].API);
    select2.appendChild(option);
  }

  select.addEventListener('change', function(e) {
    let newData = data.filter(item => item.Category === e.target.value);
    renderData(newData);
  })

  select2.addEventListener('change', function(e) {
    let newData = data.filter(item => item.API === e.target.value);
    renderData(newData);
  })    

  head.appendChild(select);
  head.appendChild(select2);
}