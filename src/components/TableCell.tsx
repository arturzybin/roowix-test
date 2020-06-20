import React, { useRef, useEffect } from 'react'
import { ISelectionCoords } from '../types'

interface IProps {
   isRight: boolean,
   selectionCoords: ISelectionCoords,
   matrixPosition: [number, number],
   setSelected: (status: boolean) => void
}


export const TableCell: React.FC<IProps> = ({ isRight, selectionCoords, setSelected }) => {
   const ref = useRef(null)
   const isSelected = checkIsSelected(ref.current, selectionCoords)
   useEffect(() => {
      setSelected(isSelected)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isSelected])


   const className = isSelected ? 'table__cell table__cell_selected' : 'table__cell'

   return (
      <td ref={ref} className={className}>{isRight ? 1 : 0}</td>
   )
}


function checkIsSelected(element: HTMLTableElement | null, selectionCoords: ISelectionCoords): boolean {
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


function areSelectionCoordsExist(selectionCoords: ISelectionCoords) {
   return selectionCoords?.start.x !== null &&
      selectionCoords?.start.y !== null &&
      selectionCoords?.end.x !== null &&
      selectionCoords?.end.y !== null
}