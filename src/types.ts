export type TMatrix = number[][]

export interface ISelectionCoords {
   start: {
      x: number | null,
      y: number | null
   },
   end: {
      x: number | null,
      y: number | null
   }
}

export interface ISelectedCellsPosition {
   start: {
      row: number,
      cell: number
   },
   end: {
      row: number,
      cell: number
   }
}