// ============================================================
//  ATELIER — Master Script (Production Ready Architecture)
// ============================================================

// ── GLOBAL STATE ──
const cartItems = new Map();
const wishlistItems = new Map();

// 👉 PREMIUM UX: GLOBAL TOAST NOTIFICATIONS
window.showToast = function (message, isError = false) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${isError ? 'error' : ''}`;
  toast.innerText = message;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
};

document.addEventListener('DOMContentLoaded', async () => {

  const userEmail = localStorage.getItem('userEmail');
  const userToken = localStorage.getItem('atelierToken');

  if (userEmail) {
    document.querySelectorAll('a[href*="signin.html"]').forEach(link => {
      link.innerHTML = '<span>Sign Out</span>';
      link.href = '#';
      link.style.color = '#ef4444';
      link.onclick = (e) => {
        e.preventDefault();
        localStorage.removeItem('userEmail');
        localStorage.removeItem('atelierToken');
        localStorage.removeItem('atelierUser');
        localStorage.removeItem('cart');
        localStorage.removeItem('wishlist');
        window.showToast("Signed out securely.");
        setTimeout(() => window.location.reload(), 1000);
      };
    });
  }

  // ── DYNAMIC FETCH ───────────────────────────────
  async function fetchProducts() {
    const shopGrid = document.getElementById('dynamic-product-grid');
    const homeGrid = document.getElementById('featured-products');

    try {
      const response = await fetch('https://atelier-api-x7yz.onrender.com/products');
      let data = await response.json();
      data.reverse();

      window.PRODUCT_DATA = {};
      data.forEach(item => {
        window.PRODUCT_DATA[item.name] = { id: item._id, name: item.name, image: item.image, price: item.price, category: item.category };
      });

      initSearchAutocomplete();

      if (shopGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('q');
        let shopItems = Object.values(window.PRODUCT_DATA);

        if (searchQuery) {
          const lowerQ = searchQuery.toLowerCase();
          shopItems = shopItems.filter(item => item.name.toLowerCase().includes(lowerQ) || (item.category || '').toLowerCase().includes(lowerQ));
          const title = document.querySelector('.page-header h1');
          const count = document.querySelector('.filter-bar span strong');
          if (title) title.textContent = `Search results for "${searchQuery}"`;
          if (count) count.textContent = `${shopItems.length} products found`;
        }
        renderGrid(shopGrid, shopItems);
      }

      if (homeGrid) renderGrid(homeGrid, Object.values(window.PRODUCT_DATA).slice(0, 4));
      refreshAllIndicators();
    } catch (error) { console.warn("Backend offline."); }
  }

  function renderGrid(container, items) {
    if (items.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;"><p>No artworks found.</p></div>`;
      return;
    }
    container.innerHTML = items.map(info => `
      <article class="product-card" data-name="${info.name}">
        <div class="product-image-container">
          <a href="product.html?id=${info.id}" class="product-link">
            <div class="product-image"><img src="${info.image}" alt="${info.name}" loading="lazy"></div>
          </a>
          <div class="product-status">
            <button class="status-indicator cart-status" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></button>
            <button class="status-indicator wish-status" type="button"><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name"><a href="product.html?id=${info.id}">${info.name}</a></h3>
          <p class="product-category">${info.category || 'Original Art'}</p>
          <div class="product-price"><span>From $${info.price.toFixed(2)}</span></div>
        </div>
      </article>
    `).join('');
    bindStatusIndicators();
  }

  // ── SEARCH AUTOCOMPLETE ──────────────────────────────
  function initSearchAutocomplete() {
    const searchInput = document.getElementById('header-search');
    const suggestionsBox = document.getElementById('search-suggestions');
    if (!searchInput || !suggestionsBox) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (query.length < 2) { suggestionsBox.style.display = 'none'; return; }
      const matches = Object.values(window.PRODUCT_DATA || {}).filter(item => item.name.toLowerCase().includes(query) || (item.category || '').toLowerCase().includes(query)).slice(0, 6);
      if (matches.length > 0) {
        suggestionsBox.innerHTML = matches.map(item => `
          <div class="suggestion-item" onclick="window.location.href='product.html?id=${item.id}'">
            <img src="${item.image}" alt="${item.name}">
            <div class="suggestion-text">
              <div style="font-weight: 500;">${item.name}</div>
              <div style="font-size: 11px; color: #888;">${item.category || 'Original Art'}</div>
            </div>
          </div>
        `).join('');
        suggestionsBox.style.display = 'block';
      } else { suggestionsBox.style.display = 'none'; }
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) suggestionsBox.style.display = 'none';
    });
  }

  // ── CLOUD SYNC & BADGES ───────────────────────────────
  async function save() {
    localStorage.setItem('cart', JSON.stringify([...cartItems.entries()]));
    localStorage.setItem('wishlist', JSON.stringify([...wishlistItems.entries()]));
    if (!userEmail) return;
    try {
      await fetch('https://atelier-api-x7yz.onrender.com/user/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
        body: JSON.stringify({ email: userEmail, cart: [...cartItems.values()], wishlist: [...wishlistItems.values()] })
      });
    } catch (e) { console.error("Cloud sync failed", e); }
  }

  async function load() {
    if (userEmail) {
      try {
        const res = await fetch('https://atelier-api-x7yz.onrender.com/user/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
          body: JSON.stringify({ email: userEmail })
        });
        const data = await res.json();
        if (data.cart) data.cart.forEach(item => cartItems.set(item.name, item));
        if (data.wishlist) data.wishlist.forEach(item => wishlistItems.set(item.name, item));
        updateBadges(); refreshAllIndicators();
        return;
      } catch (e) { console.error("Cloud load failed", e); }
    }
    try {
      const c = localStorage.getItem('cart');
      if (c) JSON.parse(c).forEach(([k, v]) => cartItems.set(k, v));
      const w = localStorage.getItem('wishlist');
      if (w) JSON.parse(w).forEach(([k, v]) => wishlistItems.set(k, v));
    } catch (e) { }
  }

  function updateBadges() {
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = cartItems.size; el.style.display = cartItems.size === 0 ? 'none' : 'inline-flex'; });
    document.querySelectorAll('.wishlist-count').forEach(el => { el.textContent = wishlistItems.size; el.style.display = wishlistItems.size === 0 ? 'none' : 'inline-flex'; });
  }

  // ── EVENT BINDING ─────────────────────────────────────
  function refreshAllIndicators() {
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.getAttribute('data-name');
      const cartBtn = card.querySelector('.cart-status');
      const wishBtn = card.querySelector('.wish-status');

      if (cartBtn) {
        if (cartItems.has(name)) {
          cartBtn.classList.add('active'); cartBtn.style.background = '#10b981'; cartBtn.style.borderColor = '#10b981'; cartBtn.querySelector('svg').style.stroke = 'white';
        } else {
          cartBtn.classList.remove('active'); cartBtn.style.background = ''; cartBtn.style.borderColor = ''; cartBtn.querySelector('svg').style.stroke = '';
        }
      }

      if (wishBtn) {
        if (wishlistItems.has(name)) {
          wishBtn.classList.add('active'); wishBtn.style.background = '#ef4444'; wishBtn.style.borderColor = '#ef4444'; wishBtn.querySelector('svg').style.fill = 'white'; wishBtn.querySelector('svg').style.stroke = '#ef4444';
        } else {
          wishBtn.classList.remove('active'); wishBtn.style.background = ''; wishBtn.style.borderColor = ''; wishBtn.querySelector('svg').style.fill = ''; wishBtn.querySelector('svg').style.stroke = '';
        }
      }
    });
  }

  function bindStatusIndicators() {
    document.querySelectorAll('.product-card').forEach(card => {
      const name = card.getAttribute('data-name');
      const info = window.PRODUCT_DATA[name];
      const cartBtn = card.querySelector('.cart-status');
      const wishBtn = card.querySelector('.wish-status');

      if (cartBtn) {
        cartBtn.onclick = (e) => {
          e.preventDefault(); e.stopPropagation();
          if (cartItems.has(name)) { cartItems.delete(name); window.showToast(`Removed from cart`); } else { cartItems.set(name, info); window.showToast(`Added to cart`); }
          save(); updateBadges(); refreshAllIndicators();
        };
      }

      if (wishBtn) {
        wishBtn.onclick = (e) => {
          e.preventDefault(); e.stopPropagation();
          if (wishlistItems.has(name)) { wishlistItems.delete(name); window.showToast(`Removed from wishlist`); } else { wishlistItems.set(name, info); window.showToast(`Saved to wishlist`); }
          save(); updateBadges(); refreshAllIndicators();
        };
      }
    });
  }

  // ── CART & WISHLIST RENDER LOGIC ──────────────────────────────
  function renderCartPage() {
    const cartContainer = document.getElementById('dynamic-cart-items');
    if (!cartContainer) return;

    // 1. EMPTY CART STATE
    if (cartItems.size === 0) {
      cartContainer.innerHTML = `
        <div style="text-align: center; padding: 60px 20px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" width="64" height="64" style="margin-bottom: 20px;">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h2 style="font-family: 'Fraunces', serif; font-size: 28px; margin-bottom: 10px;">Your cart is empty</h2>
          <p style="color: #666; margin-bottom: 25px;">Add some beautiful artwork to get started</p>
          <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
            <a href="shop.html" class="btn btn-dark" style="padding: 12px 30px;">Continue Shopping</a>
            <a href="account.html" class="btn" style="padding: 12px 30px; background: transparent; border: 1px solid #1a1a1a; color: #1a1a1a; font-family: 'Albert Sans', sans-serif; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; font-weight: 600; text-decoration: none;">Show My Orders</a>
          </div>
        </div>`;
      return;
    }

    // 2. FULL CART STATE
    let html = '<div class="item-list">';
    let total = 0;
    cartItems.forEach((info, name) => {
      total += info.price;
      const img = info.image || '';
      html += `
        <div class="item-row" data-name="${name}">
          <div class="item-thumb">
            ${img ? `<img src="${img}" alt="${name}">` : ''}
          </div>
          <div class="item-info">
            <div class="item-name">${info.name}</div>
            <div style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">${info.category || 'Original Art'}</div>
            <div class="item-price">$${info.price.toFixed(2)}</div>
            <button class="remove-cart-item" data-name="${name}" style="background: none; border: none; color: #ef4444; cursor: pointer; text-decoration: underline; font-size: 13px; padding: 0;">Remove</button>
          </div>
        </div>`;
    });
    html += '</div>';

    html += `
      <div class="cart-summary">
        <div class="summary-row"><span>Subtotal</span><span>$${total.toFixed(2)}</span></div>
        <div class="summary-row"><span>Shipping</span><span class="free-tag">FREE</span></div>
        <div class="summary-row total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
      </div>
      <div class="cart-cta">
        <a href="shop.html" class="btn" style="background: transparent; border: 1px solid #1a1a1a; color: #1a1a1a; text-align: center; flex: 1;">Continue Shopping</a>
        <button class="btn btn-dark" id="checkout-btn" style="flex: 1;">Checkout Securely</button>
      </div>`;

    cartContainer.innerHTML = html;

    // Attach Remove Listeners
    cartContainer.querySelectorAll('.remove-cart-item').forEach(btn => {
      btn.onclick = (e) => {
        const itemName = e.target.getAttribute('data-name');
        cartItems.delete(itemName);
        window.showToast(`Removed ${itemName} from cart`);
        save(); updateBadges(); renderCartPage(); 
      };
    });

    // Re-bind Checkout Action!
    initCheckout();
  }

  function renderWishlistPage() {
    const wishlistGrid = document.getElementById('dynamic-wishlist-grid');
    if (!wishlistGrid) return;
    if (wishlistItems.size === 0) {
      wishlistGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 100px 0;"><p style="font-size: 18px; color: #666;">Your wishlist is currently empty.</p><a href="shop.html" class="btn btn-dark" style="margin-top: 20px; display: inline-block;">Discover Art</a></div>`;
      return;
    }
    wishlistGrid.innerHTML = [...wishlistItems.values()].map(info => `
      <article class="product-card" data-name="${info.name}">
        <div class="product-image-container">
          <a href="product.html?id=${info.id}" class="product-link"><div class="product-image"><img src="${info.image}" alt="${info.name}" loading="lazy"></div></a>
          <div class="product-status">
            <button class="status-indicator cart-status" type="button" title="Move to cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg></button>
            <button class="status-indicator wish-status active" type="button" style="background: #ef4444; border-color: #ef4444;" title="Remove from wishlist"><svg viewBox="0 0 24 24" fill="white" stroke="#ef4444"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">${info.name}</h3>
          <div class="product-price"><span>$${info.price.toFixed(2)}</span></div>
          <button class="btn-move-to-cart" data-name="${info.name}" style="margin-top: 10px; font-size: 12px; background: none; border: 1px solid #1a1a1a; padding: 5px 10px; cursor: pointer;">Move to Cart</button>
        </div>
      </article>
    `).join('');
    bindStatusIndicators();
    wishlistGrid.querySelectorAll('.btn-move-to-cart').forEach(btn => {
      btn.onclick = (e) => {
        const name = e.target.getAttribute('data-name');
        const info = wishlistItems.get(name);
        cartItems.set(name, info); wishlistItems.delete(name);
        save(); updateBadges(); renderWishlistPage(); window.showToast(`${name} moved to cart!`);
      };
    });
  }

  // ── 6. CHECKOUT SIMULATION ───────────────────────────────
  function initCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (!checkoutBtn) return;

    checkoutBtn.onclick = async (e) => {
      e.preventDefault();
      if (cartItems.size === 0) { window.showToast("Your cart is empty!", true); return; }

      const originalText = checkoutBtn.innerText;
      checkoutBtn.innerText = "Processing Payment...";
      checkoutBtn.style.opacity = "0.7";
      checkoutBtn.style.pointerEvents = "none";

      try {
        let total = 0;
        cartItems.forEach(info => total += info.price);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch('https://atelier-api-x7yz.onrender.com/user/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userToken}` },
          body: JSON.stringify({ email: userEmail, total: total })
        });

        if (!response.ok) throw new Error("Payment rejected");
        const data = await response.json();

        cartItems.clear();
        save();
        updateBadges();

        const cartContainer = document.getElementById('dynamic-cart-items');
        if (cartContainer) {
          cartContainer.innerHTML = `
            <div style="text-align: center; padding: 80px 20px; background: #fafafa; border-radius: 8px;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" width="64" height="64" style="display: block; margin: 0 auto 20px auto;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h2 style="font-family: 'Fraunces', serif; font-size: 32px; color: #1a1a1a; margin-bottom: 10px;">Payment Successful</h2>
              <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Thank you for your purchase. Your order <strong>#${data.orderId}</strong> is being prepared by our artisans.</p>
              <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                <a href="shop.html" class="btn btn-dark" style="padding: 12px 30px;">Continue Shopping</a>
                <a href="account.html" class="btn" style="padding: 12px 30px; background: transparent; border: 1px solid #1a1a1a; color: #1a1a1a; font-family: 'Albert Sans', sans-serif; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; font-weight: 600; text-decoration: none;">Show My Orders</a>
              </div>
            </div>`;
        }
        window.showToast("Order Confirmed!");
      } catch (error) {
        window.showToast("Transaction failed. Try again.", true);
        checkoutBtn.innerText = originalText;
        checkoutBtn.style.opacity = "1";
        checkoutBtn.style.pointerEvents = "auto";
      }
    };
  }

  // ── INIT ─────────────────────────────────────────────────
  await load();
  updateBadges();
  await fetchProducts();

  renderCartPage();
  renderWishlistPage();
});