const headerTemplate = `
  <style>
    /* Header Layout */
    .header-top { display: flex; justify-content: space-between; align-items: center; padding: 25px 40px; }
    
    /* Track Order Button */
    .track-order-btn { 
      background: #4a4a4a; 
      color: #fff; 
      padding: 10px 20px; 
      border-radius: 25px; 
      font-family: 'Albert Sans', sans-serif; 
      font-weight: 700; 
      font-size: 11px; 
      text-transform: uppercase; 
      letter-spacing: 1px; 
      text-decoration: none; 
      transition: background 0.2s, transform 0.2s; 
      display: inline-block;
    }
    .track-order-btn:hover { background: #1a1a1a; transform: translateY(-1px); }

    /* Right Side Icons */
    .header-actions-new { display: flex; align-items: center; gap: 28px; }
    
    .icon-item { 
      position: relative; 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      color: #1a1a1a; 
      text-decoration: none; 
      cursor: pointer; 
    }
    
    .icon-item svg { 
      width: 24px; 
      height: 24px; 
      stroke: currentColor; 
      stroke-width: 1.5; 
      fill: none; 
      transition: transform 0.2s ease; 
    }
    
    .icon-item:hover svg { transform: translateY(-2px); }
    
    /* Hover Labels */
    .icon-label { 
      position: absolute; 
      top: 32px; 
      font-family: 'Albert Sans', sans-serif; 
      font-size: 10px; 
      text-transform: uppercase; 
      font-weight: 600; 
      letter-spacing: 0.5px; 
      opacity: 0; 
      transition: opacity 0.2s ease, transform 0.2s ease; 
      transform: translateY(-4px); 
      pointer-events: none; 
      color: #666; 
      white-space: nowrap;
    }
    
    .icon-item:hover .icon-label { opacity: 1; transform: translateY(0); }
    
    /* Notification Badges */
    .icon-item .badge { 
      position: absolute; 
      top: -6px; 
      right: -8px; 
      background: #000; 
      color: #fff; 
      font-family: 'Albert Sans', sans-serif;
      font-size: 10px; 
      font-weight: 700; 
      width: 18px; 
      height: 18px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      border: 2px solid #fff; 
    }

    /* Expanding Search Bar */
    .search-wrapper { display: flex; align-items: center; position: relative; }
    .search-input { 
      width: 0; 
      opacity: 0; 
      border: none; 
      border-bottom: 1px solid #1a1a1a; 
      background: transparent; 
      outline: none; 
      font-family: inherit; 
      font-size: 14px; 
      transition: width 0.3s ease, opacity 0.3s ease; 
      padding: 0; 
    }
    .search-wrapper:hover .search-input, .search-input:focus { 
      width: 160px; 
      opacity: 1; 
      padding: 4px 8px; 
      margin-right: 12px; 
    }
  </style>

  <div class="announcement">Free Shipping Worldwide on Orders Above $200</div>
  
  <header class="site-header">
    <div class="header-top">

      <div style="flex: 1;">
        <a href="account.html" class="track-order-btn">Track Order</a>
      </div>

      <div style="flex: 1; text-align: center;">
        <a href="index.html" class="brand" style="font-size: 28px; font-family: 'Fraunces', serif; text-decoration: none; color: #1a1a1a; letter-spacing: 2px;">ATELIER</a>
      </div>

      <div class="header-actions-new" style="flex: 1; justify-content: flex-end;">

        <form class="search-wrapper" action="shop.html" method="GET">
          <input type="text" id="header-search" name="q" class="search-input" autocomplete="off" placeholder="Search art...">
          
          <div class="icon-item" id="search-trigger-icon">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <span class="icon-label">Search</span>
          </div>
          <div id="search-suggestions" class="suggestions-dropdown" style="position:absolute; top:40px; right:0; background:#fff; border:1px solid #eee; width:220px; display:none; z-index:100; text-align:left;"></div>
        </form>

        <a href="signin.html" class="icon-item" id="nav-account-link">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="icon-label" id="nav-account-label">Account</span>
        </a>

        <a href="wishlist.html" class="icon-item">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <span class="badge wishlist-count" style="display:none">0</span>
          <span class="icon-label">Wishlist</span>
        </a>

        <a href="cart.html" class="icon-item">
          <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span class="badge cart-count" style="display:none">0</span>
          <span class="icon-label">Cart</span>
        </a>

      </div>
    </div>
    
    <nav class="main-nav">
      <ul class="nav-list" style="display: flex; justify-content: center; gap: 40px;">
        <li><a href="account.html">My Orders</a></li>
        <li><a href="shop.html">Categories</a></li>
        <li><a href="sell.html">Sell Your Art</a></li>
      </ul>
    </nav>
  </header>
`;

function injectHeader() {
  document.body.insertAdjacentHTML('afterbegin', headerTemplate);

  const searchIcon = document.getElementById('search-trigger-icon');
  const searchInput = document.getElementById('header-search');
  
  if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', (e) => {
      e.preventDefault();
      searchInput.focus();
    });
  }

  // 🛡️ Icon Protection Script
  setTimeout(() => {
    const userEmail = localStorage.getItem('userEmail');
    const accountLink = document.getElementById('nav-account-link');
    
    if (userEmail && accountLink) {
      accountLink.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span class="icon-label">Sign Out</span>
      `;
    }
  }, 50);
}

injectHeader();

if (typeof updateBadges === 'function') {
  updateBadges();
}