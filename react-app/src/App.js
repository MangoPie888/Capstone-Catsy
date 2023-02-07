import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import AllProducts from './components/products/AllProducts';
import ProductDetail from './components/products/ProductDetail';
import CreateProductForm from './components/products/CreateProductForm';
import UserProducts from './components/products/UserProducts';
import EditProductForm from './components/products/EditProductForm';
import DisplayShoppingCarts from './components/carts/DisplayShoppingCarts';
import Future from './components/Future';
import Checkout from './components/carts/Checkout';
import Footer from './components/Footer';
import CreateShop from './components/shop/CreateShop';
import UploadPicture from './components/products/AddImages';
import MyOrder from './components/carts/MyOrder';
import MyReviews from './components/reviews/MyReviews';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/myproducts' exact={true} >
          <UserProducts />
        </ProtectedRoute>
        <ProtectedRoute path='/myorders' exact={true} >
          <MyOrder />
        </ProtectedRoute>
        <ProtectedRoute path='/carts' exact={true} >
          <DisplayShoppingCarts />
        </ProtectedRoute>
        <ProtectedRoute path='/success' exact={true} >
          <Checkout />
        </ProtectedRoute>
        <ProtectedRoute path='/createShop' exact={true} >
          <CreateShop />
        </ProtectedRoute>
        <ProtectedRoute path='/myreviews' exact={true} >
          <MyReviews />
        </ProtectedRoute>
        <Route path='/future' exact={true} >
          <Future/>
        </Route>
        <Route path='/products/new' exact={true} >
          <CreateProductForm />
        </Route>
        <Route path='/products/edit' exact={true} >
          <EditProductForm/>
        </Route>
        <Route path='/products/:productId' exact={true} >
          <ProductDetail/>
        </Route>
        <Route path='/images' exact={true} >
          <UploadPicture/>
        </Route>
        <Route path='' exact={true} >
          <AllProducts/>
        </Route>
      
      </Switch>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
