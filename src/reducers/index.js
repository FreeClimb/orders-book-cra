import { combineReducers } from 'redux'
import reducer_order from './reducer_order'
import reducer_order_detail from './reducer_order_detail'

const rootReducer = combineReducers({
  reducer_order,
  reducer_order_detail
});

export default rootReducer