import { useQuery, gql, } from '@apollo/client';
import { useState } from 'react';
import { GET_BOOKS } from '../queries/queries';
import BookDetails from './BookDetails';

function BookList() {
    const [selectedBook, setSelectBook] = useState(null);
    const { loading, error, data } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <ul id="book-list">
                {data.books.map(({ id, name, }) => (
                    <li key={id}  onClick={() => setSelectBook(id)}>
                        {name}
                    </li>
                ))}
            </ul>

            {selectedBook && <BookDetails bookId={selectedBook} />}
        </div>
    )

}

export default BookList;