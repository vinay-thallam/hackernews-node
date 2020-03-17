const {GraphQLServer} = require('graphql-yoga')

let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL New'
}]
let idCount = links.length
const resolvers = {
    Query: {
        info: () => 'This is the API for HackerNews Clone 2',
        feed: () => links,
        link: (parent, {id}) => links.filter(link => link.id === id)[0]
    },
    Mutation: {
        post: (parent, {description, url}) => {
            const link = {
                id: `link-${idCount++}`,
                description,
                url
            }
            links.push(link)
            return link
        },
        updateLink: (parent, {id, description, url}) => {
            let updatedLink = {}
            links = links.map((link) => {

                if(link.id === id){
                    return updatedLink = {
                        id,
                        description: description || link.description,
                        url: url || link.url,
                    }
                }
                return {...link} 
            })
            return updatedLink
        },
        deleteLink: (parent, {id}) => {
            let deletedLink = links.filter(link => link.id === id)[0]
            links = links.reduce((acc, link) => {
                if(link.id !== id){
                    acc.push(link)
                }
                return acc
            }, [])
            return deletedLink
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', 
    resolvers
})

server.start(() => console.log(`server is running on http://localhost:4000`))