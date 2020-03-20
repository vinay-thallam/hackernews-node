const {GraphQLServer} = require('graphql-yoga')
const {prisma} = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const Link = require('./resolvers/Link')
const User = require('./resolvers/User')

const resolvers = {
    Query,
    Mutation,
    Subscription,
    Link,
    User
}

// const resolvers = {
//     Query: {
//         info: () => 'This is the API for HackerNews Clone 2',
//         feed: (root, args, context, info) => {
//             return context.prisma.links()
//         },
//         // link: (parent, {id}) => links.filter(link => link.id === id)[0]
//     },
//     Mutation: {
//         post: (root, args, context) => {
//             return context.prisma.createLink({
//                 url: args.url,
//                 description: args.description
//             })
//         },
//         // updateLink: (parent, {id, description, url}) => {
//         //     let updatedLink = {}
//         //     links = links.map((link) => {

//         //         if(link.id === id){
//         //             return updatedLink = {
//         //                 id,
//         //                 description: description || link.description,
//         //                 url: url || link.url,
//         //             }
//         //         }
//         //         return {...link} 
//         //     })
//         //     return updatedLink
//         // },
//         // deleteLink: (parent, {id}) => {
//         //     let deletedLink = links.filter(link => link.id === id)[0]
//         //     links = links.reduce((acc, link) => {
//         //         if(link.id !== id){
//         //             acc.push(link)
//         //         }
//         //         return acc
//         //     }, [])
//         //     return deletedLink
//         // }
//     }
// }

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

server.start(() => console.log(`server is running on http://localhost:4000`))