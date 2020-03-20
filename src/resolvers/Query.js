function feed(parent, args, context, info) {
    const where = args.filter ? {
        OR: [
            {description_contains: args.filter},
            {url_contains: args.filter}
        ]
    } : {}
    return context.prisma.links({where})
}

module.exports = {
    feed,
}