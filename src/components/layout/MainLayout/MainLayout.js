import React from 'react';
import PropTypes from 'prop-types';

const MainLayout = ({children}) => (
  <div>
    <h1>MainLayout</h1>
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
