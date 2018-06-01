//import React, { Component } from 'react'
import OrderTable from '../components/OrderTable'
import { connect } from 'react-redux'
import { notification } from 'antd'
import action from '../actions/action'
import { loadOrders, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILURE, CHANGE_SELECTED_ORDER, CALC_TOTAL } from '../actions/orders'
import { loadOrderDetails, LOAD_ORDER_DETAILS_SUCCESS, LOAD_ORDER_DETAILS_FAILURE } from '../actions/order_details'

const mapStateToProps = (state) => {
    const { selectedOrder, orders, filterOrders, loadingOrders} = state.reducer_order;
    return { selectedOrder, orders, filterOrders, loadingOrders };
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLoadOrders: () => {
            dispatch(loadOrders()).then((result) => {
                if (result.payload && result.payload.status === 200) {
                    const orders = result.payload.data;
                    dispatch(action(LOAD_ORDERS_SUCCESS, orders));
                } else {
                    const title = 'Error when orders loading';
                    const description = result.payload.response && result.payload.response.data
                        ? result.payload.response.data.message
                        : result.payload.stack;
                    notification['error']({
                        message: title,
                        description: description,
                        duration: 9,
                        placement: 'bottomLeft',
                        style: {
                            width: 600,
                        }
                    });
                    dispatch(action(LOAD_ORDERS_FAILURE, description));
                }
            });
        },
        changeSelectedOrder: (ord) => {
            dispatch(action(CHANGE_SELECTED_ORDER, ord));
            dispatch(loadOrderDetails(ord.orderNum)).then((result) => {
                if (result.payload && result.payload.status === 200) {
                    const orderDetails = result.payload.data;
                    let total = 0;
                    for(let i = 0; i < orderDetails.length; i++) {
                        total += orderDetails[i].total;
                    }
                    dispatch(action(CALC_TOTAL, total));
                    dispatch(action(LOAD_ORDER_DETAILS_SUCCESS, orderDetails));
                } else {
                    let title = 'Error when order detail loading';
                    if (ord) {
                        title = `${title} for ${ord.orderName}`;
                    }
                    const description = result.payload.response && result.payload.response.data
                        ? result.payload.response.data.message
                        : result.payload.stack;
                    notification['error']({
                        message: title,
                        description: description,
                        duration: 9,
                        placement: 'bottomLeft',
                        style: {
                            width: 600,
                        }
                    });
                    dispatch(action(LOAD_ORDER_DETAILS_FAILURE, description));
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderTable)
