import React from 'react';
import 'normalize.css';

import { Table } from './components/Table';
import { TMatrix } from './types';


function App() {
   const matrix: TMatrix = [
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [1, 0, 1, 0, 0],
      [0, 0, 0, 0, 0]
   ]

   return (
      <>
         <Table matrix={matrix} />
      </>
   );
}

export default App;
