class Creature extends CircleEntity {


    travelTimeLeft
    travelTimeRange
    dirX
    dirY

    constructor(position, simulation) {
        super(position, simulation, 5, "cyan")
        this.simulation = simulation
        this.travelTimeLeft = 0
        this.travelTimeRange = 5
    }

    update(delta) {
        this.wander(delta)
    }

    wander(delta) {

        if (this.travelTimeLeft > 0) {


            const moveX = delta * this.dirX * 50
            const moveY = delta * this.dirY * 50

            this.position.x += moveX
            this.position.y += moveY

            this.travelTimeLeft -= delta

        }
        else {

            const num = (Math.floor(Math.random() * 2))

            switch (num) {
                case 0:
                    this.dirX = (Math.floor(Math.random() * 2)) === 0 ? 1 : -1
                    this.dirY = (Math.floor(Math.random() * 2)) === 0 ? 1 : -1
                break
                case 1:
                    this.dirX = (Math.floor(Math.random() * 2)) === 0 ? 1 : -1
                    this.dirY = 0
                break
                case 2:
                    this.dirX = 0
                    this.dirY = (Math.floor(Math.random() * 2)) === 0 ? 1 : -1
                break
            }

            

            this.travelTimeLeft = Math.random() * this.travelTimeRange + 1
        }
    }
    
}