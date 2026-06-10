// js/footer.js
document.addEventListener('DOMContentLoaded', () => {
  const footerHTML = `
  <footer class="site-footer" role="contentinfo">
    <div class="footer-grid">
      <div class="footer-col">
        <h3>Talk to Us</h3>
        <p>We are always here for you.</p>
        <p>WhatsApp: +1 (555) 123 4567</p>
        <p>Email: support@atelier.example.com</p>
        <div class="footer-brand">ATELIER</div>
        <div class="footer-socials">
          <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.92c-.74.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27 8.2 8.2 0 0 1-2.6 1 4.1 4.1 0 0 0-7 3.74A11.65 11.65 0 0 1 3.4 4.79a4.1 4.1 0 0 0 1.27 5.47 4.07 4.07 0 0 1-1.86-.51v.05a4.1 4.1 0 0 0 3.29 4.02 4.1 4.1 0 0 1-1.85.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 2 18.41a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.25 11.68-11.67 0-.18 0-.35-.01-.53A8.35 8.35 0 0 0 22 5.92z" /></svg></a>
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12z" /></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.72 3.72 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.88 5.88 0 0 0 1.38 2.13 5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0z" /><path d="M12 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM18.41 4.16a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" /></svg></a>
        </div>
      </div>
      <nav class="footer-col" aria-label="Business">
        <h3>Business</h3>
        <ul>
          <li><a href="sell.html">Join as an Artist</a></li>
          <li><a href="#">For Architects &amp; Designers</a></li>
          <li><a href="#">Enquiries</a></li>
          <li><a href="#">Bulk Orders</a></li>
          <li><a href="signin.html">My Account Login</a></li>
        </ul>
      </nav>
      <nav class="footer-col" aria-label="Information">
        <h3>Information</h3>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="#">Art Buying Guide</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">FAQs</a></li>
        </ul>
      </nav>
      <div class="footer-col">
        <h3>Newsletter</h3>
        <p>Sign up for exclusive offers, original stories, events and more.</p>
        <form class="newsletter-form" aria-label="Newsletter signup">
          <input type="email" placeholder="Enter email" required aria-label="Email address">
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Atelier. All rights reserved.</span>
      <ul class="footer-links">
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Track my order</a></li>
        <li><a href="#">Refund Policy</a></li>
        <li><a href="#">Shipping Policy</a></li>
        <li><a href="#">Copyright</a></li>
        <li><a href="account.html" style="color: #666; font-weight: 500; text-decoration: none;">My Collections</a></li>
        <li><a href="admin.html" id="universal-admin-link" style="color: #666; font-weight: 500; text-decoration: none; transition: color 0.2s;">Admin Portal</a></li>
      </ul>
      <div class="payment-icons">
        <span>VISA</span>
        <span>MC</span>
        <span>AMEX</span>
        <span>PAYPAL</span>
        <span>GPAY</span>
      </div>
    </div>
  </footer>
  `;

  // Inject the structured footer template container safely before the body close tag
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Hook hover listener onto the new link layout
  const adminLink = document.getElementById('universal-admin-link');
  if (adminLink) {
    adminLink.addEventListener('mouseover', () => adminLink.style.color = '#1a1a1a');
    adminLink.addEventListener('mouseout', () => adminLink.style.color = '#666');
  }
});