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
   if (!element || !selectionCoords) return false

   const rect = element.getBoundingClientRect()
   const elLeft = rect.x
   const elRight = elLeft + rect.width
   const elTop = window.pageYOffset + rect.y
   const elBottom = elTop + rect.height

   const selectionLeft = Math.min(selectionCoords.first.x, selectionCoords.second.x)
   const selectionRight = Math.max(selectionCoords.first.x, selectionCoords.second.x)
   const selectionTop = Math.min(selectionCoords.first.y, selectionCoords.second.y)
   const selectionBottom = Math.max(selectionCoords.first.y, selectionCoords.second.y)

   if (elRight > selectionLeft &&
      elLeft < selectionRight &&
      elBottom > selectionTop &&
      elTop < selectionBottom) return true

   return false
}