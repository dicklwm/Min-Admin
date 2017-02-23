import React from 'react';
import styles from './RowTable.css';
import { Table, Pagination } from 'antd';

class RowTable extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      selectedRowIndex: 0,
    }
  }

  handleRowClick (record, index) {
    const { onRowClick, rowKey }=this.props;
    this.setState({ selectedRowIndex: record[rowKey] });
    onRowClick && onRowClick(record, index);
  }

  render () {
    const { columns, dataSource, rowKey, scroll, pageSize, current, total, loading, bordered, onPageChange, onShowSizeChange }=this.props;
    return (
      <div >
        <Table columns={columns} dataSource={dataSource}
               rowKey={rowKey} loading={loading} bordered={bordered}
               onRowClick={(record, index) => this.handleRowClick(record, index)}
               rowClassName={(record, index) => record[rowKey]===this.state.selectedRowIndex ? styles.selectRow : styles.rowHand}
               scroll={scroll}
               pagination={false}
        />
        <Pagination
          pageSize={pageSize} current={current} showSizeChanger
          total={total}
          className="ant-table-pagination ant-pagination"
          onChange={onPageChange}
          onShowSizeChange={onShowSizeChange}

        />
      </div>
    )
  }
}

export default RowTable;
