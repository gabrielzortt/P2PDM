import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { corPLG, fontePLG } from '../../constants/temaPLG';
import { useLojaPLG } from '../../context/LojaPLG';

export default function TabsLayoutPLG() {
  const { usuarioPLG, quantidadeTotalPLG, prontoPLG } = useLojaPLG();

  if (prontoPLG && !usuarioPLG) return <Redirect href="/login" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: corPLG.ouroPLG,
        tabBarInactiveTintColor: corPLG.inativoPLG,
        tabBarStyle: {
          backgroundColor: corPLG.brancoPLG,
          borderTopWidth: 0,
          height: 68,
          paddingTop: 10,
          shadowColor: '#22140E',
          shadowOpacity: 0.1,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -6 },
          elevation: 16,
        },
      }}
    >
      <Tabs.Screen name="inicio" options={{ tabBarIcon: ({ color: colorPLG }) => <Ionicons name="home" size={26} color={colorPLG} /> }} />
      <Tabs.Screen name="favoritos" options={{ tabBarIcon: ({ color: colorPLG }) => <Ionicons name="heart" size={26} color={colorPLG} /> }} />
      <Tabs.Screen
        name="carrinho"
        options={{
          tabBarBadge: quantidadeTotalPLG > 0 ? quantidadeTotalPLG : undefined,
          tabBarBadgeStyle: { backgroundColor: corPLG.ouroPLG, color: corPLG.brancoPLG, fontFamily: fontePLG.semiPLG, fontSize: 10 },
          tabBarIcon: ({ color: colorPLG }) => <Ionicons name="bag" size={26} color={colorPLG} />,
        }}
      />
      <Tabs.Screen name="notificacoes" options={{ tabBarIcon: ({ color: colorPLG }) => <Ionicons name="notifications" size={26} color={colorPLG} /> }} />
      <Tabs.Screen name="perfil" options={{ tabBarIcon: ({ color: colorPLG }) => <Ionicons name="person" size={26} color={colorPLG} /> }} />
    </Tabs>
  );
}
