import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { corPLG, fontePLG } from '../constants/temaPLG';

interface CategoriaChipsPropsPLG {
  opcoesPLG: string[];
  selecionadaPLG: string;
  aoSelecionarPLG: (valorPLG: string) => void;
}

export default function CategoriaChips({ opcoesPLG, selecionadaPLG, aoSelecionarPLG }: CategoriaChipsPropsPLG) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilosPLG.linhaPLG}>
      {opcoesPLG.map((opcaoPLG) => {
        const ativaPLG = opcaoPLG === selecionadaPLG;
        return (
          <TouchableOpacity
            key={opcaoPLG}
            activeOpacity={0.85}
            onPress={() => aoSelecionarPLG(opcaoPLG)}
            style={[estilosPLG.chipPLG, ativaPLG && estilosPLG.chipAtivoPLG]}
          >
            <Text style={[estilosPLG.textoPLG, ativaPLG && estilosPLG.textoAtivoPLG]}>{opcaoPLG}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const estilosPLG = StyleSheet.create({
  linhaPLG: { paddingHorizontal: 20, paddingVertical: 20, gap: 12 },
  chipPLG: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 10 },
  chipAtivoPLG: { backgroundColor: corPLG.cobrePLG },
  textoPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  textoAtivoPLG: { color: corPLG.brancoPLG, fontFamily: fontePLG.semiPLG },
});
