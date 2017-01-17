import React from 'react';
import classnames from 'classnames';
import Asider from './Asider';
import Bread from './Bread';
import Header from './Header';
import Footer from './Footer';

//CSS
import styles from './main.less';

function Index ({ isNavbar, siderFold, darkTheme, siderProps, headerProps, location, children }) {

  const layoutClass = classnames(
    styles.layout,
    { [styles.fold]: isNavbar ? false : siderFold },
    { [styles.withnavbar]: isNavbar }
  );

  const asideClass = classnames(
    styles.sider,
    { [styles.light]: !darkTheme }
  );

  return (
    <div className={layoutClass}>
      {!isNavbar ?
        <aside className={asideClass}>
          <Asider {...siderProps} />
        </aside> : ''}
      <div className={styles.main}>
        <Header {...headerProps} />
        <Bread location={location}/>
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Index;
