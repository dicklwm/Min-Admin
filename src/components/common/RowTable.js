import React from 'react';
import styles from './RowTable.css';
import { Table, Pagination } from 'antd';

class RowTable extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedRowKey: '',
    }
  }

  handleRowClick (record) {
    const { onRowClick, rowKey }=this.props;
    this.setState({ selectedRowKey: record[rowKey] });
    onRowClick && onRowClick(record);
  }

  render () {
    const { columns, dataSource, rowKey, scroll, pageSize, current, total, loading }=this.props;
    return (
      <div >
        <Table columns={columns} dataSource={dataSource} rowKey={rowKey} loading={loading}
               onRowClick={(record) => this.handleRowClick(record)}
               rowClassName={(record, index) => record[rowKey]===this.state.selectedRowKey ? styles.selectRow : styles.rowHand}
               scroll={scroll}
               pagination={false}
        />
        <Pagination
          pageSize={pageSize} current={current} showSizeChanger
          total={total}
          showTotal={(total, range) => `共${total}条数据`}
          className="ant-table-pagination ant-pagination"
        />
      </div>
    )
  }
}

export default RowTable;
