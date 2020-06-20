import React, { useState } from 'react'


interface IProps {
   isRight: boolean,
   handleChangeStatus: (status: boolean) => void,
}

export const EditorCell: React.FC<IProps> = ({isRight, handleChangeStatus}) => {
   const [status, setStatus] = useState(isRight)

   function toggleStatus() {
      setStatus(!status)
      handleChangeStatus(!status)
   }

   return (
      <td onClick={toggleStatus}>{status ? 1 : 0}</td>
   )
}