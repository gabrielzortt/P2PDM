import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfirmarModalPLG from '../../components/ConfirmarModal';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG, gradientePLG, sombraPLG, IconePLG } from '../../constants/temaPLG';

export default function PerfilPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { usuarioPLG, pedidosPLG, favoritosPLG, quantidadeTotalPLG, sairPLG } = useLojaPLG();
  const [sairAbertoPLG, setSairAbertoPLG] = useState<boolean>(false);

  const menuPLG: { rotuloPLG: string; iconePLG: IconePLG; aoPressionarPLG: () => void }[] = [
    { rotuloPLG: 'Meus pedidos', iconePLG: 'receipt-outline', aoPressionarPLG: () => roteadorPLG.push('/pedidos') },
    { rotuloPLG: 'Meus favoritos', iconePLG: 'heart-outline', aoPressionarPLG: () => roteadorPLG.push('/favoritos') },
    { rotuloPLG: 'Editar perfil', iconePLG: 'create-outline', aoPressionarPLG: () => roteadorPLG.push('/editar-perfil') },
    { rotuloPLG: 'Notificações', iconePLG: 'notifications-outline', aoPressionarPLG: () => roteadorPLG.push('/notificacoes') },
    { rotuloPLG: 'Sobre a loja', iconePLG: 'information-circle-outline', aoPressionarPLG: () => roteadorPLG.push('/sobre') },
  ];

  const estatisticasPLG = [
    { rotuloPLG: 'Pedidos', valorPLG: pedidosPLG.length },
    { rotuloPLG: 'Favoritos', valorPLG: favoritosPLG.length },
    { rotuloPLG: 'No carrinho', valorPLG: quantidadeTotalPLG },
  ];

  const confirmarSairPLG = () => {
    setSairAbertoPLG(false);
    sairPLG();
    roteadorPLG.replace('/login');
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <LinearGradient colors={gradientePLG.cinzaPLG} style={[estilosPLG.topoPLG, { paddingTop: insetsPLG.top + 24 }]}>
          <View style={estilosPLG.avatarPLG}>
            <Text style={estilosPLG.avatarTextoPLG}>{(usuarioPLG?.nomePLG ?? 'C').charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={estilosPLG.nomePLG}>{usuarioPLG?.nomePLG}</Text>
          <Text style={estilosPLG.emailPLG}>{usuarioPLG?.emailPLG}</Text>
        </LinearGradient>

        <View style={estilosPLG.estatisticasPLG}>
          {estatisticasPLG.map((ePLG, iPLG) => (
            <View key={ePLG.rotuloPLG} style={[estilosPLG.estatisticaPLG, iPLG < estatisticasPLG.length - 1 && estilosPLG.divisorPLG]}>
              <Text style={estilosPLG.estatisticaValorPLG}>{ePLG.valorPLG}</Text>
              <Text style={estilosPLG.estatisticaRotuloPLG}>{ePLG.rotuloPLG}</Text>
            </View>
          ))}
        </View>

        <View style={estilosPLG.menuPLG}>
          {menuPLG.map((itemPLG, iPLG) => (
            <TouchableOpacity key={itemPLG.rotuloPLG} style={[estilosPLG.itemPLG, iPLG < menuPLG.length - 1 && estilosPLG.itemBordaPLG]} activeOpacity={0.7} onPress={itemPLG.aoPressionarPLG}>
              <View style={estilosPLG.itemIconePLG}>
                <Ionicons name={itemPLG.iconePLG} size={21} color={corPLG.ouroEscuroPLG} />
              </View>
              <Text style={estilosPLG.itemTextoPLG}>{itemPLG.rotuloPLG}</Text>
              <Ionicons name="chevron-forward" size={18} color="#B8ABA2" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={estilosPLG.sairPLG} onPress={() => setSairAbertoPLG(true)} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={corPLG.erroPLG} />
          <Text style={estilosPLG.sairTextoPLG}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmarModalPLG
        visivelPLG={sairAbertoPLG}
        tituloPLG="Sair da conta?"
        textoPLG="Você precisará entrar novamente para continuar suas compras."
        confirmarPLG="Sair"
        aoConfirmarPLG={confirmarSairPLG}
        aoCancelarPLG={() => setSairAbertoPLG(false)}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  topoPLG: { alignItems: 'center', paddingBottom: 60, borderBottomLeftRadius: 34, borderBottomRightRadius: 34 },
  avatarPLG: { width: 96, height: 96, borderRadius: 32, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.18)' },
  avatarTextoPLG: { fontSize: 42, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG },
  nomePLG: { fontSize: 24, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, marginTop: 14 },
  emailPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: '#CDBFB5', marginTop: 3 },
  estatisticasPLG: { flexDirection: 'row', marginHorizontal: 20, marginTop: -34, backgroundColor: corPLG.brancoPLG, borderRadius: 22, paddingVertical: 18, ...sombraPLG.fortePLG },
  estatisticaPLG: { flex: 1, alignItems: 'center' },
  divisorPLG: { borderRightWidth: 1, borderRightColor: corPLG.bordaPLG },
  estatisticaValorPLG: { fontSize: 24, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  estatisticaRotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  menuPLG: { marginHorizontal: 20, marginTop: 22, backgroundColor: corPLG.brancoPLG, borderRadius: 22, paddingHorizontal: 6, ...sombraPLG.suavePLG },
  itemPLG: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15, paddingHorizontal: 12 },
  itemBordaPLG: { borderBottomWidth: 1, borderBottomColor: '#F2EBE0' },
  itemIconePLG: { width: 40, height: 40, borderRadius: 13, backgroundColor: corPLG.cremePLG, alignItems: 'center', justifyContent: 'center' },
  itemTextoPLG: { flex: 1, fontSize: 15, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG },
  sairPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 20, marginTop: 18, height: 54, borderRadius: 18, backgroundColor: '#FCEDEA' },
  sairTextoPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.erroPLG },
});
