import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { corPLG } from '../constants/temaPLG';

const emailCadastradoPLG: string = 'colecionador@moedas.com';
const senhaCadastradaPLG: string = '123456';

export default function LoginPLG() {
  const roteadorPLG = useRouter();
  const [emailPLG, setEmailPLG] = useState<string>('');
  const [senhaPLG, setSenhaPLG] = useState<string>('');
  const [mensagemErroPLG, setMensagemErroPLG] = useState<string>('');

  const verificarLoginPLG = () => {
    const emailLimpoPLG = emailPLG.trim();
    if (emailLimpoPLG === '' || senhaPLG === '') {
      setMensagemErroPLG('Preencha o e-mail e a senha para continuar.');
      return;
    }
    if (emailLimpoPLG.toLowerCase() !== emailCadastradoPLG) {
      setMensagemErroPLG('E-mail incorreto. Verifique e tente novamente.');
      return;
    }
    if (senhaPLG !== senhaCadastradaPLG) {
      setMensagemErroPLG('Senha incorreta. Tente novamente.');
      return;
    }
    setMensagemErroPLG('');
    roteadorPLG.replace('/home');
  };

  return (
    <KeyboardAvoidingView style={estilosPLG.telaPLG} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={estilosPLG.conteudoPLG} keyboardShouldPersistTaps="handled">
        <View style={estilosPLG.logoPLG}>
          <Text style={estilosPLG.logoSimboloPLG}>$</Text>
        </View>
        <Text style={estilosPLG.tituloPLG}>Numismática PLG</Text>
        <Text style={estilosPLG.subtituloPLG}>Moedas e cédulas antigas para colecionadores</Text>

        <View style={estilosPLG.formularioPLG}>
          <Text style={estilosPLG.rotuloPLG}>E-mail</Text>
          <TextInput
            style={estilosPLG.campoPLG}
            placeholder="seu@email.com"
            placeholderTextColor={corPLG.textoSuavePLG}
            value={emailPLG}
            onChangeText={setEmailPLG}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={estilosPLG.rotuloPLG}>Senha</Text>
          <TextInput
            style={estilosPLG.campoPLG}
            placeholder="••••••"
            placeholderTextColor={corPLG.textoSuavePLG}
            value={senhaPLG}
            onChangeText={setSenhaPLG}
            secureTextEntry
            onSubmitEditing={verificarLoginPLG}
          />
          {mensagemErroPLG !== '' && <Text style={estilosPLG.erroPLG}>{mensagemErroPLG}</Text>}
          <TouchableOpacity style={estilosPLG.botaoPLG} activeOpacity={0.85} onPress={verificarLoginPLG}>
            <Text style={estilosPLG.botaoTextoPLG}>Entrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={estilosPLG.dicaPLG}>Demo: {emailCadastradoPLG} / {senhaCadastradaPLG}</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.primariaPLG },
  conteudoPLG: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logoPLG: {
    alignSelf: 'center', width: 84, height: 84, borderRadius: 42,
    backgroundColor: corPLG.douradoPLG, alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  logoSimboloPLG: { fontSize: 44, fontWeight: '800', color: corPLG.primariaPLG },
  tituloPLG: { fontSize: 28, fontWeight: '800', color: corPLG.brancoPLG, textAlign: 'center' },
  subtituloPLG: { fontSize: 14, color: corPLG.douradoClaroPLG, textAlign: 'center', marginBottom: 28, marginTop: 4 },
  formularioPLG: { backgroundColor: corPLG.fundoPLG, borderRadius: 20, padding: 20 },
  rotuloPLG: { fontSize: 13, fontWeight: '700', color: corPLG.textoPLG, marginBottom: 6, marginTop: 8 },
  campoPLG: {
    backgroundColor: corPLG.brancoPLG, borderWidth: 1, borderColor: corPLG.bordaPLG,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: corPLG.textoPLG,
  },
  erroPLG: { color: corPLG.erroPLG, fontSize: 13, marginTop: 12, fontWeight: '600' },
  botaoPLG: { backgroundColor: corPLG.primariaPLG, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 20 },
  botaoTextoPLG: { color: corPLG.brancoPLG, fontSize: 16, fontWeight: '700' },
  dicaPLG: { color: corPLG.douradoClaroPLG, textAlign: 'center', fontSize: 12, marginTop: 20 },
});
