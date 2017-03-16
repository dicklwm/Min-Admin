import React from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './Menus';

import FontAwesome  from 'react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';

const SubMenu = Menu.SubMenu

function Header ({ user, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, logout, switchSider }) {

  let handleClickMenu = e => e.key==='logout' && logout();

  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location
  };
  return (
    <div className={styles.header}>
      {
        isNavbar ?
          <Popover placement='bottomLeft' onVisibleChange={switchMenuPopover} visible={menuPopoverVisible}
                   overlayClassName={styles.popovermenu} trigger='hover' content={<Menus {...menusProps} />}>
            <div className={styles.siderbutton}>
              <Icon type='bars'/>
            </div>
          </Popover>
          :
          <div className={styles.siderbutton} onClick={switchSider}>
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'}/>
          </div>
      }

      <Menu className='header-menu' mode='horizontal' onClick={handleClickMenu}>
        <SubMenu title={<span>
                         <Icon type='user'/>
                          {user.accountName}
                        </span>        }
        >
          <Menu.Item key='info'>
            <a>个人消息</a>
          </Menu.Item>
          <Menu.Item key='changePassword'>
            <a>修改密码</a>
          </Menu.Item>
          <Menu.Item key='logout'>
            <a>注销</a>
          </Menu.Item>
        </SubMenu>

        <SubMenu title={
          <FontAwesome name="refresh" spin/>
        }
        />
        <SubMenu title={
          <FontAwesome name="bell"/>
        }
        />

        <SubMenu title={
          <FontAwesome name="wechat"/>
        }
        />

        <SubMenu title={
          <FontAwesome name="file-text-o"/>
        }
        />

      </Menu>

    </div>
  )
}

export default Header;
