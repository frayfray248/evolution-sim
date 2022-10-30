class EntityManager {

    entities
    
    maxPlants = SETTINGS.MAX_PLANTS
    maxHerbivores = SETTINGS.MAX_HERBIVORES
    maxCarnivores = SETTINGS.MAX_CARNIVORES

    plantCount = 0
    herbivoreCount = 0
    carnivoreCount = 0

    constructor() {

        this.entities = []

    }

    add(entity) {     

        var entityType = entity.constructor.name

        if (entityType === "Plant" && this.plantCount < this.maxPlants) {
            this.entities.push(entity)
            this.plantCount++
        }
        else if (entityType === "Herbivore" && this.plantCount < this.maxHerbivores) {
            this.entities.push(entity)
            this.herbivoreCount++
        }
        else if (entityType === "Carnivore" && this.carnivoreCount < this.maxCarnivores) {
            this.entities.push(entity)
            this.carnivoreCount++
        }
    }

    getByPosition(position) {

        for (const entity of this.entities) {
            if (entity.positionWithinArea(position)) {
                return entity
            }
        }

        return false
    }


    remove(entity) {
        const index = this.entities.indexOf(entity)

        if (index != -1) this.entities.splice(index, 1)

        if (entity.constructor.name === "Plant") {
            this.plantCount--
        }
        else if (entity.constructor.name === "Herbivore") {
            this.herbivoreCount--
        }
        else if (entity.constructor.name === "Carnivore") {
            this.carnivoreCount--
        }

    }

    update(delta) {

        for (const entity of this.entities) {
            entity.update(delta)
        }

    }


    render(ctx) {

        for (const entity of this.entities) {
            entity.render(ctx)
        }

    }

    purge() {
        this.entities = []
        this.plantCount = 0
        this.herbivoreCount = 0
        this.carnivoreCount = 0
    }

}