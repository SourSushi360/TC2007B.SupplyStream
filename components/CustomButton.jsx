import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, color}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.5}
        className={`${color} rounded-xl min-h-[62px] justify-center items-center
            ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        disabled={isLoading}
    >
      <Text className={`text-black font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton