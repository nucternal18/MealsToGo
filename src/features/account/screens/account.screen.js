import React from "react";

import {
  BackgroundImage,
  AccountCover,
  AccountContainer,
  AuthButton,
  Title,
} from "../components/account.styled";
import { Spacer } from "../../../components/spacer/spacer.component";

const AccountScreen = ({ navigation }) => {
  return (
    <BackgroundImage>
      <AccountCover />
      <Title>Meals To Go</Title>
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </BackgroundImage>
  );
};

export default AccountScreen;
