import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductList from '../../components/ProductList';
import CategoriaChips from '../../components/CategoriaChips';
import EstadoVazio from '../../components/EstadoVazio';
import { OrdemPLG, filtrosPLG, filtrarPorChipPLG, ordenarPLG, ordensPLG, produtosPLG } from '../../data/produtosPLG';
import { corPLG, fontePLG, sombraPLG } from '../../constants/temaPLG';

export default function ExplorarPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const parametrosPLG = useLocalSearchParams<{ filtro?: string; busca?: string }>();
  const [buscaLocalPLG, setBuscaLocalPLG] = useState<string | null>(null);
  const [filtroLocalPLG, setFiltroLocalPLG] = useState<string | null>(null);
  const [ordemPLG, setOrdemPLG] = useState<OrdemPLG>('relevancia');
  const [ordenarAbertoPLG, setOrdenarAbertoPLG] = useState<boolean>(false);

  const buscaPLG = buscaLocalPLG ?? parametrosPLG.busca ?? '';
  const filtroPLG = filtroLocalPLG ?? (parametrosPLG.filtro && filtrosPLG.includes(parametrosPLG.filtro) ? parametrosPLG.filtro : 'Todos');

  const listaPLG = useMemo(() => {
    const termoPLG = buscaPLG.trim().toLowerCase();
    const filtradaPLG = produtosPLG.filter(
      (p) => filtrarPorChipPLG(p, filtroPLG) && (termoPLG === '' || `${p.nomePLG} ${p.subtituloPLG} ${p.anoPLG}`.toLowerCase().includes(termoPLG))
    );
    return ordenarPLG(filtradaPLG, ordemPLG);
  }, [buscaPLG, filtroPLG, ordemPLG]);

  const rotuloOrdemPLG = ordensPLG.find((o) => o.chavePLG === ordemPLG)?.rotuloPLG ?? '';

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <View style={[estilosPLG.topoPLG, { paddingTop: insetsPLG.top + 16 }]}>
        <Text style={estilosPLG.tituloPLG}>Explorar</Text>
        <Text style={estilosPLG.subtituloPLG}>Encontre a próxima peça da sua coleção</Text>
        <View style={estilosPLG.buscaPLG}>
          <Ionicons name="search-outline" size={21} color={corPLG.suavePLG} />
          <TextInput
            style={estilosPLG.buscaEntradaPLG}
            placeholder="Nome, ano ou época"
            placeholderTextColor="#A99C93"
            value={buscaPLG}
            onChangeText={setBuscaLocalPLG}
          />
          {buscaPLG !== '' && (
            <TouchableOpacity onPress={() => setBuscaLocalPLG('')} accessibilityLabel="Limpar busca">
              <Ionicons name="close-circle" size={20} color={corPLG.suavePLG} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ProductList
        produtosPLG={listaPLG}
        aoAbrirPLG={(id) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id } })}
        cabecalhoPLG={
          <View>
            <View style={{ marginHorizontal: -20 }}>
              <CategoriaChips opcoesPLG={filtrosPLG} selecionadaPLG={filtroPLG} aoSelecionarPLG={setFiltroLocalPLG} />
            </View>
            <View style={estilosPLG.resultadoPLG}>
              <Text style={estilosPLG.contagemPLG}>{listaPLG.length} {listaPLG.length === 1 ? 'peça' : 'peças'}</Text>
              <TouchableOpacity style={estilosPLG.ordenarPLG} onPress={() => setOrdenarAbertoPLG(true)}>
                <Ionicons name="swap-vertical" size={16} color={corPLG.ouroEscuroPLG} />
                <Text style={estilosPLG.ordenarTextoPLG}>{rotuloOrdemPLG}</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        vazioPLG={<EstadoVazio iconePLG="search-outline" tituloPLG="Nada encontrado" textoPLG="Tente buscar por outro nome ou mude o filtro." botaoPLG="Limpar filtros" aoPressionarPLG={() => { setBuscaLocalPLG(''); setFiltroLocalPLG('Todos'); }} />}
      />

      <Modal visible={ordenarAbertoPLG} transparent animationType="slide" onRequestClose={() => setOrdenarAbertoPLG(false)}>
        <Pressable style={estilosPLG.fundoModalPLG} onPress={() => setOrdenarAbertoPLG(false)}>
          <Pressable style={estilosPLG.folhaPLG} onPress={() => undefined}>
            <View style={estilosPLG.alcaPLG} />
            <Text style={estilosPLG.folhaTituloPLG}>Ordenar por</Text>
            {ordensPLG.map((o) => {
              const ativaPLG = o.chavePLG === ordemPLG;
              return (
                <TouchableOpacity key={o.chavePLG} style={[estilosPLG.opcaoPLG, ativaPLG && estilosPLG.opcaoAtivaPLG]} onPress={() => { setOrdemPLG(o.chavePLG); setOrdenarAbertoPLG(false); }}>
                  <Text style={[estilosPLG.opcaoTextoPLG, ativaPLG && { fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG }]}>{o.rotuloPLG}</Text>
                  {ativaPLG && <Ionicons name="checkmark-circle" size={22} color={corPLG.ouroPLG} />}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  topoPLG: { paddingHorizontal: 20, paddingBottom: 6 },
  tituloPLG: { fontSize: 30, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  buscaPLG: { flexDirection: 'row', alignItems: 'center', gap: 10, height: 52, marginTop: 16, backgroundColor: corPLG.brancoPLG, borderRadius: 16, paddingHorizontal: 16, ...sombraPLG.suavePLG },
  buscaEntradaPLG: { flex: 1, height: '100%', fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  resultadoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  contagemPLG: { fontSize: 13, fontFamily: fontePLG.mediaPLG, color: corPLG.suavePLG },
  ordenarPLG: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ordenarTextoPLG: { fontSize: 13, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  fundoModalPLG: { flex: 1, backgroundColor: 'rgba(34,20,14,0.5)', justifyContent: 'flex-end' },
  folhaPLG: { backgroundColor: corPLG.brancoPLG, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 36 },
  alcaPLG: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: corPLG.bordaPLG, marginBottom: 18 },
  folhaTituloPLG: { fontSize: 22, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG, marginBottom: 10 },
  opcaoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 14, borderRadius: 14 },
  opcaoAtivaPLG: { backgroundColor: corPLG.cremePLG },
  opcaoTextoPLG: { fontSize: 15, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
});
