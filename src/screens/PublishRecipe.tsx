import { Text, View } from 'react-native'

type PublicRecipeProps = {
  navigation: any
}

export default function PublicRecipe({ navigation }: PublicRecipeProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>Hello, world!</Text>
    </View>
  )
}
