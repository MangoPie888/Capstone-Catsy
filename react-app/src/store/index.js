import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import productsReducer, {productDetailReducer} from './products'
import { userProductReducer } from './products';
import cartReducer from './cart';
import shopReducer from './shop';
import purchasesReducer from './purchase';
import reviewsReducer from './review';
import userReviewReducer from './myreview';

const rootReducer = combineReducers({
  session,
  "products":productsReducer,
  "productDetail":productDetailReducer,
  "userProducts":userProductReducer,
  "carts":cartReducer,
  "shop":shopReducer,
  "purchases":purchasesReducer,
  "productReviews":reviewsReducer,
  "userReviews":userReviewReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
