import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/slices/ui-slice';
import {persistor} from '../../store/index'

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cartReducer.totalQuantity)
  const token = useSelector(state => state.userReducer.token)
  console.log("token>>>",token)

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }
  const logout = () => {
    persistor.purge();
    localStorage.clear();
  }
  return (
    <>
      <button className={classes.button} onClick={toggleCartHandler}>
        <span>My Cart</span>
        <span className={classes.badge}>{cartQuantity}</span>
      </button>
      <button className={classes.button} onClick={logout}>
        <span>logout</span>
      </button>
    </>
  );
};

export default CartButton;
