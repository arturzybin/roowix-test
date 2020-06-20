import React from 'react';

import 'normalize.css';
import './styles/style.scss';

import { Table } from './components/Table';
import { SelectionLayer } from './components/SelectionLayer';
import { ISelectionCoords, IEditCellsPosition } from './types';
import { Editor } from './components/Editor';


interface IState {
   matrix: number[][],
   selectionCoords: ISelectionCoords,
   selectedMatrix: number[][],
   openEditor: boolean,
   editCellsPosition: IEditCellsPosition
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
      editCellsPosition: {
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
         return { selectedMatrix: newSelectedMatrix }
      })
   }


   setSelectionCoords = (selectionCoords: ISelectionCoords) => {
      this.setState({ selectionCoords })
   }


   handleStopSelection = () => {
      const selectedMatrixCopy = this.state.selectedMatrix.map((row) => [...row])
      const lastRowIndex = this.state.matrix.length - 1
      const lastCellIndex = this.state.matrix[0].length - 1

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

      if (startPosition && endPosition) {
         this.setState({
            openEditor: true,
            editCellsPosition: {
               start: {
                  row: startPosition[0],
                  cell: startPosition[1]
               },
               end: {
                  row: endPosition[0],
                  cell: endPosition[1]
               }
            }
         })
         return
      }
   }


   handleCloseEditor = () => {
      this.setState({
         openEditor: false,
         editCellsPosition: {
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
         editCellsPosition: {
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
      const { matrix, selectionCoords, openEditor, editCellsPosition } = this.state
      const matrixCopy = matrix.map((row) => [...row])

      return (
         <>
            <Table
               matrix={matrix}
               selectionCoords={selectionCoords}
               setSelectedCell={this.setSelectedCell}
            />
            <SelectionLayer
               setSelectionCoords={this.setSelectionCoords}
               handleStopSelection={this.handleStopSelection}
            />
            {openEditor &&
               <Editor
                  matrixCopy={matrixCopy}
                  cellsPosition={editCellsPosition}
                  closeEditor={this.handleCloseEditor}
                  applyChanges={this.handleApplyEditorChanges}
               />}
         </>
      )
   }
}

export default App;
