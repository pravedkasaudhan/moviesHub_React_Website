import React ,{useState} from 'react'
import {  createTheme, Pagination } from '@mui/material'
import './CustomPagination.css';

const darkTheme=createTheme({ 
    palette:{
        type:"dark"
    }
});

function CustomPagination({setPage}) {
    const [numberOfPages, setNumberOfPages] = useState(1)
    const handlePageChange=(page)=>{
        setPage(page);
        window.scroll(0,0);
    }
    return (
        <div className="pagination">
            
            <Pagination 
                count={numberOfPages} 
                onChange={(e)=>handlePageChange(e.target.textContent)}/>
        </div>
    )
}

export default CustomPagination
