import React, { useContext, useState } from 'react'
import { useSockets } from '../hooks/useSockets';
import { SocketContext } from '../context/SocketContext';

interface Props {
  crearBanda?: (nombre: string) => void;
}

export const BandAdd = ({crearBanda}:Props) => {

  const [valor, setValor] = useState('')
  const {socket} =  useContext(SocketContext)

  const enviarForm = (e:any) => {
    e.preventDefault();
    if (valor.trim().length > 0) {
         // crear una band 

    socket.emit('crearBanda',{nombre:valor})

        setValor('')
    }
  }

  return (
    <>
      <h3 className=' text-2xl  font-medium'>Agregar Banda</h3>

      <form onSubmit={(e) => enviarForm(e)}>
        <input 
          type="text" 
          placeholder='Nuevo nombre de la banda' 
          className='w-full p-1 border-solid border-2 focus:outline-none'
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  )
}
