import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { cartActions, uiActions } from "./store/index";

let firstTimeLoad = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending",
          message: "Sending cart data",
        })
      );
      const response = await fetch(
        "https://redux-toolkit-p-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Send cart data successfully",
        })
      );
    };
    if (firstTimeLoad) {
      firstTimeLoad = false;
      return;
    }
    if (cart.changed) {
      sendCartData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "Sending cart data failed!",
          })
        );
      });
    }
  }, [dispatch, cart]);

  useEffect(() => {
    const fetchCartData = async () => {
      const response = await fetch(
        "https://redux-toolkit-p-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error",
            message: "Sending cart data failed!",
          })
        );
      }
      const responseData = await response.json();

      dispatch(
        cartActions.replaceCart({
          items: responseData.items || [],
          totalQuantity: responseData.totalQuantity || 0,
        })
      );
    };
    fetchCartData();
  }, [dispatch]);

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
