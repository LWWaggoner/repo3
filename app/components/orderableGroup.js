var React = require('react');
var Orderable=require('./orderable');

class OrderableGroup extends React.Component {
    constructor() {
    super();
    this.state = {
        open: true,
        selectAll: false,
        groupCartList: [],
        cartGroup:[]
    };
       this.handleClick = this.handleClick.bind(this);
       this.handleInputChange = this.handleInputChange.bind(this);
       this.handleGroupItemUpdate = this.handleGroupItemUpdate.bind(this);
       this.PatientGroup=this.PatientGroup.bind(this);
       this.handleLabelClick = this.handleLabelClick.bind(this);
   }

 componentWillMount() {
 // call duplicate checking function
     let duplicate
     duplicate = this.props.checkDuplicate(this.props.groupDetails, "group")
// let warning = this.props.checkWarning(this.props.orderableDetails, "orderable")
    this.setState( { duplicateStyle: duplicate, 
//                     warning: warning 
                   } )
}

handleLabelClick(details, event) {
    // need to build this out so that clicking the text acts like the checkbox 
}
      
handleClick(details,event){
    // toggle the expand collapse feature
   var prevState=this.state.open;
    this.setState( {open: !prevState}) 
}

    
//create a new instance of the group to go the cart into component 
PatientGroup(id,text,value){
    this.id = id;
    this.text = text;
    this.cartList = 1;
    this.value = value;
}
    
    
componentWillReceiveProps(nextProps) {
}

    
// this deals with what do when only some of the group is selected
handleGroupItemUpdate(id,orderableChecked) {
    var orderGroup = this.props.groupDetails
    var newCartGroup=[]
    
    let groupIsInCart=this.props.checkListSame(orderGroup, 1,'Group')
    
                console.log('groupIsInCart')
                console.log(groupIsInCart)
                
    let gCartList = []
    if(groupIsInCart[2].value) {gCartList=groupIsInCart[2].value.concat()}
        
    // if you are adding an item in the group create a new instance to pass to the cart
    if(orderableChecked) {
        gCartList.push(id)
        this.setState( {selectAll: true})
        newCartGroup = new this.PatientGroup(orderGroup.id, orderGroup.text, gCartList)
          
        if(!groupIsInCart[0]) {
        // if there is nothing from this group already in the cart, add the new instance
            this.props.addGroupToCart(newCartGroup)         
           }
        else {
            // remove old instance and add new instance with callback fn in removegroupfromcart
            this.props.removeGroupFromCart(groupIsInCart[2],1,newCartGroup)
        }
    }

    // is gCartList in the CartList

    
    if(!orderableChecked) {
        // update list of orderables and remove 
        let index= gCartList.findIndex((x => x.id == id.id))
        if (index != -1) {gCartList.splice(index, 1)}
        console.log('iExpectThisToBeNull')
        console.log(gCartList)
       
        // deal with group only containing 1 selected orderable
        if( gCartList.length == 0) {
            this.props.removeGroupFromCart(groupIsInCart[2],0)
            this.setState( {selectAll: false })
        }  
        else{
            newCartGroup = new this.PatientGroup(orderGroup.id, orderGroup.text, gCartList)
            // uses a callback function in removeGroupFromCart to add the new Group
            this.props.removeGroupFromCart(groupIsInCart[2],1,newCartGroup)
        }
    }

    this.setState( {groupCartList:gCartList,
                   cartGroup: newCartGroup})
 
}

    
//what happens when the selectAll checkbox is changed
handleInputChange(details, event) {
    var checked = event.target.checked;
        
    // says which orderable are selected this might need to be cleaned up
    if(this.state.cartGroup.length !=0) {this.props.removeGroupFromCart(this.state.cartGroup,0)}

    console.log('First Block')
    let groupCartList=[]   
    this.props.groupDetails.value.map((orderable,index) => {
        groupCartList[index]=orderable
        return(groupCartList) 
    })

    var cartGroup = new this.PatientGroup(details.id, details.text, groupCartList)
    if(this.state.cartGroup.length !=0)
            

    
        if (!checked) {groupCartList = []}
    
        this.setState( { 
            selectAll: checked,
            groupCartList: groupCartList,
            cartGroup: cartGroup

        } )
                      
        
        checked && this.props.addGroupToCart(cartGroup)
        !checked && this.props.removeGroupFromCart(cartGroup,0)
    }
render() {
    
var orderGroup = this.props.groupDetails
let view
let viewOrderables
let viewCheckbox
let viewRemoveBox
let viewCart
let toggleText



// deal with group checkbox





let currentCheck
let checkboxValue
currentCheck=this.props.checkListSame(orderGroup, 1,'Group')
if (currentCheck[0]==false) {checkboxValue=false}
else if (orderGroup.value.length===currentCheck[1]) {
    // all of the group is in the list
    console.log(orderGroup)
    checkboxValue = true
}
else {  
    // some of the group is in the list
    // this will give flexibility if we ever want to treat some checked off as all checked off
    checkboxValue = true
}

    //styling for duplicate errors
let duplicateStyle = this.state.duplicateStyle


//styling for warnings (like allergry)
// in the future this could recieve a list of the affected orderables as well as the type of warning
    
    let warning = 0
    if (this.props.orderWarnings==1) {warning=1}
    else if (this.props.orderWarnings==0) {warning=0}
    else {
        warning=this.props.orderWarnings==0
    }

    
// styling / functionality of the select All checkbox
if (!this.state.open) {toggleText="+"} else{toggleText="-"}
    
// Handle Groups of 1 orderable
// There is a way to combine handling for groups of 1 vs groups of multiple at the orderdable level which would make the code much easier to upadate. Perhaps just pass down the group length. 

 if(orderGroup.value.length===1) {
    viewOrderables= (  
        <Orderable 
            orderableDetails={orderGroup.value[0]} 
            key={orderGroup.value[0].id}
            addToCart={this.props.addToCart}
            removeFromCart={this.props.removeFromCart}
            updateGroup = {this.handleGroupItemUpdate}
            cartView={this.props.cartView}
            checkDuplicate = {this.props.checkDuplicate}
            checkWarning = {this.props.checkWarning}
            checkListOrderable = {this.props.checkListOrderable}
            checkListSame = {this.props.checkListSame}
            cartList = {this.props.cartList}
            />
        )
    view =   <div>{viewOrderables}</div>
 } 
// Handle multiple Orderables  in a group 
else if( orderGroup.value.length>1) { 
    // deal with whether the group is expanded or collapsed
    if(!this.state.open) {viewOrderables=null, duplicateStyle='notDuplicate'
        } 
    else{
        viewOrderables = (
            orderGroup.value.map((orderable,index) => {                
                // handle figuring out if this one should be checked
                // need: use cartlist to manage this
               
                if(0){
                    var orderableChecked
                    var mem = this.state.groupCartList.concat([])
                    let ind= mem.findIndex((x => x.id == orderable.id))
                    if (mem[0]==[]){orderableChecked=false }
                    else  if(ind==-1) {orderableChecked=false}
                    else {orderableChecked=true}        
                }
                
            return(
                <Orderable 
                    orderableDetails={orderable} 
                    key={orderable.id}
                    addToCart={this.props.addToCart}
                    removeFromCart={this.props.removeFromCart}
                    updateGroup = {this.handleGroupItemUpdate}
                    cartView={this.props.cartView}
                    checkDuplicate = {this.props.checkDuplicate}
                    checkWarning = {this.props.checkWarning}
                    checkListOrderable = {this.props.checkListOrderable}
                    checkListSame = {this.props.checkListSame}
                    cartList = {this.props.cartList}
                    />
            )})
         )
        }
    
    // if the group is called from the cart then don't show the checkbox
    if(!this.props.cartView) 
        { viewCheckbox = (
            <div>
            <div className={duplicateStyle}>  
            <input 
                type='checkbox'
                checked={checkboxValue}
                onChange={(e)=> 
                this.handleInputChange(this.props.groupDetails, e)}
            />
            </div>
            </div>
                )
        }
    if(this.props.cartView) {
        // this JSX works but the function has not been built out yet 
            //  let viewCart
            //viewCart = (
            //<div className='cartRemove' onClick={(e)=> this.handleCartRemove(details,e)}>
            //            <a className='itemRemove' 
            //                href='#'
            //                >
            //                    x
            //            </a>
            //        </div>
            // )
    }
        view = 
            <div>
                <div className='groupHeader'>
                    <button
                        onClick={(e)=> this.handleClick(orderGroup, e)}
                    >
                            {toggleText}
                    </button> 
                    {viewCheckbox}
                    <div>{orderGroup.text}</div>
                    {viewCart}
                </div>
                <div className='groupedOrderables'>{viewOrderables}</div>
                
            </div>
 }      

    return (
        // this should return ONE div with product-wrapper and the products
        <div className='OrderableGroup'> {view} </div>
    );
  }
}

module.exports = OrderableGroup;