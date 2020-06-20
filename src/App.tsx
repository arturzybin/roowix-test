import React from 'react';

import 'normalize.css';
import './styles/style.scss';

import { Table } from './components/Table';
import { SelectionLayer } from './components/SelectionLayer';
import { TMatrix, TSelectionCoords } from './types';


interface IState {
   selectionCoords: TSelectionCoords,
   selectedMatrix: number[][]
}

class App extends React.Component<{}, IState> {
   state = {
      selectionCoords: {
         start: { x: null, y: null },
         end: { x: null, y: null }
      },
      selectedMatrix: [
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0],
         [0, 0, 0, 0, 0]
      ]
   }


   setSelectedCell = (position: [number, number], status: boolean): void => {
      this.setState((prevState: IState) => {
         const newSelectedMatrix = prevState.selectedMatrix.map((row) => [...row])
         newSelectedMatrix[position[0]][position[1]] = status ? 1 : 0
         return { selectedMatrix: newSelectedMatrix }
      })
   }


   setSelectionCoords = (selectionCoords: TSelectionCoords) => {
      this.setState({ selectionCoords })
   }


   render() {
      const { selectionCoords } = this.state

      const matrix: TMatrix = [
         [1, 0, 1, 0, 0],
         [0, 0, 0, 0, 0],
         [1, 0, 1, 0, 0],
         [0, 0, 0, 0, 0]
      ]

      return (
         <>
            <Table matrix={matrix} selectionCoords={selectionCoords} setSelectedCell={this.setSelectedCell} />
            <SelectionLayer setSelectionCoords={this.setSelectionCoords} />
         </>
      )
   }
}

export default App;
