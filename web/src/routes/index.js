import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SigIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import NewOrder from '~/pages/Dashboard/New';
import EditOrder from '~/pages/Dashboard/Edit';
import Deliveryman from '~/pages/Deliveryman';
import NewDeliveryman from '~/pages/Deliveryman/New';
import EditDeliveryman from '~/pages/Deliveryman/Edit';
import Recipient from '~/pages/Recipients';
import EditRecipient from '~/pages/Recipients/Edit';
import NewRecipient from '~/pages/Recipients/New';
import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SigIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/novaencomenda" component={NewOrder} isPrivate />
      <Route path="/editarencomenda/:id" component={EditOrder} isPrivate />
      <Route path="/entregador" component={Deliveryman} isPrivate />
      <Route path="/novoentregador" component={NewDeliveryman} isPrivate />
      <Route path="/destinatario" component={Recipient} isPrivate />
      <Route
        path="/editardestinatario/:id"
        component={EditRecipient}
        isPrivate
      />
      <Route
        path="/editarentregador/:id"
        component={EditDeliveryman}
        isPrivate
      />
      <Route path="/novodestinatario" component={NewRecipient} isPrivate />
      <Route path="/problemas" component={Problems} isPrivate />
    </Switch>
  );
}
