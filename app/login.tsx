import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../components/ImagemPLG';
import CampoPLG from '../components/CampoPLG';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG, fontePLG } from '../constants/temaPLG';

export default function LoginPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { height: alturaPLG } = useWindowDimensions();
  const { entrarPLG } = useLojaPLG();
  const [emailPLG, setEmailPLG] = useState<string>('');
  const [senhaPLG, setSenhaPLG] = useState<string>('');
  const [erroPLG, setErroPLG] = useState<string>('');

  const verificarLoginPLG = () => {
    const resultadoPLG = entrarPLG(emailPLG, senhaPLG);
    if (resultadoPLG) {
      setErroPLG(resultadoPLG);
      return;
    }
    setErroPLG('');
    roteadorPLG.replace('/inicio');
  };

  const usarContaTestePLG = () => {
    setEmailPLG('colecionador@moedas.com');
    setSenhaPLG('123456');
    setErroPLG('');
  };

  return (
    <KeyboardAvoidingView style={estilosPLG.telaPLG} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
        <View style={{ height: Math.max(alturaPLG * 0.44, 300) }}>
          <ImagemPLG escuroPLG iconePLG="images-outline" legendaPLG="Imagem de destaque do login" estiloPLG={{ width: '100%', height: '100%', borderRadius: 0, borderWidth: 0, backgroundColor: corPLG.marromClaroPLG }} />
          <LinearGradient colors={['rgba(59,38,30,0)', corPLG.marromPLG]} style={estilosPLG.desvanecerPLG} pointerEvents="none" />
          <TouchableOpacity style={[estilosPLG.voltarPLG, { top: insetsPLG.top + 12 }]} onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corPLG.brancoPLG} />
          </TouchableOpacity>
        </View>

        <View style={estilosPLG.painelPLG}>
          <Text style={estilosPLG.tituloPLG}>Bem-vindo de volta</Text>
          <Text style={estilosPLG.subtituloPLG}>Entre para continuar a sua coleção.</Text>
          <View style={{ gap: 14, marginTop: 8 }}>
            <CampoPLG iconePLG="mail-outline" placeholderPLG="E-mail" valorPLG={emailPLG} aoMudarPLG={setEmailPLG} tecladoPLG="email-address" />
            <CampoPLG iconePLG="lock-closed-outline" placeholderPLG="Senha" valorPLG={senhaPLG} aoMudarPLG={setSenhaPLG} senhaPLG aoEnviarPLG={verificarLoginPLG} />
          </View>
          {erroPLG !== '' && (
            <View style={estilosPLG.erroPLG}>
              <Ionicons name="alert-circle" size={18} color={corPLG.erroClaroPLG} />
              <Text style={estilosPLG.erroTextoPLG}>{erroPLG}</Text>
            </View>
          )}
          <BotaoPLG tituloPLG="Entrar" aoPressionarPLG={verificarLoginPLG} estiloPLG={{ marginTop: 10 }} />
          <BotaoPLG tituloPLG="Criar uma conta" variantePLG="secundario" sobreEscuroPLG aoPressionarPLG={() => roteadorPLG.push('/cadastro')} />
          <TouchableOpacity onPress={usarContaTestePLG} style={estilosPLG.testePLG}>
            <Text style={estilosPLG.testeTextoPLG}>Usar conta de teste</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.marromPLG },
  desvanecerPLG: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 110 },
  voltarPLG: { position: 'absolute', left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painelPLG: { flex: 1, backgroundColor: corPLG.marromPLG, paddingHorizontal: 28, paddingTop: 4, paddingBottom: 32, gap: 14 },
  tituloPLG: { fontSize: 26, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  subtituloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: '#D8CCC4', marginTop: -6 },
  erroPLG: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(229,72,77,0.16)', borderRadius: 14, padding: 12 },
  erroTextoPLG: { flex: 1, color: corPLG.erroClaroPLG, fontSize: 13, fontFamily: fontePLG.mediaPLG },
  testePLG: { alignSelf: 'center', padding: 6 },
  testeTextoPLG: { fontSize: 13, fontFamily: fontePLG.mediaPLG, color: corPLG.ouroClaroPLG },
});
