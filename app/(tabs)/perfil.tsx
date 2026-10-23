import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { corPLG } from '../../constants/temaPLG';
import { useCarrinhoPLG } from '../../context/CarrinhoPLG';

const nomeUsuarioPLG: string = 'Colecionador';
const emailUsuarioPLG: string = 'colecionador@moedas.com';

export default function PerfilPLG() {
  const roteadorPLG = useRouter();
  const { limparPLG } = useCarrinhoPLG();

  const sairPLG = () => {
    limparPLG();
    roteadorPLG.replace('/');
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <View style={estilosPLG.avatarPLG}>
        <Text style={estilosPLG.avatarTextoPLG}>{nomeUsuarioPLG.charAt(0)}</Text>
      </View>
      <Text style={estilosPLG.nomePLG}>{nomeUsuarioPLG}</Text>
      <Text style={estilosPLG.emailPLG}>{emailUsuarioPLG}</Text>
      <TouchableOpacity style={estilosPLG.botaoPLG} onPress={sairPLG} activeOpacity={0.85}>
        <Text style={estilosPLG.botaoTextoPLG}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, alignItems: 'center', paddingTop: 48, backgroundColor: corPLG.fundoPLG },
  avatarPLG: { width: 96, height: 96, borderRadius: 48, backgroundColor: corPLG.primariaPLG, alignItems: 'center', justifyContent: 'center' },
  avatarTextoPLG: { color: corPLG.douradoClaroPLG, fontSize: 40, fontWeight: '800' },
  nomePLG: { fontSize: 22, fontWeight: '800', color: corPLG.textoPLG, marginTop: 14 },
  emailPLG: { fontSize: 14, color: corPLG.textoSuavePLG, marginTop: 4 },
  botaoPLG: { marginTop: 32, borderWidth: 1.5, borderColor: corPLG.erroPLG, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 48 },
  botaoTextoPLG: { color: corPLG.erroPLG, fontWeight: '700', fontSize: 15 },
});
