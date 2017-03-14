import React from 'react';
import { Input, Layout, Badge, Card, Tooltip, Button, DatePicker, Pagination } from 'antd';
import styles from './WxFriends.less';
import icon_default from '../../../assets/Images/icon_default.png';

const { Header, Footer, Sider, Content } = Layout;

const Search = Input.Search;

const users = [
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 0 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 1 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 2 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 3 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 4 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 5 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 6 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 7 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 8 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 9 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 10 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 11 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 12 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 13 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 14 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 15 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 16 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 17 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 18 },
  { name: 'J.Yong (qq894199032)', all: 400, today: 0, key: 19 },

]

class WxFriends extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      currentUser: users[0],
    }
  }

  handleClick (item) {
    this.setState({
      currentUser: item,
    })
  }

  render () {
    return (
      <Layout className={styles['wx-friends-panel']}>
        <Sider width={230} className={styles['friends-sider']}>
          <Search onSearch={value => console.log(value)} placeholder="请输入搜索信息"/>
          <div className={styles.content}>
            {
              users.map(item => (
                <div key={item.key}
                     className={this.state.currentUser.key===item.key ? styles.item + ' ' + styles.active : styles.item}
                     onClick={() => this.handleClick(item)}
                     title={item.name}
                >
                  <img src={icon_default} alt="头像" className={styles['wx-friends-img']}/>
                  <div className={styles.info}>
                    <div className={styles.name}>{item.name}</div>
                    <Badge count={item.all} overflowCount={999} style={{ backgroundColor: '#00a0e9' }} showZero/>
                    <Badge count={item.today} style={{ backgroundColor: '#87d068' }} showZero/>
                  </div>
                </div>
              ))
            }
          </div>

        </Sider>
        <Layout className={styles['friends-layout']}>
          <Header className={styles['friends-header']}>
            {this.state.currentUser.name}
          </Header>
          <Layout className={styles['friends-content-layout']}>

            <Content className={styles.content}>

              <div className={styles.date}>2016-12-20</div>
              <div className={styles.date}>16:44</div>
              <div className={styles.item + ' ' + styles.left} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>我通过了你的朋友验证请求，现在我们可以开始聊天了</div>
              </div>
              <div className={styles.date}>16:47</div>
              <div className={styles.item + ' ' + styles.right} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>
                  <img src={icon_default}/>
                  <img src={icon_default}/></div>
              </div>
              <div className={styles.date}>16:48</div>
              <div className={styles.item + ' ' + styles.left} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>你好</div>
              </div>
              <div className={styles.date}>19:26</div>
              <div className={styles.item + ' ' + styles.right} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>大家好</div>
              </div>
              <div className={styles.date}>19:42</div>
              <div className={styles.item + ' ' + styles.left} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}><img src={icon_default}/></div>
              </div>
              <div className={styles.date}>2016-12-22</div>
              <div className={styles.date}>10:50</div>
              <div className={styles.item + ' ' + styles.right} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>呵呵</div>
              </div>
              <div className={styles.item + ' ' + styles.left} title="当前客服 : 002"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>你是？</div>
              </div>
              <div className={styles.date}>2017-01-05</div>
              <div className={styles.date}>12:05</div>
              <div className={styles.item + ' ' + styles.right} title="当前客服 : gogoing"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}> rj yrj yre</div>
              </div>
              <div className={styles.date}>2017-02-06</div>
              <div className={styles.date}>23:15</div>
              <div className={styles.item + ' ' + styles.left} title="当前客服 : 111111"><img src={icon_default}/>
                <div className={styles.arrow}></div>
                <div className={styles.content + ' ' + styles.text}>你好</div>
              </div>
            </Content>

            <Sider className={styles.sider}>
              <div className={styles.title}>详细信息</div>

              <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
                <img src={icon_default} alt="头像" className={styles.head}/>
                <div className="text-left text-overflow">{`用户姓名：${this.state.currentUser.name}`}</div>
                <div className="text-left text-overflow">{`昵称：${this.state.currentUser.name}`}</div>
                <div className="text-left text-overflow">{`微信昵称：${this.state.currentUser.name}`}</div>
                <div className="text-left text-overflow">{`好友总数：0`}</div>
                <div className="text-left text-overflow">{`消息总数：0`}</div>
                <div className="text-left text-overflow">{`今日好友：0`}</div>
                <div className="text-left text-overflow">{`今天聊天：0`}</div>
              </Card>

              <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
                <img src={icon_default} alt="头像" className={styles.head}/>
                <div className="text-left text-overflow">{`用户姓名：${this.state.currentUser.name}`}</div>
                <div className="text-left text-overflow">{`昵称：${this.state.currentUser.name}`}</div>
                <div className="text-left text-overflow">{`微信昵称：${this.state.currentUser.name}`}</div>
                <div className="text-left text-overflow">{`好友总数：0`}</div>
                <div className="text-left text-overflow">{`消息总数：0`}</div>
                <div className="text-left text-overflow">{`今日好友：0`}</div>
                <div className="text-left text-overflow">{`今天聊天：0`}</div>
              </Card>

            </Sider>

          </Layout>

          <Footer className={styles['friends-footer']}>

            <Tooltip title={
                <Search placeholder="请输入你需要搜索的内容" style={{width:180}}/>
            }
                     getPopupContainer={triggerNode=>triggerNode}
            >
              <Button icon="search">搜索</Button>
            </Tooltip>

            <DatePicker
              getCalendarContainer={trigger=>trigger}
            />

            <Pagination simple defaultCurrent={2} total={50} className={styles.pagination}/>

          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default WxFriends;
