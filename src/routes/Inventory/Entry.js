import React from 'react';
import { connect } from 'dva';
import styles from './Entry.css';
import { Row, Col } from 'antd';

import MinimizeCard from '../../components/common/MinimizeCard';
import RowTable from '../../components/common/RowTable';

function Entry ({ IinventH, pagination, loading }) {

  const columns = [
    {
      title: '业务类型',
      dataIndex: 'BILL_TYPE',
    },
    {
      title: '单据号',
      dataIndex: 'BILL_NO',
    },
    {
      title: '单据日期',
      dataIndex: 'BILL_DATE',
    },
    {
      title: '制单人',
      dataIndex: 'WRITER',
    },
    {
      title: '相关单据号',
      dataIndex: 'RELATIVE_BILL',
    }
  ];

  return (
    <div className={styles.normal}>
      <Row gutter={12}>
        <Col lg={6} xs={24}>
          <MinimizeCard title="入库单主表">

            <RowTable rowKey="id" scroll={{ y: 450, x: 500 }} loading={loading}
                      pageSize={pagination.pageSize} current={pagination.current}
                      total={pagination.total}
                      columns={columns} dataSource={IinventH}
                      onRowClick={(record) => console.log(record)}
            />
          </MinimizeCard>

        </Col>
        <Col lg={18} xs={24}>
          <Row>
            <Col>
              <MinimizeCard title="入库单主表详情">

              </MinimizeCard>
            </Col>
          </Row>
          <Row>
            <Col>
              <MinimizeCard title="入库单从表">
              </MinimizeCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps (state) {
  const entry = state['Inventory/Entry'];
  return {
    IinventH: entry.IinventH,
    query: entry.query,
    loading: state.loading.models['Inventory/Entry'],
    pagination: entry.pagination,
  };
}

export default connect(mapStateToProps)(Entry);
