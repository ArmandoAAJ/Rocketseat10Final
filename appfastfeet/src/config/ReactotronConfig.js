import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-community/async-storage';

if (__DEV__) {
  const tron = Reactotron.configure({ host: 'localhost' })
    .setAsyncStorageHandler(AsyncStorage)
    .useReactNative()
    .connect();

  tron.clear();

  console.tron = tron;
}
