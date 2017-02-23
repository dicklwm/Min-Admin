import React from 'react';
import { Row, Col, Form, Input }  from 'antd';
import { makePropsToFields } from '../../../utils/func';

import InputTooltip from '../../common/InputTooltip';

const FormItem = Form.Item;
const Fields = [
  { label: '业务类型', key: 'BILL_TYPE' },
  { label: '单据号', key: 'BILL_NO' },
  { label: '单据日期', key: 'BILL_DATE' },
  { label: '相关单据号', key: 'RELATIVE_BILL' },
  { label: '部门', key: 'DEPARTMENT' },
  { label: '制单人', key: 'WRITER' },
  { label: '审核人', key: 'ACCEPTOR' },
  { label: '审核状态', key: 'AUDIT_STATUS' },
  { label: '备注', key: 'REF' },
];

function HeadDataForm ({ form }) {

  const { getFieldDecorator }=form;

  /**
   * 生成FormItem
   * @param arr
   * @param option 除了哪几项的key
   */
  function makesFormItem (arr, option = []) {
    const formItemLayout = {
      labelCol: { xs: 8 },
      wrapperCol: { xs: 16 },
    }
    return arr.map(item => option.includes(item.key) ? '' :
      <Col lg={6} md={8} xs={24} key={item.key}>
        <FormItem
          {...formItemLayout}
          label={item.label}
          key={item.key}
        >
          {
            getFieldDecorator(item.key)(<InputTooltip />)
          }
        </FormItem>
      </Col>
    )
  }

  return (
    <Form >
      <Row gutter={20}>
        {makesFormItem(Fields, ['REF'])}
        <Col xs={24}>
          <FormItem
            labelCol={{ lg: 2, md: 6, xs: 6 }}
            wrapperCol={{ lg: 22, md: 18, xs: 18 }}
            label='备注'
          >
            {
              getFieldDecorator('REF')(<InputTooltip />)
            }
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}

export default Form.create({
  mapPropsToFields(props) {
    const data = props.data;
    return makePropsToFields(Fields.map(item => item.key), data);
  }
})(HeadDataForm);
