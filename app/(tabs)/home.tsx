import React, { useMemo, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductList from '../../components/ProductList';
import CategoriaChips from '../../components/CategoriaChips';
import { produtosPLG, filtrosPLG, filtrarPorChipPLG } from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG } from '../../constants/temaPLG';

export default function HomePLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { adicionarPLG } = useLojaPLG();
  const [buscaPLG, setBuscaPLG] = useState<string>('');
  const [filtroPLG, setFiltroPLG] = useState<string>(filtrosPLG[0]);

  const listaPLG = useMemo(() => {
    const termoPLG = buscaPLG.trim().toLowerCase();
    if (termoPLG !== '') {
      return produtosPLG.filter((p) => `${p.nomePLG} ${p.subtituloPLG}`.toLowerCase().includes(termoPLG));
    }
    return produtosPLG.filter((p) => filtrarPorChipPLG(p, filtroPLG));
  }, [buscaPLG, filtroPLG]);

  const abrirPLG = (idPLG: string) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id: idPLG } });

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="light" />
      <View style={[estilosPLG.topoPLG, { paddingTop: insetsPLG.top + 18 }]}>
        <View style={estilosPLG.linhaTopoPLG}>
          <View>
            <Text style={estilosPLG.rotuloPLG}>Location</Text>
            <View style={estilosPLG.localPLG}>
              <Text style={estilosPLG.localTextoPLG}>Manaus, AM</Text>
              <Ionicons name="chevron-down" size={16} color={corPLG.brancoPLG} />
            </View>
          </View>
          <Image source={require('../../assets/images/avatar.png')} style={estilosPLG.avatarPLG} />
        </View>
      </View>

      <View style={estilosPLG.buscaPLG}>
        <Ionicons name="search-outline" size={24} color={corPLG.textoPLG} />
        <TextInput
          style={estilosPLG.buscaEntradaPLG}
          placeholder="Search coins"
          placeholderTextColor={corPLG.suavePLG}
          value={buscaPLG}
          onChangeText={setBuscaPLG}
        />
        <TouchableOpacity style={estilosPLG.filtroPLG} activeOpacity={0.85} onPress={() => setBuscaPLG('')}>
          <Ionicons name="options-outline" size={22} color={corPLG.brancoPLG} />
        </TouchableOpacity>
      </View>

      <ProductList
        produtosPLG={listaPLG}
        aoAbrirPLG={abrirPLG}
        aoAdicionarPLG={(p) => adicionarPLG(p)}
        cabecalhoPLG={
          <CategoriaChips opcoesPLG={filtrosPLG} selecionadaPLG={filtroPLG} aoSelecionarPLG={(v) => { setBuscaPLG(''); setFiltroPLG(v); }} />
        }
        vazioPLG={<Text style={estilosPLG.vazioPLG}>Nenhuma peça encontrada.</Text>}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  topoPLG: { backgroundColor: corPLG.escuroPLG, paddingHorizontal: 20, paddingBottom: 46 },
  linhaTopoPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: '#B7B7B7' },
  localPLG: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  localTextoPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  avatarPLG: { width: 44, height: 44, borderRadius: 12 },
  buscaPLG: {
    flexDirection: 'row', alignItems: 'center', gap: 10, height: 56, marginTop: -28, marginHorizontal: 20,
    backgroundColor: corPLG.brancoPLG, borderRadius: 16, paddingLeft: 16, paddingRight: 6, zIndex: 2,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 6,
  },
  buscaEntradaPLG: { flex: 1, fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG, height: '100%' },
  filtroPLG: { width: 44, height: 44, borderRadius: 12, backgroundColor: corPLG.laranjaPLG, alignItems: 'center', justifyContent: 'center' },
  vazioPLG: { textAlign: 'center', marginTop: 40, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
});
