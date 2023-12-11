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
