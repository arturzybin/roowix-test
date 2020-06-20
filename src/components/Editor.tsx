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

         tbodyInner.push(<tr key={rowIndex}><td>номер {rowIndex + 1}</td>{trowInner}</tr>)
      }

      return <tbody>{tbodyInner}</tbody>
   }


   return (
      <div className="editor-container">
         <table className="editor">
            {thead}
            {tbody}
         </table>
         <button onClick={closeEditor}>отменить</button>
         <button onClick={() => applyChanges(editableMatrix)}>применить</button>
      </div>
   )
}


function createThead(start: number, end: number): JSX.Element {
   const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт']
   const theadInner: JSX.Element[] = [<td key={7}></td>]

   for (let i = start; i <= end; i++) {
      theadInner.push(<td key={i}>{weekdays[i]}</td>)
   }

   return <thead><tr>{theadInner}</tr></thead>
}