import React from 'react'
import { TMatrix } from '../types'


interface IProps {
   matrix: TMatrix
}

export const Table: React.FC<IProps> = ({ matrix }) => {
   const thead = createThead(matrix[1].length)
   const tbody = createTbody(matrix)

   return (
      <table>
         {thead}
         {tbody}
      </table>
   )
}


function createThead(length: number): JSX.Element {
   const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
   const theadInner: JSX.Element[] = [<td></td>]

   for (let i = 0; i < length; i++) {
      theadInner.push(<td key={i}>{weekdays[i]}</td>)
   }

   return <thead><tr>{theadInner}</tr></thead>
}


function createTbody(matrix: number[][]): JSX.Element {
   const tbodyInner: JSX.Element[] = matrix.map((row, index) => {

      const trowInner: JSX.Element[] = row.map((cell) => <td>{ cell }</td> )

      return <tr><td>номер {index}</td> { trowInner }</tr>
   })

   return <tbody>{ tbodyInner }</tbody>
}