const HANDLERS = {
    startButtonHandler: (e) => {
        e.data.sim.stop(false)
    },

    pauseButtonHandler: (e) => {
        e.data.sim.stop(true)
    },

    resetButtonHandler: (e) => {
        e.data.sim.reset()
    },

    canvasClickHandler: (e) => {

        const canvas = e.data.canvas
        const sim = e.data.sim

        const offSetX = canvas.getBoundingClientRect().left
        const offSetY = canvas.getBoundingClientRect().top

        sim.handleClick(event.clientX - offSetX, event.clientY - offSetY)
    }
}