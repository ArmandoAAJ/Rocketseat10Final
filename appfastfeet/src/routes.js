import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Dashboard from '~/Dashboard';

export default createAppContainer(
  createSwitchNavigator({
    Dashboard,
  })
);
