import React from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Select, Row, Col, DatePicker, Cascader } from 'antd';
import moment from 'moment';
import { makeChildren } from '../../../utils/func';

const FormItem = Form.Item;
const Option = Select.Option;

class ItemListModal extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  }

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  }

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        //先将values进行处理，如供应商的ID和label分离
        values['SUPPLIER'] = values['SUPPLIER'] && values['SUPPLIER'].label;
        values['BRAND'] = values['BRAND'] && values['BRAND'].label;
        values['ProductFactory'] = values['ProductFactory'] && values['ProductFactory'].label;
        values['CLIENT'] = values['CLIENT'] && values['CLIENT'].label;
        values['ITEM_TYPE'] = values['ITEM_TYPE'] && values['ITEM_TYPE'][1];
        values['ITEM_DATE'] = values['ITEM_DATE'] && values['ITEM_DATE'].format('YYYY-M-D HH:mm:ss');

        onOk(values);
        this.hideModelHandler();
        this.props.form.resetFields();
      }
    });
  };

  makeOptions (arr, keyName, valueName) {
    let result = [];
    arr.forEach((item, index) => {
      result.push(
        <Option value={item[valueName]} key={index}>{item[keyName]}</Option>
      )
    })
    return result
  };

  makeFormItem (label, key, required = false, options = { initialValue: null }) {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { lg: 8, xs: 4 },
      wrapperCol: { lg: 16, xs: 20 },
    };
    if (required) {
      if (options.initialValue===null) {
        options = {
          initialValue: null,
          rules: [{ required: true, message: label + " 必填" }],
        }
      }
    }
    return (
      <Col lg={8} xs={24}>
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

  render () {

    const { children, BrandType, ProductFactory, ItemClass, ItemType, inner, onModalCancel } = this.props;
    const { getFieldDecorator, setFieldsValue } = this.props.form;
    const formItemLayout = {
      labelCol: { lg: 8, xs: 4 },
      wrapperCol: { lg: 16, xs: 20 },
    };
    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal
          title={this.props.title}
          visible={inner ? this.state.visible : this.props.visible}
          onOk={this.okHandler}
          onCancel={inner ? this.hideModelHandler : onModalCancel}
          width={850}
        >
          <Form onSubmit={this.okHandler}>
            {getFieldDecorator('id')(<div></div>)}
            <Row gutter={20}>
              {this.makeFormItem('物料编码', 'ITEM')}
              {this.makeFormItem('物料名称', 'ITEM_DESC', true)}

              <Col lg={8} xs={24}>
                <FormItem
                  {...formItemLayout}
                  label="物料类型"
                >
                  {
                    getFieldDecorator('ITEM_TYPE', {})(
                      <Cascader
                        expandTrigger="hover"
                        options={makeChildren(ItemClass, ItemType, 'ITEM_CLASS', 'ITEM_CLASS', 'ITEM_TYPE', 'ITEM_TYPE')}
                        placeholder="请选择物料类型"
                        onChange={(value, values) =>
                          setFieldsValue({
                            ITEM_TYPEID: values.find(item => item.value===value[0]).children.find(childItem => childItem.value===value[1]).ITEM_TYPEID
                          })
                        }
                      />
                    )
                  }
                </FormItem>
                {getFieldDecorator('ITEM_TYPEID')(<div></div>)}
              </Col>

              {this.makeFormItem('单位', 'UM')}
              {this.makeFormItem('规格', 'SQEC')}

              <Col lg={8} xs={24}>
                <FormItem
                  {...formItemLayout}
                  label="供应商"
                >
                  {
                    getFieldDecorator('SUPPLIER', {})(
                      <Select placeholder="请选择供应商" showSearch labelInValue onChange={value => setFieldsValue({
                        SUPPLIERID: value.key
                      })}>
                        <Option value={"工具"}>工具</Option>
                        <Option value={"其他"}>其他</Option>
                      </Select>
                    )
                  }
                </FormItem>
                {getFieldDecorator('SUPPLIERID')(<div></div>)}
              </Col>

              <Col lg={8} xs={24}>
                <FormItem
                  {...formItemLayout}
                  label="生产厂家"
                >
                  {
                    getFieldDecorator('ProductFactory', {})(
                      <Select placeholder="请选择生产厂家" showSearch labelInValue onChange={value => setFieldsValue({
                        ProductFactoryID: value.key
                      })}>
                        {this.makeOptions(ProductFactory, 'ProductFactory', 'ProductFactoryID')}
                      </Select>
                    )
                  }
                </FormItem>
                {getFieldDecorator('ProductFactory')(<div></div>)}
              </Col>

              <Col lg={8} xs={24}>
                <FormItem
                  {...formItemLayout}
                  label="品牌"
                >
                  {
                    getFieldDecorator('BRAND', {})(
                      <Select placeholder="请选择品牌" showSearch labelInValue onChange={value => setFieldsValue({
                        BRANDID: value.key
                      })}>
                        {this.makeOptions(BrandType, 'BRAND', 'BrandID')}
                      </Select>
                    )
                  }
                </FormItem>
                {getFieldDecorator('BRANDID')(<div></div>)}
              </Col>

              <Col lg={8} xs={24}>
                <FormItem
                  {...formItemLayout}
                  label="编制时间"
                  required
                >
                  {
                    getFieldDecorator('ITEM_DATE', {
                      initialValue: moment(new Date())
                    })(
                      <DatePicker showTime format="YYYY-M-D HH:mm:ss" style={{ display: "block" }}/>
                    )
                  }
                </FormItem>
              </Col>

              {this.makeFormItem('产品标准', 'ITEM_STANDARD')}

              <Col lg={8} xs={24}>
                <FormItem
                  {...formItemLayout}
                  label="客户"
                >
                  {
                    getFieldDecorator('CLIENT', {})(
                      <Select placeholder="请选择客户" showSearch labelInValue onChange={value => setFieldsValue({
                        CLIENTID: value.key
                      })}>
                        <Option value={"工具"}>工具</Option>
                        <Option value={"其他"}>其他</Option>
                      </Select>
                    )
                  }
                </FormItem>
                {getFieldDecorator('CLIENTID')(<div></div>)}
              </Col>

              {this.makeFormItem('材质', 'MATERIAL_QUALITY')}
              {this.makeFormItem('提前期', 'LT')}
              {this.makeFormItem('购置代码', 'MB')}
              {this.makeFormItem('ABC码', 'ABC_CODE')}

              <Col xs={24}>
                <FormItem
                  labelCol={{ lg: 2, xs: 4 }}
                  wrapperCol={{ lg: 22, xs: 20 }}
                  label="备注"
                >
                  {
                    getFieldDecorator('REP', { initialValue: null })(
                      <Input type="textarea" rows={2}/>
                    )
                  }
                </FormItem>
              </Col>

            </Row>
          </Form>
        </Modal>
      </span>
    )
  }
}

