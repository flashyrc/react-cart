import MiniCartItem from "./MiniCartItem";
import cartStyle from './Cart.module.css';

export default function MiniCart({products, onMiniCartItemButtonClick}) {
    return (
        <div className={cartStyle.miniCartContainer}>
            {
                //Renders MiniCartItem as well as separator div (cosmetic)
                products.map((p, i)=> {
                    return (
                        <div key={p.id}>
                            <MiniCartItem
                                key={p.id}
                                id={p.id}
                                title={p.title}
                                price={p.price}
                                currency={p.currency}
                                quantity={p.quantity}
                                onMiniCartItemButtonClick={onMiniCartItemButtonClick}></MiniCartItem>
                                {(i!==(products.length - 1) && p.quantity>0 && products.length>1) && <div className={cartStyle.miniCartItemSeparator}>&nbsp;</div>}
                        </div>
                    );
                })
            }
        </div>
    );
}