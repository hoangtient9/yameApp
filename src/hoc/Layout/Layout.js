import React, { useState, useRef, useLayoutEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';
import classes from './Layout.module.scss';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const myref = useRef(null) 
    const { pathname } = useLocation();
    const params = useParams();

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname, params])

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false)
        document.body.style.overflow = ''
      }
    
    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(prevState => !prevState)
        document.body.style.overflow = 'hidden'
    }

    return (
        <div ref={myref} className={showSideDrawer ? [classes.Layout, classes.Hidden].join(' ') : classes.Layout} >
            <SideDrawer open={showSideDrawer} closed={sideDrawerCloseHandler} />
            <Toolbar sideDrawerToggleClicked={sideDrawerToggleHandler} />
            <main>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;