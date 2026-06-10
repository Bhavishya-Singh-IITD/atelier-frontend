document.addEventListener('DOMContentLoaded', async () => {
    // 1. Get the ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        window.location.href = 'shop.html'; 
        return;
    }

    try {
        console.log(`📡 Fetching data for Product ID: ${productId}`);
        
        // 2. Fetch the specific product
        const response = await fetch(`https://atelier-api-x7yz.onrender.com/products/${productId}`);
        
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const product = await response.json();
        console.log("✅ Product Data Received:", product);

        if (!product) {
            window.location.href = 'shop.html';
            return;
        }

        // 3. SAFELY INJECT DATA (Will not crash if HTML IDs are missing)
        const titleEl = document.getElementById('product-title');
        const priceEl = document.getElementById('product-price');
        const descEl = document.getElementById('product-description');
        const imgEl = document.getElementById('product-image');

        if (titleEl) {
            titleEl.innerText = product.name;
            document.title = `${product.name} | Atelier`;
        } else console.warn("⚠️ HTML Missing: id='product-title'");

        if (priceEl) {
            priceEl.innerText = `$${product.price.toFixed(2)}`;
        } else console.warn("⚠️ HTML Missing: id='product-price'");

        if (descEl) {
            descEl.innerText = product.description || "An original masterpiece from the Atelier collection.";
        } else console.warn("⚠️ HTML Missing: id='product-description'");

        if (imgEl) {
            // Check if Cloudinary upload failed and we only have a local path
            imgEl.src = product.image;
        } else console.warn("⚠️ HTML Missing: id='product-image'");

        // 4. SAFELY BIND BUTTONS
        const addBtn = document.querySelector('.btn-add-to-cart'); 
        const wishBtn = document.querySelector('.btn-wishlist');   

        if (addBtn) {
            addBtn.onclick = () => {
                const cartMap = new Map(JSON.parse(localStorage.getItem('cart') || '[]'));
                cartMap.set(product.name, { id: product._id, name: product.name, price: product.price, image: product.image });
                localStorage.setItem('cart', JSON.stringify([...cartMap.entries()]));
                if (window.showToast) window.showToast(`${product.name} added to cart!`);
            };
        } else console.warn("⚠️ HTML Missing: class='btn-add-to-cart'");

        if (wishBtn) {
            wishBtn.onclick = () => {
                const wishMap = new Map(JSON.parse(localStorage.getItem('wishlist') || '[]'));
                wishMap.set(product.name, { id: product._id, name: product.name, price: product.price, image: product.image });
                localStorage.setItem('wishlist', JSON.stringify([...wishMap.entries()]));
                if (window.showToast) window.showToast(`Saved to wishlist`);
            };
        } else console.warn("⚠️ HTML Missing: class='btn-wishlist'");
        
    } catch (error) {
        console.error("❌ Fatal Error loading product:", error);
    }
});