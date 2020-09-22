import Board from "./gameboard";
import Ships from "./ships";

export default function Player(player) {
  // Destructure props from imported functions
  const {
    getBoard,
    setPiece,
    getPlacedShip,
    getShipStatus,
    receiveAttack,
    gameOver,
  } = Board();

  const user = player;

  // Send attack to player
  function fire(player, coord) {
    return player.receiveAttack(coord);
  }
  // Check if attack hits or misses
  function checkPlay() {
    let game = getBoard().map((row) =>
      row.map((col) => {
        if (col.isSelected && col.isEmpty) {
          return "O"; // miss
        } else if (col.isSelected && !col.isEmpty) {
          return "X"; // hit
        } else {
          return 0;
        }
      })
    );
    return game;
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
    setPiece,
    getPlacedShip,
    getShipStatus,
    receiveAttack,
    gameOver,
    fire,
    user,
    checkPlay,
    placeShips,
  };
}
