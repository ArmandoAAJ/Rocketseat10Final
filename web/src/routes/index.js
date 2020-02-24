import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SigIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SigIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
}
