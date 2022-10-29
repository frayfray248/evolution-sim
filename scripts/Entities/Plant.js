const defaultPlantGeneMap = () => (new GeneMap(new Map([
    [GENES.RADIUS, SETTINGS.ENTITY.PLANT.RADIUS],
    [GENES.LIFESPAN, SETTINGS.ENTITY.PLANT.LIFESPAN],
    [GENES.GROWTH_RATE, SETTINGS.ENTITY.PLANT.GROWTH_RATE],
    [GENES.REPRODUCTION_COST, SETTINGS.ENTITY.PLANT.REPRODUCTION_COST],
    [GENES.SEED_SPREAD, SETTINGS.ENTITY.PLANT.SEED_SPREAD],
    [GENES.ENERGY_GAIN_RATE, SETTINGS.ENTITY.PLANT.ENERGY_GAIN_RATE]
])))

class Plant extends LifeForm {

    constructor(position, simulation, genes = defaultPlantGeneMap()) {
        super(position, simulation, 'lime', genes)
    }

    update(delta) {
        super.update(delta)
        this.gainEnergy(delta)
        this.reproduce()
    }

    reproduce() {
        const seedSpread = this.geneMap.get(GENES.SEED_SPREAD)
        const offset = new Position(
            ((Math.random() * seedSpread * 2) - seedSpread) % this.simulation.width,
            ((Math.random() * seedSpread * 2) - seedSpread) % this.simulation.height)
        super.reproduce(offset)
    }

    gainEnergy(delta) {
        this.energy += this.geneMap.get(GENES.ENERGY_GAIN_RATE) * delta
    }

    clone() {
        return new Plant(this.position.clone(), this.simulation)
    }
}