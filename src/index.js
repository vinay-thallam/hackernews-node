const {GraphQLServer} = require('graphql-yoga')

const typeDefs = `
type Query{
    info: String!
    feed: [Link!]!
}
type Link{
    id: ID!
    description: String!
    url: String!
}`

const resolvers = {
    Query: {
        info: () => 'This is the API for HackerNews Clone 2',
        feed: () => links
    },
    Link: {
        id: (parent) => parent.id,
        url: (parent) => parent.url,
        description: (parent) => parent.description,
    }
}

const server = new GraphQLServer({
    typeDefs, 
    resolvers
})

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]

server.start(() => console.log(`server is running on http://localhost:4000`))