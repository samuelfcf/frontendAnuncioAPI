import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header';
import AnnouncementForm from '../components/Announcement';
import AnnouncementList from '../components/AnnouncementList';
import AnnouncementeEditForm from '../components/AnnouncementEditForm';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Switch>
            <Route component={AnnouncementList} path="/"  exact={true}/>
            <Route component={AnnouncementForm} path="/add" />
            <Route component={AnnouncementeEditForm} path="/edit/:id" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;