document.addEventListener('DOMContentLoaded', function() {
    function createProductList() {
        const productList = document.getElementById('productList');
        for (const category in financialProducts) {
            const li = document.createElement('li');
            const categorySpan = document.createElement('span');
            categorySpan.className = 'category';
            categorySpan.textContent = category;
            categorySpan.onclick = () => showCategoryDetails(category);
            li.appendChild(categorySpan);
            const ul = document.createElement('ul');
            for (const product in financialProducts[category].products) {
                const productLi = document.createElement('li');
                productLi.className = 'product';
                productLi.textContent = product;
                productLi.onclick = () => showProductDetails(category, product);
                ul.appendChild(productLi);
            }
            li.appendChild(ul);
            productList.appendChild(li);
        }
    }

    function showCategoryDetails(category) {
        const contentArea = document.getElementById('contentArea');
        const categoryInfo = financialProducts[category];
        contentArea.innerHTML = `
            <h2>${category}</h2>
            <p>${categoryInfo.description.english}</p>
            <p class="chinese">${categoryInfo.description.chinese}</p>
            <h3>Products in this category:</h3>
            <ul>
                ${Object.keys(categoryInfo.products).map(product => `<li>${product}</li>`).join('')}
            </ul>
        `;
    }

    function showProductDetails(category, product) {
        const contentArea = document.getElementById('contentArea');
        const productInfo = financialProducts[category].products[product];
        contentArea.innerHTML = `
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
        `;
    }

    createProductList();
});
