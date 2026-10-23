import React from 'react';
import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG, IconePLG } from '../constants/temaPLG';

interface ImagemPropsPLG {
  fontePLG?: ImageSourcePropType;
  legendaPLG?: string;
  estiloPLG?: StyleProp<ViewStyle>;
  iconePLG?: IconePLG;
  escuroPLG?: boolean;
  compactoPLG?: boolean;
}

export default function ImagemPLG({ fontePLG: fonteImagemPLG, legendaPLG, estiloPLG, iconePLG = 'image-outline', escuroPLG = false, compactoPLG = false }: ImagemPropsPLG) {
  return (
    <View style={[estilosPLG.basePLG, escuroPLG ? estilosPLG.escuroPLG : estilosPLG.claroPLG, estiloPLG]}>
      {fonteImagemPLG ? (
        <Image source={fonteImagemPLG} style={StyleSheet.absoluteFill} resizeMode="cover" />
      ) : (
        <View style={estilosPLG.centroPLG}>
          <Ionicons name={iconePLG} size={compactoPLG ? 22 : 38} color={escuroPLG ? corPLG.ouroClaroPLG : corPLG.ouroEscuroPLG} />
          <Text style={[estilosPLG.textoPLG, compactoPLG && { fontSize: 10 }, { color: escuroPLG ? corPLG.ouroClaroPLG : corPLG.ouroEscuroPLG }]}>
            (imagem aqui)
          </Text>
          {!compactoPLG && legendaPLG ? (
            <Text style={[estilosPLG.legendaPLG, { color: escuroPLG ? '#CDBFB5' : corPLG.suavePLG }]} numberOfLines={2}>
              {legendaPLG}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  basePLG: { overflow: 'hidden', borderWidth: 1.5, borderStyle: 'dashed', borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  claroPLG: { backgroundColor: corPLG.cremePLG, borderColor: corPLG.ouroPLG },
  escuroPLG: { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: corPLG.ouroPLG },
  centroPLG: { alignItems: 'center', gap: 4, paddingHorizontal: 12 },
  textoPLG: { fontFamily: fontePLG.semiPLG, fontSize: 13 },
  legendaPLG: { fontFamily: fontePLG.regularPLG, fontSize: 11, textAlign: 'center' },
});
