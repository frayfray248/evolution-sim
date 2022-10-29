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
    }

    spawnStartingEntities() {
        this.entityManager.add(new Plant(Position.randomPosition(this.width, this.height), this))
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

    loop(time) {



        const delta = (time - this.lastTime) / 1000

        this.lastTime = time

        const fps = Math.round(1 / delta)


        if (!this.pause && document.hasFocus()) {

            if (this.frameCount >= this.frameSkip) {
                this.update(delta)

                this.frameCount = 0
            }
            else {
                this.frameCount++
            }


        }

        this.render(fps)

        window.requestAnimationFrame((time) => this.loop(time))
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
    }
}