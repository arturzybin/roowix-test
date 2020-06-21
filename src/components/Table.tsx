import React, { useRef } from 'react'
import { TMatrix, ISelectionCoords, ISelectedCellsPosition } from '../types'
import { TableCell } from './TableCell'


interface IProps {
   matrix: TMatrix,
   selectionCoords: ISelectionCoords,
   setSelectedCell: (position: [number, number], status: boolean) => void,
   selectedCellsPosition: ISelectedCellsPosition,
}

export const Table: React.FC<IProps> = ({ matrix, selectionCoords, setSelectedCell, selectedCellsPosition }) => {
   const tableRef = useRef(null)
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

   const selectedCellsBorder = createSelectedCellsBorder(tableRef, selectedCellsPosition)


   return (
      <>
         <table ref={tableRef} className="table">
            {thead}
            {tbody}
         </table>
         {selectedCellsBorder}
      </>
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


function createSelectedCellsBorder(tableRef: React.MutableRefObject<null>, cellsPosition: ISelectedCellsPosition): JSX.Element {
   if (cellsPosition.start.row === -1
      || cellsPosition.start.cell === -1
      || cellsPosition.end.row === -1
      || cellsPosition.end.cell === -1
      || !tableRef.current
   ) return (<></>)

   const width = (cellsPosition.end.cell - cellsPosition.start.cell + 1) * 52 - 2
   const height = (cellsPosition.end.row - cellsPosition.start.row + 1) * 54 - 2
   const table = tableRef.current as unknown as HTMLTableElement
   const left = table.rows[0].cells[cellsPosition.start.cell + 1].getBoundingClientRect().left
   const top = table.rows[cellsPosition.start.row + 1].getBoundingClientRect().top + window.pageYOffset

   return (
      <div className="selected-cells-border" style={{ left, top, width, height }}>
         <div className="selected-cells-border__angle-square"></div>
         <div className="selected-cells-border__angle-square"></div>
         <div className="selected-cells-border__angle-square"></div>
         <div className="selected-cells-border__angle-square"></div>
         <div className="selected-cells-border__size-label">{width}×{height}</div>
      </div>
   )
}