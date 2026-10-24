import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListPLG from '../../components/ProductList';
import CategoriaChipsPLG from '../../components/CategoriaChips';
import EstadoVazioPLG from '../../components/EstadoVazio';
import { OrdemPLG, filtrosPLG, filtrarPorChipPLG, ordenarPLG, ordensPLG, produtosPLG } from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG, sombraPLG } from '../../constants/temaPLG';

export default function InicioPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { usuarioPLG } = useLojaPLG();
  const [buscaPLG, setBuscaPLG] = useState<string>('');
  const [filtroPLG, setFiltroPLG] = useState<string>(filtrosPLG[0]);
  const [ordemPLG, setOrdemPLG] = useState<OrdemPLG>('relevancia');
  const [ordenarAbertoPLG, setOrdenarAbertoPLG] = useState<boolean>(false);

  const listaPLG = useMemo(() => {
    const termoPLG = buscaPLG.trim().toLowerCase();
    const filtradaPLG = produtosPLG.filter(
      (pPLG) => filtrarPorChipPLG(pPLG, filtroPLG) && (termoPLG === '' || `${pPLG.nomePLG} ${pPLG.subtituloPLG} ${pPLG.anoPLG}`.toLowerCase().includes(termoPLG))
    );
    return ordenarPLG(filtradaPLG, ordemPLG);
  }, [buscaPLG, filtroPLG, ordemPLG]);

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="light" />
      <View style={[estilosPLG.topoPLG, { paddingTop: insetsPLG.top + 18 }]}>
        <View style={estilosPLG.linhaTopoPLG}>
          <View>
            <Text style={estilosPLG.rotuloPLG}>Localização</Text>
            <View style={estilosPLG.localPLG}>
              <Text style={estilosPLG.localTextoPLG}>Manaus, AM</Text>
              <Ionicons name="chevron-down" size={16} color={corPLG.brancoPLG} />
            </View>
          </View>
          <TouchableOpacity style={estilosPLG.avatarPLG} onPress={() => roteadorPLG.push('/perfil')} accessibilityLabel="Perfil">
            <Text style={estilosPLG.avatarTextoPLG}>{(usuarioPLG?.nomePLG ?? 'C').charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={estilosPLG.buscaPLG}>
        <Ionicons name="search-outline" size={24} color={corPLG.textoPLG} />
        <TextInput
          style={estilosPLG.buscaEntradaPLG}
          placeholder="Buscar moedas e cédulas"
          placeholderTextColor={corPLG.suavePLG}
          value={buscaPLG}
          onChangeText={setBuscaPLG}
        />
        <TouchableOpacity style={estilosPLG.filtroPLG} activeOpacity={0.85} onPress={() => setOrdenarAbertoPLG(true)} accessibilityLabel="Ordenar">
          <Ionicons name="options-outline" size={22} color={corPLG.brancoPLG} />
        </TouchableOpacity>
      </View>

      <ProductListPLG
        produtosPLG={listaPLG}
        aoAbrirPLG={(idPLG) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id: idPLG } })}
        cabecalhoPLG={
          <View style={{ marginHorizontal: -20 }}>
            <CategoriaChipsPLG opcoesPLG={filtrosPLG} selecionadaPLG={filtroPLG} aoSelecionarPLG={setFiltroPLG} />
          </View>
        }
        vazioPLG={<EstadoVazioPLG iconePLG="search-outline" tituloPLG="Nada encontrado" textoPLG="Tente buscar por outro nome ou mude o filtro." botaoPLG="Limpar filtros" aoPressionarPLG={() => { setBuscaPLG(''); setFiltroPLG('Todos'); }} />}
      />

      <Modal visible={ordenarAbertoPLG} transparent animationType="slide" onRequestClose={() => setOrdenarAbertoPLG(false)}>
        <Pressable style={estilosPLG.fundoModalPLG} onPress={() => setOrdenarAbertoPLG(false)}>
          <Pressable style={estilosPLG.folhaPLG} onPress={() => undefined}>
            <View style={estilosPLG.alcaPLG} />
            <Text style={estilosPLG.folhaTituloPLG}>Ordenar por</Text>
            {ordensPLG.map((oPLG) => {
              const ativaPLG = oPLG.chavePLG === ordemPLG;
              return (
                <TouchableOpacity key={oPLG.chavePLG} style={[estilosPLG.opcaoPLG, ativaPLG && estilosPLG.opcaoAtivaPLG]} onPress={() => { setOrdemPLG(oPLG.chavePLG); setOrdenarAbertoPLG(false); }}>
                  <Text style={[estilosPLG.opcaoTextoPLG, ativaPLG && { fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG }]}>{oPLG.rotuloPLG}</Text>
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
  topoPLG: { backgroundColor: corPLG.escuroPLG, paddingHorizontal: 20, paddingBottom: 50 },
  linhaTopoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: '#B7B7B7' },
  localPLG: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  localTextoPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  avatarPLG: { width: 46, height: 46, borderRadius: 14, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
  avatarTextoPLG: { fontSize: 18, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  buscaPLG: {
    flexDirection: 'row', alignItems: 'center', gap: 10, height: 58, marginTop: -29, marginHorizontal: 20,
    backgroundColor: corPLG.brancoPLG, borderRadius: 18, paddingLeft: 16, paddingRight: 7, zIndex: 2, ...sombraPLG.fortePLG,
  },
  buscaEntradaPLG: { flex: 1, height: '100%', fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  filtroPLG: { width: 44, height: 44, borderRadius: 13, backgroundColor: corPLG.cobrePLG, alignItems: 'center', justifyContent: 'center' },
  fundoModalPLG: { flex: 1, backgroundColor: 'rgba(34,20,14,0.5)', justifyContent: 'flex-end' },
  folhaPLG: { backgroundColor: corPLG.brancoPLG, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 24, paddingBottom: 36 },
  alcaPLG: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: corPLG.bordaPLG, marginBottom: 18 },
  folhaTituloPLG: { fontSize: 20, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG, marginBottom: 10 },
  opcaoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 14, borderRadius: 14 },
  opcaoAtivaPLG: { backgroundColor: corPLG.cremePLG },
  opcaoTextoPLG: { fontSize: 15, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
});
