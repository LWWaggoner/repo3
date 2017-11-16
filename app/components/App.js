var React = require('react');
var OrderableMenu = require('./OrderableMenu');
var Cart = require('./Cart');
var Labs = require('./masterfiles/labs.json');


// inventory management for play data
var ordGroup =[];
var keyGroup = [];
var BMP = [];


for (var key in Labs) {
    if (Labs.hasOwnProperty(key)) {
       
        if (key=='c') { continue };
        if (key=='i') { continue };
        keyGroup=Labs[key].grplab;
    if (!ordGroup.includes(keyGroup)) {ordGroup.push(keyGroup)}
    if (keyGroup==="B") {BMP.push(Labs[key])}
    }
}

var MEDg = {};
MEDg.value = [Labs[29]]
MEDg.id = 3
MEDg.text = 'MORPHINE'

var testingg={}
testingg.value = [Labs[1]]
testingg.id=1
testingg.text='?CBC?'


var BMPg = {}
BMPg.value=BMP
BMPg.id = 2
BMPg.text = 'BMP'

var testy={}
testy.labs=[BMPg,testingg]
testy.meds=[MEDg]

//simulate duplicate orders
var dupOrders = [Labs[1],Labs[2]]

//simulate warnings for allergies or severe med interactions
var warnOrders=[Labs[29]]



class App extends React.Component {
    constructor(props){
		super(props);
		this.state = {
			products: [],
			cartList: [],
            duplicateOrders: [],
            orderWarnings: []
		};
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart =this.handleRemoveFromCart.bind(this);
        this.handleAddGroup = this.handleAddGroup.bind(this);
        this.handleRemoveGroup=this.handleRemoveGroup.bind(this);
        this.getDuplicateOrders=this.getDuplicateOrders.bind(this);
        this.getOrderWarnings=this.getOrderWarnings.bind(this);
        this.checkDuplicate=this.checkDuplicate.bind(this);
        this.checkWarning=this.checkWarning.bind(this);
    };

// Get the Inventory from the server (for now locally)
    
getInventory() {
    var inventoryList = []
    for (var key in Labs) {
    if (Labs.hasOwnProperty(key)) {
        if (key=='c') { continue };
        if (key=='i') { continue };
        Labs[key].id = key + "LAB"
        inventoryList.push(Labs[key]);
    }
}
    this.setState(function () {
      return {
       // testing Change
          products: testy  }
    });
};

checkDuplicate(details, classType) {
    //do stuff
    var duplicateStyle='notDuplicate'
    var ind=[]
    
    if (classType =='orderable') {
        ind= this.state.duplicateOrders.findIndex((x => x.id == details.id))
        if(ind!=-1){duplicateStyle='duplicateCSS'} 
    }
    
    if (classType =='group') {
      let ind
      let bad = []
      let affectedOrders=[]
        details.value.map((orderable,index) => {
            ind = this.state.duplicateOrders.findIndex((x => x.id == orderable.id))
            if (ind !=-1) {bad[index] = orderable}
            console.log(bad)
            return (bad)
            }) 
            console.log(bad)
        
         //all the items in a group are affected
        if(bad.length == details.value.length) {
                    duplicateStyle='duplicateCSS'
        // some of the items in a group are affected
        } else if(bad.length != 0) {
            duplicateStyle='notDuplicate'
        // the group is not affected
        } else {duplicateStyle='notDuplicate'}
    }
    return(duplicateStyle)
}
    
checkWarning(details, classType) {
    //do stuff
    var warning = 0
    var index=[]
    
    index= this.state.orderWarnings.findIndex((x => x.id == details.id))
    if(index!=-1){warning=1}
    return(warning)
}
    
getOrderWarnings(){
    //Get a list of the  orders warnings
    this.setState({orderWarnings: warnOrders});
}
    
getDuplicateOrders(){
    //Get a list of the Duplicate orders for duplicate checking
    this.setState({duplicateOrders: dupOrders});
 }
    
componentWillMount() {
		this.getInventory();
        this.getDuplicateOrders();
        this.getOrderWarnings();
    //NEED A PRE-PROCESSING FUNCTION MAKE DATA LIKE HOW I WANTS
	};

handleAddGroup(changedGroup){
		let cartList = this.state.cartList.concat(changedGroup);
      //  console.log('APP - changedGroup')
      //  console.log(changedGroup)
		this.setState({
			cartList: cartList,
            ordersToUncheck: []
			});
}
    
handleRemoveGroup(groupToRemove,update,newCartGroup){
    let tIndex
    var cartList = []
  
  this.state.cartList.map((listItem,index) =>{
        cartList[index]=listItem
        console.log('APP remove - cart list items')
        console.log(listItem)
        if (listItem.id==groupToRemove.id) {tIndex=index}
        return(cartList,tIndex)
    } )
    
    if (tIndex!=-1) {cartList.splice(tIndex, 1);
	
    this.setState({
			cartList: cartList }, function () {
    if (update) {this.handleAddGroup(newCartGroup),
                console.log('callback'),
                console.log(newCartGroup)}
    });
}}

handleAddToCart(changedOrderable){

		let cartList = this.state.cartList.concat(changedOrderable);
		let orderableKey = changedOrderable.id;
            
		this.setState({
			cartList: cartList,
            ordersToUncheck: []
			});
    
	}    
    
handleRemoveFromCart(changedOrderable){
		let cartList = this.state.cartList.concat([]);
		let orderableId = changedOrderable.id;
        let index=cartList.findIndex((x => x.id == orderableId));

        cartList.splice(index, 1);

		this.setState({
			cartList: cartList,
            ordersToUncheck: changedOrderable
			});
    
		
	}        
	    
  render() {
    return (
      <div className='container'>
        <OrderableMenu 
            newIv={this.state.products}
            cartList = {this.state.cartList}
            addGroupToCart={this.handleAddGroup}
            removeGroupFromCart={this.handleRemoveGroup}
            duplicateOrders={this.state.duplicateOrders}
            orderWarnings = {this.state.orderWarnings}
            checkDuplicate = {this.checkDuplicate}
            checkWarning = {this.checkWarning}
         />
        <Cart 
            cartList = {this.state.cartList}
            removeFromCart ={this.handleRemoveFromCart}
            checkDuplicate = {this.checkDuplicate}
            checkWarning = {this.checkWarning}
        />
      </div>
    )
  }
}
module.exports = App;