function mapStateToProps (state) {
  const matter = state['Inventory/Matter'];
  return {
    ItemType: matter.ItemType,
    BrandType: matter.BrandType,
    ProductFactory: matter.ProductFactory,
    ItemClass: matter.ItemClass,
  };
}

export default connect(mapStateToProps)(Form.create({
  mapPropsToFields(props){
    let obj = {};
    for (let o in props.ItemList) {
      let value = props.ItemList[o];
      switch (o) {
        case 'ITEM_TYPE':
          let ITEM_TYPE = props.ItemType.find(item => item.ITEM_TYPE===value);
          let ITEM_CLASS = ITEM_TYPE ? ITEM_TYPE['ITEM_CLASS'] : null;
          let AllItemClass = props.ItemClass.find(item => item['ITEM_CLASS']===ITEM_CLASS);
          obj[o] = { value: [AllItemClass ? AllItemClass['ITEM_CLASS'] : null, value] }
          break;
        case 'SUPPLIER':
        case 'CLIENT':
        case 'BRAND':
        case 'ProductFactory':
          obj[o] = { value: { value: value, label: value } }
          break;
        case 'ITEM_DATE':
          obj[o] = { value: moment(value) };
          break;
        default:
          obj[o] = { value: value }
          break;
      }
    }
    return {
      ...obj
    }
  }
})(ItemListModal));
