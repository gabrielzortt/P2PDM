import { Ionicons } from '@expo/vector-icons';

export type IconePLG = keyof typeof Ionicons.glyphMap;

export const corPLG = {
  espressoPLG: '#22140E',
  marromPLG: '#3B261E',
  marromClaroPLG: '#5A3A2C',
  ouroPLG: '#C9972F',
  ouroClaroPLG: '#EBD28F',
  ouroEscuroPLG: '#9B6E1C',
  cobrePLG: '#C67C4E',
  cremePLG: '#FBF5EC',
  areiaPLG: '#F1E6D4',
  fundoPLG: '#FAF7F2',
  brancoPLG: '#FFFFFF',
  textoPLG: '#2B1D17',
  suavePLG: '#8B7D74',
  bordaPLG: '#E9DFD2',
  erroPLG: '#C0392B',
  sucessoPLG: '#2E7D5B',
  estrelaPLG: '#F2B01E',
};

export const gradientePLG = {
  ouroPLG: ['#E7C46A', '#C9972F', '#A87518'] as const,
  escuroPLG: ['#22140E', '#3B261E'] as const,
  escuroVertPLG: ['#22140E', '#3B261E', '#5A3A2C'] as const,
  promoPLG: ['#3B261E', '#6B4330'] as const,
};

export const fontePLG = {
  regularPLG: 'Sora_400Regular',
  mediaPLG: 'Sora_500Medium',
  semiPLG: 'Sora_600SemiBold',
  tituloPLG: 'PlayfairDisplay_700Bold',
  tituloMedioPLG: 'PlayfairDisplay_600SemiBold',
};

export const sombraPLG = {
  suavePLG: {
    shadowColor: '#3B261E',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  fortePLG: {
    shadowColor: '#22140E',
    shadowOpacity: 0.18,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
};
