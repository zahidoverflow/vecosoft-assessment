<div align="center">

# 🛍️ Vecosoft Frontend Assessment

**Frontend Developer Practical Assessment — Zahidul Islam**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Site-0070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://vecosoft-assessment-tan.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zahidoverflow/vecosoft-assessment)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

</div>

---

## 📋 Tasks Overview

| # | Task | Status | Score Weight |
|---|------|--------|-------------|
| 1 | Order Tracking Screen | ✅ Complete | 40 pts |
| 2 | LRU Cache Implementation | ✅ Complete | 30 pts |
| 3 | Algorithm Explanation & Critical Thinking | ✅ Complete | 15 pts |
| 4 | Figma / UI Design | _(Optional — code prototype used)_ | 10 pts |

---

## Task 1 — Order Tracking Screen

> A responsive, mobile-first Order Tracking UI (360–430px target width) built with Next.js App Router and Tailwind CSS.

**All 3 required states are implemented:**

| State | Description |
|-------|-------------|
| 🟡 **Delayed Order** | Displays amber alert with revised delivery date |
| 🔴 **Delivered but Not Received** | Prompts user to report missing package |
| 🔵 **Tracking Not Available Yet** | Shows informational placeholder without empty screen |

An evaluator switcher is rendered at the top of the live demo page to toggle between states instantly.

### Run Locally

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Task 2 — LRU Cache Implementation

> Implemented in [`src/lib/LRUCache.ts`](./src/lib/LRUCache.ts) — `O(1)` `get` and `put` using a Hash Map + Doubly Linked List.

```
cache = Cache(2)
cache.put("A", 10)
cache.put("B", 20)
cache.get("A")        → 10
cache.put("C", 30)    ← evicts "B" (LRU)
cache.get("B")        → -1
cache.get("C")        → 30
cache.get("A")        → 10
```

### Run the Test Script

```bash
npx tsx scripts/test-lru.ts
```

The output matches the example exactly. Screenshot of real output is in [`lru_output.txt`](./lru_output.txt).

---

## Task 3 — Algorithm Explanation & Critical Thinking

### 1. Data Structures Used
A **Hash Map** (`Map<K, Node>`) combined with a **Doubly Linked List**.
- The Map provides O(1) key lookup directly to a node reference.
- The Doubly Linked List maintains LRU order — the head is the most recently used (MRU) and the tail is the least recently used (LRU). Double links are required to remove a middle node in O(1) without traversal.

### 2. Time & Space Complexity
| Operation | Time | Space |
|-----------|------|-------|
| `get(key)` | O(1) | — |
| `put(key, value)` | O(1) | — |
| Total storage | — | O(capacity) |

### 3. Known Limitation
The biggest real-world limitation is **per-entry object overhead**. Every cached item is wrapped in a `Node` object with `prev` / `next` pointers. For very high-capacity caches storing tiny values (e.g., boolean flags), the node wrapper memory cost can dwarf the data cost and increase GC pressure. A slab or ring-buffer approach would reduce allocations in that scenario.

### 4. AI Usage Note
AI was used to scaffold the Next.js boilerplate and structure the repo. The LRU implementation logic was written directly. The full prompt history is in [`AI_PROMPT_HISTORY.txt`](./AI_PROMPT_HISTORY.txt) as required.

---

## Task 4 — Figma / UI Design _(Optional)_

The interactive live code prototype at the demo link above serves as the UI design deliverable. All three states are fully rendered and interactive in the browser.

---

## Project Structure

```
vecosoft-assessment/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home — renders OrderTracking with state switcher
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   └── OrderTracking.tsx     # Task 1 — full UI component
│   └── lib/
│       └── LRUCache.ts           # Task 2 — O(1) LRU Cache
├── scripts/
│   └── test-lru.ts               # Task 2 — test/demo script
├── lru_output.txt                 # Task 2 — real terminal output
├── AI_PROMPT_HISTORY.txt          # Mandatory AI prompt log
└── README.md
```

---

<div align="center">
  <sub>Zahidul Islam · zahidoverflow@gmail.com · 2026</sub>
</div>
