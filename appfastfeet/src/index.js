import React, { useState, useEffect } from 'react';
import '~/config/ReactotronConfig';
import AsyncStorage from '@react-native-community/async-storage';

import createRouter from '~/routes';

export default function App() {
  const [signedIn, setSignedIn] = useState();

  useEffect(() => {
    async function teste() {
      const logedIn = await AsyncStorage.getItem('logado');
      setSignedIn(JSON.parse(logedIn));
    }
    teste();
  }, [signedIn, setSignedIn]);

  const Routes = createRouter(signedIn);

  return <Routes />;
}
