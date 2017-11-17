var React = require('react');

class Orderable extends React.Component {
    
constructor(props){
		super(props);
        this.state = {
            duplicateStyle: 'notDuplicate',
            warning: 0
            //
            //make boxes unchecked by default
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
        this.handleCartRemove = this.handleCartRemove.bind(this);
    }
    
componentWillMount() {
    // call duplicate checking function ... This might belong somewhere else depending on if we do want to be constantly checking.
    
    let duplicate = this.props.checkDuplicate(this.props.orderableDetails, "orderable")
    let warning = this.props.checkWarning(this.props.orderableDetails, "orderable")

    // See if the order is in the cart and change the state accordingly
    this.setState( { duplicateStyle: duplicate, 
                     warning: warning } )

}    

handleLabelClick(details, event) {
    var newState = !this.props.checkListOrderable(details,1)
    this.updateGroup(details,newState)
    
 }

handleCartRemove (details,e) {
// Group Handling needs to be better controlled first
    var f = false
    this.updateGroup(details,f)

}
updateGroup (details,check) {
    this.props.updateGroup(details, check)
}
    
handleCheckboxChange(details, event) {
        var checked = event.target.checked;
        this.updateGroup(details,checked)
    }
    
componentWillReceiveProps(nextProps) {
    
}



render() {


let view
var details=this.props.orderableDetails
var groupSelect=this.props.changeBox

// check to see if the orderable is currenlty in the cart
let currentCheck = this.props.checkListOrderable(details,1)



/// Warnings should be turned into a component and also just check against the state in the APP component via a function
let viewWarning
let warning=this.state.warning;
let warningtext = "<-- allergy"
if (!warning) {viewWarning=null}
else if (warning==1) {   
    viewWarning = (
        <div className='warning'>
            {warningtext}
        </div>
    )}
else {viewWarning=null}
//a
    
// set up the view for the orderable based on whether it is on the menu or in the cart.   
let viewCart
viewCart = (
            <div className='cartRemove' onClick={(e)=> this.handleCartRemove(details,e)}>
                        <a className='itemRemove' 
                            href='#'
                            >
                                x
                        </a>
                    </div>
            )
if(this.props.cartView) {
    
        view = ( <div className='orderable'>
                    <label>{details.text}</label>
                    {viewCart}
                    {viewWarning}
                </div>)
} else {
        // the multiple divs are for the styling of the Checkbox for duplicate orders
        view = <div className='orderable'>
                    <div>
                        <div className={this.state.duplicateStyle}>
                            <input 
                                type='checkbox'
                                id='cssId'
                                checked={currentCheck}
                                name={details.text}
                                onChange={(e)=> this.handleCheckboxChange(details, e)} 
                            />
                        </div>
                    </div>
                    <div
                        onClick={(e)=> this.handleLabelClick(details, e)}>
                            {details.text} 
                    </div>
                    {viewWarning}
            </div>
        }
    
    return (
        <div>
            {view}
         </div>
    );
  }
}

module.exports = Orderable;