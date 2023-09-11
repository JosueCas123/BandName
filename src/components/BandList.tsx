import { useContext, useEffect, useState } from "react"
import { SocketContext } from "../context/SocketContext";



export const BandList = () => {

  const [bands, setBands] = useState<{ id: number; name: string; votos: number }[]>([]);
  const {socket} = useContext(SocketContext)

  useEffect(() => {
    socket.on('current-bands', (data:[]) => {
      console.log(data)
      setBands(data)
     
    })
  }, [socket])
  
 // votar por una band
  const votar = (id:number) => {
    console.log('votar-app',id)
    socket.emit('votar', id)
  }

  const cambioNombre = (event:React.ChangeEvent<HTMLInputElement>, id:number) => {
    const nuevoNombre = event.target.value
    console.log(event.target.value)
    
    setBands((bands) =>
    bands.map((band:any) => {
      if (band.id === id) {
        return { ...band, name: nuevoNombre }; // Crear un nuevo objeto para mantener la inmutabilidad
      }
      return band;
    }))
 
  }

    //eliminar una band
    const eliminar = (id:number) => {
      socket.emit('eliminar',id)
    }

  const onPerdioFoco = (id:number, nombre:string) => {
    socket.emit('cambiarNombre',{
          id,
          nombre
        })
  }

  const createRoes = () => {
    return (
      
        bands.map(band =>(
            <tr key={band.id} className=' text-center'>

              <td>
                <button 
                  className="bg-blue-400 p-1 rounded-sm"
                  onClick={() => votar(band.id)}
                >
                    +1
                </button>
              </td>

              <td>
                <input 
                  value={band.name} 
                  className='w-full p-1 border-solid border-2 focus:outline-none' 
                  onChange={(event) => cambioNombre(event, band.id)}
                  //cuabdo pierda el foco
                  onBlur={() => onPerdioFoco(band.id, band.name)}
                 />
              </td>

              <td><h3 className='text-lg font-medium'>{band.votos}</h3></td>

              <td>
                <button 
                  className='bg-red-400 rounded-sm p-1'
                  onClick={() => eliminar(band.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>

        ))
    
    )
  }

  return (
    <>
      <table className='table-fixed min-w-full divide-y divide-gray-200'>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody className=''>
          {createRoes()}
        </tbody>
      </table>
    </>
  )
}
