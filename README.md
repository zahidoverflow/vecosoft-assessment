# Vecosoft Assessment

This repository contains the completed tasks for the Vecosoft Frontend Developer Practical Assessment.

## Task 1: Order Tracking Screen
A modern, professional mobile Order Tracking screen implemented in React (Next.js App Router) with Tailwind CSS. It supports all three required states: Delayed Order, Delivered but Not Received, and Tracking Not Available Yet.

### How to Run
1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) in your browser.
4. Use the "Testing Controls" buttons at the top of the page to switch between the different order states.

## Task 2 & 3: LRU Cache Implementation & Explanation

The LRU Cache is implemented in `src/lib/LRUCache.ts`. A test script is provided in `scripts/test-lru.ts`.

### How to Run the LRU Cache Test
Run the test script using `tsx`:
```bash
npx tsx scripts/test-lru.ts
```

### 1. Data Structures Used
I used a combination of a **Hash Map (`Map` in TypeScript)** and a **Doubly Linked List**.
- **Hash Map**: Stores the keys and their corresponding linked list nodes. This allows $O(1)$ time complexity for lookups.
- **Doubly Linked List**: Keeps track of the most and least recently used items. The head represents the most recently used (MRU) item, while the tail represents the least recently used (LRU) item. A doubly linked list is necessary because we need to move a node from the middle of the list to the head in $O(1)$ time, which requires updating pointers of both the previous and next nodes.

### 2. Time and Space Complexity
- **Time Complexity**: $O(1)$ on average for both `get` and `put` operations. Map lookups are $O(1)$, and adding/removing nodes in a doubly linked list is $O(1)$ since we have direct references to the nodes.
- **Space Complexity**: $O(C)$ where $C$ is the capacity of the cache. The hash map and the doubly linked list both store at most $C$ elements.

### 3. Realistic Limitation / Poor Performance Pattern
This implementation could perform poorly or face limitations in a highly concurrent, multi-threaded environment (though less relevant in single-threaded Node.js without workers). A more realistic limitation is memory overhead: every entry requires an object (node) with pointers (`prev`, `next`), which consumes more memory per item than a simple array or hash map. If the cached items are very small (e.g., boolean flags) and the capacity is extremely large, the overhead of the node wrappers could dominate memory usage and trigger frequent garbage collection pauses.

### 4. AI Assistance Note
AI assisted in scaffolding the initial structure of this repository and providing boilerplate for the UI. No AI suggestions were rejected as the code was developed modularly, though specific adjustments to Tailwind classes were manually curated for exact alignment with standard ecommerce patterns. (As requested, the full prompt history is included in `AI_PROMPT_HISTORY.txt`).

## Task 4: Figma / UI Design (Optional)
The optional Figma design step was skipped in favor of a direct, pixel-perfect code implementation provided in Task 1. The interactive live UI serves as the prototype.
