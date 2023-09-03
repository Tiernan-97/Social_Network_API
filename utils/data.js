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

// const getRandomReaction = (i) => {
//     const reactions = [
//         "that is good",
//         "that is bad",
//         "that's alright",
//         "that's terrible",
//         "just awful"
//     ]
//     return reactions[i]
// }

module.exports = {getRandomThought, getRandomUser, getRandomReaction};