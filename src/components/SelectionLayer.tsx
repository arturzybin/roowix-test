import React, { useState, useEffect } from 'react'
import { TSelectionCoords } from '../types';

interface IProps {
   setSelectionCoords: (arg0: TSelectionCoords) => void
}


export const SelectionLayer: React.FC<IProps> = ({ setSelectionCoords }) => {
   const [isSelection, setIsSelection] = useState<boolean>(false)
   const [firstCoords, setFirstCoords] = useState<number[]>([0, 0])
   const [secondCoords, setSecondCoords] = useState<number[]>([0, 0])

   useEffect(() => {
      document.addEventListener('mousedown', startSelection)
      return () => document.removeEventListener('mousedown', startSelection)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])


   useEffect(() => {
      setSelectionCoords({
         first: { x: firstCoords[0], y: firstCoords[1] },
         second: { x: secondCoords[0], y: secondCoords[1] }
      })
   }, [firstCoords[0], firstCoords[1], secondCoords[0], secondCoords[1]])


   function startSelection(event: MouseEvent) {
      setIsSelection(true)
      setFirstCoords([event.pageX, event.pageY])
      setSecondCoords([event.pageX, event.pageY])
      document.addEventListener('mousemove', handleSelection)
      document.addEventListener('mouseup', stopSelection)
   }

   function handleSelection(event: MouseEvent) {
      setSecondCoords([event.pageX, event.pageY])
   }

   function stopSelection() {
      setIsSelection(false)
      document.removeEventListener('mousemove', handleSelection)
      document.removeEventListener('mouseup', stopSelection)
      setSelectionCoords(null)
   }


   const selectionStyles = getSelectionStyles(firstCoords, secondCoords)

   return (
      <div className="selection-layer">
         { isSelection && <div className="selection-layer__selection" style={selectionStyles}></div> }
      </div>
   )
}


function getSelectionStyles(firstCoords: number[], secondCoords: number[]) {
   const left = Math.min(firstCoords[0], secondCoords[0])
   const top = Math.min(firstCoords[1], secondCoords[1])
   const width = Math.abs(secondCoords[0] - firstCoords[0])
   const height = Math.abs(secondCoords[1] - firstCoords[1])

   return { left, top, width, height }
}