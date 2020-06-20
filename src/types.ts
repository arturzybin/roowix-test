export type TMatrix = number[][]

export type TSelectionCoords = {
   start: {
      x: number | null,
      y: number | null
   },
   end: {
      x: number | null,
      y: number | null
   }
} | null