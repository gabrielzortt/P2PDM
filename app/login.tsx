import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../components/ImagemPLG';
import CampoPLG from '../components/CampoPLG';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG, fontePLG, gradientePLG } from '../constants/temaPLG';

export default function LoginPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
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
        <LinearGradient colors={gradientePLG.escuroVertPLG} style={[estilosPLG.heroPLG, { paddingTop: insetsPLG.top + 14 }]}>
          <TouchableOpacity style={estilosPLG.voltarPLG} onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corPLG.brancoPLG} />
          </TouchableOpacity>
          <ImagemPLG escuroPLG iconePLG="images-outline" legendaPLG="Imagem de destaque do login" estiloPLG={{ width: '100%', height: 190, borderRadius: 28, marginTop: 16 }} />
          <Text style={estilosPLG.marcaPLG}>NUMISMÁTICA PLG</Text>
        </LinearGradient>

        <View style={estilosPLG.folhaPLG}>
          <Text style={estilosPLG.tituloPLG}>Bem-vindo de volta</Text>
          <Text style={estilosPLG.subtituloPLG}>Entre para continuar a sua coleção.</Text>

          <View style={{ gap: 14, marginTop: 22 }}>
            <CampoPLG iconePLG="mail-outline" placeholderPLG="E-mail" valorPLG={emailPLG} aoMudarPLG={setEmailPLG} tecladoPLG="email-address" />
            <CampoPLG iconePLG="lock-closed-outline" placeholderPLG="Senha" valorPLG={senhaPLG} aoMudarPLG={setSenhaPLG} senhaPLG aoEnviarPLG={verificarLoginPLG} />
          </View>

          {erroPLG !== '' && (
            <View style={estilosPLG.erroCaixaPLG}>
              <Ionicons name="alert-circle" size={18} color={corPLG.erroPLG} />
              <Text style={estilosPLG.erroTextoPLG}>{erroPLG}</Text>
            </View>
          )}

          <BotaoPLG tituloPLG="Entrar" aoPressionarPLG={verificarLoginPLG} estiloPLG={{ marginTop: 22 }} />

          <TouchableOpacity onPress={usarContaTestePLG} style={estilosPLG.testePLG}>
            <Text style={estilosPLG.testeTextoPLG}>Usar conta de teste</Text>
          </TouchableOpacity>

          <View style={estilosPLG.divisorLinhaPLG}>
            <View style={estilosPLG.linhaPLG} />
            <Text style={estilosPLG.ouPLG}>ou</Text>
            <View style={estilosPLG.linhaPLG} />
          </View>

          <BotaoPLG tituloPLG="Criar uma conta" variantePLG="secundario" iconePLG="person-add-outline" aoPressionarPLG={() => roteadorPLG.push('/cadastro')} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.espressoPLG },
  heroPLG: { paddingHorizontal: 24, paddingBottom: 56 },
  voltarPLG: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  marcaPLG: { textAlign: 'center', fontSize: 12, letterSpacing: 3, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG, marginTop: 18 },
  folhaPLG: { flex: 1, marginTop: -32, backgroundColor: corPLG.brancoPLG, borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 24, paddingTop: 30, paddingBottom: 32 },
  tituloPLG: { fontSize: 28, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 4 },
  erroCaixaPLG: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FCEDEA', borderRadius: 12, padding: 12, marginTop: 16 },
  erroTextoPLG: { flex: 1, color: corPLG.erroPLG, fontSize: 13, fontFamily: fontePLG.mediaPLG },
  testePLG: { alignSelf: 'center', marginTop: 14, padding: 6 },
  testeTextoPLG: { fontSize: 13, fontFamily: fontePLG.mediaPLG, color: corPLG.ouroEscuroPLG },
  divisorLinhaPLG: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 18 },
  linhaPLG: { flex: 1, height: 1, backgroundColor: corPLG.bordaPLG },
  ouPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
});
