import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.text}>Receita Que Dói Menos!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FECC01',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    color: '#932743',
    fontWeight: '700',
    fontSize: 32,
  },
})
