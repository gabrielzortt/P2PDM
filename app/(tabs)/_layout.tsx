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
        tabBarActiveTintColor: corPLG.ouroEscuroPLG,
        tabBarInactiveTintColor: '#A99C93',
        tabBarLabelStyle: { fontFamily: fontePLG.mediaPLG, fontSize: 11, marginTop: 2 },
        tabBarStyle: {
          backgroundColor: corPLG.brancoPLG,
          borderTopWidth: 0,
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          shadowColor: '#22140E',
          shadowOpacity: 0.1,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: -6 },
          elevation: 16,
        },
      }}
    >
      <Tabs.Screen name="inicio" options={{ title: 'Início', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'home' : 'home-outline'} size={23} color={color} /> }} />
      <Tabs.Screen name="explorar" options={{ title: 'Explorar', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} /> }} />
      <Tabs.Screen name="favoritos" options={{ title: 'Favoritos', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'heart' : 'heart-outline'} size={23} color={color} /> }} />
      <Tabs.Screen
        name="carrinho"
        options={{
          title: 'Carrinho',
          tabBarBadge: quantidadeTotalPLG > 0 ? quantidadeTotalPLG : undefined,
          tabBarBadgeStyle: { backgroundColor: corPLG.ouroPLG, color: corPLG.espressoPLG, fontFamily: fontePLG.semiPLG, fontSize: 10 },
          tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'bag' : 'bag-outline'} size={23} color={color} />,
        }}
      />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color, focused }) => <Ionicons name={focused ? 'person' : 'person-outline'} size={23} color={color} /> }} />
    </Tabs>
  );
}
