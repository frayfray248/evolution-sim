const GENES = {
    LIFESPAN: 'Lifespan',
    GROWTH_RATE: 'Growth Rate',
    REPRODUCTION_COST: 'Reproduction Cost',
    RADIUS: "Radius",
    SPEED: "Speed",
    SIGHT_RANGE: "Sight Range",
    SPRINT_MULTIPLYER: "Sprint Multiplyer",
    SEED_SPREAD: "Seed Spread",
    ENERGY_GAIN_RATE: "Energy Gain Rate",
    BOLDNESS: "Boldness",
    SPRINT_ENERGY_COST: "Sprint Energy Cost"
}

class GeneMap {

    genes

    constructor(genes) {

        this.genes = genes

    }

    get(name) {
        return this.genes.get(name)
    }

    set(name, value) {
        this.genes.set(name, value)
    }

    clone() {

        const newGeneMap = new GeneMap(new Map())

        for (const [key, value] of this.genes.entries()) {
            newGeneMap.set(key, value)
        }
        return newGeneMap

    }

}