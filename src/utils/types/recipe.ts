// export type Recipe = {
//   id: string
//   name: string
//   imgUrl: string
//   author: string
//   isFavorite: boolean
//   instructions: string
// }


export type Recipe = {
  id: string
  name: string
  typeMeal: string
  photo: string
  video: string
  ingredients: string[]
  instructions: string
  creator: {
    id: string
    name: string
    email: string
  }
}