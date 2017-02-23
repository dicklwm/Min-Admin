import React from 'react';
import { connect } from 'dva';
import styles from './Entry.css';
import { Row, Col, Button, Table, Badge, Popover, Tooltip, Popconfirm } from 'antd';

import MinimizeCard from '../../components/common/MinimizeCard';
import RowTable from '../../components/common/RowTable';
import ColumnPopover from '../../components/common/ColumnPopover';
import HeadDataForm from '../../components/Inventory/Entry/HeadDataForm';
import QueryForm from '../../components/Inventory/Entry/QueryForm';

class Entry extends React.Component {

  constructor (props) {
    super(props);

    this.columns = [
      {
        title: '', width: 40,
        render: (text, record, index) => {
          if (record.AUDIT_STATUS==='已审核')
            if (record.isRK)
              return <Badge status="success" key={index}/>
            else
              return <Badge status="warning" key={index}/>
          else if (record.AUDIT_STATUS==='编制')
            return <Badge status="processing" key={index}/>
          else
            return <Badge status="default" key={index}/>

        }
      },
      {
        title: '业务类型',
        dataIndex: 'BILL_TYPE',
        width: 180,
      },
      {
        title: '单据号',
        dataIndex: 'BILL_NO',
        width: 200,
      },
      {
        title: '单据日期',
        dataIndex: 'BILL_DATE',
        width: 280,
      },
      {
        title: '制单人',
        dataIndex: 'WRITER',
        width: 100,
      },
      {
        title: '相关单据号',
        dataIndex: 'RELATIVE_BILL',
        width: 250,
      }
    ];

    this.DetailColumns = [
      {
        title: '物料编码',
        dataIndex: 'ITEM',
        width: 150,
        sorter: ({ ITEM:a }, { ITEM:b }) => a ? a.localeCompare(b) : -1,
      },
      {
        title: '物料名称',
        dataIndex: 'ITEM_DESC',
        width: 150,
        sorter: ({ ITEM_DESC:a }, { ITEM_DESC:b }) => a ? a.localeCompare(b) : -1,
      },
      {
        title: '库',
        dataIndex: 'STK_ROOM',
        width: 180,
      },
      {
        title: '位',
        dataIndex: 'BIN',
        width: 180,
      },
      {
        title: '数量',
        dataIndex: 'QTY',
        width: 180,
      },
      {
        title: '单位',
        dataIndex: 'UM',
        width: 180,
      },
      {
        title: '规格',
        dataIndex: 'SQEC',
        width: 180,
      },
      {
        title: '产品标准',
        dataIndex: 'ITEM_STANDARD',
        width: 180,
        visible: false,
      },
      {
        title: '材质',
        dataIndex: 'MATERIAL_QUALITY',
        width: 180,
        visible: false,
      },
      {
        title: '供应商',
        dataIndex: 'SUPPLIER',
        width: 300,
      },
      {
        title: '品牌',
        dataIndex: 'BRAND',
        width: 180,
        visible: false,
      },
      {
        title: '生产厂家',
        dataIndex: 'ProductFactory',
        width: 180,
        visible: false,
      },
      {
        title: '序列号',
        dataIndex: 'SERIAL_NUMBER',
        width: 180,
        visible: false,
      },
      {
        title: '批号',
        dataIndex: 'LOT',
        width: 250,
        sorter: ({ LOT:a }, { LOT:b }) => a ? a.localeCompare(b) : -1,
      },
      {
        title: '是否含废品',
        dataIndex: 'ISHAVEWP',
        width: 180,
        visible: false,
      },
      {
        title: '是否废品',
        dataIndex: 'ISWP',
        width: 180,
        visible: false,
      },
      {
        title: '备注',
        dataIndex: 'REF',
        width: 250,
        visible: false,
      },
      {
        title: '操作',
        width: 80,
        fixed: 'right',
        render: (text, record, index) =>
          <div>
            <Button type="primary" shape="circle" icon="edit" size="small" key={index}
                    onClick={() => this.onEditButtonClick(record)}>
            </Button>
            <Popconfirm title="确认删除？" onConfirm={() => this.HandleDelete(record.id)}>
              <Button type="primary" shape="circle" icon="delete" size="small"></Button>
            </Popconfirm>
          </div>

      }
    ];

    this.state = {
      columns: this.DetailColumns.filter(item => item.visible!==false),
    }

  }

