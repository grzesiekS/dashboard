import React from 'react';

import styles from './Header.module.scss';

const Header = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Dashboard</h1>
  </div>
);

export default Header;