---
date: 2024-07-17
title: "Math Functions"
categories: ["math"]
---

- toc
{:toc}

## Detect if point is in circle

To detect if a point (x,y) is inside a circle, you need to use the equation of the circle. The equation for a circle with center (h,k) and radius r is:

(x−h)^2^ + (y−k)^2^ ≤ r^2^;

 ```js
function isPointInCircle(x, y, h, k, r) {
    // Calculate the difference between the point and the center of the circle
    const dx = x - h;
    const dy = y - k;

    // Calculate the distance squared
    const distanceSquared = dx * dx + dy * dy;

    // Compare the distance squared with the radius squared
    return distanceSquared <= r * r;
}

// Example usage:
const pointX = 5;
const pointY = 7;
const circleCenterX = 3;
const circleCenterY = 4;
const radius = 5;

if (isPointInCircle(pointX, pointY, circleCenterX, circleCenterY, radius)) {
    console.log('The point is inside the circle.');
} else {
    console.log('The point is outside the circle.');
}

 ```
