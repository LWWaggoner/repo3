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
        let duplicate = this.props.checkDuplicate(this.props.groupDetails, "Group")
// let warning = this.props.checkWarning(this.props.orderableDetails, "orderable")
    console.log('group_duplicate')
    console.log(duplicate)
//    this.setState( { duplicateStyle: duplicate, 
//                     warning: warning } )
}

handleLabelClick(details, event) {
    // act like select all and input change
    // NEED to build this
}
      
handleClick(details,event){
   var prevState=this.state.open;
    this.setState( {open: !prevState}) 
}

//Constructor for a group to go the cart into component
PatientGroup(id,text,value){
    this.id = id;
    this.text = text;
    this.cartList = 1;
    this.value = value;
}
    
handleGroupItemUpdate(id,orderableChecked) {
    var gCartList = this.state.groupCartList.concat([])
    var orderGroup = this.props.groupDetails

    
    if(orderableChecked) {
        gCartList.push(id)
        this.setState( {selectAll: true})
        var newCartGroup = new this.PatientGroup(orderGroup.id, orderGroup.text, gCartList)
        // deal with group only containing 1 selected orderable
        if(this.state.groupCartList.length == 0) {
            this.props.addGroupToCart(newCartGroup)         
           }
        else {
            // remove old and add new
            this.props.removeGroupFromCart(this.state.cartGroup,1,newCartGroup)
        }
    }
    
    if(!orderableChecked) {
        // update the local group cart list
        let index= gCartList.findIndex((x => x.id == id.id))
        if (index != -1) {gCartList.splice(index, 1)}
        
        // deal with group only containing 1 selected orderable
        if( gCartList.length == 0) {
            this.props.removeGroupFromCart(this.state.cartGroup,0)
            this.setState( {selectAll: false })
        }  
        else{
            var newCartGroup = new this.PatientGroup(orderGroup.id, orderGroup.text, gCartList)
            this.props.removeGroupFromCart(this.state.cartGroup,1,newCartGroup)
        }
    }
    
    this.setState( {groupCartList:gCartList,
                   cartGroup: newCartGroup})
}

    
//what happens when the selectAll checkbox is changed
handleInputChange(details, event) {
    var checked = event.target.checked;
        
    // says which orderable are selected
    console.log(this.state.cartGroup)
    if(this.state.cartGroup.length !=0) {this.props.removeGroupFromCart(this.state.cartGroup,0)}

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


//styling for duplicate errors
let duplicateStyle = 'notDuplicate'
if (this.props.duplicateError==1) {duplicateStyle='duplicateCSS'}
    else if (this.props.duplicateError==0) {duplicateStyle='notDuplicate'}
    else {
        duplicateStyle=this.props.duplicateError
        //this will be handled below
    }

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
 if(orderGroup.value.length===1) {
    viewOrderables= (  
        <Orderable 
            orderableDetails={orderGroup.value[0]} 
            key={orderGroup.value[0].id}
            addToCart={this.props.addToCart}
            removeFromCart={this.props.removeFromCart}
            changeBox = {this.state.selectAll}
            updateGroup = {this.handleGroupItemUpdate}
            cartView={this.props.cartView}
            checkDuplicate = {this.props.checkDuplicate}
            checkWarning = {this.props.checkWarning}
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
                var orderableChecked
                var mem = this.state.groupCartList.concat([])
                let ind= mem.findIndex((x => x.id == orderable.id))
                if (mem[0]==[]){orderableChecked=false }
                else  if(ind==-1) {orderableChecked=false}
                else {orderableChecked=true}
                // duplicatechecking
                duplicateStyle='notDuplicate'
                if (this.props.duplicateError != 0) {
                    var index=[]
                    index= this.props.duplicateError.findIndex((x => x.id == orderable.id))
                    if(index!=-1){duplicateStyle='duplicateCSS'}
                }

   
            return(
                <Orderable 
                    orderableDetails={orderable} 
                    key={orderable.id}
                    addToCart={this.props.addToCart}
                    removeFromCart={this.props.removeFromCart}
                    stateOfCheck = {orderableChecked}
                    updateGroup = {this.handleGroupItemUpdate}
                    cartView={this.props.cartView}
                    checkDuplicate = {this.props.checkDuplicate}
                    checkWarning = {this.props.checkWarning}
                />
            )})
         )
        }
    if(!this.props.cartView) 
        { viewCheckbox = (
            <div>
            <div className={duplicateStyle}>  
            <input 
                type='checkbox'
                checked={this.state.selectAll}
                onChange={(e)=> 
                this.handleInputChange(this.props.groupDetails, e)}
            />
            </div>
            </div>
                )
        }
    if(this.props.cartView) 
        { viewCart = <a className='itemRemove' href='#'>x</a> }
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