import React,{useEffect} from 'react';
import axios from 'axios';
import { Chip } from '@mui/material';

function Genres(props) {
    const {type,selectedGenres,setSelectedGenres,genres,setGenres,setPage}=props;

    const fetchGenres=async ()=>{
        const response=await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        
        // console.log("genres",response.data.genres);
        setGenres(response.data.genres);
    }

    const handleAddSelected=(genre)=>{
        setSelectedGenres([...selectedGenres,genre]);
        setGenres(genres.filter((g)=>g.id!==genre.id));
        setPage(0);
        setPage(1);
        // console.log(selectedGenres);
    }

    const handleRemoveSelected=(genre)=>{
        setSelectedGenres(selectedGenres.filter((g)=>g.id!==genre.id));
        setGenres([...genres,genre].sort());
        setPage(0);
        setPage(1);
        // console.log(selectedGenres);
    }
    useEffect(() => {
      fetchGenres();

      return ()=>{
          setGenres({});
      }
      // eslint-disable-next-line
    }, [])
    
  return (
    <div style={{padding:"6px 0px"}}>
        {   selectedGenres && selectedGenres.map((selected)=>{
                return <Chip 
                        label={selected.name}
                        style={{margin:2,backgroundColor:"blue",color:"white"}} 
                        size="small"
                        key={selected.id}
                        clickable
                        onDelete={()=>handleRemoveSelected(selected)}
                            />
        })
        }
        {
            genres && genres.map((genre)=>{
                return <Chip
                           label={genre.name}
                           style={{margin:2,backgroundColor:"white",color:"black"}} 
                           size="small"
                           key={genre.id}
                            clickable
                            onClick={()=>handleAddSelected(genre)}
                            />
            })
        }
    </div>
  )
}

export default Genres