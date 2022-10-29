class CircleEntity extends Entity {

    simulation
    radius
    color

    constructor(position, simulation, radius, color) {
        super(position, simulation)
        this.simulation = simulation
        this.radius = radius
        this.color = color
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        ctx.fillStyle = this.color
        ctx.fill()
    }

}