import React from 'react';
import { connect } from 'dva';
import styles from './Matter.css';
import { Button, Icon, Pagination } from 'antd';
import UploadFile from '../../components/common/UploadFile';
import MatterTable from '../../components/Inventory/Matter/MatterTable';
import ItemListModal from '../../components/Inventory/Matter/ItemListModal';

function Matter ({ columns, ItemList, dispatch, loading, pagination, ItemType, BrandType, ProductFactory, ItemClass, query }) {

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

  function handleAddItemList (values) {
    dispatch({
      type: 'Inventory/Matter/saveData',
      payload: {
        ItemList: [values]
      },
      method:'new'
    })
  }

  function handleQuery (value) {
    console.log(value);
    dispatch({
      type: 'Inventory/Matter/queryData',
      payload: {
        query: [value]
      }
    })
  }

  return (
    <div>
      <div className={styles.buttonArea}>
        <ItemListModal onOk={handleAddItemList} inner title="新增物料">
          <Button type="primary">
            <Icon type="plus"></Icon>新增物料
          </Button>
        </ItemListModal>
        <UploadFile done={(file) => {
          dispatch({ type: 'Inventory/Matter/uploadFile', payload: file.response.data[0].id })
        }}
                    accept=".xlsx,.xls"
        />
      </div>
      <div className={styles.tableArea}>
        <MatterTable columns={columns} dataSource={ItemList} dispatch={dispatch} loading={loading}
                     ItemType={ItemType} BrandType={BrandType} ProductFactory={ProductFactory}
                     ItemClass={ItemClass} onOk={handleQuery} query={query}
        />
        <Pagination pageSize={pagination.pageSize} current={pagination.current} showSizeChanger
                    total={pagination.total}
                    showTotal={(total, range) => `共${total}条数据`}
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
    ItemList: matter.ItemList,
    loading: state.loading.models['Inventory/Matter'],
    pagination: matter.pagination,
    ItemType: matter.ItemType,
    BrandType: matter.BrandType,
    ProductFactory: matter.ProductFactory,
    ItemClass: matter.ItemClass,
    query: matter.query,
  };
}

export default connect(mapStateToProps)(Matter);
