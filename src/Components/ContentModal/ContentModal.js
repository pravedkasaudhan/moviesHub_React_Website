import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Typography from '@mui/material/Typography';
import './ContentModal.css';
import axios from 'axios';
import { img_300, img_500, unavailable, unavailableLandscape } from '../../Config/config';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "70%",
    height: "500px",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY:"scroll",
    p: 4,
    '&::-webkit-scrollbar': { display: "none" }
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data);
    }

    const getVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        console.log(data);
        setVideo(data.results[0]?.key);

    }

    useEffect(() => {
        getData();
        getVideo();
    }, []);

    return (
        <div>
            <div className="media" onClick={handleOpen}>
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {/* <Typography id="transition-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography> */}
                        {
                            content &&
                            (<div >
                                <div className="ContentModal">
                                    <img
                                        className='ContentModal_portrait'
                                        alt={content.name || content.title}
                                        src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />

                                    <img
                                        className='ContentModal_landscape'
                                        alt={content.name || content.title}
                                        src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable} />

                                    <div className="ContentModal_about">
                                        <span className="ContentModal_title">
                                            {content.name || content.title}
                                            (
                                            {(
                                                content.first_air_date || content.release_date || "-------"
                                            ).substring(0, 7)}
                                            )
                                        </span>
                                        <br />
                                        {content.tagline && (
                                            <i className='tagline'>{content.tagline}</i>
                                        )}
                                        <br />
                                        <span className="ContentModal_description">
                                            {content.overview}
                                        </span>

                                        <div></div>

                                        <Button
                                            variant="contained"
                                            startIcon={<YouTubeIcon />}
                                            color="error"
                                            target="_blank"
                                            href={`https://www.youtube.com/watch?v=${video}`}
                                        >
                                            WATCH thE TRAILER
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            )
                        }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
