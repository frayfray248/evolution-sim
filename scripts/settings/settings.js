const SETTINGS = {
    MAX_PLANTS: 500,
    MAX_HERBIVORES: 200,
    MAX_CARNIVORES: 100,
    STARTING_PLANTS: 100,
    STARTING_HERBIVORES: 20,
    STARTING_CARNIVORES: 6,
    DEBUG: false,

    // mutations
    MUTATION_CHANCE: 5,
    MUTATION_MULTIPLYER_RANGE: 5,

    ENTITY: {
        WANDER_RANGE: 50,
        PLANT: {
            LIFESPAN: 5000,
            GROWTH_RATE: 100,
            ENERGY_GAIN_RATE: 50,
            REPRODUCTION_COST: 100,
            SEED_SPREAD: 200,
            RADIUS: 3,
            COLOR: 'lime'
        },
        HERBIVORE: {
            LIFESPAN: 3000,
            GROWTH_RATE: 100,
            ENERGY_GAIN_RATE: 50,
            REPRODUCTION_COST: 400,
            RADIUS: 5,
            SIGHT_RANGE: 60,
            SPEED: 40,
            SPRINT_MULTIPLYER: 1.2,
            SPRINT_ENERGY_COST: 3,
            BOLDNESS: 1.0
        },
        CARNIVORE: {
            LIFESPAN: 4500,
            GROWTH_RATE: 100,
            ENERGY_GAIN_RATE: 50,
            REPRODUCTION_COST: 500,
            RADIUS: 7,
            SIGHT_RANGE: 90,
            SPEED: 50,
            SPRINT_MULTIPLYER: 1.2,
            SPRINT_ENERGY_COST: 3
        }
    }
}