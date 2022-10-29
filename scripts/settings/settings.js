const SETTINGS = {
    MAX_PLANTS : 500,
    MAX_HERBIVORES : 200,
    STARTING_PLANTS : 100,
    STARTING_HERBIVORES : 20,

    ENTITY : {
        PLANT : {
            LIFESPAN : 5000,
            GROWTH_RATE : 100,
            ENERGY_GAIN_RATE: 50,
            REPRODUCTION_COST: 200,
            SEED_SPREAD : 100,
            RADIUS : 3,
            COLOR: 'lime'
        },
        HERBIVORE : {
            LIFESPAN : 1700,
            GROWTH_RATE : 100,
            ENERGY_GAIN_RATE : 50,
            REPRODUCTION_COST : 300,
            RADIUS : 5,
            SIGHT_RANGE : 60,
            SPEED : 70,
            SPRINT_MULTIPLYER : 1.2,
            SPRINT_ENERGY_COST : 2,
            BOLDNESS : 1.0
        }
    }
}