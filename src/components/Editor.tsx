import React, { useState } from 'react'
import { IEditCellsPosition } from '../types'
import { EditorCell } from './EditorCell'


interface IProps {
   matrixCopy: number[][],
   cellsPosition: IEditCellsPosition,
   closeEditor: () => void
   applyChanges: (newMatrix: number[][]) => void
}

export const Editor: React.FC<IProps> = ({ matrixCopy, cellsPosition, closeEditor, applyChanges }) => {
   const thead = createThead(cellsPosition.start.cell, cellsPosition.end.cell)
   const tbody = createTbody()

   const [editableMatrix, setEditableMatrix] = useState<number[][]>(matrixCopy)


   function createTbody(): JSX.Element {
      const tbodyInner: JSX.Element[] = []

      for (let rowIndex = cellsPosition.start.row; rowIndex <= cellsPosition.end.row; rowIndex++) {
         const trowInner: JSX.Element[] = []

         for (let cellIndex = cellsPosition.start.cell; cellIndex <= cellsPosition.end.cell; cellIndex++) {
            const handleChangeStatus = (status: boolean) => {
               const newEditableMatrix = editableMatrix.map((row) => [...row])
               newEditableMatrix[rowIndex][cellIndex] = status ? 1 : 0
               setEditableMatrix(newEditableMatrix)
            }

            trowInner.push(<EditorCell
               key={cellIndex}
               isRight={!!matrixCopy[rowIndex][cellIndex]}
               handleChangeStatus={handleChangeStatus}
            />)
         }

         tbodyInner.push(
            <tr key={rowIndex}>
               <td className="editor__day-number">номер {rowIndex + 1}</td>
               {trowInner}
            </tr>
         )
      }

      const fakeRowInner: JSX.Element[] = []
      for (let cellIndex = cellsPosition.start.cell; cellIndex <= cellsPosition.end.cell + 1; cellIndex++) {
         fakeRowInner.push(<td className="editor__fake-cell"></td>)
      }

      tbodyInner.push(<tr>{fakeRowInner}</tr>)

      return <tbody>{tbodyInner}</tbody>
   }


   return (
      <div className="background-locker">
         <div className="editor">
            <table className="editor__table">
               {thead}
               {tbody}
            </table>
            <button
               className="editor__button editor__button_type_decline"
               onClick={closeEditor}>
               Отменить
            </button>
            <button
               className="editor__button editor__button_type_accept"
               onClick={() => applyChanges(editableMatrix)}>
               Применить
            </button>
         </div>
      </div>
   )
}


function createThead(start: number, end: number): JSX.Element {
   const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт']
   const theadInner: JSX.Element[] = [<td key={7}></td>]

   for (let i = start; i <= end; i++) {
      theadInner.push(<td key={i} className="editor__head-cell">{weekdays[i]}</td>)
   }

   return <thead><tr>{theadInner}</tr></thead>
}