const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;

// DUMMY DATA
let books = [
    { name: "Name Book 1", genre: 'Horror 1', id: '1' },
    { name: "Name Book 2", genre: 'Horror 2', id: '2' },
    { name: "Name Book 3", genre: 'Horror 3', id: '3' },
]

let authors = [
    { name: "Name Author 1", age: 44, id: '1' },
    { name: "Name Author 2", age: 45, id: '2' },
    { name: "Name Author 3", age: 66, id: '3' },
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source

                return _.find(books, { id: args.id })
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})