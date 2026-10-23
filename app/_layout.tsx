import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { CarrinhoProviderPLG } from '../context/CarrinhoPLG';
import { corPLG } from '../constants/temaPLG';

export default function RootLayout() {
  return (
    <CarrinhoProviderPLG>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: corPLG.primariaPLG },
          headerTintColor: corPLG.brancoPLG,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: corPLG.fundoPLG },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="produto/[id]" options={{ title: 'Detalhes do Produto' }} />
      </Stack>
    </CarrinhoProviderPLG>
  );
}
