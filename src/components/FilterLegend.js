import React, { Component } from 'react'
import { Alert, Icon, Spin, Badge, Row, Col } from 'antd'

const allLoadingIcon = (
    <Icon type="loading"
        style={{ marginLeft: -228, marginTop: -4, color: 'royalblue' }}
        spin />);

const completeLoadingIcon = (
    <Icon type="loading"
        style={{ marginLeft: -228, marginTop: -4, color: 'olivedrab' }}
        spin />);

const inProgressLoadingIcon = (
    <Icon type="loading"
        style={{ marginLeft: -228, marginTop: -4, color: 'mediumvioletred' }}
        spin />);

class FilterLegend extends Component {

    render() {
        const { orders, loadingOrders } = this.props;
        const completeOrds = orders.filter(x => x.completed);
        const inProgressOrds = orders.filter(x => !x.completed);
        return (
            <div>
                <Alert
                    className="filter-legend"
                    message="Filter Orders"
                    type="info"
                    showIcon
                    iconType="filter"
                    description={
                        <Col span={24} style={{ lineHeight: 1.8 }}>
                            <Row>
                                <a onClick={e => {
                                    e.preventDefault();
                                    const ords = [];
                                    this.props.filterOrders(ords);
                                }}>
                                    <Spin
                                        indicator={allLoadingIcon}
                                        spinning={loadingOrders}>
                                        <Badge
                                            count={orders.length}
                                            style={{ marginLeft: -84, marginTop: 8, backgroundColor: 'royalblue' }}>
                                            <span>All orders</span>
                                        </Badge>
                                    </Spin>
                                </a>
                            </Row>
                            <Row>
                                <a onClick={e => {
                                    e.preventDefault();
                                    this.props.filterOrders(completeOrds);
                                }}>
                                    <Spin
                                        indicator={completeLoadingIcon}
                                        spinning={loadingOrders}>
                                        <Badge
                                            count={completeOrds ? completeOrds.length : 0}
                                            style={{ marginLeft: -85, marginTop: 8, backgroundColor: 'olivedrab' }}>
                                            <span>Complete</span>
                                        </Badge>
                                    </Spin>
                                </a>
                            </Row>
                            <Row>
                                <a onClick={e => {
                                    e.preventDefault();
                                    this.props.filterOrders(inProgressOrds);
                                }}>
                                    <Spin
                                        indicator={inProgressLoadingIcon}
                                        spinning={loadingOrders} >
                                        <Badge
                                            count={inProgressOrds ? inProgressOrds.length : 0}
                                            style={{ marginLeft: -94, marginTop: 8, backgroundColor: 'mediumvioletred' }}>
                                            <span>In progress</span>
                                        </Badge>
                                    </Spin>
                                </a>
                            </Row>
                        </Col>}
                />
            </div>
        );
    }
}

export default FilterLegend
