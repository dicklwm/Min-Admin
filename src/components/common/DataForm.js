import React from 'react';
import { Form, Input, Select, Row, Col, DatePicker } from 'antd';
import { makePropsToFields } from '../../utils/func';

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

function DataForm ({ form, RowGutter, Fields, globalColLayout, globalFormItemLayout, onOk }) {

  function okHandler () {
    form.validateFields((err, values) => {
      if (!err) {
        console.log(values, 'dataForm');
        onOk && onOk(values);
        form.resetFields();
      }
    })
  }

  /**
   * 根据传进来的data数组，进行不同类型（type）的FormItem的生成
   * @param Fields 数据格式为数组，根据不同的type去定制FormItem
   * @param globalColLayout 默认的Col布局
   * @param globalFormItemLayout 默认的FormItem布局
   * @return 返回FormItem数组，且包装好Col
   */

  function objToItemFields (Fields, globalColLayout = { lg: 8, xs: 24 },
                            globalFormItemLayout = {
                              labelCol: { lg: 8, xs: 8 },
                              wrapperCol: { lg: 16, xs: 16 },
                            }) {
    const { getFieldDecorator } = form;
    let result = Fields.map((item, arrIndex) => {
      //获取每个项的type，缺省为text
      let type = item.type || 'text',
        //获取每项的colLayout
        colLayout = item.colLayout || globalColLayout,
        formLayout = item.formLayout || globalFormItemLayout,
        option = item.required ? {
            rules: [{
              required: true,
              message: item.label + " 必填"
            }], ...item.option
          } : item.option;
      switch (type) {
        case 'text':
          return (
            <Col key={arrIndex} {...colLayout}>
              <FormItem label={item.label} {...formLayout} required={item.required}
                        hasFeedback={item.required || item.hasFeedback}>
                {getFieldDecorator(item.key, option)(
                  <Input disabled={item.disabled} placeholder={item.placeholder}/>
                )}
              </FormItem>
            </Col>
          )
        case 'select':
          let selectOption = [];
          //支持调用function获取数据，返回的数据格式需要是{value:'xxx'}
          if (typeof item.selectOption==='function') {
            selectOption = item.selectOption();
          } else {
            selectOption = item.selectOption;
          }
          //遍历数组，生成对应的Option的DOM，value是必填，label不存在时用value代替
          selectOption = selectOption.map((option, index) =>
            <Option value={option.value} key={index}>{option.label || option.value}</Option>
          )
          return (
            <Col key={arrIndex} {...colLayout} >
              <FormItem label={item.label} {...formLayout} required={item.required}>
                {getFieldDecorator(item.key, option)(
                  <Select disabled={item.disabled} placeholder={item.placeholder}
                          labelInValue={item.labelInValue}
                          onChange={item.onChange} showSearch={item.showSearch}>
                    {selectOption}
                  </Select>
                )}
              </FormItem>
            </Col>
          )
        case 'datetime':
          return (
            <Col key={arrIndex} {...colLayout}>
              <FormItem label={item.label} {...formLayout} required={item.required}>
                {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...option })(
                  <DatePicker
                    showTime
                    format={item.format || "YYYY-MM-DD HH:mm:ss"}
                    placeholder={item.placeholder}
                    onChange={item.onChange}
                    style={{ display: "block" }}
                  />
                )}
              </FormItem>
            </Col>
          )
        case 'date':
          return (
            <Col key={arrIndex} {...colLayout}>
              <FormItem label={item.label} {...formLayout} required={item.required}
                        hasFeedback={item.required || item.hasFeedback}>
                {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...option })(
                  <DatePicker
                    format={item.format || "YYYY-MM-DD"}
                    placeholder={item.placeholder}
                    onChange={item.onChange}
                    style={{ display: "block" }}
                  />
                )}
              </FormItem>
            </Col>
          )
        case 'dateRange':
          return (
            <Col key={arrIndex} {...colLayout}>
              <FormItem label={item.label} {...formLayout} required={item.required}
                        hasFeedback={item.required || item.hasFeedback}>
                {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...option })(
                  <RangePicker
                    format={item.format || "YYYY-MM-DD"}
                    placeholder={item.placeholder}
                    onChange={item.onChange}
                  />
                )}
              </FormItem>
            </Col>
          )
        case 'datetimeRange':
          return (
            <Col key={arrIndex} {...colLayout}>
              <FormItem label={item.label} {...formLayout} required={item.required}
                        hasFeedback={item.required || item.hasFeedback}>
                {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...option })(
                  <RangePicker
                    showTime
                    format={item.format || "YYYY-MM-DD HH:mm:ss"}
                    placeholder={item.placeholder}
                    onChange={item.onChange}
                  />
                )}
              </FormItem>
            </Col>
          )

        case 'number':
          return '';
        case 'textarea':
          return (
            <Col key={arrIndex} {...colLayout}>
              <FormItem label={item.label} {...formLayout} required={item.required}
                        hasFeedback={item.required || item.hasFeedback}>
                {getFieldDecorator(item.key, option)(
                  <Input disabled={item.disabled} placeholder={item.placeholder}
                         type="textarea" rows={item.rows || 2}/>
                )}
              </FormItem>
            </Col>
          )
        case 'hidden':
          return (
            getFieldDecorator(item.key, option)(
              <div key={arrIndex}></div>
            )
          )

        default :
          break;

      }

    });
    return result;
  }

  return (
    <Form onSubmit={okHandler}>
      <Row gutter={RowGutter || 20}>

        {objToItemFields(Fields, globalColLayout, globalFormItemLayout)}
        {form.getFieldDecorator('id')(<div></div>)}
      </Row>
    </Form>
  )
}

DataForm.propTypes = {
  Fields: React.PropTypes.array,
  onOk: React.PropTypes.func,
  data: React.PropTypes.object,
}

export default Form.create({
  mapPropsToFields (props) {
    const { data, Fields } = props;
    if (data) {
      let Props = makePropsToFields(Fields, data);
      Props.id = { value: data.id };
      return Props;
    }
  }
})(DataForm);
