import React from 'react';
import { connect } from 'dva';
import { Input, Layout, Badge, Card, Tooltip, Button, DatePicker, Pagination, Icon } from 'antd';
import styles from './WxFriends.less';
import icon_default from '../../../assets/Images/icon_default.png';
import Lightbox from 'react-images'

import classnames from 'classnames';

const { Header, Footer, Sider, Content } = Layout;

const Search = Input.Search;

class WxFriends extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      //???????????
      images: this.props.messages.filter(item => item.type==='image').map(item => {
        item.src = item.message;
        return item;
      })
    }
  }

  handleFriendClick (item) {
    const { dispatch, account } = this.props;

    dispatch({
      type: 'UserManage/UserList/changeFriend',
      payload: {
        this_wx: Object.keys(account)[0],
        friends_wx: item.id,
      }
    })
  }

  handleImageClick (item) {
    console.log(item);
    this.setState({
      lightboxIsOpen: true,
      currentImage: this.state.images.findIndex(image => item.id===image.id)

    })
  }

  handleImageBoxClose = () => {
    this.setState({
      lightboxIsOpen: false,
    })
  }

  makeMessage (messages, friendsInfo) {
    let create_at = 0,
      next_create_at = 0;
    let that = this;

    function selfOrFrirend (item) {
      if (!item.self) {
        return (
          <div className={styles.item + ' ' + styles.left} title={item.message}>
            <img src={friendsInfo.friend.icon}/>
            <div className={styles.arrow}></div>
            {makeDataType(item)}
          </div>
        )
      } else {
        return (
          <div className={styles.item + ' ' + styles.right} title={item.message}>
            <img src={friendsInfo.self.icon}/>
            <div className={styles.arrow}></div>
            {makeDataType(item)}
          </div>
        )
      }
    }

    function makeDataType (item) {
      switch (item.type) {
        case 'voice':
          return (
            <div className={classnames(styles.content, styles.voice)}>
              <div>
                <Icon type="sound"/>
                <audio src={item.message.split(',')[0]}></audio>
              </div>
              <div>{(item.message.split(',')[1] / 1000).toFixed(2)}</div>
            </div>
          )
        case 'image':
          return (
            <div className={styles.content}>
              <img src={item.message} className={styles.image} onClick={() => that.handleImageClick(item)}/>
            </div>
          )
        default:
          return <div className={styles.content + ' ' + styles.text}>{item.message}</div>;
      }
    }

    return messages.map((item, index) => {
      next_create_at = new Date(item.create_at);

      //5分钟以上显示日期时间
      if (create_at - next_create_at > 300000 || index===0) {
        create_at = new Date(item.create_at);

        return (
          <div key={index}>
            <div className={styles.date}>{item.date}</div>
            <div className={styles.date}>{item.time}</div>
            {selfOrFrirend(item)}
          </div>
        )

      } else {
        return (
          <div key={index}>
            {selfOrFrirend(item)}
          </div>
        )
      }

    })

  }

  makeFriends (friends, activeFriends) {
    return (
      friends && friends.map(item => (
        <div key={item.id}
             className={classnames([styles.item], { [styles.active]: activeFriends===item.id })}
             onClick={() => this.handleFriendClick(item)}
             title={item.nickname}
        >
          <img src={item.icon} alt="头像" className={styles['wx-friends-img']}/>
          <div className={styles.info}>
            <div className={styles.name}>{item.nickname}</div>
            <Badge count={item.send_count} overflowCount={999} style={{ backgroundColor: '#00a0e9' }} showZero/>
            <Badge count={item.today_count} style={{ backgroundColor: '#87d068' }} showZero/>
          </div>
        </div>
      ))
    )
  }

  makeInfo (friendsInfo) {
    const { self, friend } = friendsInfo;
    return (

      <div>
        <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
          <img src={self.icon} alt="头像" className={styles.head}/>
          <div className="text-left text-overflow" title={self.truename}>{`用户姓名：${self.truename}`}</div>
          <div className="text-left text-overflow" title={self.nickname}>{`昵称：${self.nickname}`}</div>
          <div className="text-left text-overflow" title={self.wx_nickname}>{`微信昵称：${self.wx_nickname}`}</div>
          <div className="text-left text-overflow" title={self.friends_count}>
            {`好友总数：${self.friends_count}`}</div>
          <div className="text-left text-overflow" title={self.receive_count}>
            {`消息总数：${self.receive_count}`}</div>
          <div className="text-left text-overflow" title={self.friends_today_count}>
            {`今日好友：${self.friends_today_count}`}</div>
          <div className="text-left text-overflow" title={self.message_today_count}>
            {`今天聊天：${self.message_today_count}`}</div>
        </Card>

        <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
          <img src={friend.icon} alt="头像" className={styles.head}/>
          <div className="text-left text-overflow" title={friend.alias}>
            {`用户姓名：${friend.alias}`}</div>
          <div className="text-left text-overflow" title={friend.nickname}>
            {`昵称：${friend.nickname}`}</div>
          <div className="text-left text-overflow" title={friend.receive_count}>
            {`回复：${friend.receive_count}`}</div>
          <div className="text-left text-overflow" title={friend.receive_word}>
            {`文字：${friend.receive_word}`}</div>
          <div className="text-left text-overflow" title={friend.day_count}>
            {`聊天天数：${friend.day_count}`}</div>
          <div className="text-left text-overflow" title={friend.send_count}>
            {`聊天数量：${friend.send_count}`}</div>
          <div className="text-left text-overflow" title={friend.remark_name}>
            {`备注名：${friend.remark_name}`}</div>
          <div className="text-left text-overflow" title={friend.remark}>
            {`备注：${friend.remark}`}</div>
          <div className="text-left text-overflow" title={friend.create_at}>
            {`时间：${friend.create_at}`}</div>
        </Card>
      </div>

    )
  }

  componentWillMount () {
    //硬编码！！！
    const { dispatch } = this.props;
    dispatch({
      type: 'UserManage/UserList/getWxInfo',
      payload: {
        user_id: 974
      }
    })
  }

  render () {

    const { messages, friendInfo, friends, activeFriends } = this.props;

    return (
      <div>
        <Layout className={styles['wx-friends-panel']}>
          <Sider width={230} className={styles['friends-sider']}>
            <Search onSearch={value => console.log(value)} placeholder="请输入搜索信息"/>
            <div className={styles.content}>
              {this.makeFriends(friends, activeFriends)}
            </div>

          </Sider>
          <Layout className={styles['friends-layout']}>
            <Header className={styles['friends-header']}>
              {friendInfo.friend.nickname}
            </Header>
            <Layout className={styles['friends-content-layout']}>

              <Content className={styles.content}>
                {this.makeMessage(messages, friendInfo)}
              </Content>

              <Sider className={styles.sider}>
                <div className={styles.title}>详细信息</div>

                {this.makeInfo(friendInfo)}

              </Sider>

            </Layout>

            <Footer className={styles['friends-footer']}>

              <Tooltip title={
                <Search placeholder="请输入你需要搜索的内容" style={{ width: 180 }}/>
              }
                       getPopupContainer={triggerNode => triggerNode}
              >
                <Button icon="search">搜索</Button>
              </Tooltip>

              <DatePicker
                getCalendarContainer={trigger => trigger}
              />

              <Pagination simple defaultCurrent={2} total={50} className={styles.pagination}/>

            </Footer>
          </Layout>
        </Layout>
        <Lightbox
          backdropClosesModal={true}
          isOpen={this.state.lightboxIsOpen}
          images={this.state.images}
          onClose={this.handleImageBoxClose}
        />

      </div>
    )
  }
}

function mapStateToProps (state) {
  const UserList = state['UserManage/UserList'];
  return {
    friends: UserList.friends,
    messages: UserList.messages,
    friendInfo: UserList.friendInfo,
    activeFriends: UserList.activeFriends,
    account: UserList.account,
  };
}

export default connect(mapStateToProps)(WxFriends);
