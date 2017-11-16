var React = require('react');
var Orderable = require('./orderable')
var OrderableGroup = require('./orderableGroup')
//remove from cart
      let xd = [{id: 1},{id: 3}]
      
class Cart extends React.Component {
    constructor(props){
		super(props);
        this.state = { cartList: [] }
    }

componentWillReceiveProps(nextProps) {
    this.setState({ cartList: nextProps.cartList });  
};

  render() {
let cartList=this.state.cartList.concat([])
let displayList
console.log("cartList")
console.log(cartList)
console.log("cartList length")
console.log(cartList.length)
let duplicateError=0


if(cartList.length === 0){displayList="No orders selected"
} else{
    displayList = cartList.map(orderable => {
       // var keykey=orderable.dict+orderable.id;
        if(0) { 
            return(
            <Orderable 
                orderableDetails={orderable} 
                key={orderable.id}
                addToCart={this.props.addToCart}
                removeFromCart={this.props.removeFromCart}
                cartView={true}
                checkDuplicate = {this.props.checkDuplicate}
                checkWarning = {this.props.checkWarning}
            />
        )
        }else {
            var orderGroup = orderable
            console.log('cartGroup')
            console.log(orderGroup)
            return(
            <OrderableGroup 
                groupDetails={orderGroup} 
                key={orderGroup.id}
                addToCart={this.props.addToCart}
                removeFromCart={this.props.removeFromCart}
                duplicateError={duplicateError}
                cartView={true}
                checkDuplicate = {this.props.checkDuplicate}
                checkWarning = {this.props.checkWarning}
            />
            )
        }
    })
}
      
//Determine Ordertype and how to display
    return (
      <div className='cartWrapper'>
        <h4>New Orders</h4>
        <div className='cartItems'> {displayList} </div>
        <p> </p>
        <form>
            <input type="submit" label="sign"/>
        </form>
      </div>
    )
  }
}

module.exports = Cart;