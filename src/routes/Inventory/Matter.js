import React from 'react';
import { connect } from 'dva';
import styles from './Matter.css';
import { Button, Icon, Pagination } from 'antd';
import UploadFile from '../../components/common/UploadFile';
import MatterTable from '../../components/Inventory/Matter/MatterTable';

function Matter ({ columns, ItemList, dispatch, loading, pagination }) {

  function handlePageChange (current) {
    dispatch({
      type: 'Inventory/Matter/changePage',
      payload: {
        current: current,
        pageSize: pagination.pageSize,
      }
    })
  }

  function handlePageSizeChange (current, pageSize) {
    dispatch({
      type: 'Inventory/Matter/changePage',
      payload: {
        current: current,
        pageSize: pageSize,
      }
    })
  }

  return (
    <div>
      <div className={styles.buttonArea}>
        <Button type="primary"><Icon type="plus"></Icon>新增物料</Button>
        <UploadFile/>
      </div>
      <div className={styles.tableArea}>
        <MatterTable columns={columns} dataSource={ItemList} dispatch={dispatch} loading={loading}/>
        <Pagination pageSize={pagination.pageSize} current={pagination.current} showSizeChanger
                    total={pagination.total}
                    className="ant-table-pagination ant-pagination"
                    onChange={(current) => handlePageChange(current) }
                    onShowSizeChange={(current, pageSize) => handlePageSizeChange(current, pageSize)}
        />
      </div>
    </div>
  );
}

function mapStateToProps (state) {
  const matter = state['Inventory/Matter'];
  return {
    columns: matter.columns,
    ItemList: matter.ItemList,
    loading: state.loading.models['Inventory/Matter'],
    pagination: matter.pagination
  };
}

export default connect(mapStateToProps)(Matter);
