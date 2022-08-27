import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch , useSelector } from "react-redux";
import { useState } from "react";
import OrderDetail from "../components/OrderDetail";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
const Cart = () => {
  const [open , setOpen] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const router = useRouter();

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
        
        if (res.status === 201) 
        {
          dispatch(reset());
          router.push(`http://localhost:3000/order/${res.data._id}`);}
      
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {cart.products.map((product) => (
            <tr className={styles.tr} key = {product.id}>
            <td>
              <div className={styles.imgContainer}>
                <Image
                  src={product.img}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
            </td>
            <td>
              <span className={styles.name}>{product.title}</span>
            </td>
            <td>
              <span className={styles.extras}>
                {product.extras.map((extra) => (
                  <span key = {extra._id}>{extra.text}, </span>
                ))}
              </span>
            </td>
            <td>
              <span className={styles.price}>${product.price}</span>
            </td>
            <td>
              <span className={styles.quantity}>{product.quantity}</span>
            </td>
            <td>
              <span className={styles.total}>${product.price * product.quantity}</span>
            </td>
          </tr>

          ))}
          
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          <button className={styles.button} onClick = {() => setOpen(true)}>CHECKOUT NOW!</button>
        </div>
      </div>
      {open && (
        <OrderDetail total = {cart.total} createOrder = {createOrder} />
      )}
    </div>
  );
};

export default Cart;