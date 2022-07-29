import { uiActions } from "../slices/ui-slice";
import { cartActions } from "../slices/cart-slice";

export const fetchCartData = () => {
  return async (dispatch )=> {
    const fetchData = async () => {
      const response = await fetch('https://meal-app-f1a7c-default-rtdb.firebaseio.com/cartitems.json')
      if(!response.ok) {
        throw new Error("Something went wrong")
      }
      const data = await response.json();
      return data;
    }
    try {
      const cartData = await fetchData();
      dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity || 0
      }))
      
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "error",
        message: "error"
      }))
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending..."
      })
    )
    const sendRequest = async () => {
      const response = await fetch('https://meal-app-f1a7c-default-rtdb.firebaseio.com/cartitems.json', 
    {
      method: 'PUT',
      body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity})
    })
    if(!response.ok) {
      throw new Error("Something went wrong")
    }
    }
    try {
      await sendRequest()
      dispatch(uiActions.showNotification({
        status: "success",
        title: "success",
        message: "success"
      }))
    } catch (error) {
      dispatch(uiActions.showNotification({
        status: "error",
        title: "error",
        message: "error"
      }))
    }
  }
}