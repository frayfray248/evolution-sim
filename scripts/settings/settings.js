const SETTINGS = {
    MAX_PLANTS : 500,
    MAX_HERBIVORES : 200,
    MAX_CARNIVORES : 100,
    STARTING_PLANTS : 100,
    STARTING_HERBIVORES : 20,
    STARTING_CARNIVORES : 8,

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
            ENERGY_GAIN_RATE : 55,
            REPRODUCTION_COST : 300,
            RADIUS : 5,
            SIGHT_RANGE : 60,
            SPEED : 76,
            SPRINT_MULTIPLYER : 1.2,
            SPRINT_ENERGY_COST : 2,
            BOLDNESS : 1.0
        },
        CARNIVORE : {
            LIFESPAN : 3000,
            GROWTH_RATE : 100,
            ENERGY_GAIN_RATE : 50,
            REPRODUCTION_COST : 400,
            RADIUS : 7,
            RED_COLOR : 204,
            GREEN_COLOR : 0,
            BLUE_COLOR: 0,
            SIGHT_RANGE : 70,
            SPEED : 90,
            SPRINT_MULTIPLYER : 1.2,
            SPRINT_ENERGY_COST : 2
        }
    }
}