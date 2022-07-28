import axios from 'axios'
import React ,{useState,useEffect } from 'react';
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';

function Movie() {
    const [content, setContent] = useState([])
    const [page,setPage]=useState(1);
    const[numberOfPages,setNumberOfPages]=useState();

    const getMovies=async()=>{
        const{data}= await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
        console.log(data);
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    }

    useEffect(() => {
       getMovies();
    }, [page])

    return (
        <div>
            Movie
            <div className="trending">
                {content && content.map(data => {
                    return <SingleContent
                        key={data.id}
                        id={data.id}
                        poster={data.poster_path}
                        title={data.title || data.name}
                        date={data.first_air_date || data.release_date}
                        media_type="movies"
                        vote_average={data.vote_average}
                    />
                })}
            </div>
            {numberOfPages>1 &&
            <CustomPagination setPage={setPage} numberOfPages={numberOfPages}/>
            }
        </div>
    )
}

export default Movie
