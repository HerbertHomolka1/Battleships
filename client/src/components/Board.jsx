import Cell from "./Cell";

const Board = ({
    handleCellClick,
    shipCoords,
    setShipCoords,
    colorMap,
    setColorMap,
    allShipCoords,
    shipToAssign,
    size,
  }) => {
    const gridSize = 12;
    const grid = [];
  
    for (let row = 0; row < gridSize; row++) {
      const rowCells = [];
      for (let col = 0; col < gridSize; col++) {
        const coordinates = { row: row, col: col };
        rowCells.push(
          <Cell
            coordinates={coordinates}
            handleCellClick={handleCellClick}
            shipCoords={shipCoords}
            setShipCoords={setShipCoords}
            colorMap={colorMap}
            setColorMap={setColorMap}
            allShipCoords={allShipCoords}
            shipToAssign={shipToAssign}
            size={size}
          >
            {coordinates}
          </Cell>
        );
      }
      grid.push(
        <div key={row} className="grid-row">
          {rowCells}
        </div>
      );
    }
  
    return <>{grid}</>;
  };

  export default Board