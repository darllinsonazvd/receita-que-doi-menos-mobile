import { Stack } from 'expo-router'

import { Header } from '../../src/components/Header'

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        animation: 'simple_push',
      }}
    >
      <Stack.Screen name="index" options={{ header: () => <Header /> }} />
    </Stack>
  )
}
