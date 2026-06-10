import re

files_to_update = ['index.html', 'shop.html']

status_indicator_html = '''            <!-- Status Indicators (Always Visible) -->
            <div class="product-status">
              <button class="status-indicator cart-status" type="button" aria-label="Add to cart status" title="Add to cart">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </button>
              <button class="status-indicator wish-status" type="button" aria-label="Wishlist status" title="Add to wishlist">
                <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>
            '''

script_tag = '''  <script src="js/cart-indicators.js"></script>'''

for filename in files_to_update:
    with open(filename, 'r') as f:
        content = f.read()
    
    # Add status indicators after each product-image
    content = re.sub(
        r'(<img[^>]*loading="lazy">)\n(\s*)<div class="product-actions">',
        r'\1\n' + status_indicator_html + r'\2<div class="product-actions">',
        content
    )
    
    # Add script before closing body tag
    if '<script src="js/cart-indicators.js"></script>' not in content:
        content = content.replace('</body>', script_tag + '\n  <script src="js/script.js"></script>\n</body>')
    
    with open(filename, 'w') as f:
        f.write(content)
    
    print(f"✅ Updated {filename}")

