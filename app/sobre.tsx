import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import CabecalhoPLG from '../components/CabecalhoPLG';
import ImagemPLG from '../components/ImagemPLG';
import { corPLG, fontePLG, gradientePLG, sombraPLG, IconePLG } from '../constants/temaPLG';

const infosPLG: { iconePLG: IconePLG; rotuloPLG: string; valorPLG: string }[] = [
  { iconePLG: 'location-outline', rotuloPLG: 'Onde estamos', valorPLG: 'Loja virtual · Manaus, AM' },
  { iconePLG: 'time-outline', rotuloPLG: 'Atendimento', valorPLG: 'Segunda a sexta, das 9h às 18h' },
  { iconePLG: 'shield-checkmark-outline', rotuloPLG: 'Garantia', valorPLG: 'Certificado de autenticidade em todas as peças' },
  { iconePLG: 'cube-outline', rotuloPLG: 'Envio', valorPLG: 'Embalagem protetora e frete grátis acima de R$ 300' },
];

export default function SobrePLG() {
  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <CabecalhoPLG tituloPLG="Sobre a loja" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: 18 }}>
        <ImagemPLG iconePLG="storefront-outline" legendaPLG="Foto da loja / logotipo" estiloPLG={{ width: '100%', height: 190, borderRadius: 26 }} />

        <LinearGradient colors={gradientePLG.promoPLG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={estilosPLG.cartaoEscuroPLG}>
          <Text style={estilosPLG.marcaPLG}>NUMISMÁTICA PLG</Text>
          <Text style={estilosPLG.tituloPLG}>Peças que contam história</Text>
          <Text style={estilosPLG.textoPLG}>
            Somos uma loja dedicada a moedas e cédulas antigas do Brasil. Selecionamos cada peça com cuidado para que o colecionador, do iniciante ao avançado, encontre itens autênticos e bem conservados.
          </Text>
        </LinearGradient>

        <View style={estilosPLG.listaPLG}>
          {infosPLG.map((info, i) => (
            <View key={info.rotuloPLG} style={[estilosPLG.infoPLG, i < infosPLG.length - 1 && estilosPLG.infoBordaPLG]}>
              <View style={estilosPLG.infoIconePLG}>
                <Ionicons name={info.iconePLG} size={21} color={corPLG.ouroEscuroPLG} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={estilosPLG.infoRotuloPLG}>{info.rotuloPLG}</Text>
                <Text style={estilosPLG.infoValorPLG}>{info.valorPLG}</Text>
              </View>
            </View>
          ))}
        </View>

        <Text style={estilosPLG.equipePLG}>Desenvolvido por Paulo, Luiz e Gabriel</Text>
      </ScrollView>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  cartaoEscuroPLG: { borderRadius: 26, padding: 22 },
  marcaPLG: { fontSize: 11, letterSpacing: 3, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG },
  tituloPLG: { fontSize: 26, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, marginTop: 8 },
  textoPLG: { fontSize: 14, lineHeight: 22, fontFamily: fontePLG.regularPLG, color: '#E5D9D0', marginTop: 10 },
  listaPLG: { backgroundColor: corPLG.brancoPLG, borderRadius: 22, paddingHorizontal: 6, ...sombraPLG.suavePLG },
  infoPLG: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, paddingHorizontal: 12 },
  infoBordaPLG: { borderBottomWidth: 1, borderBottomColor: '#F2EBE0' },
  infoIconePLG: { width: 42, height: 42, borderRadius: 14, backgroundColor: corPLG.cremePLG, alignItems: 'center', justifyContent: 'center' },
  infoRotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  infoValorPLG: { fontSize: 14, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG, marginTop: 2 },
  equipePLG: { textAlign: 'center', fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
});
