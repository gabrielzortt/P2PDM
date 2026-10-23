import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { corPLG, fontePLG, sombraPLG } from '../constants/temaPLG';

interface CabecalhoPropsPLG {
  tituloPLG: string;
  direitaPLG?: ReactNode;
}

export default function CabecalhoPLG({ tituloPLG, direitaPLG }: CabecalhoPropsPLG) {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  return (
    <View style={[estilosPLG.linhaPLG, { paddingTop: insetsPLG.top + 12 }]}>
      <TouchableOpacity
        style={estilosPLG.voltarPLG}
        onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/inicio'))}
        accessibilityLabel="Voltar"
      >
        <Ionicons name="chevron-back" size={22} color={corPLG.textoPLG} />
      </TouchableOpacity>
      <Text style={estilosPLG.tituloPLG}>{tituloPLG}</Text>
      <View style={estilosPLG.direitaPLG}>{direitaPLG}</View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  linhaPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 14, backgroundColor: corPLG.fundoPLG },
  voltarPLG: { width: 42, height: 42, borderRadius: 14, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center', ...sombraPLG.suavePLG },
  tituloPLG: { fontSize: 20, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  direitaPLG: { width: 42, alignItems: 'flex-end' },
});
