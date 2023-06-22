const prompt = require('prompt-sync')();

class City {
    constructor(name) {
      this.name = name;
    }
  }
  
  class Leg {
    constructor(source, destination, cost) {
      this.source = source;
      this.destination = destination;
      this.cost = cost;
    }
  }
  
  class Route {
    constructor() {
      this.legs = [];
    }
  
    addLeg(leg) {
      this.legs.push(leg);
    }
  
    calculateTotalCost() {
      let totalCost = 0;
      for (let i = 0; i < this.legs.length; i++) {
        totalCost += this.legs[i].cost;
      }
      return totalCost;
    }
  }
  
  function main() {
    const route = new Route();
  
    const numLegs = parseInt(prompt("Enter the number of legs in the route:"));
  
    for (let i = 0; i < numLegs; i++) {
      const sourceCity = prompt(`Enter the source city for leg ${i + 1}:`);
      const destinationCity = prompt(`Enter the destination city for leg ${i + 1}:`);
      const cost = parseFloat(prompt(`Enter the cost for leg ${i + 1}:`));
  
      const leg = new Leg(new City(sourceCity), new City(destinationCity), cost);
      route.addLeg(leg);
    }
  
    const totalCost = route.calculateTotalCost();
    console.log(`The total cost of the trip is: ${totalCost}`);
  }
  
  main();