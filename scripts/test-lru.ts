import { Cache } from "../src/lib/LRUCache";

function runTest() {
  console.log("=== LRU Cache Test ===");
  console.log("Initializing Cache(2)");
  const cache = new Cache<string, number>(2);

  console.log('cache.put("A", 10)');
  cache.put("A", 10);
  console.log("Cache state:", cache.getAllValues());

  console.log('cache.put("B", 20)');
  cache.put("B", 20);
  console.log("Cache state:", cache.getAllValues());

  const getA = cache.get("A");
  console.log('cache.get("A") ->', getA);
  console.log("Cache state (A is most recently used):", cache.getAllValues());

  console.log('cache.put("C", 30) (This should evict "B")');
  cache.put("C", 30);
  console.log("Cache state:", cache.getAllValues());

  const getB = cache.get("B");
  console.log('cache.get("B") ->', getB);

  const getC = cache.get("C");
  console.log('cache.get("C") ->', getC);

  const getA2 = cache.get("A");
  console.log('cache.get("A") ->', getA2);

  console.log("\n=== Test Complete ===");
}

runTest();
