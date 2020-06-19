import React from 'react'
import { TMatrix, TSelectionCoords } from '../types'
import { TableCell } from './TableCell'


interface IProps {
   matrix: TMatrix,
   selectionCoords: TSelectionCoords
}

export const Table: React.FC<IProps> = ({ matrix, selectionCoords }) => {
   const thead = createThead(matrix[1].length)
   const tbody = createTbody(matrix, selectionCoords)

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


function createTbody(matrix: number[][], selectionCoords: TSelectionCoords): JSX.Element {
   const tbodyInner: JSX.Element[] = matrix.map((row, rowIndex) => {

      const trowInner: JSX.Element[] = row.map((cell, cellIndex) => (
         <TableCell
            key={cellIndex}
            isRight={!!cell}
            selectionCoords={selectionCoords}
         />
      ))

      return <tr key={rowIndex}><td>номер {rowIndex}</td>{trowInner}</tr>
   })

   return <tbody>{tbodyInner}</tbody>
}