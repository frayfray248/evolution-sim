const canvas = document.getElementById("canvas")
const ctx = canvas.getContext('2d')

const sim = new Simulation(ctx, 600, 600)

document.getElementById("startButton").onclick = (event) => sim.stop(false)

document.getElementById("stopButton").onclick = (event) => sim.stop(true)

document.getElementById("resetButton").onclick = (event) => sim.reset()

sim.start()