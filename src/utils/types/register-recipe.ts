export type RegisterRecipe = {
  name: string
  typeMeal: string | null
  photoURL: string | null
  videoURL: string | null
  ingredients: string[]
  instructions: string
  creatorID: string
}
