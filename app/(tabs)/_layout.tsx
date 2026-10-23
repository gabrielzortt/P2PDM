import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { corPLG } from '../../constants/temaPLG';
import { useCarrinhoPLG } from '../../context/CarrinhoPLG';

export default function TabsLayoutPLG() {
  const { itensPLG } = useCarrinhoPLG();
  const quantidadeTotalPLG = itensPLG.reduce((somaPLG, i) => somaPLG + i.quantidadePLG, 0);

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: corPLG.primariaPLG },
        headerTintColor: corPLG.brancoPLG,
        tabBarActiveTintColor: corPLG.douradoPLG,
        tabBarInactiveTintColor: corPLG.textoSuavePLG,
        tabBarStyle: { backgroundColor: corPLG.brancoPLG, borderTopColor: corPLG.bordaPLG },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{ title: 'Home', tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarBadge: quantidadeTotalPLG > 0 ? quantidadeTotalPLG : undefined,
          tabBarBadgeStyle: { backgroundColor: corPLG.douradoPLG },
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }}
      />
    </Tabs>
  );
}
