import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CampoPLG from '../components/CampoPLG';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG, fontePLG, gradientePLG } from '../constants/temaPLG';

interface ErrosPLG {
  nomePLG?: string;
  emailPLG?: string;
  senhaPLG?: string;
  confirmarPLG?: string;
  geralPLG?: string;
}

export default function CadastroPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { cadastrarPLG, mostrarToastPLG } = useLojaPLG();
  const [nomePLG, setNomePLG] = useState<string>('');
  const [emailPLG, setEmailPLG] = useState<string>('');
  const [senhaPLG, setSenhaPLG] = useState<string>('');
  const [confirmarPLG, setConfirmarPLG] = useState<string>('');
  const [errosPLG, setErrosPLG] = useState<ErrosPLG>({});

  const criarContaPLG = () => {
    const novosErrosPLG: ErrosPLG = {};
    if (nomePLG.trim().length < 3) novosErrosPLG.nomePLG = 'Informe seu nome completo.';
    if (!/^\S+@\S+\.\S+$/.test(emailPLG.trim())) novosErrosPLG.emailPLG = 'Digite um e-mail válido.';
    if (senhaPLG.length < 6) novosErrosPLG.senhaPLG = 'A senha precisa ter ao menos 6 caracteres.';
    if (confirmarPLG !== senhaPLG) novosErrosPLG.confirmarPLG = 'As senhas não coincidem.';
    if (Object.keys(novosErrosPLG).length > 0) {
      setErrosPLG(novosErrosPLG);
      return;
    }
    const resultadoPLG = cadastrarPLG(nomePLG, emailPLG, senhaPLG);
    if (resultadoPLG) {
      setErrosPLG({ emailPLG: resultadoPLG });
      return;
    }
    mostrarToastPLG('Conta criada com sucesso! Bem-vindo(a).');
    roteadorPLG.replace('/inicio');
  };

  return (
    <KeyboardAvoidingView style={estilosPLG.telaPLG} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradientePLG.escuroVertPLG} style={[estilosPLG.heroPLG, { paddingTop: insetsPLG.top + 14 }]}>
          <TouchableOpacity style={estilosPLG.voltarPLG} onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/login'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corPLG.brancoPLG} />
          </TouchableOpacity>
          <Text style={estilosPLG.marcaPLG}>NUMISMÁTICA PLG</Text>
          <Text style={estilosPLG.heroTituloPLG}>Comece a sua{'\n'}coleção hoje</Text>
          <Text style={estilosPLG.heroTextoPLG}>Crie sua conta em poucos segundos.</Text>
        </LinearGradient>

        <View style={estilosPLG.folhaPLG}>
          <Text style={estilosPLG.tituloPLG}>Criar conta</Text>
          <View style={{ gap: 14, marginTop: 20 }}>
            <CampoPLG rotuloPLG="Nome completo" iconePLG="person-outline" placeholderPLG="Seu nome" valorPLG={nomePLG} aoMudarPLG={setNomePLG} erroPLG={errosPLG.nomePLG} />
            <CampoPLG rotuloPLG="E-mail" iconePLG="mail-outline" placeholderPLG="voce@email.com" valorPLG={emailPLG} aoMudarPLG={setEmailPLG} tecladoPLG="email-address" erroPLG={errosPLG.emailPLG} />
            <CampoPLG rotuloPLG="Senha" iconePLG="lock-closed-outline" placeholderPLG="Mínimo de 6 caracteres" valorPLG={senhaPLG} aoMudarPLG={setSenhaPLG} senhaPLG erroPLG={errosPLG.senhaPLG} />
            <CampoPLG rotuloPLG="Confirmar senha" iconePLG="shield-checkmark-outline" placeholderPLG="Repita a senha" valorPLG={confirmarPLG} aoMudarPLG={setConfirmarPLG} senhaPLG aoEnviarPLG={criarContaPLG} erroPLG={errosPLG.confirmarPLG} />
          </View>

          <BotaoPLG tituloPLG="Criar conta" aoPressionarPLG={criarContaPLG} estiloPLG={{ marginTop: 24 }} />

          <View style={estilosPLG.rodapeLinkPLG}>
            <Text style={estilosPLG.rodapeTextoPLG}>Já tem uma conta?</Text>
            <TouchableOpacity onPress={() => roteadorPLG.replace('/login')}>
              <Text style={estilosPLG.rodapeLinkTextoPLG}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.espressoPLG },
  heroPLG: { paddingHorizontal: 24, paddingBottom: 56 },
  voltarPLG: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  marcaPLG: { fontSize: 12, letterSpacing: 3, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG, marginTop: 24 },
  heroTituloPLG: { fontSize: 32, lineHeight: 40, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, marginTop: 10 },
  heroTextoPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: '#DCCFC6', marginTop: 8 },
  folhaPLG: { flex: 1, marginTop: -32, backgroundColor: corPLG.brancoPLG, borderTopLeftRadius: 34, borderTopRightRadius: 34, paddingHorizontal: 24, paddingTop: 30, paddingBottom: 36 },
  tituloPLG: { fontSize: 26, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  rodapeLinkPLG: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 20 },
  rodapeTextoPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  rodapeLinkTextoPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
});
