import React, { useState } from 'react';

import 'normalize.css';
import './styles/style.scss';

import { Table } from './components/Table';
import { SelectionLayer } from './components/SelectionLayer';
import { TMatrix, TSelectionCoords } from './types';


function App() {
   const [selectionCoords, setSelectionCoords] = useState<TSelectionCoords>(null)

   const matrix: TMatrix = [
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
   ]

   return (
      <>
         <Table matrix={matrix} selectionCoords={selectionCoords} />
         <SelectionLayer setSelectionCoords={setSelectionCoords} />
      </>
   );
}

export default App;
