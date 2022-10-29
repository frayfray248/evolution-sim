class EntityManager {

    entities

    constructor() {

        this.entities = []

    }

    add(entity) {     
        this.entities.push(entity)
    }


    remove(entity) {
        const index = this.entities.indexOf(entity)

        if (index != -1) this.entities.splice(index, 1)

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


}