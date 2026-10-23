import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { corPLG } from '../../constants/temaPLG';
import { useLojaPLG } from '../../context/LojaPLG';

export default function TabsLayoutPLG() {
  const { itensPLG } = useLojaPLG();
  const quantidadePLG = itensPLG.reduce((somaPLG, i) => somaPLG + i.quantidadePLG, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: corPLG.laranjaPLG,
        tabBarInactiveTintColor: corPLG.inativoPLG,
        tabBarStyle: { backgroundColor: corPLG.brancoPLG, borderTopWidth: 0, height: 64, elevation: 12 },
        tabBarItemStyle: { paddingVertical: 10 },
      }}
    >
      <Tabs.Screen name="home" options={{ tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} /> }} />
      <Tabs.Screen name="favoritos" options={{ tabBarIcon: ({ color }) => <Ionicons name="heart" size={26} color={color} /> }} />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarBadge: quantidadePLG > 0 ? quantidadePLG : undefined,
          tabBarBadgeStyle: { backgroundColor: corPLG.laranjaPLG },
          tabBarIcon: ({ color }) => <Ionicons name="bag" size={26} color={color} />,
        }}
      />
      <Tabs.Screen name="notificacoes" options={{ tabBarIcon: ({ color }) => <Ionicons name="notifications" size={26} color={color} /> }} />
    </Tabs>
  );
}
