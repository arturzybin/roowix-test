import React, { useRef } from 'react'
import { TSelectionCoords } from '../types'

interface IProps {
   isRight: boolean,
   selectionCoords: TSelectionCoords
}


export const TableCell: React.FC<IProps> = ({ isRight, selectionCoords }) => {
   const ref = useRef(null)

   const isSelected = checkIsSelected(ref.current, selectionCoords)

   const className = isSelected ? 'table__cell table__cell_selected' : 'table__cell'

   return (
      <td ref={ref} className={className}>{isRight ? 1 : 0}</td>
   )
}


function checkIsSelected(element: HTMLTableElement | null, selectionCoords: TSelectionCoords): boolean {
   if (!element || !areSelectionCoordsExist(selectionCoords)) return false

   const rect = element.getBoundingClientRect()
   const elLeft = rect.x
   const elRight = elLeft + rect.width
   const elTop = window.pageYOffset + rect.y
   const elBottom = elTop + rect.height

   const selectionLeft = Math.min(selectionCoords?.start.x as number, selectionCoords?.end.x as number)
   const selectionRight = Math.max(selectionCoords?.start.x as number, selectionCoords?.end.x as number)
   const selectionTop = Math.min(selectionCoords?.start.y as number, selectionCoords?.end.y as number)
   const selectionBottom = Math.max(selectionCoords?.start.y as number, selectionCoords?.end.y  as number)

   if (elRight > selectionLeft &&
      elLeft < selectionRight &&
      elBottom > selectionTop &&
      elTop < selectionBottom) return true

   return false
}


function areSelectionCoordsExist(selectionCoords: TSelectionCoords) {
   return selectionCoords?.start.x !== null &&
      selectionCoords?.start.y !== null &&
      selectionCoords?.end.x !== null &&
      selectionCoords?.end.y !== null
}