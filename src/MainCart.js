import MainCartItem from "./MainCartItem";

export default function MainCart({products, onChangeQuantity}) {
    return (
        products.map(p=>
            <MainCartItem
                key={p.id}
                id={p.id}
                title={p.title}
                desc={p.desc}
                price={p.price}
                currency={p.currency}
                image={p.image}
                quantity={p.quantity}
                onChangeQuantity={onChangeQuantity}></MainCartItem>
          )
    );
}