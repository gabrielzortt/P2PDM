import { Ionicons } from '@expo/vector-icons';

export type IconePLG = keyof typeof Ionicons.glyphMap;

export const corPLG = {
  espressoPLG: '#2A1913',
  marromPLG: '#3B261E',
  marromClaroPLG: '#4A2F25',
  escuroPLG: '#313131',
  ouroPLG: '#E27D19',
  ouroClaroPLG: '#F6C48F',
  ouroEscuroPLG: '#D26A0B',
  cobrePLG: '#C67C4E',
  cremePLG: '#FFF6F0',
  areiaPLG: '#F6EBE2',
  fundoPLG: '#F9F9F9',
  brancoPLG: '#FFFFFF',
  textoPLG: '#2F2D2C',
  precoPLG: '#2F4B4E',
  suavePLG: '#9B9B9B',
  bordaPLG: '#EDE6E0',
  erroPLG: '#E5484D',
  erroClaroPLG: '#FFB4A8',
  sucessoPLG: '#2E7D5B',
  estrelaPLG: '#FBBE21',
  inativoPLG: '#A2A2A2',
};

export const gradientePLG = {
  ouroPLG: ['#F39A2F', '#E27D19', '#CF690B'] as const,
  escuroPLG: ['#2A1913', '#3B261E'] as const,
  escuroVertPLG: ['#2A1913', '#3B261E', '#4A2F25'] as const,
  cinzaPLG: ['#313131', '#3E3E3E'] as const,
  promoPLG: ['#3B261E', '#5A3A2C'] as const,
};

export const fontePLG = {
  regularPLG: 'Sora_400Regular',
  mediaPLG: 'Sora_500Medium',
  semiPLG: 'Sora_600SemiBold',
  tituloPLG: 'Sora_600SemiBold',
  tituloMedioPLG: 'Sora_600SemiBold',
};

export const sombraPLG = {
  suavePLG: {
    shadowColor: '#3B261E',
    shadowOpacity: 0.07,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  fortePLG: {
    shadowColor: '#22140E',
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
};
