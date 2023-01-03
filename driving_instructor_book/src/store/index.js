import { createStore } from 'vuex';

export default createStore({
  state: {
    cartList: [], //cart list data
    orderList: [], //order list data
    orderListed: [], //order list data after checkout
    edit: true, //edit state
    userAddress: [
      {
        id: 1001,
        name: 'Richard',
        tel: '1234567890',
        province: ' VIC ',
        city: ' Melbourne ',
        county: ' South Yarra ',
        addressDetail: ' 300 Toorak Rd ',
        isDefault: true,
        areaCode: '3141',
      },
      {
        id: 1002,
        name: 'Gao',
        tel: '1234567890',
        province: ' VIC ',
        city: ' Melbourne ',
        county: ' City ',
        addressDetail: ' Centre ',
        isDefault: false,
        areaCode: '3000',
      },
    ],
  },
  mutations: {
    //Add to cart
    ADDCART(state, value) {
      state.cartList = value;
    },
    //checkout button
    PAY(state, value) {
      state.orderList = value;
    },
    //delete
    DELETE(state, value) {
      state.cartList = value;
    },
    //create order
    UPDATEORDER(state, value) {
      state.orderListed = state.orderListed.concat(state.orderList);
    },
    //edit
    EDIT(state, value) {
      if (value === 'delete') {
        state.edit = true;
      } else {
        state.edit = !state.edit;
      }
    },
    //add address
    ADDADDRESS(state, value) {
      state.userAddress.map((item) => {
        if (value.isDefault) {
          item.isDefault = false;
        }
      });
      state.userAddress.push(value);
    },
    //edit address
    CHANGEADDRESS(state, value) {
      state.userAddress = state.userAddress.map((item) => {
        if (value.isDefault) {
          item.isDefault = false;
        }
        return item.id === value.id ? value : item;
      });
    },
    //address delete button
    DELETEADDRESS(state, value) {
      state.userAddress = state.userAddress.filter((item) => {
        return !(value.id === item.id);
      });
      if (value.isDefault && state.userAddress.length) {
        state.userAddress[0].isDefault = true;
      }
    },
  },
  actions: {},
});
