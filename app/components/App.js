const React = require('react');
const OrderableMenu = require('./OrderableMenu');
const Cart = require('./Cart');
const Labs = require('./masterfiles/labs.json');
//need to add in the rest of the order types here

//  the majority of below is just for getting a small inventory for play data
const ordGroup = [];
let keyGroup = [];
const BMP = [];


for (const key in Labs) {
  if (Labs.hasOwnProperty(key)) {
    if (key === 'c') { continue; }
    if (key === 'i') { continue; }
    keyGroup = Labs[key].grplab;
    if (!ordGroup.includes(keyGroup)) {ordGroup.push(keyGroup);}
    if (keyGroup === "B") {BMP.push(Labs[key]);}
  }
}

const MEDg = {};
MEDg.value = [Labs[29]];
MEDg.id = 3;
MEDg.text = 'MORPHINE';
MEDg.displayGroup = 'Meds';


const testingg = {};
testingg.value = [Labs[1]];
testingg.id = 1;
testingg.text = '?CBC?';
testingg.displayGroup = 'Labs';


const BMPg = {};
BMPg.value = BMP;
BMPg.id = 2;
BMPg.text = 'BMP';
BMPg.displayGroup = 'Labs';

const testy = {};
testy.labs = [BMPg, testingg];
testy.meds = [MEDg];

//simulate duplicate orders
const dupOrders = [Labs[1], Labs[2]];

