import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const allItems = useSelector((state) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {allItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              price: item.price,
              total: item.totalPrice,
              title: item.name,
              quantity: item.quantity,
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
