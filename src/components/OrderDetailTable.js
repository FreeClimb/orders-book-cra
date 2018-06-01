import React, { Component } from 'react'
import { Spin, Table } from 'antd'
import { fieldSorter } from '../utils'

const { Column } = Table;

class OrderDetailTable extends Component {

    constructor(props) {
        super(props);
        this.state = { heightPrc: '70vh' };
        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.releaseEvents('resize', this.handleResize);
    }

    handleResize = () => {
        const prc = Math.floor((window.innerHeight - 230) * 100 / window.innerHeight);
        this.setState({ heightPrc: `${prc}vh` });
    }

    render() {
        const { orderDetails, selectedOrderDetail, loadingOrderDetails } = this.props;
        const prc = this.state.heightPrc;

        return (
            <Spin spinning={loadingOrderDetails} size="large">
                <Table
                    className="order-detail-table"
                    rowClassName={record => {
                        return (selectedOrderDetail && selectedOrderDetail.id === record.id)
                            ? 'order-detail-table-row-selected' : '';
                    }}
                    dataSource={orderDetails}
                    onRow={ordDetail => ({
                        onClick: () => this.props.changeSelectedOrder(ordDetail)
                    })}
                    size="small"
                    pagination={false}
                    scroll={{ y: prc }}
                    rowKey={record => `${record.id}`}>
                    <Column
                        title="Product name"
                        key="productName"
                        dataIndex="productName"
                        sorter={(a, b) => fieldSorter(a, b, 'productName')}
                        width="40%" />
                    <Column
                        title="Qty"
                        key="quantity"
                        dataIndex="quantity"
                        align="right"
                        sorter={(a, b) => fieldSorter(a, b, 'quantity')}
                        width="18%" />
                    <Column
                        title="Price"
                        key="productPrice"
                        dataIndex="productPrice"
                        align="right"
                        sorter={(a, b) => fieldSorter(a, b, 'productPrice')}
                        width="18%" />
                    <Column
                        title="Total"
                        key="total"
                        dataIndex="total"
                        align="right"
                        sorter={(a, b) => fieldSorter(a, b, 'total')}
                        width="18%" />
                </Table>
            </Spin>
        );
    }
}

export default OrderDetailTable