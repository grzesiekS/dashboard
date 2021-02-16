import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import './styles/global.scss';
import './styles/bootstrap.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';

const App = () => (
  <Provider store={store}>
    <MainLayout>
      <Homepage />
    </MainLayout>
  </Provider>
);

export default App;
