var React = require('react');
//var Orderable=require('./Orderable');
var SubMenu = require('./subMenu');
var OrderableGroup = require('./orderableGroup');

class OrderableMenu extends React.Component {
   constructor() {
    super();
    this.state = {
        counter: 0
    }
    this.checkIfGroupAffected=this.checkIfGroupAffected.bind(this)
  }

componentWillReceiveProps(nextProps) {
    this.setState({cartList: nextProps.cartList });  
};

    // move up a level so cartList can use as well
checkIfGroupAffected (orderGroup, list) {
      let ind
      let bad = []
      let affectedOrders=[]
        orderGroup.value.map((orderable,index) => {
            ind = list.findIndex((x => x.id == orderable.id))
            if (ind !=-1) {bad[index] = orderable}
            return (bad)
            }) 
        
        
         //all the items in a group are affected
        if(bad.length == orderGroup.value.length) {
                    affectedOrders = 1
        // some of the items in a group are affected
        } else if(bad.length != 0) {
            affectedOrders = bad
        // the group is not affected
        } else {affectedOrders=0}
    
    return(affectedOrders)
}

render() {
// Create Search Function

let inventory= this.props.newIv;
let duplicateOrders = this.props.duplicateOrders;
let orderWarnings = this.props.orderWarnings;
let warningsList = []
let duplicateError =[];
let displayList = [];
let display =[];
let change;
let subMenu;
let view;
    

    
// first go through the different  types of orders to display
// currently type is like radiology, etc.

for (var displayType in inventory) {
        if (inventory.hasOwnProperty(displayType)) {            
            
            // Get the list of orderGroups to display for each type
            displayList = inventory[displayType].map(orderGroup => {
                
            // check if this group has duplicate orders in it               
            duplicateError=this.checkIfGroupAffected(orderGroup, duplicateOrders)
            
            // check if this group has warnings in it orders in it               
            warningsList=this.checkIfGroupAffected(orderGroup, orderWarnings )

                                
                return(    
                <OrderableGroup 
                            groupDetails={orderGroup} 
                            key={orderGroup.id}
                            addToCart={this.props.addToCart}
                            removeFromCart={this.props.removeFromCart}
                            cartList = {this.props.cartList}
                            addGroupToCart={this.props.addGroupToCart}
                            removeGroupFromCart={this.props.removeGroupFromCart}
                            duplicateError={duplicateError}
                            orderWarnings={warningsList}
                            checkDuplicate = {this.props.checkDuplicate}        
                            checkWarning = {this.props.checkWarning}
                        />
                    )
            })
            
            subMenu=(
                <div className = 'subMenu' key={displayType}>
                        <h5>{displayType}</h5>
                        <div>{displayList}</div>
                </div>
            )
            display.push(subMenu)
        } 
}

// Loop through the different Display Types in the object. Currently each JSON file is considered it's own Display Type. 

displayList = inventory.labs.map(orderable => {
            var keykey=orderable.id;  
            if (orderable === this.state.ordersToUncheck) {change=true
                } else{ change=false}
                    return(
                        <div>{orderable.text}</div>
                        )
    })



//console.log('help')
//console.log(displayList)
// link to orderable and create var that maps the inventory here
// {inventory.map(function (lab) { 
// <Orderable orderableAttributes={}>
       
    return (
        // this should return ONE div with product-wrapper and the products
      <div className='ordmenu' >
        {display}
     </div>
    );
  }
}

module.exports = OrderableMenu;