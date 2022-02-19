let LivingCreator = module.exports('./LivingCreator')

class Grass extends LivingCreator {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.multiply = 0
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];

    
    }
    mul() {
        this.multiply++;
        var emptyCells = this.chooseCell(0 && 8);
        var newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrasseatr = new Grass(newX, newY);
            grassArr.push(newGrasseatr);
            this.multiply = 1;
        }
    }
}
