class Ship {
    constructor(size, canon_quantity, type) {
      this.coords = []; // Array of Objects { x: Number, y: Number, hit: Boolean, canon: Boolean }
      this.canon_quantity = canon_quantity;
      this.size = size;
      this.type = type;
    }
  }
  
  class Destroyer extends Ship {
    constructor() {
      // Call the constructor of the base class (Ship) using super()
      super([4, 1], 1, "destroyer");
    }
  }
  
  class Battleship extends Ship {
    constructor() {
      // Call the constructor of the base class (Ship) using super()
      super([4, 2], 2, "battleship");
    }
  }
  
  class Boat extends Ship {
    constructor() {
      // Call the constructor of the base class (Ship) using super()
      super([2, 1], 0, "boat");
    }
  }
  
  const shipClasses = {
    destroyer: () => new Destroyer(),
    boat: () => new Boat(),
    battleship: () => new Battleship(),
  };

  export default shipClasses