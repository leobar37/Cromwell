import 'gridlex/src/gridlex.scss';
import 'reset-css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { pageInfos } from '../../constants/PageInfos';
import Header from '../header/Header';
import Page from '../page/Page';
import Sidebar from '../sidebar/Sidebar';
import classes from './Layout.module.scss';
import Page404 from '../../pages/404page/404page';

function Layout() {
  return (
    <div className={classes.Layout}>
      <BrowserRouter>
        <div className={classes.header}>
          <Header />
        </div>
        <div className={classes.main}>
          <div className={classes.sidebar}>
            <Sidebar />
          </div>
          <div className={classes.content}>
            <Switch>
              {pageInfos.map(page => {
                return (
                  <Route exact={!page.baseRoute} path={page.route} key={page.name} >
                    <Page component={page.component} />
                  </Route>
                )
              })}
              <Route key={'404'} >
                <Page404 />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default Layout;
