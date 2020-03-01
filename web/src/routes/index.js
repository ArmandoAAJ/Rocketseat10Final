import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SigIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import NewOrder from '~/pages/Dashboard/New';
import EditOrder from '~/pages/Dashboard/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SigIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/novaencomenda" component={NewOrder} isPrivate />
      <Route path="/editarencomenda/:id" component={EditOrder} isPrivate />
    </Switch>
  );
}
