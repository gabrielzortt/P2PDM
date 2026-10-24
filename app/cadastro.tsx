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
import { corPLG, fontePLG } from '../constants/temaPLG';

interface ErrosPLG {
  nomePLG?: string;
  emailPLG?: string;
  senhaPLG?: string;
  confirmarPLG?: string;
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
        <View style={{ height: 230 }}>
          <ImagemPLG escuroPLG iconePLG="images-outline" legendaPLG="Imagem de destaque do cadastro" estiloPLG={{ width: '100%', height: '100%', borderRadius: 0, borderWidth: 0, backgroundColor: corPLG.marromClaroPLG }} />
          <LinearGradient colors={['rgba(59,38,30,0)', corPLG.marromPLG]} style={estilosPLG.desvanecerPLG} pointerEvents="none" />
          <TouchableOpacity style={[estilosPLG.voltarPLG, { top: insetsPLG.top + 12 }]} onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/login'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corPLG.brancoPLG} />
          </TouchableOpacity>
        </View>

        <View style={estilosPLG.painelPLG}>
          <Text style={estilosPLG.tituloPLG}>Criar conta</Text>
          <Text style={estilosPLG.subtituloPLG}>Comece a sua coleção em poucos segundos.</Text>
          <View style={{ gap: 14, marginTop: 8 }}>
            <CampoPLG sobreEscuroPLG iconePLG="person-outline" placeholderPLG="Nome completo" valorPLG={nomePLG} aoMudarPLG={setNomePLG} erroPLG={errosPLG.nomePLG} />
            <CampoPLG sobreEscuroPLG iconePLG="mail-outline" placeholderPLG="E-mail" valorPLG={emailPLG} aoMudarPLG={setEmailPLG} tecladoPLG="email-address" erroPLG={errosPLG.emailPLG} />
            <CampoPLG sobreEscuroPLG iconePLG="lock-closed-outline" placeholderPLG="Senha (mínimo 6 caracteres)" valorPLG={senhaPLG} aoMudarPLG={setSenhaPLG} senhaPLG erroPLG={errosPLG.senhaPLG} />
            <CampoPLG sobreEscuroPLG iconePLG="shield-checkmark-outline" placeholderPLG="Confirmar senha" valorPLG={confirmarPLG} aoMudarPLG={setConfirmarPLG} senhaPLG aoEnviarPLG={criarContaPLG} erroPLG={errosPLG.confirmarPLG} />
          </View>
          <BotaoPLG tituloPLG="Criar conta" aoPressionarPLG={criarContaPLG} estiloPLG={{ marginTop: 10 }} />
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
  telaPLG: { flex: 1, backgroundColor: corPLG.marromPLG },
  desvanecerPLG: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 100 },
  voltarPLG: { position: 'absolute', left: 20, width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.35)', alignItems: 'center', justifyContent: 'center' },
  painelPLG: { flex: 1, backgroundColor: corPLG.marromPLG, paddingHorizontal: 28, paddingTop: 4, paddingBottom: 36, gap: 14 },
  tituloPLG: { fontSize: 26, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  subtituloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: '#D8CCC4', marginTop: -6 },
  rodapeLinkPLG: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4 },
  rodapeTextoPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: '#D8CCC4' },
  rodapeLinkTextoPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG },
});
