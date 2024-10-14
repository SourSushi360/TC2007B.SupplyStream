import { Text } from 'react-native';
import { Redirect, Stack, Tabs } from 'expo-router';

import { useSession } from '@/components/Session';

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3 }, style]} {...rest} />;
}

export default function AppLayout() {
  const { user, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      }}
    >
      <Tabs.Screen name="profile" options={{
        title: 'Perfil',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
        )
      }}/>

      <Tabs.Screen name="camera" options={{
        title: 'Cámara',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'camera' : 'camera-outline'} color={color} />
        )
      }}/>
        <Tabs.Screen name="search" options={{
        title: 'Base de datos',
        tabBarIcon: ({ color, focused }) => (
          <TabBarIcon name={focused ? 'list-circle' : 'list-circle-outline'} color={color} />
        )
      }}/>
    </Tabs>
  );
}
