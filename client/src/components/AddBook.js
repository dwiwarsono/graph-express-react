import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ADD_BOOK, GET_AUTHORS, GET_BOOKS } from '../queries/queries';

function AddBook() {
    const [valueAdd, setValueAdd] = useState({
        name: '',
        genre: '',
        authorId: ''
    })
    const { loading, error, data } = useQuery(GET_AUTHORS);
    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries: [
            { query: GET_BOOKS }
        ],
    });

    const handleChange = (e) => {
        const name = e.target.name;
        setValueAdd({
            ...valueAdd,
            [name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        addBook({ variables: valueAdd })
        setValueAdd(
            {
                name: '',
                genre: '',
                authorId: ''
            }
        )
    }

    if (error) return <p>Error :(</p>;

    return (
        <form id="add-book" onSubmit={handleSubmit}>
            <div className='field'>
                <label>Book name</label>
                <input type="text" name="name" placeholder='Name of the book' value={valueAdd?.name} onChange={handleChange} />
            </div>
            <div className='field'>
                <label>Genre</label>
                <input type="text" name="genre" placeholder='Genre of the book' value={valueAdd?.genre} onChange={handleChange} />
            </div>
            <div className='field'>
                <label>Book name</label>
                <select name='authorId' onChange={handleChange} value={valueAdd?.authorId}>
                <option  value="">Select the Author</option>
                    {loading ? <option disabled>Loading Author...</option> :
                        data?.authors?.map(({ id, name }) => (
                            // <option>{name}</option>
                            <option key={id} value={id}>{name}</option>
                        ))}
                </select>
            </div>
            {
                valueAdd?.name && valueAdd?.genre && valueAdd?.authorId &&
            <button>+</button>
            }
        </form>
    )
}

export default AddBook;