import Ships from "../factory/Ships";

// Test if the ship factory function is valid before implementing into React Native

// Check ship name exists
test("Ship name", () => {
  expect(Ships("cruiser").getName()).toBe("cruiser");
  expect(Ships("submarine").getName()).toBe("submarine");
});

// Check it ship has the assigned length
test("Ship length", () => {
  expect(Ships("cruiser").getLength()).toBe(3);
});

// Test if ship can be hit
test("Ship hit", () => {
  expect(Ships("cruiser").hit(1)).toBe(null);
});

// Test if ship will show it's been hit if value is true
test("Show if ship has been hit", () => {
  const ship = Ships("cruiser");
  ship.hit(0);
  ship.hit(1);
  expect(ship.getPosition()).toEqual([true, true, null]);
});

// Test if ship can sink
test("Show if ship has been hit", () => {
  const ship = Ships("cruiser");
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
});
