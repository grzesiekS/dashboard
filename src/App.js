import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import './styles/global.scss';
import './styles/bootstrap.scss';

import MainLayout from './components/layout/MainLayout/MainLayout';
import Homepage from './components/views/Homepage/Homepage';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path={'/'} component={Homepage} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  </Provider>
);

export default App;
