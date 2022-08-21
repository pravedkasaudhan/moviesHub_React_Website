import axios from 'axios'
import React ,{useState,useEffect } from 'react';
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';
import Genres from '../../Genres.js';
import useGenres from '../../../hooks/useGenres';

function Series() {
    const [content, setContent] = useState([])
    const [page,setPage]=useState(1);
    const[numberOfPages,setNumberOfPages]=useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres,setGenres]=useState([]);
    const genreForUrl=useGenres(selectedGenres);


    const getSeries=async()=>{
        // const genreForUrl=selectedGenres.length>1?selectedGenres.map((genre)=>genre.id).reduce((acc,curr)=>acc+','+curr):"";
        
        const{data}= await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`);
        console.log(page);
        setContent(data.results);
        setNumberOfPages(data.total_pages>500?500:data.total_pages);
        // setNumberOfPages(data.total_pages);
    }

    useEffect(() => {
        getSeries();
       // eslint-disable-next-line
    }, [page,genreForUrl])



    return (
        <>
            <div className="pageTitle">
                Series
            </div>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />

            <div className="trending">
                {content && content.map(data => {
                    return <SingleContent
                        key={data.id}
                        id={data.id}
                        poster={data.poster_path}
                        title={data.title || data.name}
                        date={data.first_air_date || data.release_date}
                        media_type="tv"
                        vote_average={data.vote_average}
                    />
                })}
            </div>
            {numberOfPages > 1 &&
                <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            }
        </>
    )
}

export default Series
