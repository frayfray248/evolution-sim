class Simulation {

    constructor(ctx, width, height, statsHandler, entityStatsHandler) {

        // dimensions and context
        this.ctx = ctx
        this.width = width
        this.height = height

        // game loop
        this.lastTime = 0
        this.frameCount = 0
        this.frameSkip = 0
        this.pause = true

        // stats handler
        this.statsHandler = statsHandler
        this.entityStatsHandler = entityStatsHandler

        // init
        this.entityManager = new EntityManager(this)
        this.spawnStartingEntities()
        this.stats()
    }

    spawnLifeForm(type) {
        switch (type) {
            case LIFEFORMS.PLANT:
                this.entityManager.add(new Plant(Position.randomPosition(this.width, this.height), this))
                break
            case LIFEFORMS.HERBIVORE:
                this.entityManager.add(new Herbivore(Position.randomPosition(this.width, this.height), this))
                break
            case LIFEFORMS.CARNIVORE:
                this.entityManager.add(new Carnivore(Position.randomPosition(this.width, this.height), this))
                break
        }
    }

    spawnStartingEntities() {
        for (let i = 0; i < SETTINGS.STARTING_PLANTS; i++) {
            this.spawnLifeForm(LIFEFORMS.PLANT)
        }

        for (let i = 0; i < SETTINGS.STARTING_HERBIVORES; i++) {
            this.spawnLifeForm(LIFEFORMS.HERBIVORE)
        }

        for (let i = 0; i < SETTINGS.STARTING_CARNIVORES; i++) {
            this.spawnLifeForm(LIFEFORMS.CARNIVORE)

        }
    }

    update(delta) {

        const counts = this.entityManager.counts

        for (const type in counts) {

            if (counts[type] <= 0) this.spawnLifeForm(type)
    
        }

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

        const stats = {}

        stats[STATS.PLANTS] = this.entityManager.counts[LIFEFORMS.PLANT]
        stats[STATS.HERBIVORES] = this.entityManager.counts[LIFEFORMS.HERBIVORE]
        stats[STATS.CARNIVORES] = this.entityManager.counts[LIFEFORMS.CARNIVORE]
        stats[STATS.MUTATIONS] = GeneMap.mutationCount

        this.statsHandler(stats)
    }

    selectedEntityStats() {
        if (this.selectedEntity ) {

            const entityStats = {}

            entityStats[ENTITY_STATS.ID] = this.selectedEntity.id
            entityStats[ENTITY_STATS.TYPE] = this.selectedEntity.constructor.name
            entityStats[ENTITY_STATS.POSITION] = this.selectedEntity.position.toString()
            entityStats[ENTITY_STATS.ACTION] = this.selectedEntity.action
            entityStats[ENTITY_STATS.AGE] = Math.round(this.selectedEntity.age)
            entityStats[ENTITY_STATS.ENERGY] = Math.round(this.selectedEntity.energy)
            entityStats[ENTITY_STATS.REPRODUCTION_COST] = this.selectedEntity.geneMap.get(GENES.REPRODUCTION_COST)

            this.entityStatsHandler(entityStats)

        }
        else {
            this.entityStatsHandler(null)
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