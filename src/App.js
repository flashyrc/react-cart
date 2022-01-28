import Header from './Header';
import MainCart from './MainCart';
import cartStyle from './Cart.module.css';
import { Component } from 'react';

//Main component
class App extends Component {
  constructor(props) {
    super(props);
    
    //Create a skeleton State
    this.state = {products: [
      {
        id: 1234,
        title: "",
        desc: "",
        image: "/product1.jpeg",
        price: 0,
        currency: "$",
        quantity:0
      }
    ], showMiniCart: false};

    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
    this.clearQuantity = this.clearQuantity.bind(this);
  }

  componentDidMount() {
    //Fetch state from browser storage first
    let reactCartLocalData = sessionStorage.getItem('react-cart-data');

    if(reactCartLocalData) {
      //Set state to what was fetched from browser storage if available
      this.setState(JSON.parse(reactCartLocalData));
    } else {
      //Fetch state from API if browser storage is NA
      //URL stored in .env as Environment var
      fetch(process.env.REACT_APP_CART_API_URL)
        .then(res => res.json())
        .then(
          (result) => {
            //Fetched data from API is conditioned as follows
            //1. quantity property is added to each product object
            //   with default value as 1
            //2. showMiniCart is added
            let stateData = {
              products: result.products.map(p => Object.assign(p, {quantity: 1})),
              showMiniCart: false
            }
            sessionStorage.setItem('react-cart-data', JSON.stringify(stateData));
            this.setState(stateData);          
          },
          (error) => {
            //This can be handled better with another Error component
            //But it is out of scope for current project
            console.log('service not reachable');
          }
        )
      }
  }

  componentDidUpdate() {
    //With each update, refresh browser storage
    //state data has to be stringified for browser storage
    sessionStorage.setItem('react-cart-data', JSON.stringify(this.state));
  }

  //This is handler for +, -, text input in MainCart
  //Passed to MainCart->MainCartItem
  onChangeQuantity(id, quantity) {
    this.setState(
      {
        products: this.state.products.map(p => {
            let actualQuantity = 0;
            if(!isNaN(quantity)) {
              actualQuantity = parseInt(quantity, 10) > 0 ? parseInt(quantity, 10) : 0;
            }
            if(p.id === id)
              return Object.assign(p, {quantity: actualQuantity});
            else  
              return p;              
        })
      }
    )
  }

  //This is handler for deleting item in MiniCart
  //Passed to Header->MiniCart->MiniCartItem
  //Uses onChangeQuantity
  clearQuantity(id) {
    this.onChangeQuantity(id, 0);
  }

  //This is handler for deleting item in MiniCart
  //Passed to Header
  toggleMiniCart() {
    this.setState(
        {
          products: this.state.products,
          showMiniCart: !this.state.showMiniCart
        }
      );
  }
  
  //Renders Header and MainCart components
  //All functional component except App component
  //State is passed as props given the small application
  //e.g. products being passed to both Header and MainCart
  //In real application state provider like Redux could be used
  render() {
    return (
      <div className={cartStyle.app} >
        <Header products={this.state.products} showMiniCart={this.state.showMiniCart} onHeaderClick={this.toggleMiniCart} onMiniCartItemButtonClick={this.clearQuantity}></Header>
        <MainCart products={this.state.products} onChangeQuantity={this.onChangeQuantity}></MainCart>        
      </div>
    );
  }
}

export default App;