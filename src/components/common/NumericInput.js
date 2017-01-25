import React from 'react';
import styles from './NumericInput.css';
import { Input, Tooltip } from 'antd';

function formatNumber (value) {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0)==='-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class NumericInput extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value==='' || value==='-') {
      this.props.onChange(value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value } = this.props;
    if (value.charAt(value.length - 1)==='.' || value==='-') {
      this.props.onChange({ value: value.slice(0, -1) });
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  }

  render () {
    const { value } = this.props;
    const title = (value ?
      (<span className={styles["numeric-input-title"]}>
        {value!=='-' ? formatNumber(value) : '-'}
      </span>) : '');
    return (
      <div>
        <Tooltip
          trigger={['focus']}
          title={title}
          placement="topLeft"
          overlayClassName={styles["numeric-input"]}
        >
          <Input
            {...this.props}
            onChange={this.onChange}
            onBlur={this.onBlur}
            placeholder="输入数字"
            maxLength="25"
          />
        </Tooltip>
      </div>
    );
  }
}

export default NumericInput;
