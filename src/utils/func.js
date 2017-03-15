// import EditableCell from '../components/common/EditableCell';
import { Input, Form, Select, Col, DatePicker } from 'antd';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
import moment from 'moment';

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, function () {
    return arguments[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length===1
        ? o[k]
        : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format;
}

function makeChildren (fathers, children, fKeyName, fValueName, cKeyName, cValueName, fatherKey = 'id', childrenKey = 'MASTERID',) {

  return fathers.map((father) => {
    father['children'] = [];
    father['label'] = father[fKeyName];
    father['value'] = father[fValueName];
    children.forEach(child => {
      if (father[fatherKey]===child[childrenKey]) {
        child['label'] = child[cKeyName];
        child['value'] = child[cValueName];
        father['children'].push(child)
      }
    })
    return father;
  })

}

/**
 * 将表单元素转换为props
 * @param Fields 表单头
 * @param data 表单值
 * @return {{}}
 */
function makePropsToFields (Fields, data) {
  let obj = {};
  Fields.forEach(item => {
    switch (item.type || 'text') {
      case 'text':
      case 'select':
        obj[item.key] = { value: data[item.key] }
        break;
      case 'datetime':
      case 'date':
        obj[item.key] = { value: moment(data[item.key]) }
        break;
      default:
        break;

    }
  });
  return obj;
}

function objToItemFields (arr, getFieldDecorator,
                          globalColLayout = { lg: 8, xs: 24 },
                          globalFormItemLayout = {
                            labelCol: { lg: 8, xs: 4 },
                            wrapperCol: { lg: 16, xs: 20 },
                          }) {
  let result = arr.map((item, arrIndex) => {
    //获取每个项的type，缺省为text
    let type = item.type || 'text',
      //获取每项的colLayout
      colLayout = item.colLayout || globalColLayout,
      formLayout = item.formLayout || globalFormItemLayout;
    switch (type) {
      case 'text':
        return (
          <Col key={arrIndex} {...colLayout}>
            <FormItem label={item.label} {...formLayout}>
              {getFieldDecorator(item.key, item.option)(
                <Input disabled={item.disabled} placeholder={item.placeholder}/>
              )}
            </FormItem>
          </Col>
        )
      case 'select':
        const Option = Select.Option;
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
        console.log(selectOption);
        return (
          <Col key={arrIndex} {...colLayout}>
            <FormItem label={item.label} {...formLayout}>
              {getFieldDecorator(item.key, item.option)(
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
            <FormItem label={item.label} {...formLayout}>
              {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...item.option })(
                <DatePicker
                  showTime
                  format={item.format || "YYYY-MM-DD HH:mm:ss"}
                  placeholder={item.placeholder}
                  onChange={item.onChange}
                />
              )}
            </FormItem>
          </Col>
        )
      case 'date':
        return (
          <Col key={arrIndex} {...colLayout}>
            <FormItem label={item.label} {...formLayout}>
              {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...item.option })(
                <DatePicker
                  format={item.format || "YYYY-MM-DD"}
                  placeholder={item.placeholder}
                  onChange={item.onChange}
                />
              )}
            </FormItem>
          </Col>
        )
      case 'dateRange':
        return (
          <Col key={arrIndex} {...colLayout}>
            <FormItem label={item.label} {...formLayout}>
              {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...item.option })(
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
            <FormItem label={item.label} {...formLayout}>
              {getFieldDecorator(item.key, { initialValue: item.defaultValue, ...item.option })(
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

      default :
        break;

    }

  });
  console.log(result);
  return result;

}

/**
 * 将json转为url格式
 * @param param 要转换的数据
 * @param key 可选，前缀
 * @returns {string}
 */
function parseParam (param, key) {
  var paramStr = "";
  if (typeof param==="string" || typeof param==="number" || typeof param==='boolean') {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  } else {
    for (var v in param) {
      var k = key==null ? v : key + (param instanceof Array ? "[" + v + "]" : "." + v);
      paramStr += '&' + parseParam(param[v], k);
    }
  }
  return paramStr.substr(1);
};

module.exports = {
  makeChildren,
  makePropsToFields,
  objToItemFields,
  parseParam,
}
