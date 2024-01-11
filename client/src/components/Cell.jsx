const Cell = ({
    coordinates,
    handleCellClick,
    shipCoords,
    setShipCoords,
    colorMap,
    setColorMap,
    allShipCoords,
    shipToAssign,
    size,
  }) => {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "k", "L"];
  
    const styles = {
      width: "30px",
      height: "30px",
      border: "1px solid #ccc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    };
  
    const coordinates_with_letters = letters[coordinates.col] + coordinates.row;
  
    return (
      <div
        style={{
          ...styles,
          backgroundColor: colorMap[coordinates.col][coordinates.row],
        }}
        onClick={() =>
          handleCellClick(
            coordinates.col,
            coordinates.row,
            shipCoords,
            setShipCoords,
            setColorMap,
            allShipCoords,
            shipToAssign,
            size
          )
        }
      >
        {coordinates_with_letters}
      </div>
    );
  };

  export default Cell