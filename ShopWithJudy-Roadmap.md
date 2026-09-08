# ShopWithJudy — E-commerce Portfolio Project Roadmap

Built from scratch, applying concepts from the 30-Day Problem-Solving Curriculum.

---

## ✅ Completed

- [x] Product data modeling (`products` array — id, name, price, category, image)
- [x] `categoryContainers` lookup object (maps category name → DOM element)
- [x] Rendering products into category-specific containers (currently done per-category — candidate for refactor using Day 9's group-by pattern)
- [x] Category nav converted from `<a>` tags to `<button data-section="">` (fixed anchor-tag/JS conflict bug)
- [x] Click listener to show/hide category sections (Dashboard sidebar pattern reused)
- [x] "Active" state styling on nav buttons
- [x] Responsive image sizing (`object-fit: cover`, fixed height)
- [x] Responsive grid (`repeat(auto-fit, minmax(150px, 200px))`)
- [x] Fixed `[hidden]` CSS specificity bug (was being overridden by `display: grid`)
- [x] Decided cart = sidebar (not separate page) — UX reasoning done
- [x] Decided product click = modal (not separate page) — UX reasoning done
- [x] Decided LRU trigger point = on image click (opening modal counts as "viewed")

---

## ⏳ In Progress / Next Up

- [x] Refactor 8 duplicate category-rendering blocks into one loop (Day 9 pattern) done
- [x] Build product detail Modal (image, name, price, Add to Cart button, close button)
- [x] Make product images clickable → opens modal with that product's data
- [x] Wire up `LRUCache` class — `put(product.id, product)` on image click
- [x] Render "Recently Viewed" strip from current LRU cache contents
- [x] Build Cart sidebar structure (hidden by default)
- [x] "Your Cart" button → toggles cart sidebar (button, not `<a>`)
- [x] "Add to Cart" logic — from product cards AND from modal
- [x] Cart sidebar rendering — list items, quantity, running total
- [x] Search bar functionality (filter products by name)
- [x] Cart item remove/quantity update

---

## 🧠 Concepts Applied From The Curriculum

- Day 6 (Sets/dedup thinking) → LRU Cache design
- Day 9 (Group By Category) → candidate refactor for product rendering
- Day 13 (Map) → LRUCache's internal Map
- Day 22 (Stack) → reused Stack class in earlier Undo/Redo build
- Day 27 (LRU Cache) → powering "Recently Viewed"
- Dashboard sidebar pattern → category nav AND planned cart sidebar

---

*Every unchecked item follows the same process as everything above it: define input/output, plan in plain English, THEN code.*
 