//simulate warnings for allergies. should be expanded to account for multiple types of things
const warnOrders = [Labs[29]];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      cartList: [],
      duplicateOrders: [], // formatting
      orderWarnings: []
    };

    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleAddGroup = this.handleAddGroup.bind(this);
    this.handleRemoveGroup = this.handleRemoveGroup.bind(this);
    this.getDuplicateOrders = this.getDuplicateOrders.bind(this);
    this.getOrderWarnings = this.getOrderWarnings.bind(this);
    this.checkDuplicate = this.checkDuplicate.bind(this);
    this.checkWarning = this.checkWarning.bind(this);
    this.checkListOrderable = this.checkListOrderable.bind(this);
    this.checkListSame = this.checkListSame.bind(this);
  }

  // Get the Inventory from the server (for now locally)
  getInventory() {
    const inventoryList = [];
    for (const key in Labs) {
      if (Labs.hasOwnProperty(key)) {
        if (key === 'c') { continue; }
        if (key === 'i') { continue; }
        Labs[key].id = key + "LAB";
        inventoryList.push(Labs[key]);
      }
    }
    this.setState(function() {
      return {
        // testing Change
        products: testy
      };
    });
  }


  // some room for consolidation of functions wiht check in the title. checkListSame is the most general
  checkDuplicate(details, classType) {
    //do stuff
    let duplicateStyle = 'notDuplicate';
    const ind = [];
    let isInList;

    isInList = this.checkListSame(details, 3);
    if (isInList[0]) {duplicateStyle = 'duplicateCSS';}


    if (classType === 'group') {
      let ind;
      const bad = [];
      const affectedOrders = [];
      details.value.map((orderable, index) => {
        ind = this.state.duplicateOrders.findIndex((x => x.id === orderable.id));
        if (ind !== -1) {bad[index] = orderable;}
        return (bad);
      });

      //all the items in a group are affected
      if (bad.length === details.value.length) {
        duplicateStyle = 'duplicateCSS';
        // some of the items in a group are affected
      } else if (bad.length !== 0) {
        duplicateStyle = 'notDuplicate';
        // the group is not affected
      } else {duplicateStyle = 'notDuplicate';}
    }
    return (duplicateStyle);
  }

  // some room for consolidation of functions wiht check in the title. checkListSame is the most general
  checkWarning(details, classType) {
    //currently this function only exists so that you know which list to check
    const index = [];
    let isInList;
    isInList = this.checkListSame(details, 2);

    return (isInList[0]);
  }

  // looks to see if an object is contained in a list of the same class of objects
  checkListSame(object, listType, errorlocation) {
    let index = -1;
    let isInList = false;
    let len = 0;
    let list;
    let obj = {};


    // there is probably a better way to do this
    if (listType === 1) list = this.state.cartList;
    else if (listType === 2) list = this.state.orderWarnings;
    else if (listType === 3) list = this.state.duplicateOrders;
    else return ([isInList, len, obj]);

    // quit if the list is empty
    if (list.length === 0) {return ([isInList, len, obj]);}
    // check
    index = list.findIndex((x => x.id === object.id));
    if (index !== -1) {
      isInList = true;

      if (list[index].value) {
        len = list[index].value.length;
        obj = list[index];
      }

      console.log('len');
      console.log(len);
      console.log(obj);
    }
    return ([isInList, len, obj]);
  }


  //this is slightly different than checkListSame because it looks through for orderables in a list of the aggregate class Group
  checkListOrderable(orderable, listType) {
    let index;
    let list = [];
    const ind = [];
    let isInList;

    //need to create a list of the types of lists and their map
    // 1 === cartlist, 2 duplicate, 3 allergy, 4 otherwarning, etc

    if (listType === 1) {list = this.state.cartList;} else {isInList = 'ListNotDefined-APP, checklistorderable';}


    //
    if (list.length === 0) {return (isInList = false);}
    // see if the orderabale is somewhere in the specified list is in the

    // need to handle Cartlist a little differently since it is a list of groups and everything else is a list of orderables....
    isInList = false;
    if (listType === 1) {
      list.map((group) => {
        index = group.value.findIndex((x => x.id === orderable.id));
        if (index !== -1) {isInList = true;}
      });
    }


    return (isInList);
  }


  // This will need to be replaced with an API for a list of orders the patient is allergic to
  getOrderWarnings() {
    //Get a list of the  orders warnings
    this.setState({ orderWarnings: warnOrders });
  }

  // This will need to be replaced with an API for a list of orders that have already been placed
  getDuplicateOrders() {
    //Get a list of the Duplicate orders for duplicate checking
    this.setState({ duplicateOrders: dupOrders });
  }


  componentWillMount() {
    this.getInventory();
    this.getDuplicateOrders();
    this.getOrderWarnings();
  }

  handleAddGroup(changedGroup) {
    const cartList = this.state.cartList.concat(changedGroup);
    //  console.log('APP - changedGroup')
    //  console.log(changedGroup)
    this.setState({
      cartList: cartList,
      ordersToUncheck: []
    });
  }


  // remove group currently has a call back function to addgroup because I was having difficulty with state management
  handleRemoveGroup(groupToRemove, update, newCartGroup) {
    let tIndex;
    const cartList = [];

    this.state.cartList.map((listItem, index) => {
      cartList[index] = listItem;
      if (listItem.id === groupToRemove.id) {tIndex = index;}
      return (cartList, tIndex);
    });

    if (tIndex !== -1) {
      cartList.splice(tIndex, 1);

      this.setState({
        cartList: cartList }, function() {
        if (update) {this.handleAddGroup(newCartGroup);}
      });
    }
  }

  //the next two fn will add/remove a single orderable. not currently in use as I decided to just make single orders belong to groups of one
  handleAddToCart(changedOrderable) {
    const cartList = this.state.cartList.concat(changedOrderable);
    const orderableKey = changedOrderable.id;

    this.setState({
      cartList: cartList,
      ordersToUncheck: []
    });
  }
  handleRemoveFromCart(changedOrderable) {
    const cartList = this.state.cartList.concat([]);
    const orderableId = changedOrderable.id;
    const index = cartList.findIndex((x => x.id === orderableId));

    cartList.splice(index, 1);

    this.setState({
      cartList: cartList,
      ordersToUncheck: changedOrderable
    });
  }

  render() {
    return (
      <div className="container">
        <OrderableMenu
          newIv={this.state.products}
          cartList = {this.state.cartList}
          addGroupToCart={this.handleAddGroup}
          removeGroupFromCart={this.handleRemoveGroup}
          duplicateOrders={this.state.duplicateOrders}
          orderWarnings = {this.state.orderWarnings}
          checkDuplicate = {this.checkDuplicate}
          checkWarning = {this.checkWarning}
          checkListOrderable = {this.checkListOrderable}
          checkListSame = {this.checkListSame}
        />
        <Cart
          cartList = {this.state.cartList}
          removeFromCart ={this.handleRemoveFromCart}
          checkDuplicate = {this.checkDuplicate}
          checkWarning = {this.checkWarning}
          checkListOrderable = {this.checkListOrderable}
          checkListSame = {this.checkListSame}
          removeGroupFromCart={this.handleRemoveGroup}
        />
      </div>
    );
  }
}
module.exports = App;
