const createDefaultHerbivoreGenes = () => (new GeneMap(
    new Map(
        [
    [GENES.RADIUS, SETTINGS.ENTITY.HERBIVORE.RADIUS],
    [GENES.LIFESPAN, SETTINGS.ENTITY.HERBIVORE.LIFESPAN],
    [GENES.GROWTH_RATE, SETTINGS.ENTITY.HERBIVORE.GROWTH_RATE],
    [GENES.REPRODUCTION_COST, SETTINGS.ENTITY.HERBIVORE.REPRODUCTION_COST],
    [GENES.SPEED, SETTINGS.ENTITY.HERBIVORE.SPEED],
    [GENES.SIGHT_RANGE, SETTINGS.ENTITY.HERBIVORE.SIGHT_RANGE],
    [GENES.SPRINT_MULTIPLYER, SETTINGS.ENTITY.HERBIVORE.SPRINT_MULTIPLYER],
    [GENES.ENERGY_GAIN_RATE, SETTINGS.ENTITY.HERBIVORE.ENERGY_GAIN_RATE],
    [GENES.BOLDNESS, SETTINGS.ENTITY.HERBIVORE.BOLDNESS],
    [GENES.SPRINT_ENERGY_COST, SETTINGS.ENTITY.HERBIVORE.SPRINT_ENERGY_COST]
])))

class Herbivore extends Creature {

    constructor(position, simulation, genes = createDefaultHerbivoreGenes()) {
        super(position, simulation, '#0066ff', genes)
    }

    update(delta) {

        this.detectEntities()
        const closestPlant = this.getClosestEntityWithinRange(LIFEFORMS.PLANT)
        const closestCarnivore = this.getClosestEntityWithinRange(LIFEFORMS.CARNIVORE)
        this.move(delta, closestPlant, closestCarnivore)
        this.eatPlants()
        this.reproduce(new Position(0, 0))

        super.update(delta)
    }

    render(ctx) {
        //this.renderRadius(ctx, this.geneMap.get(GENES.SIGHT_RANGE), "DeepSkyBlue")
        super.render(ctx)
    }

    move(delta, closestPlant, closestCarnivore) {
 
        if (closestCarnivore) {
            this.flee(delta, closestCarnivore)
        }
        else if (closestPlant) {
            this.moveTowards(delta, closestPlant)
        }
        else {
            this.wander(delta)
        }

    }

    eatPlants() {

        const collidedEntities = this.getCollidedEntities()

        for (const collidedEntity of collidedEntities) {

            if (collidedEntity.constructor.name === "Plant") {
                collidedEntity.die()
                this.energy += this.geneMap.get(GENES.ENERGY_GAIN_RATE)
                return
            }
        }
    }

    clone() {
        return new Herbivore(this.position.clone(), this.simulation, this.geneMap.clone())
    }

}