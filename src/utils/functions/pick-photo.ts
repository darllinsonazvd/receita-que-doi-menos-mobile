import { Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'

/**
 * Selecionar uma foto da galeria
 *
 * @author Pedro Henrique Pereira
 *
 */
export async function selectPhoto(): Promise<any> {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!granted) {
    Alert.alert('Permissão Necessária!')
  } else {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 4],
      base64: true,
      quality: 0.2,
    })
    if (!canceled) {
      return assets[0].base64
    }
  }
}

/**
 * Descriptografar uma string base64 para fileuri
 *
 * @author Pedro Henrique Pereira
 *
 * @param base64Photo The base64 photo
 */
export function decriptBase64ToURI(base64Photo: string | undefined) {
  if (base64Photo) {
    const uriPhoto = `${FileSystem.cacheDirectory}_${new Date().getTime()}`
    FileSystem.writeAsStringAsync(uriPhoto, base64Photo, {
      encoding: FileSystem.EncodingType.Base64,
    })
    return uriPhoto
  }
  return '../../assets/img/profile-template.jpg'
}
