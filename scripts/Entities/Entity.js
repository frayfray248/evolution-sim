class Entity {

    simulation
    position

    constructor(position, simulation) {
        this.simulation = simulation
        this.position = position

    }

    update(delta) {
        
    }

    die() {
        this.simulation.entityManager.remove(this)
    }

}