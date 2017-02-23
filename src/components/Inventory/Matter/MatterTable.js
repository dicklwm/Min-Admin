import React from 'react';
import { Table, Button, Popconfirm, Popover, Alert, Checkbox, Tooltip, Tag } from 'antd';
import styles from './MatterTable.css';

// import EditableCell from '../../common/EditableCell';
import QueryForm from './QueryForm';
import ItemListModal from './ItemListModal';
import ColumnPopover from '../../common/ColumnPopover';

class MatterTable extends React.Component {

  constructor (props) {
    super(props);
    this.onModalCancel = this.onModalCancel.bind(this);
    this.handleSaveItemList = this.handleSaveItemList.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);

    this.columns =
      [
        {
          title: '物料编码', dataIndex: 'ITEM', key: 'ITEM', width: 180,
          sorter: ({ ITEM:a }, { ITEM:b }) => a ? a.localeCompare(b) : -1,
        },
        {
          title: '物料名称', dataIndex: 'ITEM_DESC', key: 'ITEM_DESC', width: 180,
          sorter: ({ ITEM_DESC:a }, { ITEM_DESC:b }) => a ? a.localeCompare(b) : -1,
        },
        {
          title: '物料类型', dataIndex: 'ITEM_TYPE', key: 'ITEM_TYPE', width: 180,
          sorter: ({ ITEM_TYPE:a }, { ITEM_TYPE:b }) => a ? a.localeCompare(b) : -1,
        },
        {
          title: '单位', dataIndex: 'UM', key: 'UM', width: 180,
        },
        {
          title: '规格', dataIndex: 'SQEC', key: 'SQEC', width: 180,
        },
        {
          title: '供应商', dataIndex: 'SUPPLIER', key: 'SUPPLIER', width: 280,
        },
        {
          title: '编制日期', dataIndex: 'ITEM_DATE', key: 'ITEM_DATE', width: 240,
          sorter: ({ ITEM_DATE:a }, { ITEM_DATE:b }) => new Date(a) - new Date(b),
          render: (text, record, index) => (
            <Tooltip title={text || ''} trigger="hover">
              {text}
            </Tooltip>
          )
        },
        {
          title: '品牌', dataIndex: 'BRAND', key: 'BRAND', width: 180, visible: false,
        },
        {
          title: '生产厂家', dataIndex: 'ProductFactory', key: 'ProductFactory', width: 180, visible: false,
        },
        {
          title: '提前期', dataIndex: 'LT', key: 'LT', width: 180, visible: false,
        },
        {
          title: '材质', dataIndex: 'MATERIAL_QUALITY', key: 'MATERIAL_QUALITY', width: 180, visible: false,
        },
        {
          title: '购置代码', dataIndex: 'MB', key: 'MB', width: 180, visible: false,
        },
        {
          title: 'ABC码', dataIndex: 'ABC_CODE', key: 'ABC_CODE', width: 180, visible: false,
        },
        {
          title: '备注', dataIndex: 'REP', key: 'REP', width: 180, visible: false,
        },

        {
          title: '操作',
          key: 'action',
          width: 80,
          fixed: this.props.isNavbar ? 'right' : null,
          render: (text, record, index) => {
            return (
              <div>
                <Button type="primary" shape="circle" icon="edit" size="small" key={index}
                        onClick={() => this.onEditButtonClick(record)}>
                </Button>
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

    this.state = {
      columns: this.columns.filter(item => item.visible!==false),
      indeterminate: true,
      checkAll: false,
      updateModalVisible: false,
      ChooseItemList: null,
    }

  }

  HandleDelete (id) {
    console.log('delete ' + id);
    const { dispatch } = this.props;
    dispatch({
      type: 'Inventory/Matter/deleteData',
      payload: { id: id },
    })
  }

  onEditButtonClick (record) {
    this.setState({
      updateModalVisible: true,
      ChooseItemList: record,
    })
  }

  onModalCancel () {
    this.setState({
      updateModalVisible: false,
      ChooseItemList: null,
    })
  }

  handleSaveItemList (values) {
    this.props.dispatch({
      type: 'Inventory/Matter/saveData',
      payload: {
        ItemList: [values]
      },
      method: 'update'
    })
    this.onModalCancel();
  }

  handleCheckBoxChange (columns) {
    this.setState({
      columns: columns,
    })
  }

  onTagClose (label) {
    this.props.dispatch({
      type: 'Inventory/Matter/closeQuery',
      payload: label,
    })
  }

  makeTag (value, key, label) {
    return (
      <Tag key={key} closable onClose={() => this.onTagClose(key)}>{`${label}：${value}`}</Tag>
    )
  }

  makeAlertTag () {
    const query = this.props.query[0];
    let arr = [];
    for (let o in query) {
      if (query[o]) {
        switch (o) {
          case 'BRAND':
            arr.push(this.makeTag(query[o], o, '品牌'));
            break;
          case 'ITEM':
            arr.push(this.makeTag(query[o], o, '物料编码'));
            break;
          case 'ITEM_DESC':
            arr.push(this.makeTag(query[o], o, '物料名称'));
            break;
          case 'ITEM_TYPE':
            arr.push(this.makeTag(query[o], o, '物料类型'));
            break;
          case 'ProductFactory':
            arr.push(this.makeTag(query[o], o, '生产厂家'));
            break;
          case 'SQEC':
            arr.push(this.makeTag(query[o], o, '规格'));
            break;
          case 'SUPPLIER' :
            arr.push(this.makeTag(query[o], o, '供应商'));
            break;

        }
      }
    }
    return arr;
  }

  render () {
    return (
      <div>
        <Table
          columns={this.state.columns}
          dataSource={this.props.dataSource}
          rowKey="id"
          key="MatterTable"
          scroll={{ x: this.props.isNavbar ? 768 : 1300 }}
          pagination={false}
          loading={this.props.loading}
          title={() =>
            <div className={styles.titleRight}>
              {
                this.makeAlertTag().length===0 ? '' :
                  <Alert message={this.makeAlertTag()}
                         className={styles.AlertLeft}
                  />
              }
              <ColumnPopover
                onCheckBoxChange={this.handleCheckBoxChange}
                columns={this.columns}
              />
              <Popover trigger="hover" placement="leftBottom"
                       title='高级检索'
                       content={
                         <QueryForm
                           query={this.props.query}
                           onOk={this.props.onOk}
                           onClear={() => this.props.dispatch({ type: "Inventory/Matter/clearQuery" })}
                         />
                       }
              >
                <Button type="primary" icon="search" className={styles.searchButton}>高级检索</Button>
              </Popover>

            </div>
          }
        >
        </Table>
        <ItemListModal
          title="修改物料"
          visible={this.state.updateModalVisible}
          ItemList={this.state.ChooseItemList}

          onModalCancel={this.onModalCancel}
          onOk={this.handleSaveItemList}
        />
      </div>
    )
  }
}

export default MatterTable ;
