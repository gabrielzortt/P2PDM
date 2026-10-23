import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Sora_400Regular, Sora_500Medium, Sora_600SemiBold } from '@expo-google-fonts/sora';
import { LojaProviderPLG } from '../context/LojaPLG';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontesCarregadasPLG] = useFonts({ Sora_400Regular, Sora_500Medium, Sora_600SemiBold });

  useEffect(() => {
    if (fontesCarregadasPLG) SplashScreen.hideAsync();
  }, [fontesCarregadasPLG]);

  if (!fontesCarregadasPLG) return null;

  return (
    <LojaProviderPLG>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="produto/[id]" />
      </Stack>
    </LojaProviderPLG>
  );
}
