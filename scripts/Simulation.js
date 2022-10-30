class Simulation {

    constructor(ctx, width, height) {

        // dimensions and context
        this.ctx = ctx
        this.width = width
        this.height = height

        // game loop
        this.lastTime = 0
        this.frameCount = 0
        this.frameSkip = 0
        this.pause = true

        this.entityManager = new EntityManager()
        this.spawnStartingEntities()
        this.stats()
    }

    spawnPlant() {
        this.entityManager.add(new Plant(Position.randomPosition(this.width, this.height), this))
    }

    spawnHerbivore() {
        this.entityManager.add(new Herbivore(Position.randomPosition(this.width, this.height), this))
    }

    spawnCarnivore() {
        this.entityManager.add(new Carnivore(Position.randomPosition(this.width, this.height), this))
    }

    spawnStartingEntities() {
        for (let i = 0; i < SETTINGS.STARTING_PLANTS; i++) {
            this.spawnPlant()
        }

        for (let i = 0; i < SETTINGS.STARTING_HERBIVORES; i++) {
            this.spawnHerbivore()
        }

        for (let i = 0; i < SETTINGS.STARTING_CARNIVORES; i++) {
            this.spawnCarnivore()

        }

    }

    update(delta) {
        this.entityManager.update(delta)
    }

    render(fps) {
        // clear
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.ctx.fillStyle = "#43199B"
        this.ctx.fillRect(0, 0, this.width, this.height)

        // draw
        this.entityManager.render(this.ctx)
        this.ctx.fillStyle = "cyan"
        this.ctx.font = `${30}px arial`
        this.ctx.fillText(`FPS: ${fps}`, 0, 30)
    }

    stats() {

        document.getElementById("plantCount").innerHTML = this.entityManager.plantCount
        document.getElementById("herbivoreCount").innerHTML = this.entityManager.herbivoreCount
        document.getElementById("carnivoreCount").innerHTML = this.entityManager.carnivoreCount
        

    }

    selectedEntityStats() {
        if (this.selectedEntity) {
            document.getElementById("entityID").innerHTML = "Some Id"
            document.getElementById("entityType").innerHTML = this.selectedEntity.constructor.name
            document.getElementById("entityAge").innerHTML = Math.floor(this.selectedEntity.age)
            document.getElementById("entityEnergy").innerHTML = Math.floor(this.selectedEntity.energy)
            document.getElementById("entityReproductionCost").innerHTML = Math.floor(this.selectedEntity.geneMap.get(GENES.REPRODUCTION_COST))
        }
    }

    loop(time) {



        const delta = (time - this.lastTime) / 1000

        this.lastTime = time

        const fps = Math.round(1 / delta)


        if (!this.pause && document.hasFocus()) {

            if (this.frameCount >= this.frameSkip) {
                this.update(delta)
                this.stats()
                this.selectedEntityStats()
                this.frameCount = 0
            }
            else {
                this.frameCount++
            }


        }

        this.render(fps)

        window.requestAnimationFrame((time) => this.loop(time))
    }

    handleClick(x, y) {

        const clickPosition = new Position(x, y)

        const entity = this.entityManager.getByPosition(clickPosition)

        if (entity) {
            this.selectedEntity = entity
            this.selectedEntityStats()
        }

    }

    start() {
        window.requestAnimationFrame((time) => { this.loop(time) })
    }

    stop(pause) {
        this.pause = pause
    }

    reset() {
        this.entityManager.purge()
        this.spawnStartingEntities()
        this.selectedEntity = false
        this.stats()
        this.selectedEntityStats()
    }
}