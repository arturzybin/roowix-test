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

   let className = 'editor__cell '
   if (status) {
      className += 'editor__cell_checked'
   }

   return (
      <td onClick={toggleStatus} className={className}></td>
   )
}