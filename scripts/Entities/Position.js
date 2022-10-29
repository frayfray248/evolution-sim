class Position {

    x
    y

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    // distance between two Positions
    static distance(position1, position2) {
        return Math.sqrt(
            Math.pow(position1.x - position2.x, 2) + 
            Math.pow(position1.y - position2.y, 2)
            )
    }

    // direction from a Position to a target Position
    static direction(position, target) {

        const direction = new Position(0, 0)

        if (position.x < target.x) {
            direction.x = 1
        }
        else if (position.x > target.x) {
            direction.x = -1
        }

        if (position.y < target.y) {
            direction.y = 1
        }
        else if (position.y > target.y) {
            direction.y = -1
        }

        return direction

    }

    clone() {
        return new Position(this.x, this.y)
    }

}