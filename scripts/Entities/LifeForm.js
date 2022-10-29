class LifeForm extends CircleEntity {

    simulation

    age
    energy

    constructor(position, simulation, radius=5, color='white') {
        super(position, simulation, radius, color)
        this.simulation = simulation
        this.age = 0
        this.energy = 0
    }

    update(delta) {
        this.grow(delta)
    }

    render(ctx) {
        super.render(ctx)
    }

    reproduce(offSet) {
        
        if (this.energy <= 5) return

        this.energy -= 5

        const offSpring = this.clone()
        offSpring.position.x += offSet.x
        offSpring.position.y += offSet.y
        this.simulation.entityManager.add(offSpring)
    }

    grow(delta) {
        this.age += delta * 5
        if (this.age > 100) {
            this.die()
        }
    }
}