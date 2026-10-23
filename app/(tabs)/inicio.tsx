import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../../components/ProductCard';
import ProductCardHorizontal from '../../components/ProductCardHorizontal';
import ImagemPLG from '../../components/ImagemPLG';
import { produtosPLG } from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG, gradientePLG, sombraPLG, IconePLG } from '../../constants/temaPLG';

const atalhosPLG: { rotuloPLG: string; iconePLG: IconePLG; filtroPLG: string }[] = [
  { rotuloPLG: 'Moedas', iconePLG: 'disc-outline', filtroPLG: 'Moedas' },
  { rotuloPLG: 'Cédulas', iconePLG: 'cash-outline', filtroPLG: 'Cédulas' },
  { rotuloPLG: 'Raras', iconePLG: 'diamond-outline', filtroPLG: 'Todos' },
  { rotuloPLG: 'Novidades', iconePLG: 'sparkles-outline', filtroPLG: 'Todos' },
];

const epocasPLG: { nomePLG: string; periodoPLG: string }[] = [
  { nomePLG: 'Réis', periodoPLG: 'até 1942' },
  { nomePLG: 'Cruzeiro', periodoPLG: '1942 – 1986' },
  { nomePLG: 'Cruzado', periodoPLG: '1986 – 1993' },
  { nomePLG: 'Real', periodoPLG: '1994 – hoje' },
];

