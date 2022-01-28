import cartStyle from './Cart.module.css';

export default function MiniCartItem({id, title, price, currency,  quantity, onMiniCartItemButtonClick}){
    return (
        <div className={cartStyle.miniCartItemBox}>
            <div className={cartStyle.miniCartItemButton} onClick={(e)=>{onMiniCartItemButtonClick(id); e.stopPropagation();}}>x</div>
            <div className={cartStyle.miniCartItemName}>
                <p className={cartStyle.miniCartItemTitle}>{title}</p>    
                <p className={cartStyle.miniCartItemPrice}>{currency}{price*quantity}</p>       
            </div>
            <div className={cartStyle.miniCartItemQty}>
                Qty {quantity}
            </div>
        </div>
    );
}