class EntityManager {

    entities
    maxPlants = SETTINGS.MAX_PLANTS
    plantCount = 0

    constructor() {

        this.entities = []

    }

    add(entity) {     

        var entityType = entity.constructor.name

        if (entityType === "Plant" && this.plantCount < this.maxPlants) {
            this.entities.push(entity)
            this.plantCount++
        }
    }


    remove(entity) {
        const index = this.entities.indexOf(entity)

        if (index != -1) this.entities.splice(index, 1)

        if (entity.constructor.name === "Plant") {
            this.plantCount--
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
    }

}