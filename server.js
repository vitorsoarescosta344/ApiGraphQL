const { buildSchema } = require('graphql')
const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
require('./User')
const User = mongoose.model('user')

const schema = buildSchema(`
    type User {
        email: String,
        name: String,
        senha: String,

    },
    type Query {
        getUsers: [User],
        getUserInfo(nome: String) : User
    },
    type Mutation {
        updateUserInfo(email: String, name: String) : User
        createUser(name: String, email: String, senha: String) : User
        deleteUser(email: String) : User
    }
`)

const root = {
    getUsers: async (args, req) => {
        const user = await User.find({})
        console.log(user)
        return user
    },
    getUserInfo: async (args, req) => await User.findOne({ nome: args.nome }),
    updateUserInfo: async (args, req) => await User.updateOne({ email: args.email }, args),
    createUser: async (args, req) => {
        const user = await User.create(args)
        if (user) {
            console.log(user)
            return user
        }
    }
}

const app = express()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(4000)

console.log('listening on http://localhost:4000/graphql')
