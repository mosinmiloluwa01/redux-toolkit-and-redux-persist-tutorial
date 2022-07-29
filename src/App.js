import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {sendCartData, fetchCartData} from './store/actions/cart-actions';
import {updateToken} from './store/actions/user-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector(state => state.uiReducer.cartIsVisible);
  const cart = useSelector(state => state.cartReducer)
  const notification = useSelector(state => state.uiReducer.notification)
  console.log(cart)

  useEffect(() => {
    dispatch(fetchCartData(cart))
  }, [dispatch])

  useEffect(() => {
    if(isInitial) {
      isInitial = false;
      return
    }
    if(cart.changed) {
      //dispatch can accept dispatch obj and action creators that returns functions
      //when it sees its a function instead of obj, it exec the function as passes dispatch as an arg by default
      dispatch(sendCartData(cart))
      dispatch(updateToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"))
    }
  }, [cart, dispatch])
  return (
    <>
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message} 
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
