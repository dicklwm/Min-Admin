import React from 'react';
import { connect } from 'dva';
import styles from './Home.css';
import { Button, notification } from 'antd';
import DataForm from '../components/common/DataForm';

function Home () {
  const openNotification = () => {
    const HFields = [
      {
        label: '订单类型', key: 'BILL_TYPE', type: 'select', required: true,
        selectOption: [
          { value: '复购' }, { value: '活动' }, { value: '热线' }, { value: '追访' },
        ],
      },
      { label: '客户姓名', key: 'BILL_NO', placeholder: '请填写客户姓名', required: true, },
      {
        label: '商品列表', key: 'BILL_DATE', placeholder: '请选择单据日期',
      },
      { label: '客户微信', key: 'RELATIVE_BILL', placeholder: '请填写客户微信' },
      { label: '联系电话', key: 'DEPARTMENT', placeholder: '请填写联系方式', required: true, },
      {
        label: '付款方式', key: 'payway', type: 'select',
        selectOption: [
          { value: '全额付款' }, { value: '代付' }
        ],
      },
      { label: '收货地址', key: 'ACCEPTOR', placeholder: '请填写收货详细地址' },
      {
        label: '付款方式', key: 'pay', type: 'select',
        selectOption: [
          { value: '微信' }, { value: '支付宝' }, { value: '银联' },
        ],
      },
      { label: '赠品列表', key: 'Gift', },
      { label: '广告标签', key: 'AdvertisingLabel', required: true, placeholder: '请填写广告标签' },
      { label: '疗程数', key: 'CourseNumber', },
      {
        label: '备注', key: 'REF', type: 'textarea', rows: 1,
        colLayout: { xs: 24 },
        formLayout: { labelCol: { lg: 2, md: 6, xs: 6 }, wrapperCol: { lg: 22, md: 18, xs: 18 } }
      },
    ];
    const args = {
      message: '添加订单',
      description: (<DataForm
        Fields={HFields}
      />),
      duration: 0,
    };
    notification.open(args);
  };
  return (
    <div>
      <div className={styles['template-sale']}>
        <div className={styles["data"]}>
          <div className={styles["total"]}>
            <div>
              <div>
                <div className={styles["number"]}>￥{0}</div>
                <div className={styles["title"]}>销售金额</div>
              </div>
            </div>
            <div>
              <div>
                <div className={styles["number"]}>{0}</div>
                <div className={styles["title"]}>今日订单总数</div>
              </div>
            </div>
            <div>
              <div>
                <div className={styles["number"]}>{0}</div>
                <div className={styles["title"]}>今日的评论数</div>
              </div>
            </div>
            <div>
              <div>
                <div className={styles["number"]}>{0}</div>
                <div className={styles["title"]}>今日访问量</div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Button type="primary" onClick={openNotification}>Open the notification box</Button>
    </div>
  );
}

function mapStateToProps () {
  return {};
}

export default connect(mapStateToProps)(Home);
