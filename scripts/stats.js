const STATS = {
    PLANTS : "Plants",
    HERBIVORES : "Herbivores",
    CARNIVORES : "Carnivores"
}

const updateStats = (stats) => {

    for (const [key, value] of Object.entries(stats)) {

        $(`#stat${key}`).html(value)

    }

}