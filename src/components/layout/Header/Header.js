import React from 'react';
import clsx from 'clsx';

import styles from './Header.module.scss';

const Header = () => (
  <header className={clsx('container-xl', styles.mainHeader)}>
    <h1 className={styles.title}>Dashboard</h1>
  </header>
);

export default Header;