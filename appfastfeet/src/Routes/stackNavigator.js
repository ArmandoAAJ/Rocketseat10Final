import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Dashboard from '~/pages/Dashboard';
import Delivered from '~/pages/Delivered';
import Details from '~/pages/Details';
import Problem from '~/pages/Problem';
import ViewProblem from '~/pages/ViewProblem';
import Signature from '~/pages/Signature';

const Stacks = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stacks.Navigator
      screenOptions={{
        headerBackTitleStyle: null,
        headerBackImage: () => {
          return <Icon name="chevron-left" color="#fff" size={25} />;
        },
        headerTransparent: true,
        headerTitleStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        resetOnBlur: true,
      }}
    >
      <Stacks.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
        }}
      />
      <Stacks.Screen
        name="Delivered"
        component={Delivered}
        options={{
          title: 'Encomendas finalizadas',
          headerShown: false,
        }}
      />
      <Stacks.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Detalhes da encomenda',
          headerShown: true,
        }}
      />
      <Stacks.Screen
        name="Problem"
        component={Problem}
        options={{
          title: 'Informar problema',
          headerShown: true,
        }}
      />
      <Stacks.Screen
        name="ViewProblem"
        component={ViewProblem}
        options={{
          title: 'Visualizar problemas',
          headerShown: true,
        }}
      />
      <Stacks.Screen
        name="Signature"
        component={Signature}
        options={{
          title: 'Confirmar entrega',
          headerShown: true,
        }}
      />
    </Stacks.Navigator>
  );
}
