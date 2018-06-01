import FilterLegend from '../components/FilterLegend'
import { connect } from 'react-redux'
import action from '../actions/action'
import { FILTERED_ORDERS } from '../actions/orders'

const mapStateToProps = (state) => {
    const { orders, loadingOrders } = state.reducer_order;
    return { orders, loadingOrders }
}

export const mapDispatchToProps = (dispatch) => {
    return {
        filterOrders: (ords) => {
            dispatch(action(FILTERED_ORDERS, ords));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterLegend)