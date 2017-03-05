import React from 'react';
import styles from './EntryModal.css';
import { Row, Col, Modal, Table, Popconfirm, Button, Tooltip, Select, InputNumber, Checkbox } from 'antd';
import { connect } from 'dva';
import DataForm from '../../common/DataForm';
import moment from 'moment';
import uuid from 'uuid';

import MinimizeCard from '../../common/MinimizeCard';
import ColumnPopover from '../../common/ColumnPopover';
import InputTooltip from '../../common/InputTooltip';

const HFields = [
  {
    label: '业务类型', key: 'BILL_TYPE', type: 'select', required: true,
    selectOption: [
      { value: '采购实仓入库单' }, { value: '办公用品入库单' }
    ],
  },
  { label: '单据号', key: 'BILL_NO', placeholder: '系统自动生成单据号', disabled: true },
  {
    label: '单据日期', key: 'BILL_DATE', type: 'datetime', placeholder: '请选择单据日期',
    defaultValue: moment(new Date()), required: true,
  },
  { label: '相关单据号', key: 'RELATIVE_BILL', placeholder: '相关单据号' },
  { label: '部门', key: 'DEPARTMENT', disabled: true, placeholder: '当前登录人所在部门' },
  { label: '制单人', key: 'WRITER', disabled: true, placeholder: '当前登录人' },
  { label: '审核人', key: 'ACCEPTOR', disabled: true },
  { label: '审核状态', key: 'AUDIT_STATUS', disabled: true, option: { initialValue: '编制中' } },
  {
    label: '备注', key: 'REF', type: 'textarea', rows: 1,
    colLayout: { xs: 24 },
    formLayout: { labelCol: { lg: 2, md: 6, xs: 6 }, wrapperCol: { lg: 22, md: 18, xs: 18 } }
  },
];
const Option = Select.Option;

class EntryModal extends React.Component {

  constructor (props) {
    super(props);

    this.DetailColumns = [
      {
        title: '物料编码',
        dataIndex: 'ITEM',
        width: 200,
        sorter: ({ ITEM:a }, { ITEM:b }) => a ? a.localeCompare(b) : -1,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'ITEM', e.target.value)}/>
      },
      {
        title: '物料名称',
        dataIndex: 'ITEM_DESC',
        width: 200,
        sorter: ({ ITEM_DESC:a }, { ITEM_DESC:b }) => a ? a.localeCompare(b) : -1,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'ITEM_DESC', e.target.value)}/>
      },
      {
        title: '库',
        dataIndex: 'STK_ROOM',
        width: 80,
        render: (text, record, index) =>
          <Select defaultValue={record.STK_ROOM}
                  onChange={(value) => {
                    let dataSource = this.state.dataSource;
                    dataSource[index]['STK_ROOM'] = value;
                    dataSource[index]['BIN'] = '';
                    this.setState({
                      dataSource: dataSource,
                    })
                  }}
                  className={styles.select}
                  dropdownMatchSelectWidth={false}
          >
            {
              this.makeSTKOption(this.props.WarehList)
            }
          </Select>
      },
      {
        title: '位',
        dataIndex: 'BIN',
        width: 80,
        render: (text, record, index) =>
          <Select value={record.BIN}
                  onChange={(value) => this.handleTableDataChange(index, 'BIN', value)}
                  className={styles.select}
                  dropdownMatchSelectWidth={false}
          >
            {
              this.makeBINOption(record.STK_ROOM)
            }
          </Select>
      },
      {
        title: '数量',
        dataIndex: 'QTY',
        width: 80,
        render: (text, record, index) =>
          <InputNumber defaultValue={text} onChange={(value) => this.handleTableDataChange(index, 'QTY', value)}/>
      },
      {
        title: '单位',
        dataIndex: 'UM',
        width: 80,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'UM', e.target.value)}/>
      },
      {
        title: '规格',
        dataIndex: 'SQEC',
        width: 180,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'SQEC', e.target.value)}/>
      },
      {
        title: '产品标准',
        dataIndex: 'ITEM_STANDARD',
        width: 180,
        visible: false,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'ITEM_STANDARD', e.target.value)}/>
      },
      {
        title: '材质',
        dataIndex: 'MATERIAL_QUALITY',
        width: 180,
        visible: false,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'MATERIAL_QUALITY', e.target.value)}/>
      },
      {
        title: '供应商',
        dataIndex: 'SUPPLIER',
        width: 300,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'SUPPLIER', e.target.value)}/>
      },
      {
        title: '品牌',
        dataIndex: 'BRAND',
        width: 180,
        visible: false,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'BRAND', e.target.value)}/>
      },
      {
        title: '生产厂家',
        dataIndex: 'ProductFactory',
        width: 180,
        visible: false,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'ProductFactory', e.target.value)}/>
      },
      {
        title: '序列号',
        dataIndex: 'SERIAL_NUMBER',
        width: 180,
        visible: false,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'SERIAL_NUMBER', e.target.value)}/>
      },
      {
        title: '批号',
        dataIndex: 'LOT',
        width: 250,
        visible: false,
        sorter: ({ LOT:a }, { LOT:b }) => a ? a.localeCompare(b) : -1,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index} disabled placeholder="系统自动产生批号"
                        onBlur={(e) => this.handleTableDataChange(index, 'LOT', e.target.value)}/>
      },
      {
        title: '是否含废品',
        dataIndex: 'ISHAVEWP',
        width: 80,
        visible: false,
        render: (text, record, index) =>
          <Checkbox onChange={(e) => this.handleTableDataChange(index, 'ISHAVEWP', e.target.checked)}
                    defaultValue={text}/>
      },
      {
        title: '是否废品',
        dataIndex: 'ISWP',
        width: 80,
        visible: false,
        render: (text, record, index) =>
          <Checkbox onChange={(e) => this.handleTableDataChange(index, 'ISWP', e.target.checked)}
                    defaultValue={text}/>
      },
      {
        title: '备注',
        dataIndex: 'REF',
        width: 250,
        visible: false,
        render: (text, record, index) =>
          <InputTooltip value={text} key={index}
                        onBlur={(e) => this.handleTableDataChange(index, 'REF', e.target.value)}/>
      },
      {
        title: '操作',
        width: 50,
        fixed: 'right',
        render: (text, record, index) =>
          <div>
            <Popconfirm title="确认删除？" onConfirm={() => this.handleDeleteData(record.id)}>
              <Button type="primary" shape="circle" icon="delete" size="small"></Button>
            </Popconfirm>
          </div>

      }
    ];

    this.state = {
      visible: false,
      columns: this.DetailColumns.filter(item => item.visible!==false),
      dataSource: this.props.type==='update' ? this.props.IinventD : [],
    }
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
    //获取form的真实节点
    const form = this.refs['dataForm'];
    const { onOk } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        values.BILL_DATE = values.BILL_DATE.format('YYYY-MM-DD HH:mm:ss');
        //先将values进行处理，如供应商的ID和label分离
        onOk && onOk({ IinventH: [values], IinventD: this.state.dataSource });
        form.resetFields();
        this.setState({
          visible: false,
          dataSource: [],
        });
      }
    })
  }

  handleTableDataChange = (index, key, value) => {
    let dataSource = this.state.dataSource;
    dataSource[index][key] = value;
    this.setState({
      dataSource: dataSource,
    })
  }

  makeSTKOption = (WarehList) => {
    let result = [];
    WarehList && WarehList.forEach(item => {
      if (!result.includes(item.STK_ROOM))
        result.push(item.STK_ROOM)
    })
    return result.map((item, index) => <Option value={item} key={index}>{item}</Option>)
  }

  makeBINOption = (STK_ROOM) => {
    if (STK_ROOM) {
      let BINOption = this.props.WarehList.filter(item => item.STK_ROOM===STK_ROOM);
      return BINOption.map((item, index) =>
        < Option value={item.BIN} key={ index }> { item.BIN }</Option>)
    }
  }

  handleDeleteData = (id) => {
    let dataSource = this.state.dataSource;
    this.setState({
      dataSource: dataSource.filter(item => item.id!==id),
    })
  }

  //update的时候刷新table数据
  componentWillReceiveProps (nextProps) {
    if (nextProps.type==='update') {
      this.setState({ dataSource: nextProps.IinventD });
    }
  }

  render () {
    const { children, onModalCancel } = this.props;
    return (
      <span>
        <span onClick={this.showModelHandler}>
        { children }
      </span>
      <Modal
        title={this.props.title}
        visible={!!children ? this.state.visible : this.props.visible}
        onOk={this.okHandler}
        onCancel={!!children ? this.hideModelHandler : onModalCancel}
        style={{ top: 20 }}
        width={1000}
      >
      <Row style={{ marginBottom: '12px' }}>
        <Col>
          <MinimizeCard title="入库单主表" style={{ marginBottom: '12px' }}>
            <DataForm
              Fields={HFields}
              data={this.props.type==='update' ? this.props.IinventHDetail : {}}
              ref="dataForm"
            />
          </MinimizeCard>
        </Col>
      </Row>

      <Row>
      <MinimizeCard title="入库单明细" extra={
        <div style={{ display: 'inline-block' }}>
          <Tooltip title="新增行">
            <Button type="primary" icon="plus" style={{ marginRight: '12px' }}
                    onClick={() => {
                      let dataSource = this.state.dataSource;
                      dataSource.push({ id: uuid.v4() });
                      this.setState({
                        dataSource: dataSource,
                      })
                    }}
            />
          </Tooltip>

          <ColumnPopover
            columns={this.DetailColumns}
            onCheckBoxAndWidthChange={columns => this.setState({ columns: columns })}
            buttonStyle={{ marginRight: '12px' }}
            widthChange
          />
        </div>
      }>
      <Table
        scroll={{ x: 1000 }}
        columns={this.state.columns}
        rowKey="id"
        dataSource={this.state.dataSource}
        pagination={false}
      />
      </MinimizeCard>
      </Row>

      </Modal>
      </span>
    )
  }
}

function mapStateToProps (state) {
  const entry = state['Inventory/Entry'];
  return {
    loading: state.loading.models['Inventory/Entry'],
    IinventHDetail: entry.IinventHDetail,
    IinventD: entry.IinventD,
    WarehList: entry.WarehList,
  }
}

export default connect(mapStateToProps)(EntryModal);
