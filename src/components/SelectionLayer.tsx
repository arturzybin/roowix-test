import React, { useState, useEffect } from 'react'
import { TSelectionCoords } from '../types';

interface IProps {
   setSelectionCoords: (arg0: TSelectionCoords) => void
}


export const SelectionLayer: React.FC<IProps> = ({ setSelectionCoords }) => {
   const [isSelection, setIsSelection] = useState<boolean>(false)
   const [startCoords, setStartCoords] = useState<number[] | null[]>([null, null])
   const [endCoords, setEndCoords] = useState<number[] | null[]>([null, null])

   useEffect(() => {
      document.addEventListener('mousedown', startSelection)
      return () => document.removeEventListener('mousedown', startSelection)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   useEffect(() => {
      if (!areCoordsExist(startCoords, endCoords)) return
      setSelectionCoords({
         start: { x: startCoords[0], y: startCoords[1] },
         end: { x: endCoords[0], y: endCoords[1] }
      })
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [startCoords[0], startCoords[1], endCoords[0], endCoords[1]])


   function startSelection(event: MouseEvent) {
      setIsSelection(true)
      setStartCoords([event.pageX, event.pageY])
      setEndCoords([event.pageX, event.pageY])
      document.addEventListener('mousemove', handleSelection)
      document.addEventListener('mouseup', stopSelection)
   }

   function handleSelection(event: MouseEvent) {
      setEndCoords([event.pageX, event.pageY])
   }

   function stopSelection() {
      setIsSelection(false)
      setStartCoords([null, null])
      setEndCoords([null, null])
      setSelectionCoords({
         start: { x: null, y: null },
         end: { x: null, y: null }
      })
      document.removeEventListener('mousemove', handleSelection)
      document.removeEventListener('mouseup', stopSelection)
   }


   let selectionStyles
   if (areCoordsExist(startCoords, endCoords)) {
      selectionStyles = getSelectionStyles(startCoords as number[], endCoords as number[])
   }
   
   return (
      <div className="selection-layer">
         { isSelection && <div className="selection-layer__selection" style={selectionStyles}></div> }
      </div>
   )
}


function getSelectionStyles(startCoords: number[], endCoords: number[]) {
   const left = Math.min(startCoords[0], endCoords[0])
   const top = Math.min(startCoords[1], endCoords[1])
   const width = Math.abs(endCoords[0] - startCoords[0])
   const height = Math.abs(endCoords[1] - startCoords[1])

   return { left, top, width, height }
}


function areCoordsExist(startCoords: number[] | null[], endCoords: number[] | null[]) {
   return startCoords[0] !== null && startCoords[1] !== null && endCoords[0] !== null && endCoords[1] !== null
}