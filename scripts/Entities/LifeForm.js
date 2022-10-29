const LIFEFORMS = {
    PLANT: "Plant",
    HERBIVORE : "Herbivore",
    CARNIVORE : "Carnivore"
}

class LifeForm extends CircleEntity {

    simulation

    geneMap

    age
    energy

    constructor(position, simulation, color, geneMap) {
        super(position, simulation, geneMap.get(GENES.RADIUS), color)
        this.simulation = simulation

        this.geneMap = geneMap
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

        const reproductionCost = this.geneMap.get(GENES.REPRODUCTION_COST)
        
        if (this.energy <= reproductionCost) return
        this.energy -= reproductionCost

        const offSpring = this.clone()
        offSpring.position.x += offSet.x
        offSpring.position.y += offSet.y
        this.simulation.entityManager.add(offSpring)
    }

    grow(delta) {
        this.age += delta * this.geneMap.get(GENES.GROWTH_RATE)
        if (this.age > this.geneMap.get(GENES.LIFESPAN)) {
            this.die()
        }
    }
}