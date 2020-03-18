function postedBy(parent, args, context, info){
    context.prisma.link({id: parent.id}).postedBy()
}

module.exports = {
    postedBy,   
}