import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../../components/ImagemPLG';
import BotaoPLG from '../../components/BotaoPLG';
import EstadoVazio from '../../components/EstadoVazio';
import {
  GrauPLG, buscarProdutoPorIdPLG, fatorGrauPLG, formatarAvaliacoesPLG, formatarPrecoPLG, grausPLG, nomeGrauPLG,
} from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG, sombraPLG, IconePLG } from '../../constants/temaPLG';

const limiteDescricaoPLG: number = 110;

export default function DetalhesPLG() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { width: larguraPLG } = useWindowDimensions();
  const { favoritosPLG, alternarFavoritoPLG, adicionarPLG, mostrarToastPLG } = useLojaPLG();
  const [grauPLG, setGrauPLG] = useState<GrauPLG>('S');
  const [expandidaPLG, setExpandidaPLG] = useState<boolean>(false);
  const produtoPLG = buscarProdutoPorIdPLG(id ?? '');

  if (!produtoPLG) {
    return (
      <View style={estilosPLG.telaPLG}>
        <EstadoVazio iconePLG="alert-circle-outline" tituloPLG="Peça não encontrada" textoPLG="Esse item não está mais disponível." botaoPLG="Voltar" aoPressionarPLG={() => roteadorPLG.back()} />
      </View>
    );
  }

  const favoritoPLG = favoritosPLG.includes(produtoPLG.idPLG);
  const precoPLG = produtoPLG.precoPLG * fatorGrauPLG[grauPLG];
  const diametroPLG = Math.min(larguraPLG - 40, 420);

  const fichaPLG: { rotuloPLG: string; valorPLG: string; iconePLG: IconePLG }[] = [
    { rotuloPLG: 'Ano', valorPLG: produtoPLG.anoPLG, iconePLG: 'calendar-outline' },
    { rotuloPLG: 'Material', valorPLG: produtoPLG.materialPLG, iconePLG: 'layers-outline' },
    { rotuloPLG: 'Medida', valorPLG: produtoPLG.medidaPLG, iconePLG: 'resize-outline' },
    { rotuloPLG: 'Raridade', valorPLG: produtoPLG.raridadePLG, iconePLG: 'diamond-outline' },
  ];

  const adicionarAoCarrinhoPLG = () => {
    adicionarPLG(produtoPLG, grauPLG, 1);
    mostrarToastPLG(`${produtoPLG.nomePLG} adicionado ao carrinho`);
  };

  const comprarAgoraPLG = () => {
    adicionarPLG(produtoPLG, grauPLG, 1);
    roteadorPLG.push('/checkout');
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={{ paddingTop: insetsPLG.top + 60, alignItems: 'center' }}>
          <ImagemPLG
            fontePLG={produtoPLG.imagensPLG?.[0]}
            iconePLG="image-outline"
            legendaPLG={`${produtoPLG.nomePLG} – ${produtoPLG.subtituloPLG}`}
            estiloPLG={{ width: diametroPLG, height: diametroPLG, borderRadius: diametroPLG / 2 }}
          />
        </View>
        <TouchableOpacity style={[estilosPLG.iconeTopoPLG, { top: insetsPLG.top + 12, left: 20 }]} onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/inicio'))} accessibilityLabel="Voltar">
          <Ionicons name="chevron-back" size={24} color={corPLG.textoPLG} />
        </TouchableOpacity>
        <TouchableOpacity style={[estilosPLG.iconeTopoPLG, { top: insetsPLG.top + 12, right: 20 }]} onPress={() => alternarFavoritoPLG(produtoPLG.idPLG)} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoPLG ? 'heart' : 'heart-outline'} size={24} color={favoritoPLG ? corPLG.erroPLG : corPLG.textoPLG} />
        </TouchableOpacity>

        <View style={estilosPLG.corpoPLG}>
          <View style={estilosPLG.linhaTituloPLG}>
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.nomePLG}>{produtoPLG.nomePLG}</Text>
              <Text style={estilosPLG.subtituloPLG}>{produtoPLG.subtituloPLG}</Text>
            </View>
            <View style={estilosPLG.notaLinhaPLG}>
              <Ionicons name="star" size={22} color={corPLG.ouroPLG} />
              <Text style={estilosPLG.notaPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
              <Text style={estilosPLG.avaliacoesPLG}>({formatarAvaliacoesPLG(produtoPLG.avaliacoesPLG)})</Text>
            </View>
          </View>

          <View style={estilosPLG.divisorPLG} />

          <Text style={estilosPLG.secaoPLG}>Descrição</Text>
          <Text style={estilosPLG.descricaoPLG}>
            {expandidaPLG ? produtoPLG.descricaoPLG : `${produtoPLG.descricaoPLG.slice(0, limiteDescricaoPLG)}.. `}
            <Text style={estilosPLG.lerMaisPLG} onPress={() => setExpandidaPLG(!expandidaPLG)}>
              {expandidaPLG ? ' Ler menos' : 'Ler mais'}
            </Text>
          </Text>

          <View style={estilosPLG.fichaPLG}>
            {fichaPLG.map((f) => (
              <View key={f.rotuloPLG} style={estilosPLG.fichaItemPLG}>
                <Ionicons name={f.iconePLG} size={18} color={corPLG.ouroPLG} />
                <Text style={estilosPLG.fichaRotuloPLG}>{f.rotuloPLG}</Text>
                <Text style={estilosPLG.fichaValorPLG} numberOfLines={1}>{f.valorPLG}</Text>
              </View>
            ))}
          </View>

          <Text style={[estilosPLG.secaoPLG, { marginTop: 24 }]}>Conservação</Text>
          <View style={estilosPLG.grausPLG}>
            {grausPLG.map((g) => {
              const ativoPLG = g === grauPLG;
              return (
                <TouchableOpacity key={g} activeOpacity={0.85} onPress={() => setGrauPLG(g)} style={[estilosPLG.grauPLG, ativoPLG && estilosPLG.grauAtivoPLG]}>
                  <Text style={[estilosPLG.grauTextoPLG, ativoPLG && estilosPLG.grauTextoAtivoPLG]}>{g}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={estilosPLG.grauLegendaPLG}>{nomeGrauPLG[grauPLG]}</Text>
        </View>
      </ScrollView>

      <View style={[estilosPLG.rodapePLG, { paddingBottom: Math.max(insetsPLG.bottom, 16) }]}>
        <View>
          <Text style={estilosPLG.precoRotuloPLG}>Preço</Text>
          <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(precoPLG)}</Text>
        </View>
        <TouchableOpacity style={estilosPLG.carrinhoBotaoPLG} onPress={adicionarAoCarrinhoPLG} accessibilityLabel="Adicionar ao carrinho">
          <Ionicons name="bag-add-outline" size={24} color={corPLG.ouroPLG} />
        </TouchableOpacity>
        <BotaoPLG tituloPLG="Comprar agora" aoPressionarPLG={comprarAgoraPLG} alturaPLG={56} estiloPLG={{ flex: 1 }} />
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.brancoPLG },
  iconeTopoPLG: { position: 'absolute', width: 42, height: 42, borderRadius: 14, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center', ...sombraPLG.suavePLG },
  corpoPLG: { paddingHorizontal: 20, marginTop: 26 },
  linhaTituloPLG: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  nomePLG: { fontSize: 24, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 6 },
  notaLinhaPLG: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  notaPLG: { fontSize: 20, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  avaliacoesPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  divisorPLG: { height: 1, backgroundColor: '#EDEDED', marginVertical: 18 },
  secaoPLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  descricaoPLG: { fontSize: 14, lineHeight: 25, fontFamily: fontePLG.regularPLG, color: '#5A5A5A', marginTop: 12 },
  lerMaisPLG: { fontFamily: fontePLG.semiPLG, color: corPLG.ouroPLG },
  fichaPLG: { flexDirection: 'row', gap: 10, marginTop: 18 },
  fichaItemPLG: { flex: 1, alignItems: 'center', gap: 4, backgroundColor: corPLG.fundoPLG, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 4 },
  fichaRotuloPLG: { fontSize: 10, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  fichaValorPLG: { fontSize: 11, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  grausPLG: { flexDirection: 'row', gap: 16, marginTop: 14 },
  grauPLG: { flex: 1, height: 48, borderRadius: 14, borderWidth: 1.5, borderColor: '#E6E6E6', backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center' },
  grauAtivoPLG: { borderColor: corPLG.ouroPLG, backgroundColor: corPLG.cremePLG },
  grauTextoPLG: { fontSize: 15, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  grauTextoAtivoPLG: { fontFamily: fontePLG.semiPLG, color: corPLG.ouroPLG },
  grauLegendaPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 8, textAlign: 'center' },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingTop: 14, backgroundColor: corPLG.brancoPLG },
  precoRotuloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  precoPLG: { fontSize: 20, fontFamily: fontePLG.semiPLG, color: corPLG.ouroPLG, marginTop: 2 },
  carrinhoBotaoPLG: { width: 56, height: 56, borderRadius: 28, borderWidth: 1.5, borderColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
});
