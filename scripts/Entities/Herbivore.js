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

const HERBIVORE_ACTIONS = {
    FLEEING : "fleeing",
    MOVE_TOWARDS_PLANT : "move towards plant",
    WANDERING : "wandering"
}

class Herbivore extends Creature {

    action

    constructor(position, simulation, genes = createDefaultHerbivoreGenes()) {
        super(position, simulation, '#0066ff', genes)
        this.action = HERBIVORE_ACTIONS.WANDERING
    }

    update(delta) {

        this.detectEntities()
        this.closestPlant = this.getClosestEntityWithinRange(LIFEFORMS.PLANT)
        this.closestCarnivore = this.getClosestEntityWithinRange(LIFEFORMS.CARNIVORE)
        this.move(delta)
        this.eatPlants()

        const range = this.radius
        
        const offset = Position.randomPosition(
                Math.min(this.position.x + range, this.simulation.width - 1),
                Math.min(this.position.y + range, this.simulation.height - 1),
                Math.max(this.position.x - range, 1),
                Math.max(this.position.y - range, 1)
        )

        this.reproduce(offset)

        super.update(delta)
    }

    render(ctx) {
        if (SETTINGS.DEBUG) {
            this.renderDebug(ctx)
        }
        super.render(ctx)
    }

    move(delta) {
 
        if (this.closestCarnivore) {
            this.action = "fleeing"
            this.flee(delta, this.closestCarnivore)
            this.wanderPosition = null
        }
        else if (this.closestPlant) {
            this.action = "move to plant"
            this.moveTowards(delta, this.closestPlant.position)
            this.wanderPosition = null
        }
        else {
            this.action = "wandering"
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

    renderDebug(ctx) {

        if (this.closestPlant) {
            
            ctx.beginPath()
            ctx.moveTo(this.position.x, this.position.y)
            ctx.lineTo(this.closestPlant.position.x, this.closestPlant.position.y)
            ctx.strokeStyle = "lime"
            ctx.stroke()
        }

        if (this.closestCarnivore) {
            ctx.beginPath()
            ctx.moveTo(this.position.x, this.position.y)
            ctx.lineTo(this.closestCarnivore.position.x, this.closestCarnivore.position.y)
            ctx.strokeStyle = "crimson"
            ctx.stroke()
        }


        if (this.wanderPosition) {
            ctx.beginPath()
            ctx.moveTo(this.position.x, this.position.y)
            ctx.lineTo(this.wanderPosition.x, this.wanderPosition.y)
            ctx.strokeStyle = "#0066ff"
            ctx.stroke()
        }

    }

}