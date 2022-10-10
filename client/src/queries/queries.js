import { useQuery, gql, useMutation,  } from '@apollo/client';


const GET_BOOKS = gql`
{
  books {
    id
    name
    genre
   
  }
}
`;


const GET_AUTHORS = gql`
{
    authors {
      name
      id
  }
}
`;


const ADD_BOOK = gql`
mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        id
    }
}`;

const GET_BOOK_DETAILS = gql`
    query($id: ID) {
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK_DETAILS };