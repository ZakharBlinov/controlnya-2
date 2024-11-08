document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    localStorage.setItem('lastPage', currentPage);
});

window.addEventListener('load', () => {
    const lastPage = localStorage.getItem('lastPage');
    if (lastPage && lastPage !== 'h.html') {
        window.location.href = lastPage;
    }
});