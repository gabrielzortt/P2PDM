import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { corPLG, fontePLG, sombraPLG, IconePLG } from '../../constants/temaPLG';

const avisosPLG: { idPLG: string; tituloPLG: string; textoPLG: string; tempoPLG: string; iconePLG: IconePLG; novoPLG: boolean }[] = [
  { idPLG: '1', tituloPLG: 'Nova peça no catálogo', textoPLG: 'Chegou a moeda de 400 Réis de 1901, tiragem limitada.', tempoPLG: 'Há 2 h', iconePLG: 'sparkles-outline', novoPLG: true },
  { idPLG: '2', tituloPLG: 'Cupom COLECAO10', textoPLG: 'Use no carrinho e ganhe 10% de desconto na sua compra.', tempoPLG: 'Hoje', iconePLG: 'pricetag-outline', novoPLG: true },
  { idPLG: '3', tituloPLG: 'Frete grátis', textoPLG: 'Compras acima de R$ 300,00 não pagam frete.', tempoPLG: 'Ontem', iconePLG: 'cube-outline', novoPLG: false },
  { idPLG: '4', tituloPLG: 'Cédulas em destaque', textoPLG: 'Confira as cédulas do Plano Cruzado em estado Flor de Estampa.', tempoPLG: '2 dias', iconePLG: 'cash-outline', novoPLG: false },
];

export default function NotificacoesPLG() {
  const insetsPLG = useSafeAreaInsets();
  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsPLG.top + 16, paddingHorizontal: 20, paddingBottom: 18 }}>
        <Text style={estilosPLG.tituloPLG}>Notificações</Text>
        <Text style={estilosPLG.subtituloPLG}>2 novas</Text>
      </View>
      <FlatList
        data={avisosPLG}
        keyExtractor={(aPLG) => aPLG.idPLG}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: itemPLG }) => (
          <View style={estilosPLG.itemPLG}>
            <View style={estilosPLG.iconePLG}>
              <Ionicons name={itemPLG.iconePLG} size={22} color={corPLG.brancoPLG} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={estilosPLG.linhaPLG}>
                <Text style={estilosPLG.itemTituloPLG}>{itemPLG.tituloPLG}</Text>
                {itemPLG.novoPLG && <View style={estilosPLG.pontoPLG} />}
              </View>
              <Text style={estilosPLG.textoPLG}>{itemPLG.textoPLG}</Text>
              <Text style={estilosPLG.tempoPLG}>{itemPLG.tempoPLG}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  tituloPLG: { fontSize: 26, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  itemPLG: { flexDirection: 'row', gap: 14, backgroundColor: corPLG.brancoPLG, borderRadius: 20, padding: 14, marginBottom: 12, ...sombraPLG.suavePLG },
  iconePLG: { width: 46, height: 46, borderRadius: 15, backgroundColor: corPLG.cobrePLG, alignItems: 'center', justifyContent: 'center' },
  linhaPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  itemTituloPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  pontoPLG: { width: 9, height: 9, borderRadius: 5, backgroundColor: corPLG.ouroPLG },
  textoPLG: { fontSize: 13, lineHeight: 19, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 3 },
  tempoPLG: { fontSize: 11, fontFamily: fontePLG.mediaPLG, color: '#B2A59C', marginTop: 6 },
});
