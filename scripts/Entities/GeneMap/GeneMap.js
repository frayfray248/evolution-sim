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

    static mutationCount = 0

    constructor(genes) {

        this.genes = genes

    }

    get(name) {
        return this.genes.get(name)
    }

    set(name, value) {
        this.genes.set(name, value)
    }

    mutate() {

        for (const [geneName, value] of this.genes) {
            
            this.mutateGene(geneName)
    
        }
    }

    mutateGene(name) {

        const mutationCheck = Math.floor(Math.random() * 100) + 1
        

        if (mutationCheck < SETTINGS.MUTATION_CHANCE) {
            const oldVal = this.genes.get(name)
            const mutationMultiplyer = (((Math.floor(Math.random() * SETTINGS.MUTATION_MULTIPLYER_RANGE * 2) + 1) - SETTINGS.MUTATION_MULTIPLYER_RANGE) / 100) + 1
            const newVal = oldVal * mutationMultiplyer
            this.genes.set(name, newVal)
            console.log(`Gene ${name} mutated from ${oldVal} to ${newVal}`)
            GeneMap.mutationCount++
        }

    }

    clone() {

        const newGeneMap = new GeneMap(new Map())

        for (const [key, value] of this.genes.entries()) {
            newGeneMap.set(key, value)
        }
        return newGeneMap

    }

}