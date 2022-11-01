const STATS = {
    PLANTS : "Plants",
    HERBIVORES : "Herbivores",
    CARNIVORES : "Carnivores",
    MUTATIONS : "Mutations"
}

const ENTITY_STATS = {
    ID : "ID",
    TYPE : "Type",
    POSITION : "Position",
    ACTION : "Action",
    AGE : "Age",
    ENERGY : "Energy",
    REPRODUCTION_COST : "Reproduction Cost"
}

const updateStats = (stats) => {

    for (const [key, value] of Object.entries(stats)) {

        $(`#stat${key}`).html(value)

    }

}

const updateEntityStats = (stats) => {

    

    if (stats) {
        $('.entity').empty()
        for (const [key, value] of Object.entries(stats)) {
            console.log(`#entity${key.replace(/ /g,'')}`)
            $(`#entity${key.replace(/ /g,'')}`).html(value)
    
        }
    
    }
    else {
        $('.entity').empty()
    }

    
}