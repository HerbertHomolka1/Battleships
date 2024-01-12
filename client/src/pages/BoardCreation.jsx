import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
import Board from "../components/Board";
import shipClasses from "../ships/shipTypes";

function BoardCreation() {
  const initialShips = { destroyer: 2, boat: 4, battleship: 1 };
  const [shipToAssign, setShipToAssign] = useState("destroyer");
  const [shipCoords, setShipCoords] = useState([]);
  const [allShipCoords, setAllShipCoords] = useState([]);
  const [myShips, setMyShips] = useState([]);
  const initialColorMap = Array.from({ length: 12 }, () =>
    Array(12).fill("white")
  );
  const [colorMap, setColorMap] = useState(initialColorMap);

  const allShipsAssigned = (type) =>
    initialShips[type] === myShips.filter((ship) => ship.type === type).length;

  useEffect(() => {
    const remainingShips = Object.keys(initialShips).filter(
      (shipType) => !allShipsAssigned(shipType)
    );

    // If there are remaining ships, set shipToAssign to the first one in the list
    if (remainingShips.length > 0) {
      setShipToAssign(remainingShips[0]);
    } else {
      // If all ships are assigned, set shipToAssign to 'none'
      setShipToAssign("none");
    }
  }, [allShipCoords]);

  useEffect(() => {
    if (shipCoords.length === size[0] * size[1]) {
      // Update colorMap for each shipCoord
      shipCoords.forEach((coord) => {
        const { x, y } = coord;
        setColorMap((prevColorMap) => {
          const newColorMap = [...prevColorMap];
          newColorMap[x][y] = "blue";
          return newColorMap;
        });
      });

      // Create a new ship instance based on shipToAssign and add it to myShips
      const newShip = shipClasses[shipToAssign]();
      setMyShips((prevMyShips) => [...prevMyShips, newShip]);

      //add the coordinates of the current ship into the list of all coordinates taken by all ships
      setAllShipCoords((prev) => [...prev, ...shipCoords]);
      // Reset shipCoords
      setShipCoords([]);
    }
  }, [shipCoords]);

  const handleCellClick = (
    x,
    y,
    shipCoords,
    setShipCoords,
    setColorMap,
    allShipCoords,
    shipToAssign,
    size
  ) => {
    const alreadyClicked = shipCoords.some(
      (coord) => coord.x === x && coord.y === y
    );
    // The user can only click adjacent squares
    const isAdjacent =
      shipCoords.length === 0 ||
      shipCoords.some(
        (coord) => Math.abs(coord.x - x) + Math.abs(coord.y - y) < 2
      );
      // The user can only click squares that could form a ship. 
      // If a ship is 4x2 user cannot click 5 squares in a line.
    const correctDimmensions = (shipCoords, size, x, y) => {
      const sizeX =
        Math.max(...[...shipCoords.map((coord) => coord.x), x]) -
        Math.min(...[...shipCoords.map((coord) => coord.x), x]) +
        1;
      const sizeY =
        Math.max(...[...shipCoords.map((coord) => coord.y), y]) -
        Math.min(...[...shipCoords.map((coord) => coord.y), y]) +
        1;

      console.log("sizeX", sizeX);
      console.log("sizeY", sizeY);

      console.log("size[0]", size[0]);
      console.log("size[1]", size[1]);

      if (sizeX > sizeY) {
        return sizeX <= size[0] && sizeY <= size[1];
      } else {
        return sizeY <= size[0] && sizeX <= size[1];
      }
    };
    // There must be at least 1 square between any 2 ships.
    const notTouchingOtherShips =
      allShipCoords.length === 0 ||
      allShipCoords.every(
        (coord) => Math.abs(coord.x - x) >= 2 || Math.abs(coord.y - y) >= 2
      );

    const changeColor = () => {
      setColorMap((prevColorMap) => {
        const newColorMap = [...prevColorMap];
        newColorMap[x] = [...prevColorMap[x]]; // Create a copy of the row to avoid mutating state directly

        if (prevColorMap[x][y] === "white") {
          newColorMap[x][y] = "pink";
        } else if (prevColorMap[x][y] === "pink") {
          newColorMap[x][y] = "white";
        }

        return newColorMap;
      });
    };

    if (
      correctDimmensions(shipCoords, size, x, y) &&
      isAdjacent &&
      notTouchingOtherShips &&
      shipToAssign !== "none"
    ) {
      if (alreadyClicked) {
        const newCoords = shipCoords.filter(
          (coord) => !(coord.x === x && coord.y === y)
        );
        // you can only remove a square from one end of a ship not from the middle
        if (
          newCoords.every((coord1) =>
            newCoords.some(
              (coord2) =>
                Math.abs(coord1.x - coord2.x) +
                  Math.abs(coord1.y - coord2.y) ===
                1
            )
          )
        ) {
          setShipCoords(newCoords);
          changeColor();
        }
      } else {
        setShipCoords([...shipCoords, { x: x, y: y }]);
        changeColor();
      }
    }
  };

  let size;
  if (shipToAssign !== "none") {
    size = shipClasses[shipToAssign]().size;
  } else {
    size = 0;
  }

  const addNewShip = (shipType) => {
    setMyShips([...myShips, shipType]);
  };

  return (
    <>
      {Object.keys(initialShips).map((shipType) =>
        allShipsAssigned(shipType) ? null : (
          <p key={shipType}>
            {shipType}s assigned:{" "}
            {myShips.filter((ship) => ship.type === shipType).length}/
            {initialShips[shipType]}
          </p>
        )
      )}
      <Board
        handleCellClick={handleCellClick}
        shipCoords={shipCoords}
        setShipCoords={setShipCoords}
        colorMap={colorMap}
        setColorMap={setColorMap}
        allShipCoords={allShipCoords}
        shipToAssign={shipToAssign}
        size={size}
      />

      {Object.keys(initialShips).map((shipType) =>
        allShipsAssigned(shipType) ? null : (
          <button
            key={shipType}
            style={
              shipToAssign === shipType
                ? { backgroundColor: "green" }
                : { backgroundColor: "white" }
            }
            onClick={() => setShipToAssign(shipType)}
          >
            Assign a {shipType}
          </button>
        )
      )}

      {shipToAssign === "none" ? (
        <button> Start the Game </button>
      ) : (
        <div>
          <div>
            picked {shipCoords.length} of {size[0] * size[1]} squared for a new{" "}
            {shipToAssign} ship
          </div>
          <div>
            {shipToAssign}'s size is {size[0]}x{size[1]}
          </div>
          <div>
            new ship:{" "}
            {shipCoords.map((coord) => (
              <li>
                {coord.x}, {coord.y}
              </li>
            ))}{" "}
          </div>
        </div>
      )}
    </>
  );
}

export default BoardCreation;
