const HANDLERS = {

    pauseButtonHandler: (e) => {

        const sim = e.data.sim
        const $button = $(e.target)

        if (sim.pause) {
            sim.stop(false)
            $button.html("Pause")
        }
        else {
            sim.stop(true)
            $button.html("Start")
        }
    },

    resetButtonHandler: (e) => {
        e.data.sim.reset()
    },

    canvasClickHandler: (e) => {

        const canvas = e.data.canvas
        const sim = e.data.sim

        const offSetX = canvas.getBoundingClientRect().left
        const offSetY = canvas.getBoundingClientRect().top

        sim.handleClick((e.clientX - 5) - offSetX, (e.clientY - 5) - offSetY)
    }
}