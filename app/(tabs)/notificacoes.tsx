import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { corPLG, fontePLG } from '../../constants/temaPLG';

const avisosPLG: { idPLG: string; tituloPLG: string; textoPLG: string }[] = [
  { idPLG: '1', tituloPLG: 'Nova peça no catálogo', textoPLG: 'Chegou a moeda de 400 Réis de 1901, tiragem limitada.' },
  { idPLG: '2', tituloPLG: 'Frete grátis', textoPLG: 'Compras acima de R$ 300,00 não pagam frete esta semana.' },
  { idPLG: '3', tituloPLG: 'Cédulas em destaque', textoPLG: 'Confira as cédulas do Plano Cruzado em estado Flor de Estampa.' },
];

export default function NotificacoesPLG() {
  const insetsPLG = useSafeAreaInsets();
  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <Text style={[estilosPLG.tituloPLG, { paddingTop: insetsPLG.top + 16 }]}>Notificações</Text>
      <FlatList
        data={avisosPLG}
        keyExtractor={(a) => a.idPLG}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View style={estilosPLG.itemPLG}>
            <View style={estilosPLG.iconePLG}>
              <Ionicons name="notifications" size={20} color={corPLG.brancoPLG} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.itemTituloPLG}>{item.tituloPLG}</Text>
              <Text style={estilosPLG.itemTextoPLG}>{item.textoPLG}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  tituloPLG: { fontSize: 22, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG, paddingHorizontal: 20, paddingBottom: 18 },
  itemPLG: { flexDirection: 'row', gap: 12, backgroundColor: corPLG.brancoPLG, borderRadius: 16, padding: 14, marginBottom: 12 },
  iconePLG: { width: 40, height: 40, borderRadius: 12, backgroundColor: corPLG.cobrePLG, alignItems: 'center', justifyContent: 'center' },
  itemTituloPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  itemTextoPLG: { fontSize: 13, lineHeight: 19, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
});
