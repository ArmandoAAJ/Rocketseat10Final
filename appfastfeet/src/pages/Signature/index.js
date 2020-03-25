/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { StatusBar, Alert, Modal, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import {
  Container,
  Header,
  Box,
  Photo,
  StartPhoto,
  BoxPhoto,
  Button,
  Text,
} from './styles';

const Camera = ({ isVisible, onChangePhoto, onCloseCamera }) => {
  const [camera, setCamera] = useState();

  const onTakePicture = async () => {
    try {
      const data = await camera.takePictureAsync({
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
        skipProcessing: true,
      });
      onChangePhoto(data);
    } catch (error) {
      Alert.alert('Erro', 'Houve um erro ao tirar a foto.');
    }
  };

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <RNCamera
        ref={ref => setCamera(ref)}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permissão para usar a câmera',
          message: 'Precisamos da sua permissão para usar a câmera.',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancelar',
        }}
        captureAudio={false}
      >
        <Icon
          name="photo-camera"
          size={40}
          color="#fff"
          onPress={onTakePicture}
          style={styles.buttonTakePicture}
        />
        <Icon
          name="close"
          size={50}
          color="#fff"
          onPress={onCloseCamera}
          style={styles.buttonCloseCamera}
        />
      </RNCamera>
    </Modal>
  );
};

export default function Signature({ route, navigation }) {
  const { order } = route.params;
  console.tron.log(order);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [photo, setPhoto] = useState({
    uri: 'http://abre.ai/aTcJ',
  });

  const [filesSignature, setFilesSignature] = useState([]);

  useEffect(() => {
    async function sendSignature() {
      try {
        const data = new FormData();

        data.append('file', {
          uri: photo.uri,
          type: 'image/jpeg',
          name: `signature.jpg`,
        });

        if (photo.uri !== 'http://abre.ai/aTcJ') {
          const response = await api.post('files', data);
          setFilesSignature(response.data);
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Desculpe não conseguimos enviar a imagem, tente novamente mais tarde!'
        );
      }
    }
    sendSignature();
  }, [photo.uri]);

  async function handleSubmit() {
    try {
      await api.put(`/orders/${order.deliveryman_id}/end`, {
        end_date: new Date(),
        signature_id: filesSignature.id,
        order_id: order.id,
      });
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Erro', 'Tivemos um erro ao processar a solicitação!');
    }
  }

  const onChangePhoto = newPhoto => {
    setPhoto(newPhoto);
    setIsCameraVisible(false);
  };

  const onCloseCamera = () => {
    setIsCameraVisible(false);
  };

  return (
    <>
      <StatusBar backgroundColor="rgb(125, 64, 231)" barStyle="light-content" />
      <Container>
        <Header />
        <Box>
          {order.signature ? (
            <Photo source={{ uri: order.signature.url }} />
          ) : (
            <Photo source={{ uri: photo.uri }} />
          )}
        </Box>
        <BoxPhoto>
          {order.end_date ? (
            <Text />
          ) : (
            <StartPhoto
              onPress={() => {
                setIsCameraVisible(true);
              }}
            >
              <Icon name="photo-camera" size={40} color="#ddd" />
            </StartPhoto>
          )}
        </BoxPhoto>
        <Camera
          isVisible={isCameraVisible}
          onChangePhoto={onChangePhoto}
          onCloseCamera={onCloseCamera}
        />
        {order.end_date ? (
          <Text />
        ) : (
          <Button onPress={handleSubmit}>
            <Text>Enviar</Text>
          </Button>
        )}
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f37272',
  },
  logo: {
    alignSelf: 'center',
    marginTop: 60,
  },
  photo: {
    width: 300,
    height: 200,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 80,
  },
  buttons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 150,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTakePicture: {
    flex: 0,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  buttonCloseCamera: {
    flex: 0,
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
