import React, { useState } from 'react';

import 'normalize.css';
import './styles/style.scss';

import { Table } from './components/Table';
import { SelectionLayer } from './components/SelectionLayer';
import { TMatrix, TSelectionCoords } from './types';


function App() {
   const [selectionCoords, setSelectionCoords] = useState<TSelectionCoords>(null)
   const [selectedMatrix, setSelectedMatrix] = useState<number[][]>([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
   ])

   function setSelectedCell(position: [number, number], status: boolean) {
      const newSelectedMatrix = selectedMatrix.map((row) => [...row])
      newSelectedMatrix[position[0]][position[1]] = status ? 1 : 0
      setSelectedMatrix(newSelectedMatrix)
   }

   const matrix: TMatrix = [
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
   ]

   return (
      <>
         <Table matrix={matrix} selectionCoords={selectionCoords} setSelectedCell={setSelectedCell} />
         <SelectionLayer setSelectionCoords={setSelectionCoords} />
      </>
   );
}

export default App;
