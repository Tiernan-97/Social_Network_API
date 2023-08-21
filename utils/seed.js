const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThought, getRandomUser } = require('./data')


connection.on('error', (err) => err);

connection.once('open', async () => {
    
    // Checks to drop the databases.
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        console.log(`Users collection detected, dropping users...`)
        await User.deleteMany({})
    }

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        console.log(`Thoughts collection detected, dropping users...`)
        await Thought.deleteMany({})
    }
    // Array of users
    let users = []

    // Loop to create users and their email.
    for (let i = 0; i < 5; i++) {
        const username = getRandomUser(i)
        const email = `${username}@mail.com`

        users.push({
            username,
            email,
        })
    }

    await User.collection.insertMany(users)
    
    // Creates a new thought.
    for (let i = 0; i < 5; i++) {
        const user = getRandomUser(i)

        const newThought = await Thought.insertMany({
            thoughtText: getRandomThought(i),
            userId: user.id,
            username: user,
        })

        // Adds thoughts to a user.
        await User.findOneAndUpdate(
            { username: user },
            { $addToSet: {thoughts: newThought} },
            { new:true }
        )
    }

    console.info('Seeding complete! 🌱');
    process.exit(0);
})