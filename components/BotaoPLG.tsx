import React from 'react';
import { Text, Pressable, StyleSheet, StyleProp, ViewStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG, gradientePLG, IconePLG } from '../constants/temaPLG';

interface BotaoPropsPLG {
  tituloPLG: string;
  aoPressionarPLG: () => void;
  variantePLG?: 'primario' | 'secundario' | 'escuro';
  sobreEscuroPLG?: boolean;
  iconePLG?: IconePLG;
  estiloPLG?: StyleProp<ViewStyle>;
  alturaPLG?: number;
}

export default function BotaoPLG({ tituloPLG, aoPressionarPLG, variantePLG = 'primario', sobreEscuroPLG = false, iconePLG, estiloPLG, alturaPLG = 54 }: BotaoPropsPLG) {
  const raioPLG = alturaPLG / 2;
  const corTextoPLG =
    variantePLG === 'primario' ? corPLG.brancoPLG : variantePLG === 'escuro' ? corPLG.cremePLG : sobreEscuroPLG ? corPLG.brancoPLG : corPLG.ouroEscuroPLG;
  return (
    <Pressable
      onPress={aoPressionarPLG}
      accessibilityRole="button"
      style={({ pressed: pressedPLG }) => [
        estilosPLG.basePLG,
        { height: alturaPLG, borderRadius: raioPLG },
        variantePLG === 'primario' && estilosPLG.sombraPrimarioPLG,
        variantePLG === 'secundario' && estilosPLG.secundarioPLG,
        variantePLG === 'escuro' && estilosPLG.escuroPLG,
        pressedPLG && { transform: [{ scale: 0.97 }], opacity: 0.93 },
        estiloPLG,
      ]}
    >
      {variantePLG === 'primario' && (
        <LinearGradient colors={gradientePLG.ouroPLG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[StyleSheet.absoluteFill, { borderRadius: raioPLG }]} />
      )}
      <View style={estilosPLG.conteudoPLG}>
        {iconePLG ? <Ionicons name={iconePLG} size={20} color={corTextoPLG} /> : null}
        <Text style={[estilosPLG.textoPLG, { color: corTextoPLG }]}>{tituloPLG}</Text>
      </View>
    </Pressable>
  );
}

const estilosPLG = StyleSheet.create({
  basePLG: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: 22 },
  sombraPrimarioPLG: { shadowColor: corPLG.ouroPLG, shadowOpacity: 0.35, shadowRadius: 14, shadowOffset: { width: 0, height: 7 }, elevation: 5 },
  secundarioPLG: { borderWidth: 1.5, borderColor: corPLG.ouroPLG, backgroundColor: 'transparent' },
  escuroPLG: { backgroundColor: corPLG.marromPLG },
  conteudoPLG: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  textoPLG: { fontFamily: fontePLG.semiPLG, fontSize: 16, letterSpacing: 0.2 },
});
