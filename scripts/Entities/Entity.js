class Entity {

    simulation
    position

    constructor(position, simulation) {
        this.simulation = simulation
        this.position = position

    }

    die() {
        this.simulation.entityManager.remove(this)
    }

}