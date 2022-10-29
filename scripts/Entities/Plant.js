class Plant extends LifeForm {

    seedSpread = 100

    constructor(position, simulation) {
        super(position, simulation, 5, 'lime')
    }

    update(delta) {
        super.update(delta)
        this.gainEnergy(delta)
        this.reproduce(new Position(
            ((Math.random() * this.seedSpread * 2) - this.seedSpread) % this.simulation.width,
            ((Math.random() * this.seedSpread * 2) - this.seedSpread) % this.simulation.height)
        )
    }

    gainEnergy(delta) {
        this.energy += delta * 5
    }

    clone() {
        return new Plant(this.position.clone(), this.simulation)
    }
}