class EntityManager {

    entities
    
    maxPlants = SETTINGS.MAX_PLANTS
    maxHerbivores = SETTINGS.MAX_HERBIVORES
    maxCarnivores = SETTINGS.MAX_CARNIVORES

    maxCreatures = {
        [LIFEFORMS.PLANT] : SETTINGS.MAX_PLANTS,
        [LIFEFORMS.HERBIVORE] : SETTINGS.MAX_HERBIVORES,
        [LIFEFORMS.CARNIVORE]: SETTINGS.MAX_CARNIVORES
    }

    counts = {
        [LIFEFORMS.PLANT] : 0,
        [LIFEFORMS.HERBIVORE] : 0,
        [LIFEFORMS.CARNIVORE] : 0
    }

    plantCount = 0
    herbivoreCount = 0
    carnivoreCount = 0

    constructor(simulation) {

        this.simulation = simulation
        this.entities = []

    }

    add(entity) {     
        try {

            const type = entity.constructor.name

            if (Object.values(LIFEFORMS).indexOf(type) == -1) throw "Invalid entity add to manager"

            if (this.counts[type] < this.maxCreatures[type]) {
                this.entities.push(entity)
                this.counts[type]++
                entity.id = this.entities.indexOf(entity)
            }

        } catch(e) {

            console.log(e)

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

        const type = entity.constructor.name

        this.counts[type]--

        if (this.simulation.selectedEntity === entity) {
            this.simulation.selectedEntity = null
        }

    }

    update(delta) {

        for (const entity of this.entities) {

            entity.update(delta)
        }

    }


    render(ctx) {

        const nonePlants = []

        // render plants first
        for (const entity of this.entities) {

            if (entity.constructor.name === LIFEFORMS.PLANT) {
                entity.render(ctx)
            }
            else {
                nonePlants.push(entity)
            }
        }

        // render all other entities
        for (const entity of nonePlants) {
            entity.render(ctx)
        }

    }

    purge() {
        this.entities = []
        
        for (const [key, value] of Object.entries(this.counts)) {

            this.counts[key] = 0
    
        }
    }

}