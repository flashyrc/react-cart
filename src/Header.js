
import cartStyle from './Cart.module.css';
import Minicart from './MiniCart';

export default function Header({products, showMiniCart, onHeaderClick, onMiniCartItemButtonClick}) {
    
    //Get currency from first product
    //Ideally there should be one currency in the root state object
    //Individual item can have their own currency
    //This would require exchange rates to be stored
    let currency = products[0].currency;

    //Because Header and MiniCart is supposed to operate only on added products
    let addedProducts = products.filter(p => p.quantity > 0);

    //totalValue calculation
    let totalValue = addedProducts.reduce((s, p) =>{
      return s + (parseInt(p.price, 10) * parseInt(p.quantity, 10))
    }, 0);

    //itemCount calculation
    let itemCount = addedProducts.length;

    //Renders header as required
    //It also render MiniCart as it has to be part of Header for two reasons:
    //1. The location has to be relative to icons in header
    //2. The "toggle-bility" of MiniCart is triggerred by Header elements
    return (
        <div className={cartStyle.header}>
            <div className={cartStyle.cartIcon} onClick={onHeaderClick}>
                {showMiniCart && <Minicart onMiniCartItemButtonClick={onMiniCartItemButtonClick} products={addedProducts}></Minicart>}
            </div>
            <div className={cartStyle.headerNumbers} onClick={onHeaderClick}>
                <div className={cartStyle.headerTotalValue}>
                    {currency}{totalValue}
                </div>
                <div className={cartStyle.headerItemCount}>
                    {itemCount} Items {showMiniCart? "▲" : "▼"}
                </div>
            </div>
        </div>
    );
}