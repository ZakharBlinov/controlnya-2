const mainContent = document.getElementById("main-content");
const navLinks = document.querySelectorAll("nav a");
let currentPage = localStorage.getItem("currentPage") || "products";
let data = {};
let loadedItems = 4;
let isLoading = false;

const apiEndpoints = {
    products: "https://dummyjson.com/products",
    categories: "https://dummyjson.com/products/categories",
    users: "https://dummyjson.com/users"
};

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(endpoint);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

const renderData = (data) => {
    mainContent.innerHTML = "";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    for (let i = 0; i < loadedItems; i++) {
        const item = data[i];
        const card = document.createElement("div");
        card.classList.add("card");

        if (currentPage === "products") {
            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>Price: ${item.price}</p>
                <img src="${item.thumbnail}" alt="${item.title}">
            `;
        } else if (currentPage === "categories") {
            card.innerHTML = `
                <h3>${item}</h3>
            `;
        } else if (currentPage === "users") {
            card.innerHTML = `
                <h3>${item.firstName} ${item.lastName}</h3>
                <p>Email: ${item.email}</p>
            `;
        }

        cardContainer.appendChild(card);
    }

    mainContent.appendChild(cardContainer);

    if (loadedItems < data.length) {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.classList.add("load-more-button");
        loadMoreButton.textContent = "Показать еще";
        loadMoreButton.addEventListener("click", () => {
            loadedItems += 4;
            renderData(data);
        });
        mainContent.appendChild(loadMoreButton);
    } else {
        const hideButton = document.createElement("button");
        hideButton.classList.add("hide-button");
        hideButton.textContent = "Скрыть";
        hideButton.addEventListener("click", () => {
            loadedItems = 4;
            renderData(data);
        });
        mainContent.appendChild(hideButton);
    }
};

const handleNavigation = (event) => {
    event.preventDefault();
    currentPage = event.target.dataset.page;
    localStorage.setItem("currentPage", currentPage);
    renderData(data[currentPage]);
};

const init = async () => {
    data.products = await fetchData(apiEndpoints.products);
    data.categories = await fetchData(apiEndpoints.categories);
    data.users = await fetchData(apiEndpoints.users);

    renderData(data[currentPage]);

    navLinks.forEach(link => link.addEventListener("click", handleNavigation));
};

window.addEventListener("load", init);
