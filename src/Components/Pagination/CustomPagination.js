import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Pagination } from '@mui/material'
import './CustomPagination.css';


const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
});

function CustomPagination(props) {
    const {setPage}=props;
    const [numberOfPages, setNumberOfPages] = useState(props.numberOfPages?props.numberOfPages:10)
    const handlePageChange = (page) => {
        setPage(page);
        setNumberOfPages(props.numberOfPages?props.numberOfPages:10);
        window.scroll(0, 0);
    }
    return (
        <div className="pagination">
            <ThemeProvider theme={darkTheme}>

                <Pagination
                    count={numberOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)} 
                    hideNextButton
                    hidePrevButton
                    color="primary"
                    />
                    
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
