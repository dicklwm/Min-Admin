import React from 'react';
import { Table, Button, Popconfirm } from 'antd';
// import { makeColumns, makeColumn } from '../../../utils/func';
import EditableCell from '../../common/EditableCell';

class MatterTable extends React.Component {

  constructor (props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.columns =
      [
        {
          title: '物料编码', dataIndex: 'ITEM', key: 'ITEM', width: 180,
          sorter: (a, b) => a['ITEM'].charCodeAt(0) - b['ITEM'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='ITEM'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '物料名称', dataIndex: 'ITEM_DESC', key: 'ITEM_DESC', width: 180,
          sorter: (a, b) => a['ITEM_DESC'].charCodeAt(0) - b['ITEM_DESC'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='ITEM_DESC'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '物料类型', dataIndex: 'ITEM_TYPE', key: 'ITEM_TYPE', width: 180,
          sorter: (a, b) => a['ITEM_TYPE'].charCodeAt(0) - b['ITEM_TYPE'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='ITEM_TYPE'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '单位', dataIndex: 'UM', key: 'UM', width: 180,
          sorter: (a, b) => a['UM'].charCodeAt(0) - b['UM'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='UM'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '规格', dataIndex: 'SQEC', key: 'SQEC', width: 180,
          sorter: (a, b) => a['SQEC'].charCodeAt(0) - b['SQEC'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='SQEC'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '供应商', dataIndex: 'SUPPLIER', key: 'SUPPLIER', width: 280,
          sorter: (a, b) => a['SUPPLIER'].charCodeAt(0) - b['SUPPLIER'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='SUPPLIER'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '品牌', dataIndex: 'BRAND', key: 'BRAND', width: 180, visible: false,
          sorter: (a, b) => a['BRAND'].charCodeAt(0) - b['BRAND'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='BRAND'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '生产厂家', dataIndex: 'ProductFactory', key: 'ProductFactory', width: 180,
          sorter: (a, b) => a['ProductFactory'].charCodeAt(0) - b['ProductFactory'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='string'
              value={text}
              dataIndex='ProductFactory'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },
        {
          title: '编制日期', dataIndex: 'ITEM_DATE', key: 'ITEM_DATE', width: 240,
          sorter: (a, b) => a['ITEM_DATE'].charCodeAt(0) - b['ITEM_DATE'].charCodeAt(0),
          render: (text, record, index) => (
            <EditableCell
              dataType='datetime'
              value={text}
              dataIndex='ITEM_DATE'
              onChange={this.onChange}
              index={index}
              editable={this.state.editable}
              onEdit={this.onEdit}
            />)
        },

        {
          title: '操作',
          key: 'action',
          width: 100,
          fixed: 'right',
          render: (text, record, index) => {
            const global = this.state.editable.global;
            const editable = (global!== -1) && global===index;
            return (
              <div>
                {editable ? <span>
                    <Button type="primary" shape="circle" icon="save" size="small"
                            onClick={() => this.editDone(index, 'save')}>
                    </Button>
                    <Popconfirm title="确认取消？" onConfirm={() => this.editDone(index, 'cancel')}>
                      <Button type="primary" shape="circle" icon="close" size="small"></Button>
                    </Popconfirm>
                  </span>
                  :
                  <Button type="primary" shape="circle" icon="edit" size="small"
                          onClick={() => this.onEditButtonClick(index)}>
                  </Button>
                }
                <Popconfirm title="确认删除？" onConfirm={() => this.HandleDelete(record.id)}>
                  <Button type="primary" shape="circle" icon="delete" size="small"></Button>
                </Popconfirm>
              </div>
            )
          }
        }
      ];

    //生成editable，默认为-1
    this.dataIndex = {};
    this.columns.forEach(column => {
      if (typeof column.dataIndex!=='undefined')
        this.dataIndex = { ...this.dataIndex, [column.dataIndex]: -1 }
    })

    // this.pagination = {
    //   current:this.props.pagination.current,
    //   total: this.props.pagination.total,
    //   showSizeChanger: true,
    //   total:this.props.pagination.total,
    //   onShowSizeChange: (current, pageSize) => {
    //     this.props.dispatch({
    //       type: 'changeShowSize',
    //       payload: {
    //         current: current,
    //         pageSize: pageSize,
    //       }
    //     })
    //   },
    //   onChange: (current) => {
    //     this.props.dispatch({
    //       type: 'fetch',
    //       payload: {
    //         current: current,
    //         pageSize: this.props.pagination.pageSize,
    //       }
    //     })
    //   },
    // }

    this.state = {
      columns: this.columns.filter(item => item.visible!==false),
      editable: {
        global: -1,
        status: 'normal',
        ...this.dataIndex
      },
    }
  }

  HandleDelete (id) {
    console.log('delete ' + id);
    const { dispatch } = this.props;
    dispatch({
      type: 'Inventory/Matter/delete',
      payload: id,
    })
  }

  onEditButtonClick (index) {
    const { editable } = this.state;
    let newEditable = { global: index, status: 'normal' };
    Object.keys(editable).forEach((item) => {
      if (item!=='status')
        newEditable = { ...newEditable, [item]: index };
    });
    this.setState({ editable: newEditable });
  }

  onEdit (index, dataIndex) {
    this.setState({ editable: { ...this.state.editable, [dataIndex]: index } })
  }

  editDone (index, type) {
    const { editable } = this.state;
    let newEditable = { global: -1, status: type };
    Object.keys(editable).forEach((item) => {
      if (item!=='status' && item!=='global')
        newEditable = { ...newEditable, [item]: -1 };
    });

    this.setState({ editable: newEditable }, () => {
      newEditable.status = 'normal';
    });
  }

  onChange (value, index, dataIndex, type = 'single') {
    const { dispatch, dataSource } =this.props,
      { editable }=this.state;
    //单个check
    if (type==='single') {
      //如果全部的值都等于-1，则设置全部-1，使保存按钮变成修改按钮
      let NeedToSet = [];
      Object.keys(editable).forEach(item => {
        if (item!=='status' && item!=='global')
          if (item===dataIndex)
            NeedToSet.push(-1);
          else
            NeedToSet.push(editable[item])
      })
      NeedToSet = NeedToSet.every(item => item=== -1);
      if (NeedToSet)
        this.setState({ editable: { ...this.state.editable, [dataIndex]: -1, global: -1 } });
      else
        this.setState({ editable: { ...this.state.editable, [dataIndex]: -1 } });
    }
    //先获取到旧的值
    const oldValue = dataSource[index][dataIndex],
      id = dataSource[index]['id'];
    if (oldValue!==value) {
      console.log(oldValue + '-->' + value);
      dispatch({ type: 'Inventory/Matter/saveValue', payload: { value: value, id: id, dataIndex: dataIndex } });
    }
  }

  render () {
    return (
      <Table
        columns={this.state.columns}
        dataSource={this.props.dataSource}
        rowKey="id"
        key="MatterTable"
        scroll={{ x: 1300 }}
        pagination={false}
        loading={this.props.loading}
      >
      </Table>
    )
  }
}

export default MatterTable ;
