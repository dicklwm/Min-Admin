import React from 'react';
import styles from './ColumnPopover.css';
import { Popover, Checkbox, Button, InputNumber } from 'antd';

class ColumnPopover extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      indeterminate: true,
      checkAll: false,
    }
    this.columns = this.props.columns;
  }

  handleCheckBoxChange (dataIndex, checked) {
    const { onCheckBoxAndWidthChange }=this.props;
    //先找到对应的index
    const index = this.columns.findIndex(item => item.dataIndex===dataIndex);
    //修改状态
    this.columns[index].visible = checked;
    //获取新的应该显示的列
    const newColumns = this.columns.filter(item => item.visible!==false);
    //调props
    onCheckBoxAndWidthChange && onCheckBoxAndWidthChange(newColumns);
    this.setState({
      indeterminate: !!newColumns.length,
      checkAll: this.columns.length===newColumns.length,
    })
  }

  handleCheckAllChange (checked) {
    const { onCheckBoxAndWidthChange }=this.props;
    this.columns = this.columns.map(item => {
      item.visible = checked;
      return item;
    });
    const newColumns = this.columns.filter(item => item.visible!==false);
    onCheckBoxAndWidthChange && onCheckBoxAndWidthChange(newColumns);
    this.setState({
      indeterminate: false,
      checkAll: checked,
    });
  }

  handleChangeWidth (dataIndex, value) {
    const { onCheckBoxAndWidthChange }=this.props;
    //先找到对应的index
    const index = this.columns.findIndex(item => item.dataIndex===dataIndex);
    //修改宽度
    this.columns[index].width = value;
    //获取新的应该显示的列
    const newColumns = this.columns.filter(item => item.visible!==false);
    //调props
    onCheckBoxAndWidthChange && onCheckBoxAndWidthChange(newColumns);
  }

  render () {
    return (
      <Popover trigger="click" placement="leftBottom"
               title={(
                 <Checkbox
                   indeterminate={this.state.indeterminate}
                   checked={this.state.checkAll}
                   onChange={e => this.handleCheckAllChange(e.target.checked)}
                 >
                   全选
                 </Checkbox>
               )}
               content={
                 (
                   <ul>
                     {this.columns.map((item, index) => {
                       return (
                         <li className={styles.checkboxLi} key={index}>
                           <Checkbox defaultChecked={item.visible!==false}
                                     checked={item.visible!==false}
                                     onChange={(e) => this.handleCheckBoxChange(item.dataIndex, e.target.checked)}
                                     key={index}
                           >
                             {item.title}
                             {!!this.props.widthChange ?
                               <InputNumber value={item.width} min={0}
                                            style={{ marginLeft: '12px', width: '60px' }}
                                            onChange={value => this.handleChangeWidth(item.dataIndex, value)}
                               /> : ''
                             }

                           </Checkbox>
                         </li>
                       )
                     })}
                   </ul>
                 )
               }
      >
        <Button className={this.props.buttonClass}
                style={this.props.buttonStyle}>{this.props.children || '列表选项'}</Button>
      </Popover>
    )
  }
}

ColumnPopover.propTypes = {
  buttonClass: React.PropTypes.string,
  buttonStyle: React.PropTypes.object,
  children: React.PropTypes.element,
  columns: React.PropTypes.array,
  onCheckBoxAndWidthChange: React.PropTypes.func,
  widthChange:React.PropTypes.bool,
}

export default ColumnPopover;
