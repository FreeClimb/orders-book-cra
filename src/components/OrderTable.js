import React, { Component } from 'react'
import { Spin, Table, Badge } from 'antd'
import moment from 'moment'
import { fieldSorter } from '../utils'

const { Column } = Table;

class OrderTable extends Component {

    constructor(props) {
        super(props);
        this.state = { heightPrc: '70vh' };
        this.handleResize = this.handleResize.bind(this);
    }

    componentWillMount() {
        this.props.startLoadOrders();
    }


    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.releaseEvents('resize', this.handleResize);
    }

    handleResize = () => {
        const prc = Math.floor((window.innerHeight - 160) * 100 / window.innerHeight);
        this.setState({ heightPrc: `${prc}vh` });
    }

    render() {

        const { selectedOrder, orders, filterOrders, loadingOrders } = this.props;
        const prc = this.state.heightPrc;

        let ords = orders;

        if (filterOrders && filterOrders.length > 0) {
            ords = filterOrders;
        }

        return (
            <Spin spinning={loadingOrders} size="large">
                <Table
                    className="order-table"
                    rowClassName={record => {
                        return (selectedOrder && selectedOrder.orderNum === record.orderNum)
                            ? 'order-table-row-selected' : '';
                    }}
                    dataSource={ords}
                    onRow={ord => ({
                        onClick: () => this.props.changeSelectedOrder(ord)
                    })}
                    size="small"
                    pagination={false}
                    scroll={{ y: prc }}
                    rowKey={record => `${record.orderNum}`}>
                    <Column
                        key="orderNum"
                        render={(text, record) => (
                            <div>
                                <Badge
                                    dot
                                    count={1}
                                    style={{ backgroundColor: record.completed ? 'olivedrab' : 'mediumvioletred' }}>
                                </Badge>
                            </div>
                        )}
                        width="15%" />
                    <Column
                        title="Number"
                        key="orderName"
                        dataIndex="orderName"
                        sorter={(a, b) => fieldSorter(a, b, 'orderName')}
                        width="35%" />
                    <Column
                        title="Created"
                        key="created"
                        dataIndex="created"
                        sorter={(a, b) => fieldSorter(a, b, 'created')}
                        align="left"
                        render={(text, record) => 
                            <span>{moment(record.created).format('DD.MM.YYYY HH:mm')}</span>
                        }
                        width="50%" />
                </Table>
            </Spin>
        )
    }
}

export default OrderTable
