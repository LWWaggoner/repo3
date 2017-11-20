const React = require('react');
const Orderable = require('./orderable');
const OrderableGroup = require('./orderableGroup');
//remove from cart
const xd = [{ id: 1 }, { id: 3 }];

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cartList: [] };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ cartList: nextProps.cartList });
  }


  render() {
    const cartList = this.state.cartList.concat([]);
    let displayList;

    const duplicateError = 0;


    if (cartList.length === 0) {
      displayList = "No orders selected";
    } else {
      displayList = cartList.map(orderable => {
        // var keykey=orderable.dict+orderable.id;
        if (0) {
          return (
            <Orderable
              orderableDetails={orderable}
              key={orderable.id}
              addToCart={this.props.addToCart}
              removeFromCart={this.props.removeFromCart}
              cartView
              checkDuplicate = {this.props.checkDuplicate}
              checkWarning = {this.props.checkWarning}
              checkListOrderable = {this.props.checkListOrderable}
              checkListSame = {this.props.checkListSame}
            />
          );
        } else {
          const orderGroup = orderable;
          return (
            <OrderableGroup
              groupDetails={orderGroup}
              key={orderGroup.id}
              addToCart={this.props.addToCart}
              removeFromCart={this.props.removeFromCart}
              duplicateError={duplicateError}
              cartView
              checkDuplicate = {this.props.checkDuplicate}
              checkWarning = {this.props.checkWarning}
              checkListOrderable = {this.props.checkListOrderable}
              checkListSame = {this.props.checkListSame}
              removeGroupFromCart={this.props.removeGroupFromCart}
            />
          );
        }
      });
    }

    //might be nice to arrange the cartList by Ordertype?
    return (
      <div className="cartWrapper">
        <h4>New Orders</h4>
        <div className="cartItems"> {displayList} </div>
        <p />
        <form >
          <input type="submit" value="sign" />
        </form>
      </div>
    );
  }
}

module.exports = Cart;
