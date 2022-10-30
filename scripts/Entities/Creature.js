class Creature extends LifeForm {


    entitiesWithinRange

    travelTimeLeft
    travelTimeRange
    dirX
    dirY

    constructor(position, simulation, color, geneMap) {
        super(position, simulation, color, geneMap)
        this.simulation = simulation
        this.entitiesWithinRange = []
        this.travelTimeLeft = 0
        this.travelTimeRange = 5
    }

    update(delta) {
        super.update(delta)
        this.handleBorderCollision()
    }

    detectEntities() {
        this.entitiesWithinRange = []

        for (const entity of this.simulation.entityManager.entities) {

            if (entity === this) continue

            const entityDistance = Position.distance(this.position, entity.position)

            if (entityDistance <= this.geneMap.get(GENES.SIGHT_RANGE)) this.entitiesWithinRange.push(entity)

        }
    }

    getClosestEntityWithinRange(entityType) {

        var closestEntity = null
        var entities = entityType ?
            this.entitiesWithinRange.filter(entity => entity.constructor.name === entityType)
            :
            this.entitiesWithinRange

        for (const entity of entities) {

            if (!closestEntity) {
                closestEntity = entity
                continue
            }
            else {
                const closestEntityDistance = Position.distance(this.position, closestEntity.position)
                const otherEntityDistance = Position.distance(this.position, entity.position)

                if (otherEntityDistance < closestEntityDistance) closestEntity = entity
            }
        }

        return closestEntity

    } 

    wander(delta) {

        if (this.travelTimeLeft > 0) {


            const moveX = delta * this.dirX * this.geneMap.get(GENES.SPEED)
            const moveY = delta * this.dirY * this.geneMap.get(GENES.SPEED)

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

    moveTowards(delta, targetPosition) {
        
        const targetDirection = Position.direction(this.position, targetPosition)

        this.position.x += targetDirection.x * delta * this.geneMap.get(GENES.SPEED)
        this.position.y += targetDirection.y * delta * this.geneMap.get(GENES.SPEED)

    }

    moveAway(delta, target) {
        const targetDirection = Position.direction(this.position, target.position)

        this.position.x += -targetDirection.x * delta * this.geneMap.get(GENES.SPEED)
        this.position.y += -targetDirection.y * delta * this.geneMap.get(GENES.SPEED)
    }

    sprint(delta) {

        if (this.energy > delta * this.geneMap.get(GENES.SPRINT_ENERGY_COST)) {
            
            this.energy -= delta * this.geneMap.get(GENES.SPRINT_ENERGY_COST)
            return this.geneMap.get(GENES.SPRINT_MULTIPLYER)
        } 
        else {
            return 1
        }
    }

    chase(delta, target) {

        const sprintMove = this.sprint(delta)
        
        this.position.x += Position.direction(this.position, target.position).x * delta * this.geneMap.get(GENES.SPEED) * sprintMove
        this.position.y += Position.direction(this.position, target.position).y * delta * this.geneMap.get(GENES.SPEED) * sprintMove
    }

    flee(delta, target) {

        const sprintMove = this.sprint(delta)

        this.position.x -= Position.direction(this.position, target.position).x * delta * this.geneMap.get(GENES.SPEED) * sprintMove
        this.position.y -= Position.direction(this.position, target.position).y * delta * this.geneMap.get(GENES.SPEED) * sprintMove
    }

    handleBorderCollision() {

        if (this.position.x > this.simulation.width) {
            this.position.x = this.simulation.width
            //this.position.x -= this.simulation.width - 1
        }
        else if (this.position.x < 0) {
            this.position.x = 0
            //this.position.x += this.simulation.width + 1
        }

        if (this.position.y > this.simulation.height) {
            this.position.y = this.simulation.height
            //this.y = this.simulation.height - this.radias
        }
        else if (this.position.y < 0) {
            this.position.y = 0
            //this.y = this.radias
        }

    }


    
}