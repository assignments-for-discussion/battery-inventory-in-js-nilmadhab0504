const assert = require('assert');

const RATED_CAPACITY_AH = 120;
const HEALTHY_THRESHOLD_PERCENT = 83;
const EXCHANGE_THRESHOLD_PERCENT = 63;

function countBatteriesByHealth(presentCapacities) {
  const counts = { 
     healthy: 0,
     exchange: 0,
    failed: 0
   };

  for (const presentCapacity of presentCapacities) {
    const sohPercent = (100 * presentCapacity) / RATED_CAPACITY_AH;

    if (sohPercent > HEALTHY_THRESHOLD_PERCENT) {
      counts.healthy += 1;
    } else if (sohPercent >= EXCHANGE_THRESHOLD_PERCENT) {
      counts.exchange += 1;
    } else {
      counts.failed += 1;
    }
  }

  return counts;
}

function testBucketingByHealth() {
  console.log('Counting batteries by SoH...');
  const presentCapacities = [113, 116, 80, 95, 92, 70];
  counts = countBatteriesByHealth(presentCapacities);
  assert(counts["healthy"] == 2);
  assert(counts["exchange"] == 3);
  assert(counts["failed"] == 1);

  // Boundary cases: 99.6: exchange, 100:healthy, 75:failed
  const boundaryCapacities = [99.6, 100, 75];
  const boundaryCounts = countBatteriesByHealth(boundaryCapacities);
  assert(boundaryCounts["healthy"] == 1);
  assert(boundaryCounts["exchange"] == 1);
  assert(boundaryCounts["failed"] == 1);
  
  console.log("Done counting :)");
}

testBucketingByHealth();
