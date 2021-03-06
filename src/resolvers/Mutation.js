const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {APP_SECRET, getUserId} = require('../utils')

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({...args, password})
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({email: args.email})
    if(!user){
        throw new Error('No such user found')
    }
    const valid = bcrypt.compare(args.password, user.password)
    if(!valid){
        throw new Error('Password Invalid')
    }
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user
    }
}


function post(parent, {url, description}, context, info) {
    const userId = getUserId(context)
    return context.prisma.createLink({
        url,
        description,
        postedBy: {connect: {id: userId}}
    })
}

async function vote(parent, {linkId}, context, info){
    const userId = getUserId(context)
    const voteExists = await context.prisma.$exists.vote({
        user: {id: userId},
        link: {id: linkId}
    })
    if(voteExists){
        throw new Error(`Already voted for link: ${linkId}`)
    }
    return context.prisma.createVote({
        link: {connect: {id: linkId}},
        user: {connect: {id: userId}}        
    })
}

module.exports = {
    post,
    vote,
    signup,
    login,
}