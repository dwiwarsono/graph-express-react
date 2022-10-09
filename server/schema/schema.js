const graphql = require("graphql");
const _ = require("lodash");

const Book = require("../models/book");
const Author = require("../models/author");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;

// DUMMY DATA
let books = [
    { name: "Name Book 1", genre: 'Horror 1', id: '1', authorId: '1' },
    { name: "Name Book 2", genre: 'Horror 2', id: '2', authorId: '2' },
    { name: "Name Book 3", genre: 'Horror 3', id: '3', authorId: '3' },
    { name: "Name Book 4", genre: 'Horror 4', id: '4', authorId: '2' },
    { name: "Name Book 5", genre: 'Horror 5', id: '5', authorId: '3' },
    { name: "Name Book 6", genre: 'Horror 6', id: '6', authorId: '3' },
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
        genre: { type: GraphQLString },
        author: { // Author disini foreign key ke AuthorType (Parent nya) berdasarkan authorId yang ada di books
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                // return _.find(authors, { id: parent.authorId })

                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: { // Books Disini foreign key ke BookType, dengan menampilkan list mana saja data yang memiliki foreign key dengan author berdasarkan id
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id})

                return Book.find({authorId: parent.id})
            }
        }
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
                console.log(typeof (args.id));
                // return _.find(books, { id: args.id })

                return Book.findById(args.id)
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })

                return Author.findById(args.id)
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books

                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors

                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, // GraphQLNonNull mencegah agar name harus di isi (required)
                age: {type: new GraphQLNonNull(GraphQLInt)} // GraphQLNonNull mencegah agar age harus di isi (required)
            },
            resolve(parent, args){
                console.log(args);
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                console.log(author);
                return author.save()
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, // GraphQLNonNull mencegah agar name harus di isi (required)
                genre: {type: new GraphQLNonNull(GraphQLString)}, // GraphQLNonNull mencegah agar genre harus di isi (required)
                authorId: {type: new GraphQLNonNull(GraphQLID)}, // GraphQLNonNull mencegah agar authorId harus di isi (required)

            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})