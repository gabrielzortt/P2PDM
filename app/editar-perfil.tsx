import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import CabecalhoPLG from '../components/CabecalhoPLG';
import CampoPLG from '../components/CampoPLG';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG } from '../constants/temaPLG';

export default function EditarPerfilPLG() {
  const roteadorPLG = useRouter();
  const { usuarioPLG, atualizarPerfilPLG, mostrarToastPLG } = useLojaPLG();
  const [nomePLG, setNomePLG] = useState<string>(usuarioPLG?.nomePLG ?? '');
  const [telefonePLG, setTelefonePLG] = useState<string>(usuarioPLG?.telefonePLG ?? '');
  const [erroPLG, setErroPLG] = useState<string>('');

  const salvarPLG = () => {
    if (nomePLG.trim().length < 3) {
      setErroPLG('Informe seu nome completo.');
      return;
    }
    atualizarPerfilPLG(nomePLG, telefonePLG);
    mostrarToastPLG('Perfil atualizado');
    roteadorPLG.back();
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <CabecalhoPLG tituloPLG="Editar perfil" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, gap: 16, paddingBottom: 32 }}>
        <CampoPLG rotuloPLG="Nome completo" iconePLG="person-outline" placeholderPLG="Seu nome" valorPLG={nomePLG} aoMudarPLG={setNomePLG} erroPLG={erroPLG} />
        <CampoPLG rotuloPLG="E-mail" iconePLG="mail-outline" placeholderPLG="E-mail" valorPLG={usuarioPLG?.emailPLG ?? ''} aoMudarPLG={() => undefined} somenteLeituraPLG />
        <CampoPLG rotuloPLG="Telefone" iconePLG="call-outline" placeholderPLG="(92) 90000-0000" valorPLG={telefonePLG} aoMudarPLG={setTelefonePLG} tecladoPLG="phone-pad" aoEnviarPLG={salvarPLG} />
        <BotaoPLG tituloPLG="Salvar alterações" iconePLG="checkmark" aoPressionarPLG={salvarPLG} estiloPLG={{ marginTop: 10 }} />
      </ScrollView>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
});
