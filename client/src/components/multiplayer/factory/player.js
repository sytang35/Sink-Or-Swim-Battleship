import Board from "./gameboard";
//import Ships from "./ships";

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
  };
}
