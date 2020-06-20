import React from 'react'
import { TMatrix, TSelectionCoords } from '../types'
import { TableCell } from './TableCell'


interface IProps {
   matrix: TMatrix,
   selectionCoords: TSelectionCoords,
   setSelectedCell: (position: [number, number], status: boolean) => void
}

export const Table: React.FC<IProps> = ({ matrix, selectionCoords, setSelectedCell }) => {
   const thead = createThead(matrix[1].length)
   const tbody = createTbody(matrix, selectionCoords)


   function createTbody(matrix: number[][], selectionCoords: TSelectionCoords): JSX.Element {
      const tbodyInner: JSX.Element[] = matrix.map((row, rowIndex) => {
   
         const trowInner: JSX.Element[] = row.map((cell, cellIndex) => {
            const setSelected = (status: boolean) => setSelectedCell([rowIndex, cellIndex], status)
   
            return (<TableCell
               key={cellIndex}
               isRight={!!cell}
               selectionCoords={selectionCoords}
               matrixPosition={ [rowIndex, cellIndex] }
               setSelected={setSelected}
            />)
         })
   
         return <tr key={rowIndex}><td>номер {rowIndex}</td>{trowInner}</tr>
      })
   
      return <tbody>{tbodyInner}</tbody>
   }


   return (
      <table>
         {thead}
         {tbody}
      </table>
   )
}


function createThead(length: number): JSX.Element {
   const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт']
   const theadInner: JSX.Element[] = [<td key={7}></td>]

   for (let i = 0; i < length; i++) {
      theadInner.push(<td key={i}>{weekdays[i]}</td>)
   }

   return <thead><tr>{theadInner}</tr></thead>
}