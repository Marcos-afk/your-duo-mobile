import React, { useState } from 'react';
import { View, Modal, Text, ModalProps, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { THEME } from '../../theme';
import { CheckCircle } from 'phosphor-react-native';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface DuoMatchProps extends ModalProps {
  discord: string;
  onClose: () => void;
}

export const DuoMatch = ({ discord, onClose, ...rest }: DuoMatchProps) => {
  const [isCopping, setIsCopping] = useState(false);

  const handleCopyDiscordUserTag = async () => {
    setIsCopping(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert('Discord copiado!', 'Tag de usuário copiada para área de transferência');
    setIsCopping(false);
  };

  return (
    <Modal {...rest} transparent statusBarTranslucent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500} />
          </TouchableOpacity>
          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play!"
            subTitle="Agora é só começar a jogar!"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione no discord</Text>

          <TouchableOpacity
            disabled={isCopping}
            style={styles.discordButton}
            onPress={() => void handleCopyDiscordUserTag()}
          >
            <Text style={styles.discord}>
              {isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
