import React, { useRef, useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../../components/ImagemPLG';
import BotaoPLG from '../../components/BotaoPLG';
import SeletorQuantidade from '../../components/SeletorQuantidade';
import ProductCardHorizontal from '../../components/ProductCardHorizontal';
import EstadoVazio from '../../components/EstadoVazio';
import {
  GrauPLG, buscarProdutoPorIdPLG, fatorGrauPLG, formatarAvaliacoesPLG, formatarPrecoPLG, grausPLG, nomeGrauPLG, produtosPLG,
} from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG, sombraPLG, IconePLG } from '../../constants/temaPLG';

const limiteDescricaoPLG: number = 110;
const totalFotosPLG: number = 3;

export default function DetalhesPLG() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { width: larguraPLG } = useWindowDimensions();
  const { favoritosPLG, alternarFavoritoPLG, adicionarPLG, mostrarToastPLG } = useLojaPLG();
  const [grauPLG, setGrauPLG] = useState<GrauPLG>('S');
  const [quantidadePLG, setQuantidadePLG] = useState<number>(1);
  const [expandidaPLG, setExpandidaPLG] = useState<boolean>(false);
  const [fotoPLG, setFotoPLG] = useState<number>(0);
  const galeriaPLG = useRef<FlatList<number>>(null);
  const produtoPLG = buscarProdutoPorIdPLG(id ?? '');

  if (!produtoPLG) {
    return (
      <View style={estilosPLG.telaPLG}>
        <EstadoVazio iconePLG="alert-circle-outline" tituloPLG="Peça não encontrada" textoPLG="Esse item não está mais disponível." botaoPLG="Voltar" aoPressionarPLG={() => roteadorPLG.back()} />
      </View>
    );
  }

  const favoritoPLG = favoritosPLG.includes(produtoPLG.idPLG);
  const totalPLG = produtoPLG.precoPLG * fatorGrauPLG[grauPLG] * quantidadePLG;
  const relacionadasPLG = produtosPLG.filter((p) => p.idPLG !== produtoPLG.idPLG && p.categoriaPLG === produtoPLG.categoriaPLG);

  const fichaPLG: { rotuloPLG: string; valorPLG: string; iconePLG: IconePLG }[] = [
    { rotuloPLG: 'Ano', valorPLG: produtoPLG.anoPLG, iconePLG: 'calendar-outline' },
    { rotuloPLG: 'Material', valorPLG: produtoPLG.materialPLG, iconePLG: 'layers-outline' },
    { rotuloPLG: 'Medida', valorPLG: produtoPLG.medidaPLG, iconePLG: 'resize-outline' },
    { rotuloPLG: 'Raridade', valorPLG: produtoPLG.raridadePLG, iconePLG: 'diamond-outline' },
  ];

  const aoRolarGaleriaPLG = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setFotoPLG(Math.round(e.nativeEvent.contentOffset.x / larguraPLG));
  };

  const adicionarAoCarrinhoPLG = () => {
    adicionarPLG(produtoPLG, grauPLG, quantidadePLG);
    mostrarToastPLG(`${produtoPLG.nomePLG} adicionado ao carrinho`);
  };

  const comprarAgoraPLG = () => {
    adicionarPLG(produtoPLG, grauPLG, quantidadePLG);
    roteadorPLG.push('/checkout');
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <View>
          <FlatList
            ref={galeriaPLG}
            horizontal
            pagingEnabled
            data={Array.from({ length: totalFotosPLG }, (_, i) => i)}
            keyExtractor={(i) => String(i)}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={aoRolarGaleriaPLG}
            renderItem={({ index }) => (
              <View style={{ width: larguraPLG, paddingTop: insetsPLG.top + 64, paddingHorizontal: 20, paddingBottom: 40, backgroundColor: corPLG.areiaPLG }}>
                <ImagemPLG
                  fontePLG={produtoPLG.imagensPLG?.[index]}
                  iconePLG="images-outline"
                  legendaPLG={`${produtoPLG.nomePLG} – foto ${index + 1} de ${totalFotosPLG}`}
                  estiloPLG={{ width: '100%', aspectRatio: 1, borderRadius: 28 }}
                />
              </View>
            )}
          />
          <View style={estilosPLG.pontosPLG}>
            {Array.from({ length: totalFotosPLG }, (_, i) => (
              <View key={i} style={[estilosPLG.pontoPLG, i === fotoPLG && estilosPLG.pontoAtivoPLG]} />
            ))}
          </View>
          <TouchableOpacity style={[estilosPLG.iconeTopoPLG, { top: insetsPLG.top + 12, left: 20 }]} onPress={() => (roteadorPLG.canGoBack() ? roteadorPLG.back() : roteadorPLG.replace('/inicio'))} accessibilityLabel="Voltar">
            <Ionicons name="chevron-back" size={22} color={corPLG.textoPLG} />
          </TouchableOpacity>
          <TouchableOpacity style={[estilosPLG.iconeTopoPLG, { top: insetsPLG.top + 12, right: 20 }]} onPress={() => alternarFavoritoPLG(produtoPLG.idPLG)} accessibilityLabel="Favoritar">
            <Ionicons name={favoritoPLG ? 'heart' : 'heart-outline'} size={22} color={favoritoPLG ? corPLG.erroPLG : corPLG.textoPLG} />
          </TouchableOpacity>
        </View>

        <View style={estilosPLG.folhaPLG}>
          <View style={estilosPLG.seloPLG}>
            <Text style={estilosPLG.seloTextoPLG}>{produtoPLG.categoriaPLG.toUpperCase()} · {produtoPLG.eraPLG.toUpperCase()}</Text>
          </View>
          <View style={estilosPLG.linhaTituloPLG}>
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.nomePLG}>{produtoPLG.nomePLG}</Text>
              <Text style={estilosPLG.subtituloPLG}>{produtoPLG.subtituloPLG}</Text>
            </View>
            <View style={estilosPLG.notaCaixaPLG}>
              <Ionicons name="star" size={16} color={corPLG.estrelaPLG} />
              <Text style={estilosPLG.notaPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
              <Text style={estilosPLG.avaliacoesPLG}>({formatarAvaliacoesPLG(produtoPLG.avaliacoesPLG)})</Text>
            </View>
          </View>

          <View style={estilosPLG.fichaPLG}>
            {fichaPLG.map((f) => (
              <View key={f.rotuloPLG} style={estilosPLG.fichaItemPLG}>
                <Ionicons name={f.iconePLG} size={18} color={corPLG.ouroEscuroPLG} />
                <Text style={estilosPLG.fichaRotuloPLG}>{f.rotuloPLG}</Text>
                <Text style={estilosPLG.fichaValorPLG} numberOfLines={1}>{f.valorPLG}</Text>
              </View>
            ))}
          </View>

          <Text style={estilosPLG.secaoPLG}>Descrição</Text>
          <Text style={estilosPLG.descricaoPLG}>
            {expandidaPLG ? produtoPLG.descricaoPLG : `${produtoPLG.descricaoPLG.slice(0, limiteDescricaoPLG)}... `}
            <Text style={estilosPLG.lerMaisPLG} onPress={() => setExpandidaPLG(!expandidaPLG)}>
              {expandidaPLG ? ' Ler menos' : 'Ler mais'}
            </Text>
          </Text>

          <Text style={estilosPLG.secaoPLG}>Estado de conservação</Text>
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

          <View style={estilosPLG.quantidadeLinhaPLG}>
            <Text style={[estilosPLG.secaoPLG, { marginTop: 0 }]}>Quantidade</Text>
            <SeletorQuantidade valorPLG={quantidadePLG} aoDiminuirPLG={() => setQuantidadePLG(Math.max(1, quantidadePLG - 1))} aoAumentarPLG={() => setQuantidadePLG(quantidadePLG + 1)} />
          </View>
        </View>

        {relacionadasPLG.length > 0 && (
          <View style={{ marginTop: 28 }}>
            <Text style={[estilosPLG.secaoPLG, { marginLeft: 20, marginBottom: 14, marginTop: 0 }]}>Você também pode gostar</Text>
            <FlatList
              horizontal
              data={relacionadasPLG}
              keyExtractor={(p) => p.idPLG}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 14, gap: 16 }}
              renderItem={({ item }) => <ProductCardHorizontal produtoPLG={item} aoAbrirPLG={(novoPLG) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id: novoPLG } })} />}
            />
          </View>
        )}
      </ScrollView>

      <View style={[estilosPLG.rodapePLG, { paddingBottom: Math.max(insetsPLG.bottom, 14) }]}>
        <View>
          <Text style={estilosPLG.precoRotuloPLG}>Total</Text>
          <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(totalPLG)}</Text>
        </View>
        <TouchableOpacity style={estilosPLG.carrinhoBotaoPLG} onPress={adicionarAoCarrinhoPLG} accessibilityLabel="Adicionar ao carrinho">
          <Ionicons name="bag-add-outline" size={24} color={corPLG.ouroEscuroPLG} />
        </TouchableOpacity>
        <BotaoPLG tituloPLG="Comprar agora" aoPressionarPLG={comprarAgoraPLG} estiloPLG={{ flex: 1 }} />
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  pontosPLG: { position: 'absolute', bottom: 48, alignSelf: 'center', flexDirection: 'row', gap: 6 },
  pontoPLG: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(59,38,30,0.25)' },
  pontoAtivoPLG: { width: 24, backgroundColor: corPLG.marromPLG },
  iconeTopoPLG: { position: 'absolute', width: 42, height: 42, borderRadius: 14, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center', ...sombraPLG.suavePLG },
  folhaPLG: { marginTop: -28, backgroundColor: corPLG.fundoPLG, borderTopLeftRadius: 32, borderTopRightRadius: 32, paddingHorizontal: 20, paddingTop: 24 },
  seloPLG: { alignSelf: 'flex-start', backgroundColor: corPLG.marromPLG, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10, marginBottom: 12 },
  seloTextoPLG: { fontSize: 10, letterSpacing: 1.2, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG },
  linhaTituloPLG: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  nomePLG: { fontSize: 30, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 4 },
  notaCaixaPLG: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: corPLG.brancoPLG, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, ...sombraPLG.suavePLG },
  notaPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  avaliacoesPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  fichaPLG: { flexDirection: 'row', gap: 10, marginTop: 22 },
  fichaItemPLG: { flex: 1, alignItems: 'center', gap: 4, backgroundColor: corPLG.brancoPLG, borderRadius: 16, paddingVertical: 12, paddingHorizontal: 4, ...sombraPLG.suavePLG },
  fichaRotuloPLG: { fontSize: 10, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  fichaValorPLG: { fontSize: 11, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  secaoPLG: { fontSize: 20, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG, marginTop: 26 },
  descricaoPLG: { fontSize: 14, lineHeight: 24, fontFamily: fontePLG.regularPLG, color: '#5C4D45', marginTop: 10 },
  lerMaisPLG: { fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  grausPLG: { flexDirection: 'row', gap: 12, marginTop: 14 },
  grauPLG: { flex: 1, height: 50, borderRadius: 16, borderWidth: 1.5, borderColor: corPLG.bordaPLG, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center' },
  grauAtivoPLG: { borderColor: corPLG.ouroPLG, backgroundColor: corPLG.cremePLG },
  grauTextoPLG: { fontSize: 15, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG },
  grauTextoAtivoPLG: { fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  grauLegendaPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 8, textAlign: 'center' },
  quantidadeLinhaPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingTop: 14, backgroundColor: corPLG.brancoPLG, ...sombraPLG.fortePLG },
  precoRotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  precoPLG: { fontSize: 20, fontFamily: fontePLG.tituloPLG, color: corPLG.ouroEscuroPLG },
  carrinhoBotaoPLG: { width: 54, height: 54, borderRadius: 27, borderWidth: 1.5, borderColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
});
