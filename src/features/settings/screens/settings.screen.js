import React, { useContext, useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { List, Avatar } from 'react-native-paper';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import { SafeArea } from '../../../components/utility/safe-area.component';
import { Text } from '../../../components/typography/text.component';
import { Spacer } from '../../../components/spacer/spacer.component';

// context
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

const SettingsScreen = ({ navigation }) => {
  const { onLogout, user } = useContext(AuthenticationContext);
  const [profilePhoto, setProfilePhoto] = useState(null);

  //   const getProfilePicture = async (currentUser) => {
  //     const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
  //     setProfilePhoto(photoUri);
  //     navigation.goBack();
  //   };
  useFocusEffect(
    useCallback(() => {
      const getProfilePicture = async (currentUser) => {
        const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
        setProfilePhoto(photoUri);
      };
      getProfilePicture(user);
    }, [user])
  );
  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          {!profilePhoto && (
            <Avatar.Icon size={180} icon='human' backgroundColor='#2182BD' />
          )}
          {profilePhoto && (
            <Avatar.Image
              size={180}
              source={{ uri: profilePhoto }}
              backgroundColor='#2182BD'
            />
          )}
        </TouchableOpacity>
        <Spacer position='top' size='large'>
          <Text variant='label'>{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          style={{ padding: 16 }}
          title='Favourites'
          description='View your Favourites'
          left={(props) => <List.Icon {...props} color='black' icon='heart' />}
          onPress={() => navigation.navigate('Favourites')}
        />
        <SettingsItem
          style={{ padding: 16 }}
          title='Logout'
          left={(props) => <List.Icon {...props} color='black' icon='door' />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};

export default SettingsScreen;
