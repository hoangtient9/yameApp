import React from 'react';
import {Link} from 'react-router-dom';

import classes from './Product.module.scss';
import Carousel from './Carousel/Slides';
import {convertNumber} from '../../../shared/ultility';

const Product = props => {
    return (
        <div className={classes.Product}>
            <Link to={`/product/${props.data.id}`}>
                <div>
                <Carousel slides={props.data.image}/>
                </div>
                <div className={classes.ListImages}>
                    {props.data.image.map((image, i) => (
                        <div key={i}>
                            <img src={image} loading='lazy' alt='anh loi' />
                        </div>
                    ))}
                </div>
                <div className={classes.Price}>
                    <span>{convertNumber(props.data.price)}</span>
                </div>
            </Link>
        </div>
    )
}

export default Product;