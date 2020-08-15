import React from 'react';

import classes from './Poster.module.scss';

const Poster = props => {
    const listPoster = props.data.map((poster, i) => (
        <div key={i} className={classes.PosterItem}>
            <div>
                <h4>{poster.addData.title}</h4>
            </div>
            <div>
                <img src={poster.addData.image} alt="Img err" loading='lazy'/>
            </div>
            <div className={classes.ListImage}>
                {poster.addData.listImage.map((a, ind) => (
                    <div key={ind}>
                        <img src={a} alt='img err' loading='lazy'/>
                    </div>
                ))}
            </div>
        </div>
    ));

    return (
        <div className={classes.Poster}>
            {listPoster} 
        </div>
    )
}

export default Poster;