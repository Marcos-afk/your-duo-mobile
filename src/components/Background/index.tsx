import React from 'react';
import { ImageBackground } from 'react-native';
import { styles } from './styles';
import backgroundImg from '../../assets/background-galaxy.png';

interface BackGroundProps {
  children: React.ReactNode;
}

export const Background = ({ children }: BackGroundProps) => {
  return (
    <ImageBackground source={backgroundImg} style={styles.container} defaultSource={backgroundImg}>
      {children}
    </ImageBackground>
  );
};
