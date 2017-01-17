import React from 'react'
import { Icon, Switch } from 'antd'
import styles from './main.less'
import config  from '../../utils/config';
import Menus from './Menus';

function Asider ({ siderFold, darkTheme, location, changeTheme }) {

  const menusProps = {
    siderFold,
    darkTheme,
    location
  }
  return (
    <div>
      <div className={styles.logo}>
        <img className={styles.logoImage} src={config.logoSrc}/>
        {siderFold ? '' : <span>{config.logoText}</span>}
      </div>
      <Menus {...menusProps} className={styles.siderMenu}/>
      {
        !siderFold ?
          <div className={styles.switchtheme}>
            <span><Icon type='bulb'/>切换主题</span>
            <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren='黑' unCheckedChildren='白'/>
          </div>
          : ''
      }
    </div>

  )
}

export default Asider;
