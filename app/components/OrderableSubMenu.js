var React = require('react');
var OrderableGroup = require('./orderableGroup');

class OrderableSubMenu extends React.Component {
   constructor() {
    super();
    this.state = {
    }
    this.checkIfGroupAffected=this.checkIfGroupAffected.bind(this)
  }

componentWillReceiveProps(nextProps) {
    this.setState({cartList: nextProps.cartList });  
};

    // This should be rewritten to check state in the APP level
checkIfGroupAffected (orderGroup, list) {
      let ind
      let bad = []
      let affectedOrders=[]
        
      
      // this function is not written well but it works
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
    


displayList = this.props.typeInventory.map(orderGroup => {

            
    if(1){
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
                    checkListOrderable = {this.props.checkListOrderable}
                    checkListSame = {this.props.checkListSame}
                        />
                    )
                }
            })
    


// Loop through the different Display Types in the object. Currently each JSON file is considered it's own Display Type. 

    
if (0) {

}


//console.log('help')
//console.log(displayList)
// link to orderable and create var that maps the inventory here
// {inventory.map(function (lab) { 
// <Orderable orderableAttributes={}>
       
return (
        // this should return ONE div with product-wrapper and the products
      <div className='ordmenu2' >
        {displayList}
     </div>
    );
  }
}

module.exports = OrderableSubMenu;