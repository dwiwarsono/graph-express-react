import { useQuery } from "@apollo/client";
import { GET_BOOK_DETAILS } from "../queries/queries";


function BookDetails({ bookId }) {
    const { loading, error, data } = useQuery(GET_BOOK_DETAILS, {
        variables: { id: bookId },
    });

    if (loading) return <p>Loading...</p>;
    const DisplayBookDetails = () => {
        const { book } = data;
        if (data?.book) {
            return (
                <div>
                    <h2>{data?.book?.name}</h2>
                    <p>{data?.book?.genre}</p>
                    <p>{data?.book?.author?.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {data?.book?.author?.books.map(item => {
                            return <li key={item?.id}>{item?.name}</li>
                        })}
                    </ul>
                </div>
            );
        } else {
            return (<div>No book selected...</div>);
        }
    }

    return (
        <div id="book-details">
            <DisplayBookDetails />
        </div>
    )
}

export default BookDetails;