import React from 'react';
import styles from './EditableCell.css';
import { Input, Icon, DatePicker, InputNumber, Tooltip } from 'antd';
import moment from 'moment';
import NumericInput from './NumericInput';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }

  handleDateChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({ value: dateString });
  }

  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value, this.props.index, this.props.dataIndex);
    }
  }
  edit = () => {
    this.props.onEdit(this.props.index, this.props.dataIndex);
    // this.setState({ editable: true });
  }

  makeInput (dataType) {
    const { value } = this.state;
    switch (dataType.toLowerCase()) {

      case 'string':
        return (
          <Tooltip title={value || ''} trigger={["focus"]}>
            <Input
              value={value}
              onChange={this.handleChange}
              onPressEnter={this.check}
            />
          </Tooltip>
        )
      case 'number':
        return (
          <NumericInput
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.check}
          />
        )
      case 'int':
        return (
          <InputNumber
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.check}
          />
        )

      case 'datetime':
        return (
          <DatePicker
            showTime
            defaultValue={!!value ? moment(value, 'YYYY-MM-DD HH:mm:ss') : null}
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="选择时间"
            onChange={this.handleDateChange}
          />
        )

      case 'date':
        return (
          <DatePicker
            defaultValue={moment(value)}
            onChange={this.handleChange}
            format="YYYY-MM-DD"
          />
        )
    }
  }

  componentWillReceiveProps (nextProps) {
    const { index, dataIndex, onChange } = this.props,
      editable = nextProps.editable[dataIndex]===index,
      { status }=this.props.editable,
      nextStatus = nextProps.editable.status;

    if (editable) {
      this.setState({ editable: true });
      this.cacheValue = this.state.value;
    } else {
      this.setState({ editable: false });
    }
    if (this.state.editable && nextStatus!==status) {
      if (nextStatus==='save')
        onChange(this.state.value, index, dataIndex, 'all');
      else if (nextStatus==='cancel') {
        this.setState({ value: this.cacheValue });
        onChange(this.cacheValue, index, dataIndex, 'all');
      }
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { dataIndex, index } = this.props;
    const nextEditable = nextProps.editable[dataIndex]===index;
    console.log(index, dataIndex, nextEditable!==this.state.editable ||
      nextState.value!==this.state.value
    );
    return nextEditable!==this.state.editable ||
      nextState.value!==this.state.value;
  }

  render () {
    const { value, editable } = this.state,
      { dataType }=this.props;

    return (
      <div className={styles["editable-cell"]}>
        {
          editable ?
            <div className={styles["editable-cell-input-wrapper"]}>
              {this.makeInput(dataType)}
              <Icon
                type="check"
                className={styles["editable-cell-icon-check"]}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles["editable-cell-text-wrapper"]}>
              <Tooltip title={value || ''}>
                {value || ' '}
              </Tooltip>
              <Icon
                type="edit"
                className={styles["editable-cell-icon"]}
                onClick={this.edit}
              />
            </div>
        }
      </div>);
  }
}

export default EditableCell;
