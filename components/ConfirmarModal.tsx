import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import BotaoPLG from './BotaoPLG';
import { corPLG, fontePLG } from '../constants/temaPLG';

interface ConfirmarPropsPLG {
  visivelPLG: boolean;
  tituloPLG: string;
  textoPLG: string;
  confirmarPLG: string;
  aoConfirmarPLG: () => void;
  aoCancelarPLG: () => void;
}

export default function ConfirmarModalPLG({ visivelPLG, tituloPLG, textoPLG, confirmarPLG, aoConfirmarPLG, aoCancelarPLG }: ConfirmarPropsPLG) {
  return (
    <Modal visible={visivelPLG} transparent animationType="fade" onRequestClose={aoCancelarPLG}>
      <Pressable style={estilosPLG.fundoPLG} onPress={aoCancelarPLG}>
        <Pressable style={estilosPLG.caixaPLG} onPress={() => undefined}>
          <Text style={estilosPLG.tituloPLG}>{tituloPLG}</Text>
          <Text style={estilosPLG.textoPLG}>{textoPLG}</Text>
          <View style={estilosPLG.linhaPLG}>
            <BotaoPLG tituloPLG="Cancelar" variantePLG="secundario" aoPressionarPLG={aoCancelarPLG} alturaPLG={48} estiloPLG={{ flex: 1 }} />
            <BotaoPLG tituloPLG={confirmarPLG} aoPressionarPLG={aoConfirmarPLG} alturaPLG={48} estiloPLG={{ flex: 1 }} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const estilosPLG = StyleSheet.create({
  fundoPLG: { flex: 1, backgroundColor: 'rgba(34,20,14,0.55)', alignItems: 'center', justifyContent: 'center', padding: 28 },
  caixaPLG: { width: '100%', maxWidth: 380, backgroundColor: corPLG.brancoPLG, borderRadius: 26, padding: 24 },
  tituloPLG: { fontSize: 22, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  textoPLG: { fontSize: 14, lineHeight: 21, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 8 },
  linhaPLG: { flexDirection: 'row', gap: 12, marginTop: 24 },
});
