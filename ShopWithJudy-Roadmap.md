# ShopWithJudy — E-commerce Portfolio Project Roadmap

Built from scratch, applying concepts from the 30-Day Problem-Solving Curriculum.

---

## ✅ Completed

### Foundation
- [x] Product data modeling (`products` array — id, name, price, category, image)
- [x] `categoryContainers` lookup object (maps category name → DOM element)
- [x] Refactored 8 duplicate category-rendering blocks into one reusable `createCard()` function (Day 9 group-by pattern)
- [x] Category nav converted from `<a>` tags to `<button data-section="">` (fixed anchor-tag/JS conflict bug)
- [x] Click listener to show/hide category sections (Dashboard sidebar pattern reused)
- [x] Active nav button styling — remove-from-all-then-add-to-clicked border-bottom pattern
- [x] Responsive image sizing (`object-fit: cover`) and responsive grid (`repeat(auto-fit, minmax(...))`)
- [x] Fixed `[hidden]` CSS specificity bug (was being overridden by `display: grid`)
- [x] Refactored `products` data into separate `products.js` module (`export`/`import`, `type="module"`)

### Product Modal
- [x] Decided product click = modal, not separate page (UX reasoning: preserves browsing flow)
- [x] Built product detail Modal using native `<dialog>` (image, name, price, close button)
- [x] Made product cards clickable → opens modal with correct product data (event delegation, null-target crash bug fixed)
- [x] Fixed modal content stacking bug (clear before re-render)
- [x] Fixed dialog close button (`.close()` called on dialog, not the button)
- [x] Fixed "Add to Cart" not working from inside the modal — listener scope moved from `#items-con` to shared parent `.container`
- [x] Fixed dialog not reopening after closing via in-modal "Add to Cart" — native `<dialog>` needs `.close()`, not `hidden = true`

### Recently Viewed (LRU Cache)
- [x] Decided LRU trigger = on image click (viewing counts as "using")
- [x] Wired up `Cache` (LRU) class — `put()` on product click
- [x] Built separate `renderRecent()` — proper separation of data (Cache class) from rendering
- [x] Changed `Cache` to store full product objects (not just image URLs) so id/name/price are available later
- [x] Wired up "Recently Viewed" thumbnails — clicking reopens the product modal
- [x] Considered and consciously rejected localStorage/scroll-to-category (Pinterest-style) after weighing UX benefit vs. complexity

### Cart
- [x] Decided cart = sliding sidebar, not separate page (UX reasoning)
- [x] Built Cart sidebar (`<aside id="cart">`) with toggle open/close (`toggleAttribute("hidden")`)
- [x] Distinguished "Add to Cart" click vs "view product" click in the same delegated listener (`return` to stop fall-through)
- [x] Built `cartMap` (Map: product.id → {product, quantity}) for quantity-aware storage
- [x] `addToCart()` — checks existing entries, increments quantity instead of duplicating
- [x] `renderCart()` — clear-and-rebuild pattern from single source of truth
- [x] Caught and fixed dangerous mutation bug (was permanently overwriting original product price)
- [x] Line total calculated fresh at render time (`price × quantity`), never stored/mutated
- [x] Quantity +/- controls with `data-action` (separate from `data-id` to avoid attribute collision)
- [x] Auto-remove item from cart when quantity drops below 1
- [x] Running cart total — displayed in an element kept OUTSIDE the cleared container (survives re-renders)
- [x] Fixed cart heading being visually covered by fixed-position aside (moved heading inside aside, structured like `cartTotal`)
- [x] Cart persistence via `localStorage` — `JSON.stringify([...cartMap.entries()])` to save, `new Map(JSON.parse(...))` to rebuild (Map isn't natively JSON-serializable)
- [x] Fixed cart not displaying saved items on refresh until a new item was added — needed explicit `renderCart()` call after loading from localStorage
- [x] Cart item image resized to fixed thumbnail, horizontal flex layout instead of full-width stacked image

### Search
- [x] Live filtering (`input` event) across ALL products, dedicated `#search-results` grid section
- [x] Fixed copy-paste bug where search logic had landed inside the wrong (category nav) event listener
- [x] `lastActiveSection` tracking — correctly restores the previously active category when search is cleared

### Visual Design
- [x] Full visual design pass — fixed blurred-backdrop header, fixed bottom "recently viewed" bar, consistent shadow/radius design tokens, hover lift effects, circular recent-thumbnail treatment
- [x] Two responsive breakpoints (800px tablet / 520px mobile)
- [x] Custom `::selection` — navy background / cream text for contrast against multi-colored text sitewide

---

## 🧠 Concepts Applied From The Curriculum

- Day 6 (Sets/dedup thinking) → LRU Cache design
- Day 9 (Group By Category) → `createCard()` refactor, eliminating 8 duplicate blocks
- Day 13 (Map) → Cache's internal Map, `cartMap`
- Day 27 (LRU Cache) → powering "Recently Viewed"
- Dashboard sidebar pattern → category nav, active-state toggling, cart sidebar
- Undo/Redo project → informed the "clear-and-rebuild from single source of truth" pattern used in `renderCart()`/`renderRecent()`

---

*Every item above followed the same process: define input/output, plan in plain English, trace the bug by hand, THEN fix the code.*
