document.addEventListener('DOMContentLoaded', function() {
    let financialProducts;
    let sidebarExpanded = false;

    function showInitialContent() {
        const contentArea = document.getElementById('contentArea');
        contentArea.innerHTML = `
            <section>
                <h2>Welcome</h2>
                <p>Welcome to our comprehensive guide on financial products. Please select a category or product from the sidebar to view its details.</p>
            </section>
        `;
    }

    function createProductList() {
        const productList = document.getElementById('productList');
        Object.entries(financialProducts).forEach(([category, categoryInfo]) => {
            const li = document.createElement('li');
            const categorySpan = document.createElement('span');
            categorySpan.className = 'category';
            categorySpan.textContent = category;
            categorySpan.tabIndex = 0;
            categorySpan.setAttribute('role', 'button');
            categorySpan.setAttribute('aria-expanded', 'false');
            categorySpan.addEventListener('click', () => {
                const expanded = li.classList.toggle('expanded');
                categorySpan.setAttribute('aria-expanded', expanded);
                showCategoryDetails(category);
            });
            categorySpan.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const expanded = li.classList.toggle('expanded');
                    categorySpan.setAttribute('aria-expanded', expanded);
                    showCategoryDetails(category);
                }
            });
            li.appendChild(categorySpan);

            const ul = document.createElement('ul');
            Object.keys(categoryInfo.products).forEach(product => {
                const productLi = document.createElement('li');
                productLi.className = 'product';
                productLi.textContent = product;
                productLi.tabIndex = 0;
                productLi.setAttribute('role', 'button');
                productLi.addEventListener('click', () => {
                    showProductDetails(category, product);
                });
                productLi.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        showProductDetails(category, product);
                    }
                });
                ul.appendChild(productLi);
            });
            li.appendChild(ul);
            productList.appendChild(li);
        });
        showInitialContent();
    }

    function showCategoryDetails(category) {
        const contentArea = document.getElementById('contentArea');
        const categoryInfo = financialProducts[category];
        contentArea.innerHTML = `
            <section>
                <h2>${category}</h2>
                <p>${categoryInfo.description.english}</p>
                <p class="chinese">${categoryInfo.description.chinese}</p>
                <h3>Products in this category:</h3>
                <ul>
                    ${Object.keys(categoryInfo.products).map(product => `<li>${product}</li>`).join('')}
                </ul>
            </section>
        `;
    }

    function showProductDetails(category, product) {
        const contentArea = document.getElementById('contentArea');
        const productInfo = financialProducts[category].products[product];
        contentArea.innerHTML = `
            <section>
                <h2>${product}</h2>
                <h3>English</h3>
                <p><strong>Definition:</strong> ${productInfo.english.definition}</p>
                <h4>Key Features:</h4>
                <ul>
                    ${productInfo.english.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h4>Types:</h4>
                <ul>
                    ${productInfo.english.types.map(type => `<li>${type}</li>`).join('')}
                </ul>
                <p><strong>Example:</strong> ${productInfo.english.example}</p>
                
                <h3 class="chinese">繁體中文</h3>
                <p><strong>定義：</strong> ${productInfo.chinese.definition}</p>
                <h4>主要特點：</h4>
                <ul>
                    ${productInfo.chinese.keyFeatures.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <h4>類型：</h4>
                <ul>
                    ${productInfo.chinese.types.map(type => `<li>${type}</li>`).join('')}
                </ul>
                <p><strong>例子：</strong> ${productInfo.chinese.example}</p>
            </section>
        `;
    }

    fetch('financial-products-data.json')
        .then(response => response.json())
        .then(data => {
            financialProducts = data;
            createProductList();
        })
        .catch(error => console.error('Error loading financial products data:', error));

    const toggleSidebar = document.getElementById('toggleSidebar');
    toggleSidebar.addEventListener('click', function() {
        sidebarExpanded = !sidebarExpanded;
        const categories = document.querySelectorAll('#productList > li');
        categories.forEach(category => {
            category.classList.toggle('expanded', sidebarExpanded);
        });
        toggleSidebar.setAttribute('aria-expanded', sidebarExpanded);
    });

    const toggleTheme = document.getElementById('toggleTheme');
    toggleTheme.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
        toggleTheme.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        toggleTheme.textContent = savedTheme === 'dark-mode' ? 'Light Mode' : 'Dark Mode';
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        toggleTheme.textContent = 'Light Mode';
    }

    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => {
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-mode', e.matches);
            toggleTheme.textContent = e.matches ? 'Light Mode' : 'Dark Mode';
        }
    });
});
