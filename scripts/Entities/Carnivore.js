const createDefaultCarnivoreGenes = () => (new GeneMap(new Map([
    [GENES.RADIUS, SETTINGS.ENTITY.CARNIVORE.RADIUS],
    [GENES.LIFESPAN, SETTINGS.ENTITY.CARNIVORE.LIFESPAN],
    [GENES.GROWTH_RATE, SETTINGS.ENTITY.CARNIVORE.GROWTH_RATE],
    [GENES.REPRODUCTION_COST, SETTINGS.ENTITY.CARNIVORE.REPRODUCTION_COST],
    [GENES.SPEED, SETTINGS.ENTITY.CARNIVORE.SPEED],
    [GENES.SIGHT_RANGE, SETTINGS.ENTITY.CARNIVORE.SIGHT_RANGE],
    [GENES.SPRINT_MULTIPLYER, SETTINGS.ENTITY.CARNIVORE.SPRINT_MULTIPLYER],
    [GENES.ENERGY_GAIN_RATE, SETTINGS.ENTITY.CARNIVORE.ENERGY_GAIN_RATE],
    [GENES.SPRINT_ENERGY_COST, SETTINGS.ENTITY.CARNIVORE.SPRINT_ENERGY_COST]
])))

class Carnivore extends Creature {


    constructor(position, simulation, genes = createDefaultCarnivoreGenes()) {
        super(position, simulation, 'crimson', genes)
    }

    update(delta) {

        this.detectEntities()
        const closestHerbivore = this.getClosestEntityWithinRange(LIFEFORMS.HERBIVORE)

        this.move(delta, closestHerbivore)

        this.eatHerbivore()
        this.reproduce(new Position(0, 0))

        super.update(delta)
    }

    render(ctx) {
        super.render(ctx)
    }

    move(delta, closestHerbivore) {

        if (closestHerbivore) {
            this.chase(delta, closestHerbivore)
        }
        else {
            this.wander(delta)
        }

    }

    eatHerbivore() {

        const collidedEntities = this.getCollidedEntities()

        for (const collidedEntity of collidedEntities) {

            if (collidedEntity.constructor.name === "Herbivore") {
                collidedEntity.die()
                this.energy += this.geneMap.get(GENES.ENERGY_GAIN_RATE)
                return
            }
        }

    }

    clone() {
        return new Carnivore(this.position.clone(), this.simulation, this.geneMap.clone())
    }


}