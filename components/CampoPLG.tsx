import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG, IconePLG } from '../constants/temaPLG';

interface CampoPropsPLG {
  rotuloPLG?: string;
  iconePLG?: IconePLG;
  placeholderPLG: string;
  valorPLG: string;
  aoMudarPLG: (textoPLG: string) => void;
  senhaPLG?: boolean;
  tecladoPLG?: KeyboardTypeOptions;
  erroPLG?: string;
  aoEnviarPLG?: () => void;
  somenteLeituraPLG?: boolean;
}

export default function CampoPLG({
  rotuloPLG, iconePLG, placeholderPLG, valorPLG, aoMudarPLG, senhaPLG = false,
  tecladoPLG, erroPLG, aoEnviarPLG, somenteLeituraPLG = false,
}: CampoPropsPLG) {
  const [focoPLG, setFocoPLG] = useState<boolean>(false);
  const [visivelPLG, setVisivelPLG] = useState<boolean>(false);

  return (
    <View>
      {rotuloPLG ? <Text style={estilosPLG.rotuloPLG}>{rotuloPLG}</Text> : null}
      <View
        style={[
          estilosPLG.campoPLG,
          focoPLG && estilosPLG.focoPLG,
          !!erroPLG && estilosPLG.erroCampoPLG,
          somenteLeituraPLG && { opacity: 0.6 },
        ]}
      >
        {iconePLG ? <Ionicons name={iconePLG} size={22} color={focoPLG ? corPLG.ouroEscuroPLG : corPLG.suavePLG} /> : null}
        <TextInput
          style={estilosPLG.entradaPLG}
          placeholder={placeholderPLG}
          placeholderTextColor="#A99C93"
          value={valorPLG}
          onChangeText={aoMudarPLG}
          secureTextEntry={senhaPLG && !visivelPLG}
          keyboardType={tecladoPLG}
          autoCapitalize={senhaPLG || tecladoPLG === 'email-address' ? 'none' : 'sentences'}
          autoCorrect={false}
          onFocus={() => setFocoPLG(true)}
          onBlur={() => setFocoPLG(false)}
          onSubmitEditing={aoEnviarPLG}
          editable={!somenteLeituraPLG}
        />
        {senhaPLG ? (
          <TouchableOpacity onPress={() => setVisivelPLG(!visivelPLG)} accessibilityLabel="Mostrar ou ocultar senha">
            <Ionicons name={visivelPLG ? 'eye-off-outline' : 'eye-outline'} size={22} color={corPLG.suavePLG} />
          </TouchableOpacity>
        ) : null}
      </View>
      {erroPLG ? <Text style={estilosPLG.erroTextoPLG}>{erroPLG}</Text> : null}
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  rotuloPLG: { fontSize: 13, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG, marginBottom: 6 },
  campoPLG: {
    flexDirection: 'row', alignItems: 'center', gap: 12, height: 54, borderRadius: 16,
    backgroundColor: corPLG.cremePLG, borderWidth: 1.5, borderColor: corPLG.bordaPLG, paddingHorizontal: 16,
  },
  focoPLG: { borderColor: corPLG.ouroPLG, backgroundColor: corPLG.brancoPLG },
  erroCampoPLG: { borderColor: corPLG.erroPLG },
  entradaPLG: { flex: 1, height: '100%', fontSize: 15, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  erroTextoPLG: { color: corPLG.erroPLG, fontSize: 12, fontFamily: fontePLG.mediaPLG, marginTop: 6, marginLeft: 6 },
});
