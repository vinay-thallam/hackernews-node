function newLinkSubscribe(parent, args, context, info){
    return context.prisma.$subscribe.link({mutation_in: ['CREATED']}).node()
}

const newLink = {
    subscribe: newLinkSubscribe,
    resolve: payload => payload
}

module.exports = {
    newLink
}