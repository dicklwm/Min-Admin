import React from 'react';
import { connect } from 'dva';
import styles from './Home.css';

function Home () {
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
    </div>
  );
}

function mapStateToProps () {
  return {};
}

export default connect(mapStateToProps)(Home);
