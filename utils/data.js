const getRandomUser = (i) => {

    const users = [
        "arriana",
        "taylor",
        "ed",
        "stormzy",
        "olivia"
    ]

    return users[i]

};


const getRandomThought = (i) => {
    const thoughts = [
        "thinking about something",
        "thinking about someone",
        "thinking about somewhere",
        "thinking about somewhy",
        "thinking about somehow"
    ]

    return thoughts[i]
}

module.exports = {getRandomThought, getRandomUser};