import { Text, View } from 'react-native'
import { Checkbox } from './ui/Checkbox'
import { useState } from 'react'

type IngredientItemProps = {
  name: string
}

export function IngredientItem({ name }: IngredientItemProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false)

  return (
    <View className="mt-3 flex-row items-center">
      <Checkbox
        isChecked={isChecked}
        onPress={() => setIsChecked((prev) => !prev)}
      />
      <Text className="ml-2 font-body text-lg">{name}</Text>
    </View>
  )
}
