import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Genres = () => {
    const [genres, setGenres] = useState([]);

    const fetchGenres = async () => {
        try {
            const response = await fetch ("http://localhost:3000/genres");
            const data = await response.json();
            setGenres(data);
        } catch(err) {
            console.error(err)
        }
    }

    const deleteGenre = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/genres/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json();
            const filteredGenres = genres.filter(genre => genres.id !== data.id);
            setGenres(filteredGenres);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    return(
        <div className="Genres">
            <h1>Genres</h1>
        {
            genres.map((genre, index) => {
                return(
                    <div
                    key={index}
                    >
                        <Link to={`/genres/${genre.id}`}>
                            {genre.name}
                        </Link>

                        <button
                        onClick={() => { deleteGenre(genre.id) }}
                        >
                        Delete
                        </button>
                    </div>
                )
            })
        }
        </div>
    )
}

export default Genres;