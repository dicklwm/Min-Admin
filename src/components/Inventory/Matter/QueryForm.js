import React from 'react';
import { Form, Input, Row, Col, Button } from 'antd';

const FormItem = Form.Item;

function QueryForm ({ onOk, onClear, form }) {

  const { getFieldDecorator, validateFields } = form;
  const ColLayout = { lg: 12, xs: 24 };
  const formItemLayout = {
    labelCol: { xs: 8 },
    wrapperCol: { xs: 16 },
  };

  function makeFormItem (label, key, required = false, options = { initialValue: null }) {
    if (required) {
      if (options.initialValue===null) {
        options = {
          initialValue: null,
          rules: [{ required: true, message: label + " 必填" }],
        }
      }
    }
    return (
      <Col {...ColLayout}>
        <FormItem
          {...formItemLayout}
          label={label}
          required={required}
          hasFeedback={required}
        >
          {
            getFieldDecorator(key, options)(<Input placeholder={"请输入" + label}/>)
          }
        </FormItem>
      </Col>
    )
  }

  function okHandler () {
    validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  };

  return (
    <Form onSubmit={okHandler} style={{ maxWidth: 500 }}>
      <Row gutter={20}>
        {makeFormItem('物料编码', 'ITEM')}
        {makeFormItem('物料名称', 'ITEM_DESC')}
        {makeFormItem('物料类型', 'ITEM_TYPE')}
        {makeFormItem('规格', 'SQEC')}
        {makeFormItem('供应商', 'SUPPLIER')}
        {makeFormItem('生产厂家', 'ProductFactory')}
        {makeFormItem('品牌', 'BRAND')}
        <Col style={{ float: 'right' }}>
          <Button icon="close" onClick={onClear}>清空</Button>
          <Button type="primary" icon="check" onClick={okHandler}>确认</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create({
  mapPropsToFields(props) {
    const query = props.query[0];
    return {
      ITEM: { value: query.ITEM },
      ITEM_DESC: { value: query.ITEM_DESC },
      SQEC: { value: query.SQEC },
      SUPPLIER: { value: query.SUPPLIER },
      ProductFactory: { value: query.ProductFactory },
      BRAND: { value: query.BRAND },
    }
  }
})(QueryForm);
