import cartStyle from './Cart.module.css';

export default function MainCartItem({id, image, title, desc, price, currency, quantity, onChangeQuantity}) {
    
    return (
        <div className={cartStyle.mainCartItemBox}>
            <div className={cartStyle.mainCartItemImageHolder}>
                <img src={image} className={cartStyle.mainCartItemImage} />
            </div>
            <div className={cartStyle.mainCartItemName}>
                <p className={cartStyle.mainCartItemTitle}>{title}</p>
                <p className={cartStyle.mainCartItemDesc}>{desc}</p>            
            </div>
            <div className={cartStyle.mainCartItemQuantity}>
                <button className={cartStyle.mainCartItemButton} onClick={(e) => onChangeQuantity(id, quantity - 1)}>-</button>
                <input className={cartStyle.mainCartItemQuantityInput} type="text" value={quantity} onChange={(e) => onChangeQuantity(id, e.target.value)} />               
                <button className={cartStyle.mainCartItemButton} onClick={(e) => onChangeQuantity(id, quantity + 1)}>+</button>
            </div>
            <div className={cartStyle.mainCartItemPrice}>
                {currency}{price*quantity}
            </div>
        </div>
    );
}