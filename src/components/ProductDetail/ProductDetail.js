import React, { useState } from 'react';

import classes from './ProductDetail.module.scss';
import {convertNumber} from '../../shared/ultility'

const ProductDetail = props => {
    const [indexState, setIndexState] = useState(0);

    const listLi = props.data.size.map((s, i) => (
        <li key={i} >
            <div>
                <p>{props.data.id}</p>
            </div>
            <div >{props.data.colors[indexState]}, {s}</div>
            <div>
                <button 
                    onClick={() => props.clicked({
                        id: props.data.id,
                        color: props.data.colors[indexState],
                        size: s,
                        image: props.data.image[indexState],
                        price: props.data.price,
                        name: props.data.name,
                        quantity: 1,
                })}
                >Buy</button>
            </div>
        </li>
    ))
    
    return (
        <div className={classes.ProductInfo}>
            <div className={classes.ProductInfo__Head}>
                <div className={classes.HeadImage}>
                    <img src={props.data.image[indexState]} alt={props.data.colors[indexState]}/>
                </div>
                <div className={classes.HeadInfo}>
                    <div>
                        <div className={classes.HeadInfo__Price}>
                            <h4>{props.data.name}</h4>
                            <h5>đ {convertNumber(props.data.price)}</h5>
                            <ul>{listLi}</ul>
                        </div>
                        <div className={classes.HeadInfo__Descreption}>
                            <h4>Descreption</h4>
                            Chất liệu: Cotton
                            <br />
                            Thành phần: 95% cotton, 5% spandex
                            <br />
                             - Co dãn 4 chiều nên tạo được sự thoải mái khi mặc
                            <br />
                             - Vải thấm hút mồ hôi tốt, thoáng khí
                        </div>
                    </div>
                    <div>
                        {
                            props.data.image.map((p, i) => (
                                <div key={i} onClick={() => setIndexState(i)}>
                                    <img src={p} alt={'anh loi'}/>
                                </div>
                            ))
                        }  
                    </div>
                </div>
            </div>
            <div>
                {props.data.listImage.map((e, i) => (
                    <img key={i} src={e} alt={'anh loi'} />
                ))}
            </div>
        </div>
    )
}

export default ProductDetail;