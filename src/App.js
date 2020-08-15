import React, { Suspense, lazy, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom';

import * as actions from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';
import Layout from './hoc/Layout/Layout';
import Spinner from './components/UI/Spinner/Spinner';

const Home = lazy(() => import('./containers/Home/Home'));
const Search = lazy(() => import('./containers/Search/Search'));
// const AddProduct = lazy(() => import('./components/AddNewProduct/AddProduct/AddProduct'));
// const AddPoster = lazy(() => import('./components/AddNewProduct/AddPoster/AddPoster'));
const ProductInfo = lazy(() => import('./containers/ProductInfo/productInfo'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = props =>{
  const dispatch = useDispatch();
  const onGetCheckout = useCallback(() => dispatch(actions.getCheckout()), [dispatch]);
  const onAuthCheckState= useCallback(() => dispatch(actions.authCheckState()), [dispatch]);
  const isAuthenticated = useSelector(state => state.auth.token != null);

  useEffect(() => {
    onGetCheckout()
    onAuthCheckState()
  }, [onGetCheckout, onAuthCheckState])

  let routes = 
    <Switch>
      <Route path='/search' render={props => <Search {...props}/>} />
      <Route path='/product/:id' render={props => <ProductInfo {...props}/>} />
      <Route path='/checkout' render={props => <Checkout {...props}/>} />
      <Route path='/auth' render={props => <Auth {...props}/>} />
      <Route path='/' exact render={props => <Home {...props}/>} />
      <Redirect to='/' />
    </Switch>

  if (isAuthenticated) {
    routes = 
      <Switch>
          <Route path='/search' render={props => <Search {...props}/>} />
          <Route path='/product/:id' render={props => <ProductInfo {...props}/>} />
          {/* <Route path='/addProduct' render={props => <AddProduct {...props}/>} />
          <Route path='/addPoster' render={props => <AddPoster {...props}/>} /> */}
          <Route path='/checkout' render={props => <Checkout {...props}/>} />
          <Route path='/logout' component={Logout}/>
          <Route path='/auth' render={props => <Auth {...props}/>} />
          <Route path='/orders' render={props => <Orders {...props}/>} />
          <Route path='/' exact render={props => <Home {...props}/>} />
          <Redirect to='/' />
      </Switch>
  }

  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        {routes}
      </Suspense>
    </Layout>
  );
}

export default App;
