import React from 'react';

import classes from './Products.module.scss';
import Product from './Product/Product';

const Products = props => {
    let products = (
        props.data.map((product, i) => (
            <div key={i} className={classes.Item}>
                <Product data={product} key={i}/>
            </div>
        ))   
    );

    if (props.data.length <= 2 && props.big){
        products = (
            props.data.map((product, i) => (
                <div key={i} className={[classes.Item, classes.BigItem].join(' ')}>
                    <Product data={product} key={i}/>
                </div>
            )) 
        )
    }
    
    return (
        <div className={classes.Products}>
            {products}
        </div>
    )
}

export default Products;