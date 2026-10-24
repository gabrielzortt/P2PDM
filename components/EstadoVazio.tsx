import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BotaoPLG from './BotaoPLG';
import { corPLG, fontePLG, IconePLG } from '../constants/temaPLG';

interface EstadoVazioPropsPLG {
  iconePLG: IconePLG;
  tituloPLG: string;
  textoPLG: string;
  botaoPLG?: string;
  aoPressionarPLG?: () => void;
}

export default function EstadoVazioPLG({ iconePLG, tituloPLG, textoPLG, botaoPLG, aoPressionarPLG }: EstadoVazioPropsPLG) {
  return (
    <View style={estilosPLG.caixaPLG}>
      <View style={estilosPLG.circuloPLG}>
        <Ionicons name={iconePLG} size={38} color={corPLG.ouroEscuroPLG} />
      </View>
      <Text style={estilosPLG.tituloPLG}>{tituloPLG}</Text>
      <Text style={estilosPLG.textoPLG}>{textoPLG}</Text>
      {botaoPLG && aoPressionarPLG ? <BotaoPLG tituloPLG={botaoPLG} aoPressionarPLG={aoPressionarPLG} alturaPLG={48} estiloPLG={{ marginTop: 20 }} /> : null}
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  caixaPLG: { alignItems: 'center', paddingVertical: 56, paddingHorizontal: 32 },
  circuloPLG: { width: 88, height: 88, borderRadius: 44, backgroundColor: corPLG.areiaPLG, alignItems: 'center', justifyContent: 'center' },
  tituloPLG: { fontSize: 20, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG, marginTop: 18 },
  textoPLG: { fontSize: 14, lineHeight: 21, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, textAlign: 'center', marginTop: 6 },
});
