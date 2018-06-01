import React from 'react';
import { Col, Row } from 'antd'
import OrderTableContainer from './containers/OrderTableContainer'
import FilterLegendContainer from './containers/FilterLegendContainer'
import OrderFormContainer from './containers/OrderFormContainer'
import OrderDetailTableContainer from './containers/OrderDetailTableContainer'

export default (props) => (
  <Row type="flex" justify="space-around" className="flex-item-grow">
    <Col sm={24} md={24} lg={20} xl={18} xxl={14}>
      <Row className="flex-container">
        <Col span={10} style={{ backgroundColor: '#676c72' }}>
          <Row type="flex" className="flex-item-grow order-table-wrap">
            <OrderTableContainer {...props} />
          </Row>
          <Row>
            <FilterLegendContainer {...props} />
          </Row>
        </Col>
        <Col span={14} style={{ backgroundColor: '#b1b4b8' }}>
          <Row>
            <OrderFormContainer {...props} />
          </Row>
          <Row type="flex" className="flex-item-grow order-detail-table-wrap">
            <OrderDetailTableContainer {...props} />
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
);
