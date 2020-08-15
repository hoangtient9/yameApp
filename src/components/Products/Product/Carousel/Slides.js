import React, { useEffect, useRef} from 'react';

import classes from './Slides.module.scss';

const Carousel = props => {
    const myRef = useRef(null);
    let couter = 1;

    useEffect(() => {
        if (props.slides.length > 1) {
            const size = myRef.current.children[couter].clientWidth;
            myRef.current.style.transform = `translateX(${-size * couter}px)`;
            let goNext = setInterval(() => {
                if (couter >= myRef.current.children.length -1) return
                    const size = myRef.current.children[couter].clientWidth;
                    couter++
                    myRef.current.style.transform = `translateX(${-size * couter}px)`;
                    myRef.current.style.transition = `transform 0.7s ease-in-out`;
            }, 3000);
            return () => {
                clearInterval(goNext)
            }
        }
    }, [couter, props.slides])

    const preCouter = () => {
        if(myRef.current.children[couter].id === 'lastClone'){
            const size = myRef.current.children[couter].clientWidth;
            myRef.current.style.transition = 'none';
            couter = myRef.current.children.length - 2;
            myRef.current.style.transform = `translateX(${-size * couter}px)`;
        }
        if(myRef.current.children[couter].id === 'firstClone'){
            const size = myRef.current.children[couter].clientWidth;
            myRef.current.style.transition = 'none';
            couter = myRef.current.children.length - couter;
            myRef.current.style.transform = `translateX(${-size * couter}px)`;
        }
    }

    if(props.slides.length === 0){
        return null
    }

    return (
        <div className={classes.Carousel} ref={myRef} onTransitionEnd={preCouter}>
            <div className={classes.Slide} id='lastClone'>
                <img src={props.slides[props.slides.length -1]} alt='anh loi' loading='lazy'/>
            </div>
            {props.slides.map((slide, i) => (
                <div key={i} className={classes.Slide}>
                    <img  src={slide} alt='anh loi' loading='lazy'/>
                </div> 
            ))}
            <div className={classes.Slide} id='firstClone'>
                <img src={props.slides[0]} alt='anh loi' loading='lazy'/>
            </div>
        </div>
    )
}

export default Carousel
