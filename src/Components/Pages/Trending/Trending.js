import axios from 'axios'
import React,{useState,useEffect} from 'react'

function Trending() {
    const [content, setContent] = useState([])
    const getData=async ()=>{
        const {data}=await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
        );

        setContent(data.results);
        console.log(data);
    }

    useEffect(() => {
       getData();
    }, [])
    return (
        <div>
            <span className="pageTitle">
                Trending 
            </span>
            <div className="trending">
                {content &&  content.map(d=>{
                    return console.log(d);
                })}
            </div>
        </div>
    )
}

export default Trending
