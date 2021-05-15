 export const getRandomIntInclusive = (min: number, max: number): number => {
   min = Math.ceil(min)
   max = Math.floor(max)
   return Math.floor(Math.random() * (max - min + 1) + min)
 }

 export const shuffleArray = (array: unknown[]): unknown[] => {
   const newArray = [...array]
   return newArray.sort(() => (Math.random() > 0.5 ? 1 : -1))
 }
