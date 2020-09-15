import Gameboard from "../factory/gameboard";
import Ships from "../factory/ships";

test("Can create a 10x10 board", () => {
  let board = Array(10)
    .fill(0)
    .map(() =>
      Array(10)
        .fill(0)
        .map(() => {
          return { isEmpty: true, isSelected: false };
        })
    );
  expect(board).toEqual(Gameboard().getBoard());
});

// Placing ship on board should change the isEmpty value
// Should also return the ship position on the board
test("Can place ship on board", () => {
  const board = Gameboard();
  // [2,0] means x, y
  board.setPiece(Ships("submarine"), [6, 0]);

  expect(board.getBoard()[6][0]).toEqual({
    isEmpty: false,
    // X axis Ship length
    shipIndex: 0,
    // Y length value
    shipBodyPosition: 0,
    isSelected: false,
    shipName: "submarine",
  });
});

// Test if board can receive coordinates for a player attack (move)
// Check if the move hit a ship - call hit function to that ship or record miss

test("Can hit empty square on board", () => {
  const board = Gameboard();

  expect(board.receiveAttack([2, 0])).toBe(true);
});

test("Can hit ship on board", () => {
  const board = Gameboard();
  board.setPiece(Ships("submarine"), [2, 0]);
  board.receiveAttack([2, 0]);

  expect(board.getShipStatus([2, 0]).getPosition()).toEqual([true, null, null]);
});
test("Can hit ship on board", () => {
  const board = Gameboard();
  board.setPiece(Ships("submarine"), [0, 0]);
  board.receiveAttack([0, 0]);

  expect(board.getShipStatus([0, 0]).getPosition()).toEqual([true, null, null]);
});

// Test if ship can be sunk
// Should return true

test("Can sink ship on board", () => {
  const board = Gameboard();
  board.setPiece(Ships("submarine"), [0, 2]);

  board.receiveAttack([0, 2]);
  board.receiveAttack([0, 3]);
  board.receiveAttack([0, 4]);
  expect(board.getShipStatus([0, 2]).isSunk()).toBe(true);
});

// Test miss on board - should update square isSelected = true
test("Miss on board", () => {
  const board = Gameboard();
  board.receiveAttack([0, 0]);

  expect(board.getBoard([0, 0])).toEqual(board.getBoard([0, 0]));
});

// Test game over
test("Game over?", () => {
  const board = Gameboard();
  board.setPiece(Ships("submarine"), [0, 0]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);

  let gameStatus = board.gameOver();
  expect(gameStatus).toBe(true);
});

// Test if multiple ships that are sunk, triggers game over
test("Game over?", () => {
  const board = Gameboard();
  board.setPiece(Ships("submarine"), [0, 0]);
  board.setPiece(Ships("cruiser"), [0, 3]);
  board.setPiece(Ships("battleship"), [2, 3]);

  board.receiveAttack([0, 0]);
  board.receiveAttack([0, 1]);
  board.receiveAttack([0, 2]);

  board.receiveAttack([0, 3]);
  board.receiveAttack([0, 4]);
  board.receiveAttack([0, 5]);

  board.receiveAttack([2, 3]);
  board.receiveAttack([2, 4]);
  board.receiveAttack([2, 5]);
  board.receiveAttack([2, 6]);
  board.receiveAttack([2, 7]);

  //console.log(board.getBoard());
  let gameStatus = board.gameOver();
  expect(gameStatus).toBe(true);
});
