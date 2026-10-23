import React, { useRef, useState } from 'react';
import { View, Text, Animated, ScrollView, TouchableOpacity, StyleSheet, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../components/ImagemPLG';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG, fontePLG, gradientePLG, IconePLG } from '../constants/temaPLG';

interface SlidePLG {
  idPLG: string;
  tituloPLG: string;
  textoPLG: string;
  iconePLG: IconePLG;
  legendaPLG: string;
}

const slidesPLG: SlidePLG[] = [
  { idPLG: '1', tituloPLG: 'Bem-vindo à Numismática PLG', textoPLG: 'A sua loja de moedas e cédulas antigas, agora na palma da mão.', iconePLG: 'storefront-outline', legendaPLG: 'Foto da loja / vitrine' },
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

  const ultimoPLG = indicePLG === slidesPLG.length - 1;

  const aoTerminarRolagemPLG = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIndicePLG(Math.round(e.nativeEvent.contentOffset.x / larguraPLG));
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
      <LinearGradient colors={gradientePLG.escuroVertPLG} style={StyleSheet.absoluteFill} />

      <Animated.ScrollView
        ref={rolagemPLG}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: posicaoPLG } } }], { useNativeDriver: false })}
        onMomentumScrollEnd={aoTerminarRolagemPLG}
      >
        {slidesPLG.map((slidePLG, i) => {
          const faixaPLG = [(i - 1) * larguraPLG, i * larguraPLG, (i + 1) * larguraPLG];
          const deslocamentoPLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [larguraPLG * 0.3, 0, -larguraPLG * 0.3], extrapolate: 'clamp' });
          const opacidadePLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [0, 1, 0], extrapolate: 'clamp' });
          return (
            <View key={slidePLG.idPLG} style={{ width: larguraPLG, paddingTop: insetsPLG.top + 64 }}>
              <Animated.View style={{ transform: [{ translateX: deslocamentoPLG }], opacity: opacidadePLG, paddingHorizontal: 28 }}>
                <ImagemPLG
                  escuroPLG
                  iconePLG={slidePLG.iconePLG}
                  legendaPLG={slidePLG.legendaPLG}
                  estiloPLG={{ width: '100%', height: alturaPLG * 0.42, borderRadius: 32 }}
                />
              </Animated.View>
              <Animated.View style={[estilosPLG.textosPLG, { opacity: opacidadePLG }]}>
                <Text style={estilosPLG.tituloPLG}>{slidePLG.tituloPLG}</Text>
                <Text style={estilosPLG.textoPLG}>{slidePLG.textoPLG}</Text>
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>

      <View style={[estilosPLG.topoPLG, { top: insetsPLG.top + 14 }]}>
        <Text style={estilosPLG.marcaPLG}>NUMISMÁTICA PLG</Text>
        {!ultimoPLG && (
          <TouchableOpacity onPress={() => roteadorPLG.push('/login')} accessibilityLabel="Pular apresentação">
            <Text style={estilosPLG.pularPLG}>Pular</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[estilosPLG.rodapePLG, { paddingBottom: Math.max(insetsPLG.bottom, 20) + 8 }]}>
        <View style={estilosPLG.pontosPLG}>
          {slidesPLG.map((slidePLG, i) => {
            const faixaPLG = [(i - 1) * larguraPLG, i * larguraPLG, (i + 1) * larguraPLG];
            const larguraPontoPLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [8, 28, 8], extrapolate: 'clamp' });
            const opacidadePontoPLG = posicaoPLG.interpolate({ inputRange: faixaPLG, outputRange: [0.35, 1, 0.35], extrapolate: 'clamp' });
            return <Animated.View key={slidePLG.idPLG} style={[estilosPLG.pontoPLG, { width: larguraPontoPLG, opacity: opacidadePontoPLG }]} />;
          })}
        </View>
        <BotaoPLG tituloPLG={ultimoPLG ? 'Começar' : 'Próximo'} iconePLG={ultimoPLG ? 'arrow-forward' : undefined} aoPressionarPLG={avancarPLG} />
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.espressoPLG },
  topoPLG: { position: 'absolute', left: 28, right: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  marcaPLG: { fontSize: 12, letterSpacing: 3, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG },
  pularPLG: { fontSize: 14, fontFamily: fontePLG.mediaPLG, color: corPLG.brancoPLG },
  textosPLG: { paddingHorizontal: 32, marginTop: 32 },
  tituloPLG: { fontSize: 30, lineHeight: 38, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, textAlign: 'center' },
  textoPLG: { fontSize: 15, lineHeight: 23, fontFamily: fontePLG.regularPLG, color: '#DCCFC6', textAlign: 'center', marginTop: 12 },
  rodapePLG: { position: 'absolute', left: 28, right: 28, bottom: 0, gap: 22 },
  pontosPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6 },
  pontoPLG: { height: 8, borderRadius: 4, backgroundColor: corPLG.ouroClaroPLG },
});
