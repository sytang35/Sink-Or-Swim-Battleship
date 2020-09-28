module.exports = function Ship(ship) {
  // Ships object passed will have the 3 props
  const { name, position, length } = getShip(ship);

  const getName = () => name;
  const getPosition = () => position;
  const getLength = () => length;

  // Ship names from Battleship board game
  function getShip(shipName) {
    const ships = [
      {
        name: "carrier",
        length: 5,
      },
      {
        name: "battleship",
        length: 4,
      },
      {
        name: "cruiser",
        length: 3,
      },
      {
        name: "submarine",
        length: 3,
      },
      {
        name: "destroyer",
        length: 2,
      },
    ];
    const ship = ships.filter((ship) => {
      return ship.name === shipName;
    })[0];

    // Create body of ship and fill with null values
    ship.position = Array(ship.length).fill(null);
    return ship;
  }

  // Update position of ship with true when selected
  // And call isSunk function to check if ship is dead
  function hit(part) {
    position[part] = true;
    return isSunk();
  }

  function isSunk() {
    // check if all length of ship is true = sunk
    // reduce runs loop and checks both previous and current and returns one output
    // initial value should be true first to check if first value is null
    let sunk = position.reduce((prev, current) => {
      return prev && current;
    }, true);
    return sunk;
  }

  return {
    getShip,
    getName,
    getPosition,
    getLength,
    hit,
    isSunk,
  };
};
