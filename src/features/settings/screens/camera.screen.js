import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import styled from 'styled-components';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// context
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const CameraScreen = ({ navigation }) => {
  const cameraRef = useRef();
  const { user } = useContext(AuthenticationContext);
  const [hasPermission, setHasPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');

      if (Platform.OS !== 'web') {
        const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (galleryStatus.status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work!',
            [{ text: 'Close', style: 'cancel' }]
          );
        }
        setHasGalleryPermission(galleryStatus.status === 'granted');
      }
    })();
  }, []);

  const snap = async () => {
    if (cameraRef) {
      let photo = await cameraRef.current.takePictureAsync();
      await AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  if (hasPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (hasGalleryPermission === false) {
    return <Text>No access to Gallery</Text>;
  }
  return (
    <TouchableOpacity onPress={snap}>
      <ProfileCamera
        ref={(camera) => {
          cameraRef.current = camera;
        }}
        type={Camera.Constants.Type.front}
        ratio={'16:9'}
      />
    </TouchableOpacity>
  );
};

export default CameraScreen;
