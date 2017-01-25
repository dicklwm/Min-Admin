import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import menu from '../../utils/menu';
import config from '../../utils/config';

const topMenus = menu.map(item => item.key);
const SubMenu = Menu.SubMenu;

/**
 * 递归生成菜单配置文件的所有菜单，包括子菜单
 * @param menuArray 菜单数组
 * @param siderFold 是否收缩状态
 * @param parentPath 父菜单的路径
 */
const getMenus = function (menuArray, siderFold, parentPath = '/') {
  return menuArray.map(item => {
    if (item.child) {
      return (
        <SubMenu
          key={item.key}
          title={
            <span>
              {item.icon ? <Icon type={item.icon}/> : ''}
              {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
            </span>
          }
        >
          {getMenus(item.child, siderFold, parentPath + item.key + '/')}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon}/> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus ({ siderFold, darkTheme, location, handleClickNavMenu, className }) {
  const menuItems = getMenus(menu, siderFold);
  return (
    <Menu
      className={className}
      mode={siderFold ? 'vertical' : 'inline'}
      theme={darkTheme ? 'dark' : 'light'}
      onClick={handleClickNavMenu}
      defaultOpenKeys={ [location.pathname.split('/')[1]] }
      defaultSelectedKeys={[location.pathname.split('/')[location.pathname.split('/').length - 1] || config.defaultSelectMenu]}
    >
      {menuItems}
    </Menu>
  )
}

export default Menus;
