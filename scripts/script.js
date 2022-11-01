$(function() {
    
    // canvas properties
    const canvas = $('#canvas')[0]
    const ctx = canvas.getContext('2d')
    const width = canvas.width
    const height = canvas.height

    // create sim
    const sim = new Simulation(ctx, width, height, updateStats, updateEntityStats)

    // handlers
    $('#startButton').on('click', { sim : sim}, HANDLERS.startButtonHandler)
    $('#stopButton').on('click', { sim : sim}, HANDLERS.pauseButtonHandler)
    $('#resetButton').on('click', { sim : sim}, HANDLERS.resetButtonHandler)
    $('#canvas').on('click', { sim : sim, canvas : canvas}, HANDLERS.canvasClickHandler)

    // start
    sim.start()
});