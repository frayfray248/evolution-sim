const GENES = {
    LIFESPAN: 'Lifespan',
    GROWTH_RATE: 'Growth Rate',
    REPRODUCTION_COST: 'Reproduction Cost',
    RADIUS: "Radius",
    SEED_SPREAD: "Seed Spread",
    ENERGY_GAIN_RATE: "Energy Gain Rate"
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

    mutate() {

        for (const [key, value] of this.genes.entries()) {

            this.mutateGene(key)

        }

    }

    mutateGene(gene) {

        const mutationCheck = Math.floor(Math.random() * 100) + 1

        
        if (mutationCheck < SETTINGS.MUTATION_CHANCE) {
            const oldVal = this.genes.get(gene)
            const mutationMultiplyer = (((Math.floor(Math.random() * SETTINGS.MUTATION_MULTIPLYER_RANGE * 2) + 1) - SETTINGS.MUTATION_MULTIPLYER_RANGE) / 100) + 1
            this.genes.set(gene, oldVal * mutationMultiplyer)
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