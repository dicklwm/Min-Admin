import React from 'react'
import { Menu, Icon, Popover } from 'antd'
import styles from './main.less'
import Menus from './Menus';

import fontawesome from 'fontawesome';

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
        <SubMenu style={{ float: 'right' }}
                 title={
                   <span>
                     <Icon type='user'/>
                     {user.accountName}
                   </span>
                 }
        >
          <Menu.Item key='logout'>
            <a>注销</a>
          </Menu.Item>
        </SubMenu>

        <SubMenu style={{ float: 'right' }}
                 title={
                   <span>{fontawesome}</span>
                 }
        >

        </SubMenu>

      </Menu>

    </div>
  )
}

export default Header;
