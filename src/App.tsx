import React from 'react';

import 'normalize.css';
import './styles/style.scss';

import { Table } from './components/Table';
import { SelectionLayer } from './components/SelectionLayer';
import { ISelectionCoords, ISelectedCellsPosition } from './types';
import { Editor } from './components/Editor';


interface IState {
   matrix: number[][],
   selectionCoords: ISelectionCoords,
   selectedMatrix: number[][],
   openEditor: boolean,
   selectedCellsPosition: ISelectedCellsPosition,
   editableCellsPosition: ISelectedCellsPosition
}

class App extends React.Component<{}, IState> {
   state = {
      matrix: [
         [1, 0, 1, 0, 0],
         [0, 0, 0, 0, 0],
         [1, 0, 1, 0, 0],
         [0, 0, 0, 0, 0]
      ],
      selectionCoords: {
         start: { x: null, y: null },
         end: { x: null, y: null }
      },
      selectedMatrix: [
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0]
      ],
      openEditor: false,
      selectedCellsPosition: {
         start: {
            row: -1,
            cell: -1
         },
         end: {
            row: -1,
            cell: -1
         }
      },
      editableCellsPosition: {
         start: {
            row: -1,
            cell: -1
         },
         end: {
            row: -1,
            cell: -1
         }
      }
   }


   setSelectedCell = (position: [number, number], status: boolean): void => {
      this.setState((prevState: IState) => {
         const newSelectedMatrix = prevState.selectedMatrix.map((row) => [...row])
         newSelectedMatrix[position[0]][position[1]] = status ? 1 : 0

         const selectedCellsPosition = calculateSelectedCellsPosition(newSelectedMatrix)

         return { selectedMatrix: newSelectedMatrix, selectedCellsPosition }
      })
   }


   setSelectionCoords = (selectionCoords: ISelectionCoords) => {
      this.setState({ selectionCoords })
   }


   handleOpenEditor = () => {
      const { selectedCellsPosition } = this.state
      if (selectedCellsPosition.start.row === -1) return

      this.setState({
         openEditor: true,
         editableCellsPosition: {
            start: {
               row: selectedCellsPosition.start.row,
               cell: selectedCellsPosition.start.cell
            },
            end: {
               row: selectedCellsPosition.end.row,
               cell: selectedCellsPosition.end.cell
            }
         }
      })
   }


   handleCloseEditor = () => {
      this.setState({
         openEditor: false,
         selectedCellsPosition: {
            start: {
               row: -1,
               cell: -1
            },
            end: {
               row: -1,
               cell: -1
            }
         }
      })
   }


   handleApplyEditorChanges = (newMatrix: number[][]) => {
      this.setState({
         matrix: newMatrix,
         openEditor: false,
         selectedCellsPosition: {
            start: {
               row: -1,
               cell: -1
            },
            end: {
               row: -1,
               cell: -1
            }
         }
      })
   }


   render() {
      const { matrix, selectionCoords, openEditor, selectedCellsPosition, editableCellsPosition } = this.state
      const matrixCopy = matrix.map((row) => [...row])

      return (
         <>
            <Table
               matrix={matrix}
               selectionCoords={selectionCoords}
               setSelectedCell={this.setSelectedCell}
               selectedCellsPosition={selectedCellsPosition}
            />
            <SelectionLayer
               setSelectionCoords={this.setSelectionCoords}
               openEditor={this.handleOpenEditor}
            />
            {openEditor &&
               <Editor
                  matrixCopy={matrixCopy}
                  cellsPosition={editableCellsPosition}
                  closeEditor={this.handleCloseEditor}
                  applyChanges={this.handleApplyEditorChanges}
               />}
         </>
      )
   }
}

export default App;



function calculateSelectedCellsPosition(selectedMatrix: number[][]): ISelectedCellsPosition {
   const selectedMatrixCopy = selectedMatrix.map((row) => [...row])
   const lastRowIndex = selectedMatrix.length - 1
   const lastCellIndex = selectedMatrix.length - 1

   let startPosition: [number, number] | null = null
   let endPosition: [number, number] | null = null

   selectedMatrixCopy.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
         if (!startPosition && cell) {
            startPosition = [rowIndex, cellIndex]
         }

         if (startPosition && cell
            && (rowIndex === lastRowIndex || !selectedMatrixCopy[rowIndex + 1][cellIndex])
            && (cellIndex === lastCellIndex || !selectedMatrixCopy[rowIndex][cellIndex + 1])
         ) {
            endPosition = [rowIndex, cellIndex]
         }
      })
   })

   if (!startPosition) {
      startPosition = [-1, -1]
   }
   if (!endPosition) {
      endPosition = [-1, -1]
   }

   return ({
      start: {
         row: startPosition[0],
         cell: startPosition[1]
      },
      end: {
         row: endPosition[0],
         cell: endPosition[1]
      }
   })
}