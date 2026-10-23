import React, { useState } from 'react';
import {
  View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG } from '../constants/temaPLG';

const emailCadastradoPLG: string = 'colecionador@moedas.com';
const senhaCadastradaPLG: string = '123456';

export default function LoginPLG() {
  const roteadorPLG = useRouter();
  const { height: alturaPLG } = useWindowDimensions();
  const [emailPLG, setEmailPLG] = useState<string>('');
  const [senhaPLG, setSenhaPLG] = useState<string>('');
  const [erroPLG, setErroPLG] = useState<string>('');

  const verificarLoginPLG = () => {
    const emailLimpoPLG = emailPLG.trim().toLowerCase();
    if (emailLimpoPLG === '' || senhaPLG === '') {
      setErroPLG('Preencha o e-mail e a senha para entrar.');
      return;
    }
    if (emailLimpoPLG !== emailCadastradoPLG) {
      setErroPLG('E-mail incorreto. Confira e tente novamente.');
      return;
    }
    if (senhaPLG !== senhaCadastradaPLG) {
      setErroPLG('Senha incorreta. Tente novamente.');
      return;
    }
    setErroPLG('');
    roteadorPLG.replace('/home');
  };

  return (
    <KeyboardAvoidingView style={estilosPLG.telaPLG} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" bounces={false}>
        <Image
          source={require('../assets/images/hero_login.jpg')}
          style={[estilosPLG.imagemPLG, { height: alturaPLG * 0.6 }]}
          resizeMode="cover"
        />
        <View style={estilosPLG.painelPLG}>
          <View style={estilosPLG.campoPLG}>
            <Ionicons name="mail-outline" size={26} color={corPLG.laranjaPLG} />
            <TextInput
              style={estilosPLG.entradaPLG}
              placeholder="Email"
              placeholderTextColor="#8E8E8E"
              value={emailPLG}
              onChangeText={setEmailPLG}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          <View style={estilosPLG.campoPLG}>
            <Ionicons name="lock-closed-outline" size={26} color={corPLG.laranjaPLG} />
            <TextInput
              style={estilosPLG.entradaPLG}
              placeholder="Senha"
              placeholderTextColor="#8E8E8E"
              value={senhaPLG}
              onChangeText={setSenhaPLG}
              secureTextEntry
              onSubmitEditing={verificarLoginPLG}
            />
          </View>
          {erroPLG !== '' && <Text style={estilosPLG.erroPLG}>{erroPLG}</Text>}
          <TouchableOpacity style={estilosPLG.botaoPLG} activeOpacity={0.85} onPress={verificarLoginPLG}>
            <Text style={estilosPLG.botaoTextoPLG}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.marromPLG },
  imagemPLG: { width: '100%' },
  painelPLG: { flex: 1, backgroundColor: corPLG.marromPLG, paddingHorizontal: 28, paddingTop: 28, paddingBottom: 32, gap: 16 },
  campoPLG: {
    flexDirection: 'row', alignItems: 'center', gap: 12, height: 54, borderRadius: 27,
    backgroundColor: corPLG.cremePLG, borderWidth: 1.5, borderColor: corPLG.laranjaPLG, paddingHorizontal: 16,
  },
  entradaPLG: { flex: 1, fontSize: 16, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG, height: '100%' },
  erroPLG: { color: corPLG.erroPLG, fontSize: 13, fontFamily: fontePLG.mediaPLG, textAlign: 'center' },
  botaoPLG: { height: 54, borderRadius: 27, backgroundColor: corPLG.laranjaPLG, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  botaoTextoPLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
});
