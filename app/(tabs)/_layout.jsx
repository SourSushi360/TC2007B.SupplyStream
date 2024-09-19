import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image 
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
      style={{ color: color }}>
        {name}
      </Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "black",
          tabBarActiveBackgroundColor: '#979797',
          tabBarStyle: {
            backgroundColor: '#d8d7d7',
            height: 100,
          }
        }}
      >
        <Tabs.Screen name='profile' options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.profile}
              color={color}
              name='Profile'
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='camera' options={{
          title: 'Camera',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.plus}
              color={color}
              name='Camera'
              focused={focused}
            />
          )
        }} />
        <Tabs.Screen name='search' options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.search}
              color={color}
              name='Search'
              focused={focused}
            />
          )
        }} />
      </Tabs>
    </>
  )
}

export default TabsLayout