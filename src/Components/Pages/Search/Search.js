import React, { useState } from 'react';
import { Tab, Tabs, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useEffect } from 'react';
import CustomPagination from '../../Pagination/CustomPagination';
import SingleContent from '../../SingleContent/SingleContent';

function Search() {
    const darkTheme = createTheme({
        palette: {
            mode: "dark"
        },
    });
    const [type, setType] = useState(0);
    const [searchtext, setSearchText] = useState("");
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([])
    const [numberOfPages, setNumberOfPages] = useState();

    const getSearch = async () => {
        let response;
        console.log("aa");
        try{
            response = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchtext}&page=${page}&include_adult=false`);
            const {data}=response;
            setContent(data.results);
            setNumberOfPages(data.total_pages > 500 ? 500 : data.total_pages);
        }
        catch (error){
            
                console.log("Error",error);
            
        }
        // setNumberOfPages(data.total_pages);
    }

    // const doaction=function(action,time){
    //     let timer;
    //     return function(){
    //         let context=this;
    //         // let argument=args;
    //         clearTimeout(timer);
    //         timer=setTimeout(()=>{
    //             getSearch.apply(context);
    //         },time);
    //     }
    // }

    // const onPress= doaction(getSearch,2000);


    const updateSearchText = (e) => {

        setSearchText(e.target.value);
        // onPress();

    }

    useEffect(() => {
        window.scroll(0, 0);
        const timer=setTimeout(()=>{
            getSearch();
        },500);

        return ()=>clearTimeout(timer);
        // eslint-disable-next-line 
    }, [type, page,searchtext]);

    return (
        <>
            {/* <div className="pageTitle">
                Search
            </div> */}
            <ThemeProvider theme={darkTheme}>
                <div style={{ display: "flex" }}>

                    <TextField
                        style={{ flex: 1, width: "100%", textAlign: "center", marginTop:"10px", zIndex:101 }}
                        className="seacrhBox"
                        label="Search"
                        variant="filled"
                        value={searchtext}
                        onChange={updateSearchText}
                        // onkeyup={onPress()}
                    >
                    </TextField>
                    <button style={{height:"72px"}} onClick={getSearch}>🔍</button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(evt, newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}

                >
                    <Tab style={{ width: "50%" }} label="Search Movies" />
                    <Tab style={{ width: "50%" }} label="Search Tv Shows" />
                </Tabs>
            </ThemeProvider>
            <div className="trending">
                {content && content.map(data => {
                    return <SingleContent
                        key={data.id}
                        id={data.id}
                        poster={data.poster_path}
                        title={data.title || data.name}
                        date={data.first_air_date || data.release_date}
                        media_type={type ? "tv" : "movie"}
                        vote_average={data.vote_average}
                    />
                })}
                {
                    searchtext &&
                    content.length<1 &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movie Found</h2>)
                }
            </div>
            {numberOfPages > 1 &&
                <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            }
        </>
    )
}

export default Search
