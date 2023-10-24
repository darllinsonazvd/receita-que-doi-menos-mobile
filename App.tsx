import { StatusBar } from 'expo-status-bar'
import { Alert, Pressable, Text, View } from 'react-native'

const showAlert = () =>
  Alert.alert('Aprendi com pedropereira', 'Meu ídolo, que agora está na DBC!', [
    {
      text: 'Ele é foda',
      style: 'default',
    },
  ])

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-primary p-4">
      <StatusBar style="auto" />

      <Text className="font-bold text-secondary text-3xl">
        Receita Que Dói Menos!
      </Text>

      <Pressable
        className="w-48 flex items-center justify-center bg-secondary rounded-xl p-4 mt-3"
        onPress={showAlert}
      >
        <Text className="text-primary text-lg">Abrir alerta</Text>
      </Pressable>
    </View>
  )
}
