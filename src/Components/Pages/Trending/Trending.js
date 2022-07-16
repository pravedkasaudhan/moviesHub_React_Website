import axios from 'axios'
import React, { useState, useEffect } from 'react'
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';
import './Trending.css';

function Trending() {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)
    const getTrendingData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        );

        setContent(data.results);
        console.log(data);
    }
   

    useEffect(() => {
        getTrendingData();
    }, [page])
    return (
        <div>
            <span className="pageTitle">TRENDING</span>
            <div className="trending">
                {content && content.map(data => {
                    return <SingleContent
                        key={data.id}
                        id={data.id}
                        poster={data.poster_path}
                        title={data.title || data.name}
                        date={data.first_air_date || data.release_date}
                        media_type={data.media_type}
                        vote_average={data.vote_average}
                    />
                })}
            </div>
            <CustomPagination setPage={setPage}/>
        </div>
    )
}

export default Trending
