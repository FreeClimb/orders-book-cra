import OrderDetailTable from '../components/OrderDetailTable'
import { connect } from 'react-redux'
import action from '../actions/action'
import { CHANGE_SELECTED_ORDER_DETAIL } from '../actions/order_details'


const mapStateToProps = (state) => {
    const { orderDetails, selectedOrderDetail, loadingOrderDetails } = state.reducer_order_detail;
    return { orderDetails, selectedOrderDetail, loadingOrderDetails };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeSelectedOrder: (ordDetail) => {
            dispatch(action(CHANGE_SELECTED_ORDER_DETAIL, ordDetail));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailTable)