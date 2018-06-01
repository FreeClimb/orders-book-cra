import React, { Component } from 'react'
import { Spin, Form, Icon, Input, Row, Col, Button } from 'antd'
import moment from 'moment'

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};

class OrderForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: null
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('selectedOrder' in nextProps) {
            const { selectedOrder } = nextProps;
            if (this.state.selectedOrder !== selectedOrder) {
                this.props.form.resetFields();
                this.setState(selectedOrder);
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err) => {
            if (!err) {
                const order = this.props.selectedOrder;
                this.props.setOrderCompleted(order);
            }
        });
    }

    renderInput = ({ id, label, type, value, icon }) => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                {...formItemLayout}
                label={label}>
                {getFieldDecorator(id, { initialValue: value })(
                    <Input
                        disabled
                        type={type}
                        addonBefore={<Icon type={icon} />} />
                )}
            </FormItem>);
    }

    renderStatus = ({ id, label, type, value, icon }) => {
        const { getFieldDecorator } = this.props.form;
        return (
            <FormItem
                {...formItemLayout}
                label={label}>
                {getFieldDecorator(id, { initialValue: value })(
                    <Input
                        disabled
                        type={type}
                        addonBefore={<Icon type={icon} style={{ color: '#fffff', backgroundColor: value === 'Complete' ? 'olivedrab' : 'mediumvioletred' }} />} />
                )}
            </FormItem>);
    }
    // <Badge
    // dot
    // count={1}
    // style={{ backgroundColor: value === 'Complete' ? 'olivedrab' : 'mediumvioletred' }} />

    render() {

        const { selectedOrder, total,loadingOrders, savingOrder } = this.props;

        const RenderInput = this.renderInput.bind(this);
        const RenderStatus = this.renderStatus.bind(this);

        return (
            <Spin spinning={loadingOrders} size="large">
                <Form onSubmit={this.handleSubmit} className="order-form">
                    <Row type="flex">
                        <Col push={1} span={18}>
                            <Row>
                                <RenderInput id="orderName" label="Number" type="text" icon="shopping-cart"
                                    value={selectedOrder ? selectedOrder.orderName : ''} />
                                <RenderInput id="created" label="Date" type="datetime" icon="calendar"
                                    value={selectedOrder ? moment(selectedOrder.created).format('DD.MM.YYYY HH:mm') : ''} />
                                <RenderStatus id="status" label="Status" type="text" icon="check"
                                    value={selectedOrder ? selectedOrder.status : ''} />
                                <RenderInput id="total" label="Total" type="number" icon="calculator"
                                    value={total} />
                            </Row>
                            <Row type="flex" justify="center">
                                <Col span={16} push={3}>
                                    <FormItem>
                                        <Button type="primary"
                                            icon="check-circle-o"
                                            htmlType="submit"
                                            disabled={!selectedOrder || (selectedOrder && selectedOrder.completed) || savingOrder}
                                            loading={savingOrder}
                                            className="btn-complete-order">
                                            Complete order
                                        </Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Spin>
        )
    }
}

const WrappedOrderForm = Form.create()(OrderForm);

export default WrappedOrderForm

