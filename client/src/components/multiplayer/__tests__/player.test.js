import Board from "../factory/gameboard";
import Ships from "../factory/ships";
import Player from "../factory/player";

test("Initiate players board", () => {
  const p1 = Player("p1");
  const board = Board().getBoard();

  expect(p1.getBoard()).toEqual(board);
});

// Placed ship for player equals the ship call method
test("Initiate two ships", () => {
  const ship1 = Ships("cruiser");
  const ship2 = Ships("submarine");

  const p1 = Player("p1");

  p1.setPiece(ship1, [0, 0]);
  p1.setPiece(ship2, [4, 0]);

  expect(p1.getPlacedShip()).toEqual([ship1, ship2]);
});

test("Hit opposing player", () => {
  const ship1 = Ships("cruiser");

  const p1 = Player("p1");
  const p2 = Player("p2");

  p1.setPiece(ship1, [0, 0]);

  p2.fire(p1, [0, 0]);

  expect(p1.getShipStatus([0, 0]).getPosition()).toEqual([true, null, null]);
});

// Check if game is over when ship is sunk
test("Game over", () => {
  const board = Board();
  const ship1 = Ships("cruiser");

  const p1 = Player("p1");
  const p2 = Player("p2");

  p1.setPiece(ship1, [0, 0]);

  p2.fire(p1, [0, 0]);
  p2.fire(p1, [0, 1]);
  p2.fire(p1, [0, 2]);

  expect(board.gameOver()).toBe(true);
});
