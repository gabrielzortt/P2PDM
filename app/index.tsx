import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { corPLG, fontePLG } from '../constants/temaPLG';

export default function BoasVindasPLG() {
  const roteadorPLG = useRouter();
  const { height: alturaPLG } = useWindowDimensions();

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/hero_onboarding.jpg')}
        style={[estilosPLG.imagemPLG, { height: alturaPLG * 0.64 }]}
        resizeMode="cover"
      />
      <View style={estilosPLG.conteudoPLG}>
        <Text style={estilosPLG.tituloPLG}>Hora de colecionar história....</Text>
        <Text style={estilosPLG.textoPLG}>
          Moedas e cédulas raras entregues na sua porta. Comece a sua coleção agora!
        </Text>
        <View style={estilosPLG.pontosPLG}>
          <View style={estilosPLG.pontoPLG} />
          <View style={estilosPLG.pontoPLG} />
          <View style={estilosPLG.pontoPLG} />
          <View style={estilosPLG.pontoAtivoPLG} />
        </View>
        <TouchableOpacity style={estilosPLG.botaoPLG} activeOpacity={0.85} onPress={() => roteadorPLG.push('/login')}>
          <Text style={estilosPLG.botaoTextoPLG}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.marromPLG },
  imagemPLG: { width: '100%' },
  conteudoPLG: { flex: 1, paddingHorizontal: 30, paddingTop: 28, paddingBottom: 28 },
  tituloPLG: { fontSize: 26, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  textoPLG: { fontSize: 16, lineHeight: 23, fontFamily: fontePLG.regularPLG, color: '#E9E1DC', marginTop: 14 },
  pontosPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 'auto', marginBottom: 22 },
  pontoPLG: { width: 7, height: 7, borderRadius: 4, backgroundColor: corPLG.brancoPLG },
  pontoAtivoPLG: { width: 26, height: 7, borderRadius: 4, backgroundColor: corPLG.brancoPLG },
  botaoPLG: { height: 54, borderRadius: 27, backgroundColor: corPLG.laranjaPLG, alignItems: 'center', justifyContent: 'center' },
  botaoTextoPLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
});
