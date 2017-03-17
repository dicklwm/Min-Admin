import React from 'react';
import { connect } from 'dva';
import { Input, Layout, Badge, Card, Tooltip, Button, DatePicker, Pagination, Icon } from 'antd';
import styles from './WxFriends.less';
import classnames from 'classnames';
import moment from 'moment';
import Lightbox from 'react-images'

// import icon_default from '../../../assets/Images/icon_default.png';

const { Header, Footer, Sider, Content } = Layout;

class WxFriends extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
      //???????????
      images: this.props.messages.filter(item => item.type==='image').map((item, index) => {
        item.src = item.message;
        item.index = index;
        return item;
      }),
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
    this.setState({
      lightboxIsOpen: true,
      currentImage: item.index
    })
  }

  handleChangeImageIndex (type) {
    this.setState({
      currentImage: type==='prev' ? --this.state.currentImage : ++this.state.currentImage

    })
  }

  handleImageBoxClose = () => {
    this.setState({
      lightboxIsOpen: false,
    })
  }

  handleAudioClick = (id) => {
    const thisAudio = this.refs['audio' + id]
    window.v = thisAudio;
    //先暂停其他的
    Object.values(this.refs).forEach(ref => {
      if (ref instanceof HTMLAudioElement) {
        if (!ref.paused) {
          ref.pause();
        }
      }
    })
    if (thisAudio.paused) {
      thisAudio.play();
    } else {
      thisAudio.pause();
    }

  }

  handleSearchFriends (value) {
    console.log(value);
    this.props.dispatch({
      type: 'UserManage/UserList/searchFriends',
      payload: value,
    })
  }

  handleSearchMessages (value) {
    this.props.dispatch({
      type: 'UserManage/UserList/searchMessages',
      payload: value,
    })
  }

  handleSearchMessagesDate (value) {
    this.props.dispatch({
      type: 'UserManage/UserList/searchMessagesDate',
      payload: value
    })
  }

  makeMessage (messages, friendsInfo) {
    let create_at = 0,
      next_create_at = 0,
      that = this;

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
            <div className={classnames(styles.content, styles.voice)}
                 onClick={() => that.handleAudioClick(item.id)}>
              <div >
                <Icon type="sound"/>
                <audio src={item.message.split(',')[0]} ref={'audio' + item.id}
                       onPlay={(e) => e.target.parentElement.getElementsByTagName('i')[0].className = "anticon anticon-play-circle"}
                       onPause={(e) => e.target.parentElement.getElementsByTagName('i')[0].className = "anticon anticon-sound"}
                ></audio>
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

    const allMessages = messages.map((item, index) => {
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

    return allMessages;

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
          <div className="text-left text-overflow" title={self.truename || ''}>
            {`用户姓名：${self.truename || ''}`}</div>
          <div className="text-left text-overflow" title={self.nickname || ''}>
            {`昵称：${self.nickname || ''}`}</div>
          <div className="text-left text-overflow"
               title={self.wx_nickname || ''}>
            {`微信昵称：${self.wx_nickname || ''}`}</div>
          <div className="text-left text-overflow" title={self.friends_count || ''}>
            {`好友总数：${self.friends_count || ''}`}</div>
          <div className="text-left text-overflow" title={self.receive_count || ''}>
            {`消息总数：${self.receive_count || ''}`}</div>
          <div className="text-left text-overflow" title={self.friends_today_count || ''}>
            {`今日好友：${self.friends_today_count || ''}`}</div>
          <div className="text-left text-overflow" title={self.message_today_count || ''}>
            {`今天聊天：${self.message_today_count || ''}`}</div>
        </Card>

        <Card bordered={false} bodyStyle={{ textAlign: 'center' }}>
          <img src={friend.icon} alt="头像" className={styles.head}/>
          <div className="text-left text-overflow" title={friend.alias || ''}>
            {`用户姓名：${friend.alias || ''}`}</div>
          <div className="text-left text-overflow" title={friend.nickname || ''}>
            {`昵称：${friend.nickname || ''}`}</div>
          <div className="text-left text-overflow" title={friend.receive_count || ''}>
            {`回复：${friend.receive_count || ''}`}</div>
          <div className="text-left text-overflow" title={friend.receive_word || ''}>
            {`文字：${friend.receive_word || ''}`}</div>
          <div className="text-left text-overflow" title={friend.day_count || ''}>
            {`聊天天数：${friend.day_count || ''}`}</div>
          <div className="text-left text-overflow" title={friend.send_count || ''}>
            {`聊天数量：${friend.send_count || ''}`}</div>
          <div className="text-left text-overflow" title={friend.remark_name || ''}>
            {`备注名：${friend.remark_name || ''}`}</div>
          <div className="text-left text-overflow" title={friend.remark || ''}>
            {`备注：${friend.remark || ''}`}</div>
          <div className="text-left text-overflow" title={friend.create_at || ''}>
            {`时间：${friend.create_at || ''}`}</div>
        </Card>
      </div>

    )
  }

  componentWillMount () {
    //硬编码！！！
    const { dispatch ,weixin } = this.props;
    console.log(weixin);
    dispatch({
      type: 'UserManage/UserList/getWxInfo',
      payload: {
        user_id: weixin[0].id
      }
    })
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      images: nextProps.messages.filter(item => item.type==='image').map((item, index) => {
        item.src = item.message;
        item.index = index;
        return item;
      }),
    })
  }

  render () {
    window.moment = moment;

    const { friendInfo, activeFriends, friends, messages, searchMessageDate, searchMessage, searchFriends } = this.props;

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Layout className={styles['wx-friends-panel']}>
          <Sider width={230} className={styles['friends-sider']}>
            <Input placeholder="请输入搜索信息"
                   value={searchFriends}
                   suffix={ searchFriends ?
                     <Icon type="close-circle"
                           style={{ cursor: 'pointer' }}
                           onClick={() => this.handleSearchFriends('')}/> : null}
                   onChange={e => this.handleSearchFriends(e.target.value)}
            />
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
                <div style={{ width: '100%', height: '100%', overflow: 'auto' }} ref="message-content">
                  {this.makeMessage(messages, friendInfo)}
                </div>
              </Content>

              <Sider className={styles.sider}>
                <div className={styles.title}>详细信息</div>

                {this.makeInfo(friendInfo)}

              </Sider>

            </Layout>

            <Footer className={styles['friends-footer']}>

              <Tooltip title={
                <Input placeholder="请输入你需要搜索的内容" style={{ width: 180 }}
                       value={searchMessage}
                       suffix={ searchMessage ?
                         <Icon type="close-circle"
                               style={{ color: '#666' }}
                               onClick={() => this.handleSearchMessages('')}/> : null}
                       onChange={e => this.handleSearchMessages(e.target.value)}
                />
              }
                       getPopupContainer={triggerNode => triggerNode}
              >
                <Button icon="search">搜索</Button>
              </Tooltip>

              <DatePicker
                value={searchMessageDate && moment(searchMessageDate)}
                getCalendarContainer={trigger => trigger.parentElement}
                onChange={(date) => this.handleSearchMessagesDate(date)}
              />

              <div className={styles.pagination}>
                <Button>首页</Button>
                <Button>上一页</Button>
                <Button>下一页</Button>
                <Button>尾页</Button>
              </div>

            </Footer>
          </Layout>
        </Layout>
        <Lightbox
          backdropClosesModal={true}
          isOpen={this.state.lightboxIsOpen}
          images={this.state.images}
          currentImage={this.state.currentImage}
          onClose={this.handleImageBoxClose}
          onClickPrev={() => this.handleChangeImageIndex('prev')}
          onClickNext={() => this.handleChangeImageIndex('next')}
          onClickImage={this.handleImageBoxClose}
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
    searchFriends: UserList.searchFriends,
    searchMessage: UserList.searchMessage,
    searchMessageDate: UserList.searchMessageDate,
    weixin: state.app.weixin,
  };
}

export default connect(mapStateToProps)(WxFriends);
