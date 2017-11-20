const React = require('react');
const OrderableSubMenu = require('./OrderableSubMenu');
const OrderableGroup = require('./orderableGroup');
const testARY = [1, 2, 3];


class OrderableMenu extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ cartList: nextProps.cartList });
  }


  render() {
    const inventory = this.props.newIv;
    const orderWarnings = this.props.orderWarnings;
    const warningsList = [];
    const display = [];
    let subMenu;


    // first go through the different  types of orders to display
    // currently type is based on the JSON masterfile files like radiology, etc.

    for (const displayType in inventory) {
      if (inventory.hasOwnProperty(displayType)) {
        subMenu = (
          <div className = "subMenu" key={displayType}>
            <h5>{inventory[displayType][0].displayGroup}</h5>
            <OrderableSubMenu
              typeInventory={inventory[displayType]}
              addToCart={this.props.addToCart}
              removeFromCart={this.props.removeFromCart}
              cartList = {this.props.cartList}
              addGroupToCart={this.props.addGroupToCart}
              removeGroupFromCart={this.props.removeGroupFromCart}
              orderWarnings={warningsList}
              checkDuplicate = {this.props.checkDuplicate}
              checkWarning = {this.props.checkWarning}
              checkListOrderable = {this.props.checkListOrderable}
              checkListSame = {this.props.checkListSame}
            />
          </div>

        );
        display.push(subMenu);
      }
    }


    // this was a poor way of checking the cart // needs to be deprecated
    let displayList = [];
    let change;
    displayList = inventory.labs.map(orderable => {
      const keykey = orderable.id;
      if (orderable === this.state.ordersToUncheck) {
        change = true;
      } else { change = false;}
      return (
        <div>{orderable.text}</div>
      );
    });


    return (
    // this should return ONE div with product-wrapper and the products
      <div className="ordmenu" >
        {display}
      </div>
    );
  }
}

module.exports = OrderableMenu;
