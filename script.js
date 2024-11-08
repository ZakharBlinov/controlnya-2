const API_BASE_URL = 'https://api.example.com/';
let pageIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const lastPage = localStorage.getItem('lastPage') || 'products';
    loadPage(lastPage);

    window.addEventListener('hashchange', () => {
        const page = location.hash.slice(1) || 'products';
        loadPage(page);
    });
});

function loadPage(page) {
    localStorage.setItem('lastPage', page);
    pageIndex = 0;
    fetchData(page);
}

function fetchData(page) {
    fetch(`${API_BASE_URL}${page}`)
        .then(response => response.json())
        .then(data => renderData(data, page))
        .catch(error => console.error(error));
}

function renderData(data, page) {
    const content = document.getElementById('content');
    content.innerHTML = '';
    
    const cards = data.slice(pageIndex, pageIndex + 4).map(item => `
        <div class="card">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');
    
    content.innerHTML = cards;

    if (data.length > 4) {
        const showMoreBtn = document.createElement('button');
        showMoreBtn.textContent = 'Показать еще';
        content.appendChild(showMoreBtn);

        showMoreBtn.onclick = () => {
            pageIndex += 4;
            renderData(data, page);
            if (pageIndex >= data.length) {
                showMoreBtn.style.display = 'none';
            }
        };
    }
}