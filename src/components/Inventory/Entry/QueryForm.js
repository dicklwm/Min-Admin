import React from 'react';
import { Form, Input, Row, Col, Button, DatePicker } from 'antd';
// import moment from 'moment';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const Fields = [
  { label: '单据号', key: 'BILL_NO' },
  { label: '制单人', key: 'WRITER' },
  { label: '相关单据号', key: 'RELATIVE_BILL' },
  { label: '开始日期', key: 'StartDate' },
  { label: '结束日期', key: 'EndDate' },
];

function QueryForm ({ onOk, onClear, form, loading }) {

  const { getFieldDecorator, validateFields } = form;
  const ColLayout = { xs: 24 };
  const formItemLayout = {
    labelCol: { xs: 8 },
    wrapperCol: { xs: 16 },
  };

  function makeFormItem (label, key) {
    return (
      <Col {...ColLayout}>
        <FormItem
          {...formItemLayout}
          label={label}
        >
          {
            getFieldDecorator(key)(<Input placeholder={"请输入" + label} onPressEnter={okHandler}/>)
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
    <Form onSubmit={okHandler} style={{ maxWidth: 300 }}>
      <Row gutter={20}>

        {makeFormItem(Fields[0].label, Fields[0].key)}
        {makeFormItem(Fields[1].label, Fields[1].key)}
        {makeFormItem(Fields[2].label, Fields[2].key)}
        <Col {...ColLayout}>
          <FormItem>
            {
              getFieldDecorator('Date')(
                <RangePicker
                  getCalendarContainer={trigger => trigger.parentNode}
                  format="YYYY-MM-DD HH:mm:ss"
                  onChange={(dates, dateStrings) => {
                    form.setFieldsValue({
                      'StartDate': dateStrings[0],
                      'EndDate': dateStrings[1],
                    })
                  }}
                />)
            }
          </FormItem>
          {getFieldDecorator('StartDate')(<div></div>)}
          {getFieldDecorator('EndDate')(<div></div>)}
        </Col>

        <Col style={{ float: 'right' }}>
          <Button icon="close" onClick={onClear} style={{ marginRight: '12px' }}>清空</Button>
          <Button type="primary" icon="check" onClick={okHandler} loading={loading}>确认</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create({
  mapPropsToFields(props) {
    const query = props.query[0];
    return {
      BILL_NO: { value: query.BILL_NO },
      WRITER: { value: query.WRITER },
      RELATIVE_BILL: { value: query.RELATIVE_BILL },
      Date: { value: query.Date },
      StartDate: { value: query.StartDate },
      EndDate: { value: query.EndDate },
    }
  }
})(QueryForm);
