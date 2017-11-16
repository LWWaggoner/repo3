var React = require('react');

class Orderable extends React.Component {
    
constructor(props){
		super(props);
        this.state = {
            select: this.props.stateOfCheck,
            changedOrderable: {},
            lastProps: this.props.changeBox, 
            duplicateStyle: 'notDuplicate',
            warning: 0
            //
            //make boxes unchecked by default
        }
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleLabelClick = this.handleLabelClick.bind(this);
        this.updateGroup = this.updateGroup.bind(this);
    }
    
componentWillMount() {
    // call duplicate checking function
    let duplicate = this.props.checkDuplicate(this.props.orderableDetails, "orderable")
    let warning = this.props.checkWarning(this.props.orderableDetails, "orderable")
    console.log('orderable_duplicate')
    console.log(duplicate)
    this.setState( { duplicateStyle: duplicate, 
                     warning: warning } )
}
    
handleLabelClick(details, event) {
    var newState = !this.state.select
    this.updateGroup(details,newState)
}
    
updateGroup (details,check) {
    this.setState( {
                select: check,
                changedOrderable: details
    } )
    this.props.updateGroup(details, check)
}
    
handleCheckboxChange(details, event) {
        var checked = event.target.checked;
        this.updateGroup(details,checked)
    }
    
componentWillReceiveProps(nextProps) {
    var lastProps = this.select
    var newProps = nextProps.stateOfCheck
    
    if (lastProps !=newProps) {
        this.setState({ select: newProps })}

   this.setState({ lastProps: newProps });
}


render() {
       
let view
let viewWarning
var details=this.props.orderableDetails
var groupSelect=this.props.changeBox
let warning=this.state.warning;
let warningtext = "<-- allergy"

if (warning==0) {viewWarning=null}
else if (warning==1) {   
    viewWarning = (
        <div className='warning'>
            {warningtext}
        </div>
    )}
else {viewWarning=null}

if(this.props.cartView) {
    
        view = ( <div className='orderable'>
                    <label>{details.text}</label>
                    <a className='itemRemove' href='#'>x</a>
                    {viewWarning}
                </div>)
} else {
        view = <div className='orderable'>
                    <div>
                        <div className={this.state.duplicateStyle}>
                        <input 
                            type='checkbox'
                            id='cssId'
                            checked={this.state.select}
                            name={details.text}
                            onChange={(e)=> this.handleCheckboxChange(details, e)} />
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