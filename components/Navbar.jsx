import Image from 'next/image';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../styles/Navbar.module.css';
import { faCartShopping, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Link from 'next/link';
const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity);
  
  return (
    <div className={styles.container}>
        <div className={styles.item}>
          <div className={styles.callButton}>
          <FontAwesomeIcon icon={faPhoneAlt} className = {styles.telephone} />
          </div>
          <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>012 xxxxxx</div>
          </div>
        </div>
        <div className={styles.item}>
          <ul className={styles.list}>
            <li className={styles.listItem}><Link href= "/">Home</Link></li>
            <li className={styles.listItem}><Link href= "/Products">Products</Link></li>
            <li className={styles.listItem}><Link href= "/Menu">Menu</Link></li>
            <Image src = "/img/logo.png" width={100} height = {100} className = {styles.logo} />
        
            <li className={styles.listItem}><Link href= "/Events">Events</Link></li>
            <li className={styles.listItem}><Link href= "/Blog">Blog</Link></li>
            <li className={styles.listItem}><Link href= "/Contact">Contact</Link></li>

          </ul>
        </div>
        <Link href = "/Cart" passHref>
          <div className={styles.item}>

            <div className={styles.cart}>
            <FontAwesomeIcon icon = {faCartShopping} className = {styles.shopping} />

              <div className={styles.counter}>
                {quantity}
              </div>
            </div>

          </div>
        </Link>

    </div>
  )
}

export default Navbar