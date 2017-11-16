
    for (var displayType in inventory) {
        if (inventory.hasOwnProperty(displayType)) {

            // Get the list of orders to display for each type
            displayList = inventory[displayType].map(orderGroup => {          

                // Handle if group contains more than one orderable
                var view = []

                if(orderGroup.length===1) {

                    // Need Duplicate should be changed
                    if (orderGroup[0] === this.state.ordersToUncheck)
                            { change=true
                    } else  { change=false}

                    console.log("change:"+change)
                    console.log(orderGroup[0])
                    console.log(this.state.ordersToUncheck)

                    view= (  
                        <Orderable 
                            orderDetails={orderGroup[0]} 
                            //key={keykey}
                            addToCart={this.props.addToCart}
                            removeFromCart={this.props.removeFromCart}
                            ordersToUncheck = {change}
                        />
                        )
                    } 
                else if (orderGroup.length>1){
                    console.log('hi')
                    console.log(orderGroup)
                    view=  (
                    orderGroup.text
                    )
                    // Need to Loop Through the orderables in this group  
                    }
                else {"Err"}

                var text = orderGroup.text 
                    return(
                        <div>{view}</div>
                    )
            })


            subMenu=(
                <div className = 'subMenu' key={displayType}>
                        <h5>{displayType}</h5>   
                        <div> {displayList} </div>
                </div>)
            display.push(subMenu)
        }
}}