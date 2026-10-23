import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  GrauPLG, buscarProdutoPorIdPLG, fatorGrauPLG, formatarAvaliacoesPLG, formatarPrecoPLG, grausPLG,
} from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG } from '../../constants/temaPLG';

const limiteDescricaoPLG: number = 105;

export default function DetalhesPLG() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { favoritosPLG, alternarFavoritoPLG, adicionarPLG } = useLojaPLG();
  const [grauPLG, setGrauPLG] = useState<GrauPLG>('S');
  const [expandidaPLG, setExpandidaPLG] = useState<boolean>(false);
  const produtoPLG = buscarProdutoPorIdPLG(id ?? '');

  if (!produtoPLG) {
    return (
      <View style={estilosPLG.centroPLG}>
        <Text style={estilosPLG.nomePLG}>Produto não encontrado.</Text>
      </View>
    );
  }

  const favoritoPLG = favoritosPLG.includes(produtoPLG.idPLG);
  const precoPLG = produtoPLG.precoPLG * fatorGrauPLG[grauPLG];

  const comprarPLG = () => {
    adicionarPLG(produtoPLG, grauPLG);
    Alert.alert('Compra iniciada', `${produtoPLG.nomePLG} (${grauPLG}) adicionado ao pedido.`);
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View>
          <Image source={produtoPLG.imagemDetalhePLG} style={estilosPLG.imagemPLG} resizeMode="cover" />
          <TouchableOpacity
            style={[estilosPLG.iconeTopoPLG, { top: insetsPLG.top + 12, left: 20 }]}
            onPress={() => roteadorPLG.back()}
            accessibilityLabel="Voltar"
          >
            <Ionicons name="chevron-back" size={26} color={corPLG.textoPLG} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[estilosPLG.iconeTopoPLG, { top: insetsPLG.top + 12, right: 20 }]}
            onPress={() => alternarFavoritoPLG(produtoPLG.idPLG)}
            accessibilityLabel="Favoritar"
          >
            <Ionicons name={favoritoPLG ? 'heart' : 'heart-outline'} size={26} color={favoritoPLG ? corPLG.laranjaPLG : corPLG.textoPLG} />
          </TouchableOpacity>
        </View>

        <View style={estilosPLG.corpoPLG}>
          <View style={estilosPLG.linhaTituloPLG}>
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.nomePLG}>{produtoPLG.nomePLG}</Text>
              <Text style={estilosPLG.subtituloPLG}>{produtoPLG.subtituloPLG}</Text>
            </View>
            <View style={estilosPLG.notaLinhaPLG}>
              <Ionicons name="star" size={22} color={corPLG.laranjaPLG} />
              <Text style={estilosPLG.notaPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
              <Text style={estilosPLG.avaliacoesPLG}>({formatarAvaliacoesPLG(produtoPLG.avaliacoesPLG)})</Text>
            </View>
          </View>

          <View style={estilosPLG.divisorPLG} />

          <Text style={estilosPLG.secaoPLG}>Description</Text>
          <Text style={estilosPLG.descricaoPLG}>
            {expandidaPLG ? produtoPLG.descricaoPLG : `${produtoPLG.descricaoPLG.slice(0, limiteDescricaoPLG)}.. `}
            <Text style={estilosPLG.lerMaisPLG} onPress={() => setExpandidaPLG(!expandidaPLG)}>
              {expandidaPLG ? ' Read Less' : 'Read More'}
            </Text>
          </Text>

          <Text style={[estilosPLG.secaoPLG, { marginTop: 22 }]}>Conservação</Text>
          <View style={estilosPLG.grausPLG}>
            {grausPLG.map((g) => {
              const ativoPLG = g === grauPLG;
              return (
                <TouchableOpacity
                  key={g}
                  activeOpacity={0.85}
                  onPress={() => setGrauPLG(g)}
                  style={[estilosPLG.grauPLG, ativoPLG && estilosPLG.grauAtivoPLG]}
                >
                  <Text style={[estilosPLG.grauTextoPLG, ativoPLG && estilosPLG.grauTextoAtivoPLG]}>{g}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={[estilosPLG.rodapePLG, { paddingBottom: Math.max(insetsPLG.bottom, 16) }]}>
        <View>
          <Text style={estilosPLG.precoRotuloPLG}>Price</Text>
          <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(precoPLG)}</Text>
        </View>
        <TouchableOpacity style={estilosPLG.botaoPLG} activeOpacity={0.85} onPress={comprarPLG}>
          <Text style={estilosPLG.botaoTextoPLG}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.brancoPLG },
  centroPLG: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagemPLG: { width: '100%', aspectRatio: 1 },
  iconeTopoPLG: { position: 'absolute', width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  corpoPLG: { paddingHorizontal: 20, marginTop: -6 },
  linhaTituloPLG: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  nomePLG: { fontSize: 22, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG, marginTop: 10 },
  notaLinhaPLG: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 },
  notaPLG: { fontSize: 20, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  avaliacoesPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  divisorPLG: { height: 1, backgroundColor: '#EDEDED', marginVertical: 18 },
  secaoPLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  descricaoPLG: { fontSize: 14, lineHeight: 25, fontFamily: fontePLG.regularPLG, color: '#4A4A4A', marginTop: 12 },
  lerMaisPLG: { fontSize: 15, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG },
  grausPLG: { flexDirection: 'row', gap: 16, marginTop: 14 },
  grauPLG: { flex: 1, height: 46, borderRadius: 12, borderWidth: 1.5, borderColor: '#E6E6E6', backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center' },
  grauAtivoPLG: { borderColor: corPLG.laranjaPLG, backgroundColor: corPLG.cremePLG },
  grauTextoPLG: { fontSize: 15, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  grauTextoAtivoPLG: { color: corPLG.laranjaPLG },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 28, paddingHorizontal: 20, paddingTop: 12, backgroundColor: corPLG.brancoPLG },
  precoRotuloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  precoPLG: { fontSize: 20, fontFamily: fontePLG.semiPLG, color: corPLG.laranjaPLG, marginTop: 2 },
  botaoPLG: { flex: 1, height: 56, borderRadius: 28, backgroundColor: corPLG.laranjaPLG, alignItems: 'center', justifyContent: 'center' },
  botaoTextoPLG: { fontSize: 17, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
});