  onEditButtonClick (record) {

  }

  HandleDelete (id) {

  }

  handlePageChange (current) {
    this.props.dispatch({
      type: 'Inventory/Entry/changePage',
      payload: {
        current: current,
        pageSize: this.props.pagination.pageSize,
      }
    })
  }

  handlePageSizeChange (current, pageSize) {
    this.props.dispatch({
      type: 'Inventory/Entry/changePage',
      payload: {
        current: current,
        pageSize: pageSize,
      }
    })
  }

  handleRowClick (record) {
    this.props.dispatch({
      type: 'Inventory/Entry/RowClick',
      payload: record.id,
    })
  }

  handleAddData () {
    console.log(1);
  }

  handleQuery (values) {
    this.props.dispatch({
      type: 'Inventory/Entry/queryData',
      payload: { query: [values] },
    })
  }

  handleQueryClear () {
    this.props.dispatch({
      type: 'Inventory/Entry/clearQuery',
    })
  }

  render () {
    const { IinventH, pagination, loading, IinventHDetail, IinventD } = this.props;
    return (
      <div className={styles.normal}>
        <Row gutter={12}>
          <Col lg={6} xs={24}>
            <MinimizeCard title="入库单主表"
                          extra={
                            <div style={{ display: 'inline-block' }}>
                              <Tooltip title="新增">
                                <Button icon="plus" className={styles.HeadButtonMargin}
                                        onClick={this.handleAddData}></Button>
                              </Tooltip>
                              <Popover title={<h3>检索</h3>} content={
                                <QueryForm query={this.props.query}
                                           onOk={values => this.handleQuery(values)}
                                           onClear={() => this.handleQueryClear()}
                                           loading={loading}
                                />
                              }
                              >
                                <Button icon="search" className={styles.HeadButtonMargin}></Button>
                              </Popover>
                              <Popover title={<h3>帮助</h3>} content={
                                <ul>
                                  <li><Badge status="success"/>：已审核、<strong>已</strong>入库</li>
                                  <li><Badge status="processing"/>：编制中</li>
                                  <li><Badge status="warning"/>：已审核、<strong>未</strong>入库</li>
                                  <li><Badge status="default"/>：其他状态</li>
                                </ul>
                              }>
                                <Button icon="question" className={styles.HeadButtonMargin}></Button>
                              </Popover >
                            </div>
                          }
            >

              <RowTable rowKey="id" scroll={{ y: 400, x: 680 }}
                        pageSize={pagination.pageSize} current={pagination.current}
                        total={pagination.total}
                        columns={this.columns} dataSource={IinventH}
                        onRowClick={(record) => this.handleRowClick(record)}
                        onPageChange={(current) => this.handlePageChange(current)}
                        onShowSizeChange={(current, pageSize) => this.handlePageSizeChange(current, pageSize)}
              />
            </MinimizeCard>

          </Col>
          <Col lg={18} xs={24}>
            <Row style={{ marginBottom: 12 }}>
              <Col>
                <MinimizeCard title="入库单主表详情" loading={loading}>
                  <HeadDataForm
                    data={IinventHDetail}
                  />
                </MinimizeCard>
              </Col>
            </Row>
            <Row>
              <Col>
                <MinimizeCard title="入库单从表"
                              extra={
                                <ColumnPopover
                                  onCheckBoxChange={columns => this.setState({ columns: columns })}
                                  columns={this.DetailColumns}
                                  buttonClass={styles.HeadButtonMargin}
                                />}
                              loading={loading}
                >

                  <Table
                    dataSource={IinventD}
                    columns={this.state.columns}
                    rowKey="id"
                    scroll={{ x: 1000 }}
                  />
                </MinimizeCard>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const entry = state['Inventory/Entry'];
  return {
    IinventH: entry.IinventH,
    query: entry.query,
    loading: state.loading.models['Inventory/Entry'],
    pagination: entry.pagination,
    IinventHDetail: entry.IinventHDetail,
    IinventD: entry.IinventD,
    isNavbar: state.app.isNavbar
  };
}

export default connect(mapStateToProps)(Entry);
