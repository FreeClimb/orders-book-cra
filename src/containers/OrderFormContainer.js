import { notification } from 'antd'
import OrderForm from '../components/OrderForm'
import { connect } from 'react-redux'
import action from '../actions/action'
import { updateOrder, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE } from '../actions/orders'

const mapStateToProps = (state) => {
    const { selectedOrder, total, loadingOrders, savingOrder } = state.reducer_order;
    return { selectedOrder, total, loadingOrders, savingOrder };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderCompleted: (ord) => {
            dispatch(updateOrder(ord.orderNum))
                .then((result) => {
                    if (result.payload && result.payload.status === 200) {
                        const updated = result.payload.data;
                        notification['success']({
                            message: 'Info',
                            placement: 'bottomLeft',
                            description: `${ord.ordName} succesfully complete`
                        });
                        dispatch(action(UPDATE_ORDER_SUCCESS, updated));
                    } else {
                        const description = result.payload.response && result.payload.response.data
                            ? result.payload.response.data.message
                            : result.payload.stack;
                        notification['error']({
                            message: 'Error',
                            description: description,
                            duration: 9,
                            placement: 'bottomLeft',
                            style: {
                                width: 600,
                            }
                        });
                        dispatch(action(UPDATE_ORDER_FAILURE, description));
                    }
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm)

