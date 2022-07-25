import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Pagination } from '@mui/material'
import './CustomPagination.css';


const darkTheme = createTheme({
    palette: {
        mode: "dark"
    },
});

function CustomPagination({ setPage }) {
    const [numberOfPages, setNumberOfPages] = useState(10)
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    }
    return (
        <div className="pagination">
            <ThemeProvider theme={darkTheme}>

                <Pagination
                    count={numberOfPages}
                    onChange={(e) => handlePageChange(e.target.textContent)} />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
