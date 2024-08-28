import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, ContainerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        className={`bg-gray rounded-xl min-h-[62px] justify-center items-center`}
    >
      <Text className="text-black font-psemibold text-lg">CustomButton</Text>
    </TouchableOpacity>
  )
}

export default CustomButton