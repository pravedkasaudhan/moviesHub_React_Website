import React from 'react'
import { img_300, img_500 } from '../../Config/config';
import { unavailable } from '../../Config/config';
import './SingleContent.css';
import { Badge } from '@mui/material';
import ContentModal from '../ContentModal/ContentModal';

function SingleContent(props) {
    const { id, poster, title, date, media_type, vote_average } = props;
    return (
        <ContentModal media_type={media_type} id={id}>

        <div className='media'>
            <Badge badgeContent={vote_average.toFixed(2)} color={vote_average < 7 ? "secondary" : "primary"}>
                {/* <MailIcon color="action" /> */}
            </Badge>
            <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
            <b className="title">{title}</b>
            <span className="sunTitle">{media_type == "tv" ? "Tv Series" : "Movie"}
                <span className="sunTitle">{date}</span>
            </span>
        </div>
        </ContentModal>
    )
}

export default SingleContent
