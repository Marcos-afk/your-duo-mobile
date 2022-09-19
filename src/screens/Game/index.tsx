import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import axios from 'axios';
import { DuoMatch } from '../../components/DuoMatch';

interface DiscordSearchPros {
  discord: string;
}

export const Game = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const game = route.params as GameParams;
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get<DuoCardProps[]>(`http://192.168.2.131:5000/games/${game.id}/ads`);
      setDuos(data);
    };

    void loadData();
  }, [game.id]);

  const getDiscordUser = async (adsId: string) => {
    const { data } = await axios.get<DiscordSearchPros>(`http://192.168.2.131:5000/ads/${adsId}/discord`);
    setDiscordDuoSelected(data.discord);
  };

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} />
          <View style={styles.right} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

        <Heading title={game.title} subTitle="Conecte-se e comece a jogar" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {
                void getDiscordUser(item.id);
              }}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.containerList]}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          ListEmptyComponent={() => <Text style={styles.emptyListText}>Sem anúncios 🥲</Text>}
        />

        <DuoMatch
          onClose={() => setDiscordDuoSelected('')}
          visible={discordDuoSelected.length > 0 && true}
          discord={discordDuoSelected}
        />
      </SafeAreaView>
    </Background>
  );
};
