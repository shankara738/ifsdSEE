const prompt = require('prompt-sync')();
class Household {
  constructor(consumption) {
    this.consumption = consumption;
  }
}

class ElectricityCalculator {
  constructor(households) {
    this.households = households;
  }

  calculateAverageConsumption() {
    let totalConsumption = 0;
    for (let i = 0; i < this.households.length; i++) {
      totalConsumption += this.households[i].consumption;
    }

    return totalConsumption / this.households.length;
  }
}

function main() {
  const households = [
    new Household(350),
    new Household(500),
    new Household(400),
    new Household(600),
    new Household(450)
  ];

  const calculator = new ElectricityCalculator(households);
  const averageConsumption = calculator.calculateAverageConsumption();

  console.log("Average monthly electricity consumption: " + averageConsumption);
}

main();
