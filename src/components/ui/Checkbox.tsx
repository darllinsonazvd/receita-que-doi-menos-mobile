import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native'

type CheckboxProps = {
  isChecked: boolean
  onPress: () => void
}

export function Checkbox({ isChecked, onPress }: CheckboxProps) {
  return (
    <TouchableOpacity
      className={`h-7 w-7 items-center justify-center rounded-lg ${
        isChecked ? 'bg-success' : 'bg-zinc-300'
      }`}
      activeOpacity={0.7}
      onPress={onPress}
    >
      {isChecked ? (
        <Ionicons name="checkmark-outline" size={20} color="#fff" />
      ) : null}
    </TouchableOpacity>
  )
}
