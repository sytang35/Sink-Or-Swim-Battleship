const Ships = require("./ships");
module.exports = function Gameboard() {
  const getBoard = () => board;
  const getPlacedShip = () => placedShip;

  // Track ship set and use for tracking hits
  let placedShip = [];

  // Initiate 10x10 board
  let board = Array(10)
    .fill(0)
    .map(() =>
      Array(10)
        .fill(0)
        .map(() => {
          return { isEmpty: true, isSelected: false };
        })
    );

  // Place ship onto board coordinates
  function setPiece(Ships, coord) {
    const [row, col] = coord;

    // Make deep clone
    const newBoard = board.map((deep) => deep.slice());

    placedShip = [...placedShip, Ships];

    // Loop length of ship passed and apply index value to col (horizontal?)
    for (let i = 0; i < Ships.getLength(); i++) {
      newBoard[row][col + i] = {
        isEmpty: false,
        isSelected: false,
        shipName: Ships.getName(),
        shipIndex: placedShip.length - 1,
        shipBodyPosition: i,
      };
    }
    board = newBoard.map((deep) => deep.slice());
  }

  function getShipStatus(coord) {
    const [row, col] = coord;
    const square = board[row][col];

    let ship = placedShip[square.shipIndex];

    return ship;
  }

  function receiveAttack(coord) {
    const [row, col] = coord;

    const square = board[row][col];

    // Check if square was clicked
    square.isSelected ? false : true;
    if (!square.isEmpty) {
      let ship = placedShip[square.shipIndex];
      ship.hit(square.shipBodyPosition);

      // Call sunk function to check if ship is sunk
      ship.isSunk();

      // Update selected square on board to show it was selected
      square.isSelected = true;
    } else {
      square.isSelected = true;
    }
    return true;
  }

  function gameOver() {
    // If all ships that have been placed are sunk and game ends
    const checkShips = placedShip
      .map((ship) => ship.isSunk())
      .reduce((prev, curr) => {
        return prev && curr;
      }, true);
    return checkShips;
  }

  // Auto set ship placement
  function placeShips() {
    setPiece(Ships("carrier"), [0, 0]);
    setPiece(Ships("battleship"), [1, 1]);
    setPiece(Ships("cruiser"), [2, 2]);
    setPiece(Ships("submarine"), [3, 3]);
    setPiece(Ships("destroyer"), [4, 4]);
  }
  return {
    getBoard,
    getPlacedShip,
    getShipStatus,
    setPiece,
    receiveAttack,
    gameOver,
    placeShips,
  };
};
