import React, { useRef, useState } from 'react';
import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../components/ImagemPLG';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG, fontePLG, IconePLG } from '../constants/temaPLG';

interface SlidePLG {
  idPLG: string;
  tituloPLG: string;
  textoPLG: string;
  iconePLG: IconePLG;
  legendaPLG: string;
}

const slidesPLG: SlidePLG[] = [
  { idPLG: '1', tituloPLG: 'Hora de colecionar história....', textoPLG: 'Moedas e cédulas antigas entregues na sua porta. Comece a sua coleção agora!', iconePLG: 'storefront-outline', legendaPLG: 'Foto da loja / vitrine' },
  { idPLG: '2', tituloPLG: 'Peças raras e autênticas', textoPLG: 'Cada item é selecionado com cuidado e acompanha certificado de autenticidade.', iconePLG: 'ribbon-outline', legendaPLG: 'Foto de uma peça rara' },
  { idPLG: '3', tituloPLG: 'Do Império ao Real', textoPLG: 'Explore coleções por época: Réis, Cruzeiro, Cruzado e Real.', iconePLG: 'time-outline', legendaPLG: 'Foto das moedas por época' },
  { idPLG: '4', tituloPLG: 'Entrega segura', textoPLG: 'Embalagem protetora e acompanhamento do pedido até a sua casa.', iconePLG: 'cube-outline', legendaPLG: 'Foto da embalagem / entrega' },
];

export default function BoasVindasPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { width: larguraPLG, height: alturaPLG } = useWindowDimensions();
  const { prontoPLG, usuarioPLG } = useLojaPLG();
  const rolagemPLG = useRef<ScrollView>(null);
  const posicaoPLG = useRef(new Animated.Value(0)).current;
  const [indicePLG, setIndicePLG] = useState<number>(0);

  if (!prontoPLG) return <View style={estilosPLG.telaPLG} />;
  if (usuarioPLG) return <Redirect href="/inicio" />;

  const alturaImagemPLG = alturaPLG * 0.62;
  const ultimoPLG = indicePLG === slidesPLG.length - 1;

  const aoTerminarRolagemPLG = (ePLG: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndicePLG(Math.round(ePLG.nativeEvent.contentOffset.x / larguraPLG));
  };

  const avancarPLG = () => {
    if (ultimoPLG) {
      roteadorPLG.push('/login');
      return;
    }
    const proximoPLG = indicePLG + 1;
    rolagemPLG.current?.scrollTo({ x: proximoPLG * larguraPLG, animated: true });
    setIndicePLG(proximoPLG);
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="light" />
      <Animated.ScrollView
        ref={rolagemPLG}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: posicaoPLG } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={aoTerminarRolagemPLG}
      >
        {slidesPLG.map((slidePLG, iPLG) => {
          const faixaPLG = [(iPLG - 1) * larguraPLG, iPLG * larguraPLG, (iPLG + 1) * larguraPLG];
          const deslocamentoPLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [larguraPLG * 0.25, 0, -larguraPLG * 0.25], extrapolate: 'clamp' });
          const opacidadePLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [0, 1, 0], extrapolate: 'clamp' });
          return (
            <View key={slidePLG.idPLG} style={{ width: larguraPLG, height: alturaPLG }}>
              <View style={{ height: alturaImagemPLG }}>
                <ImagemPLG
                  escuroPLG
                  iconePLG={slidePLG.iconePLG}
                  legendaPLG={slidePLG.legendaPLG}
                  estiloPLG={{ width: '100%', height: '100%', borderRadius: 0, borderWidth: 0, backgroundColor: corPLG.marromClaroPLG }}
                />
                <LinearGradient colors={['rgba(59,38,30,0)', corPLG.marromPLG]} style={estilosPLG.desvanecerPLG} pointerEvents="none" />
              </View>
              <Animated.View style={[estilosPLG.textosPLG, { opacity: opacidadePLG, transform: [{ translateX: deslocamentoPLG }] }]}>
                <Text style={estilosPLG.tituloPLG}>{slidePLG.tituloPLG}</Text>
                <Text style={estilosPLG.textoPLG}>{slidePLG.textoPLG}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      {!ultimoPLG && (
        <TouchableOpacity style={[estilosPLG.pularPLG, { top: insetsPLG.top + 14 }]} onPress={() => roteadorPLG.push('/login')} accessibilityLabel="Pular apresentação">
          <Text style={estilosPLG.pularTextoPLG}>Pular</Text>
        </TouchableOpacity>
      )}

      <View style={[estilosPLG.rodapePLG, { paddingBottom: Math.max(insetsPLG.bottom, 20) + 6 }]}>
        <View style={estilosPLG.pontosPLG}>
          {slidesPLG.map((slidePLG, iPLG) => {
            const faixaPLG = [(iPLG - 1) * larguraPLG, iPLG * larguraPLG, (iPLG + 1) * larguraPLG];
            const larguraPontoPLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [8, 30, 8], extrapolate: 'clamp' });
            const opacidadePontoPLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [0.5, 1, 0.5], extrapolate: 'clamp' });
            return <Animated.View key={slidePLG.idPLG} style={[estilosPLG.pontoPLG, { width: larguraPontoPLG, opacity: opacidadePontoPLG }]} />;
          })}
        </View>
        <BotaoPLG tituloPLG={ultimoPLG ? 'Começar' : 'Próximo'} aoPressionarPLG={avancarPLG} />
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.marromPLG },
  desvanecerPLG: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 130 },
  textosPLG: { paddingHorizontal: 30, marginTop: 8 },
  tituloPLG: { fontSize: 26, lineHeight: 34, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  textoPLG: { fontSize: 16, lineHeight: 24, fontFamily: fontePLG.regularPLG, color: '#E9E1DC', marginTop: 12 },
  pularPLG: { position: 'absolute', right: 20, backgroundColor: 'rgba(0,0,0,0.35)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  pularTextoPLG: { fontSize: 13, fontFamily: fontePLG.mediaPLG, color: corPLG.brancoPLG },
  rodapePLG: { position: 'absolute', left: 30, right: 30, bottom: 0, gap: 20 },
  pontosPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pontoPLG: { height: 8, borderRadius: 4, backgroundColor: corPLG.brancoPLG },
});
