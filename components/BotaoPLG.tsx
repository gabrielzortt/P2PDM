import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG, gradientePLG, IconePLG } from '../constants/temaPLG';

interface BotaoPropsPLG {
  tituloPLG: string;
  aoPressionarPLG: () => void;
  variantePLG?: 'primario' | 'secundario' | 'escuro' | 'claro';
  iconePLG?: IconePLG;
  estiloPLG?: StyleProp<ViewStyle>;
  alturaPLG?: number;
}

export default function BotaoPLG({ tituloPLG, aoPressionarPLG, variantePLG = 'primario', iconePLG, estiloPLG, alturaPLG = 54 }: BotaoPropsPLG) {
  const corTextoPLG =
    variantePLG === 'primario' ? corPLG.espressoPLG : variantePLG === 'escuro' ? corPLG.cremePLG : corPLG.ouroEscuroPLG;
  return (
    <Pressable
      onPress={aoPressionarPLG}
      accessibilityRole="button"
      style={({ pressed }) => [
        estilosPLG.basePLG,
        { height: alturaPLG, borderRadius: alturaPLG / 2 },
        variantePLG === 'secundario' && estilosPLG.secundarioPLG,
        variantePLG === 'escuro' && estilosPLG.escuroPLG,
        variantePLG === 'claro' && estilosPLG.claroPLG,
        pressed && { transform: [{ scale: 0.97 }], opacity: 0.92 },
        estiloPLG,
      ]}
    >
      {variantePLG === 'primario' && (
        <LinearGradient colors={gradientePLG.ouroPLG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      )}
      <View style={estilosPLG.conteudoPLG}>
        {iconePLG ? <Ionicons name={iconePLG} size={20} color={corTextoPLG} /> : null}
        <Text style={[estilosPLG.textoPLG, { color: corTextoPLG }]}>{tituloPLG}</Text>
      </View>
    </Pressable>
  );
}

const estilosPLG = StyleSheet.create({
  basePLG: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  secundarioPLG: { borderWidth: 1.5, borderColor: corPLG.ouroPLG, backgroundColor: 'transparent' },
  escuroPLG: { backgroundColor: corPLG.marromPLG },
  claroPLG: { backgroundColor: corPLG.brancoPLG },
  conteudoPLG: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoPLG: { fontFamily: fontePLG.semiPLG, fontSize: 16, letterSpacing: 0.3 },
});
