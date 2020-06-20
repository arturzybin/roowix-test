import React from 'react'
import { TMatrix, ISelectionCoords } from '../types'
import { TableCell } from './TableCell'


interface IProps {
   matrix: TMatrix,
   selectionCoords: ISelectionCoords,
   setSelectedCell: (position: [number, number], status: boolean) => void
}

export const Table: React.FC<IProps> = ({ matrix, selectionCoords, setSelectedCell }) => {
   const thead = createThead(matrix[1].length)
   const tbody = createTbody()


   function createTbody(): JSX.Element {
      const tbodyInner: JSX.Element[] = matrix.map((row, rowIndex) => {

         const trowInner: JSX.Element[] = row.map((cell, cellIndex) => {
            const setSelected = (status: boolean) => setSelectedCell([rowIndex, cellIndex], status)

            return (<TableCell
               key={cellIndex}
               isRight={!!cell}
               selectionCoords={selectionCoords}
               matrixPosition={[rowIndex, cellIndex]}
               setSelected={setSelected}
            />)
         })

         return (
            <tr key={rowIndex}>
               <td className="table__day-number">номер {rowIndex + 1}</td>
               {trowInner}
            </tr>
         )
      })

      return <tbody>{tbodyInner}</tbody>
   }


   return (
      <table className="table">
         {thead}
         {tbody}
      </table>
   )
}


function createThead(length: number): JSX.Element {
   const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт']
   const theadInner: JSX.Element[] = [<td key={7}></td>]

   for (let i = 0; i < length; i++) {
      theadInner.push(<td key={i} className="table__head-cell">{weekdays[i]}</td>)
   }

   return <thead><tr>{theadInner}</tr></thead>
}