export default function InicioPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { usuarioPLG } = useLojaPLG();
  const [buscaPLG, setBuscaPLG] = useState<string>('');
  const primeiroNomePLG = usuarioPLG?.nomePLG.split(' ')[0] ?? 'Colecionador';

  const abrirProdutoPLG = (idPLG: string) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id: idPLG } });
  const irParaExplorarPLG = (filtroPLG?: string, buscaTextoPLG?: string) =>
    roteadorPLG.push({ pathname: '/explorar', params: { filtro: filtroPLG ?? 'Todos', busca: buscaTextoPLG ?? '' } });

  const destaquesPLG = produtosPLG.filter((p) => p.raridadePLG !== 'Comum');
  const maisProcuradosPLG = [...produtosPLG].sort((a, b) => b.avaliacoesPLG - a.avaliacoesPLG).slice(0, 4);

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: 28 }}>
        <LinearGradient colors={gradientePLG.escuroVertPLG} style={[estilosPLG.topoPLG, { paddingTop: insetsPLG.top + 16 }]}>
          <View style={estilosPLG.linhaTopoPLG}>
            <View>
              <Text style={estilosPLG.localRotuloPLG}>Entrega em</Text>
              <View style={estilosPLG.localPLG}>
                <Ionicons name="location" size={14} color={corPLG.ouroClaroPLG} />
                <Text style={estilosPLG.localTextoPLG}>Manaus, AM</Text>
              </View>
            </View>
            <View style={estilosPLG.acoesPLG}>
              <TouchableOpacity style={estilosPLG.botaoIconePLG} onPress={() => roteadorPLG.push('/notificacoes')} accessibilityLabel="Notificações">
                <Ionicons name="notifications-outline" size={22} color={corPLG.brancoPLG} />
                <View style={estilosPLG.pontoNotifPLG} />
              </TouchableOpacity>
              <TouchableOpacity style={estilosPLG.avatarPLG} onPress={() => roteadorPLG.push('/perfil')} accessibilityLabel="Perfil">
                <Text style={estilosPLG.avatarTextoPLG}>{primeiroNomePLG.charAt(0).toUpperCase()}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={estilosPLG.saudacaoPLG}>Olá, {primeiroNomePLG}</Text>
          <Text style={estilosPLG.saudacaoSubPLG}>O que vamos colecionar hoje?</Text>
        </LinearGradient>

        <View style={estilosPLG.buscaPLG}>
          <Ionicons name="search-outline" size={22} color={corPLG.suavePLG} />
          <TextInput
            style={estilosPLG.buscaEntradaPLG}
            placeholder="Buscar moedas e cédulas"
            placeholderTextColor="#A99C93"
            value={buscaPLG}
            onChangeText={setBuscaPLG}
            returnKeyType="search"
            onSubmitEditing={() => irParaExplorarPLG('Todos', buscaPLG)}
          />
          <TouchableOpacity style={estilosPLG.filtroPLG} onPress={() => irParaExplorarPLG('Todos', buscaPLG)} accessibilityLabel="Buscar">
            <Ionicons name="options-outline" size={20} color={corPLG.espressoPLG} />
          </TouchableOpacity>
        </View>

        <Pressable style={estilosPLG.bannerPLG} onPress={() => irParaExplorarPLG('Todos')}>
          <LinearGradient colors={gradientePLG.promoPLG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={estilosPLG.bannerFundoPLG}>
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.bannerSeloPLG}>PRIMEIRA COMPRA</Text>
              <Text style={estilosPLG.bannerTituloPLG}>10% de desconto</Text>
              <Text style={estilosPLG.bannerTextoPLG}>Use o cupom <Text style={{ fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG }}>COLECAO10</Text> no carrinho.</Text>
              <View style={estilosPLG.bannerBotaoPLG}>
                <Text style={estilosPLG.bannerBotaoTextoPLG}>Ver peças</Text>
                <Ionicons name="arrow-forward" size={14} color={corPLG.espressoPLG} />
              </View>
            </View>
            <ImagemPLG escuroPLG compactoPLG iconePLG="image-outline" estiloPLG={{ width: 104, height: 116, borderRadius: 18 }} />
          </LinearGradient>
        </Pressable>

        <View style={estilosPLG.atalhosPLG}>
          {atalhosPLG.map((a) => (
            <TouchableOpacity key={a.rotuloPLG} style={estilosPLG.atalhoPLG} activeOpacity={0.85} onPress={() => irParaExplorarPLG(a.filtroPLG)}>
              <View style={estilosPLG.atalhoIconePLG}>
                <Ionicons name={a.iconePLG} size={24} color={corPLG.ouroEscuroPLG} />
              </View>
              <Text style={estilosPLG.atalhoTextoPLG}>{a.rotuloPLG}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={estilosPLG.secaoTopoPLG}>
          <Text style={estilosPLG.secaoTituloPLG}>Destaques</Text>
          <TouchableOpacity onPress={() => irParaExplorarPLG('Todos')}>
            <Text style={estilosPLG.verTodosPLG}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={destaquesPLG}
          keyExtractor={(p) => p.idPLG}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 14, gap: 16 }}
          renderItem={({ item }) => <ProductCardHorizontal produtoPLG={item} aoAbrirPLG={abrirProdutoPLG} />}
        />

        <View style={estilosPLG.secaoTopoPLG}>
          <Text style={estilosPLG.secaoTituloPLG}>Por época</Text>
        </View>
        <View style={estilosPLG.epocasPLG}>
          {epocasPLG.map((e) => (
            <Pressable key={e.nomePLG} style={({ pressed }) => [estilosPLG.epocaPLG, pressed && { opacity: 0.9 }]} onPress={() => irParaExplorarPLG(e.nomePLG)}>
              <LinearGradient colors={gradientePLG.escuroPLG} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={estilosPLG.epocaFundoPLG}>
                <Text style={estilosPLG.epocaNomePLG}>{e.nomePLG}</Text>
                <Text style={estilosPLG.epocaPeriodoPLG}>{e.periodoPLG}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        <View style={estilosPLG.secaoTopoPLG}>
          <Text style={estilosPLG.secaoTituloPLG}>Mais procurados</Text>
        </View>
        <View style={estilosPLG.gradePLG}>
          {maisProcuradosPLG.map((p) => (
            <View key={p.idPLG} style={estilosPLG.celulaPLG}>
              <ProductCard produtoPLG={p} aoAbrirPLG={abrirProdutoPLG} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  topoPLG: { paddingHorizontal: 20, paddingBottom: 56, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  linhaTopoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  localRotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: '#CDBFB5' },
  localPLG: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3 },
  localTextoPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  acoesPLG: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  botaoIconePLG: { width: 42, height: 42, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  pontoNotifPLG: { position: 'absolute', top: 10, right: 11, width: 9, height: 9, borderRadius: 5, backgroundColor: corPLG.ouroPLG, borderWidth: 1.5, borderColor: corPLG.marromPLG },
  avatarPLG: { width: 42, height: 42, borderRadius: 14, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
  avatarTextoPLG: { fontSize: 18, fontFamily: fontePLG.tituloPLG, color: corPLG.espressoPLG },
  saudacaoPLG: { fontSize: 30, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, marginTop: 24 },
  saudacaoSubPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: '#DCCFC6', marginTop: 4 },
  buscaPLG: {
    flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, marginTop: -29, marginHorizontal: 20,
    backgroundColor: corPLG.brancoPLG, borderRadius: 20, paddingLeft: 16, paddingRight: 7, ...sombraPLG.fortePLG,
  },
  buscaEntradaPLG: { flex: 1, height: '100%', fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  filtroPLG: { width: 44, height: 44, borderRadius: 14, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
  bannerPLG: { marginHorizontal: 20, marginTop: 22, borderRadius: 26, overflow: 'hidden', ...sombraPLG.suavePLG },
  bannerFundoPLG: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  bannerSeloPLG: { fontSize: 10, letterSpacing: 1.5, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG },
  bannerTituloPLG: { fontSize: 24, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, marginTop: 4 },
  bannerTextoPLG: { fontSize: 12, lineHeight: 18, fontFamily: fontePLG.regularPLG, color: '#E5D9D0', marginTop: 6 },
  bannerBotaoPLG: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', backgroundColor: corPLG.ouroPLG, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, marginTop: 12 },
  bannerBotaoTextoPLG: { fontSize: 12, fontFamily: fontePLG.semiPLG, color: corPLG.espressoPLG },
  atalhosPLG: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginTop: 24 },
  atalhoPLG: { alignItems: 'center', gap: 8 },
  atalhoIconePLG: { width: 62, height: 62, borderRadius: 20, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center', ...sombraPLG.suavePLG },
  atalhoTextoPLG: { fontSize: 12, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG },
  secaoTopoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 26, marginBottom: 14 },
  secaoTituloPLG: { fontSize: 22, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  verTodosPLG: { fontSize: 13, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  epocasPLG: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 20 },
  epocaPLG: { width: '48%', flexGrow: 1, borderRadius: 20, overflow: 'hidden' },
  epocaFundoPLG: { padding: 16, minHeight: 86, justifyContent: 'flex-end' },
  epocaNomePLG: { fontSize: 19, fontFamily: fontePLG.tituloPLG, color: corPLG.ouroClaroPLG },
  epocaPeriodoPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: '#CDBFB5', marginTop: 2 },
  gradePLG: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, paddingHorizontal: 20 },
  celulaPLG: { width: '47.5%', flexGrow: 1 },
});
