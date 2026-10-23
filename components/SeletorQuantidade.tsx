import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG } from '../constants/temaPLG';

interface SeletorPropsPLG {
  valorPLG: number;
  aoDiminuirPLG: () => void;
  aoAumentarPLG: () => void;
}

export default function SeletorQuantidade({ valorPLG, aoDiminuirPLG, aoAumentarPLG }: SeletorPropsPLG) {
  return (
    <View style={estilosPLG.linhaPLG}>
      <TouchableOpacity style={estilosPLG.botaoPLG} onPress={aoDiminuirPLG} accessibilityLabel="Diminuir quantidade">
        <Ionicons name="remove" size={18} color={corPLG.textoPLG} />
      </TouchableOpacity>
      <Text style={estilosPLG.valorPLG}>{valorPLG}</Text>
      <TouchableOpacity style={estilosPLG.botaoPLG} onPress={aoAumentarPLG} accessibilityLabel="Aumentar quantidade">
        <Ionicons name="add" size={18} color={corPLG.textoPLG} />
      </TouchableOpacity>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  linhaPLG: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: corPLG.cremePLG, borderRadius: 14, padding: 4, borderWidth: 1, borderColor: corPLG.bordaPLG },
  botaoPLG: { width: 32, height: 32, borderRadius: 10, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center' },
  valorPLG: { minWidth: 18, textAlign: 'center', fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
});
