import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { JugadoresModal } from '../components/JugadoresModal';
import { ToastContainer, toast } from 'react-toastify';

function Jugadores() {
  const [Jugadores, setJugadores] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentJugadores, setCurrentJugadores] = useState({});

  useEffect(() => {
    fetchJugadores();
  }, []);


  

  const fetchJugadores = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-jugadores');
      if (response.status === 200) {
        setJugadores(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar jugadores", error);
    }
  };

  const setModalEditInfo = (Jugadores) => {
    setIsModalShow(true);
    setCurrentJugadores(Jugadores);
  };

  const handleChangeJugadores = (event) => {
    setCurrentJugadores({
      ...currentJugadores,
      [event.name]: event.value
    });
  };

  const createOrUpdateJugadores = async () => {
    const data = {
      nombre: currentJugadores.nombre,
      nickname: currentJugadores.nickname,
      correo: currentJugadores.correo,
      pais: currentJugadores.pais
    };

    if (currentJugadores.id_jugador) {
      try {
        await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/actualizar-jugador/' + currentJugadores.id_jugador, data);
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchJugadores();
      } catch (error) {
        console.error("Error al actualizar jugadores", error);
      }
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/crearjugador' , data);
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchJugadores();
      } catch (error) {
        console.error("Error al registar jugador", error);
      }
    }
  };

  const removeJugadores = async (JugadoresId) => {
    if (confirm("Estas seguro que deseas borrar?")) {
      try {
        await axios.delete(import.meta.env.VITE_TORNEO_ENDPOINT + '/eliminar-jugador/' + JugadoresId);
        toast("Eliminación exitosa");
        fetchJugadores();
      } catch (error) {
        console.error("Error al eliminar jugador", error);
      }
    }
  };

  const openJugadoresModal = () => {
    setCurrentJugadores({});
    setIsModalShow(true);
  };

  return (
    <>
      <JugadoresModal
        Jugadores={currentJugadores}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeJugadores={handleChangeJugadores}
        onSubmit={createOrUpdateJugadores}
      />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-16 px-4">
        <h1 className="text-4xl font-bold text-black mb-8">Jugadores</h1>
        <button className="bg-green-700 text-white rounded shadow-md p-2 my-4" onClick={openJugadoresModal}>
          Registrar Jugadores
        </button>
       
  <div className="relative overflow-x-auto w-full max-w-6xl shadow-2xl rounded-xl ring-1 ring-blue-600/40">
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="text-xs uppercase bg-blue-950 text-blue-300">
        <tr>
          <th className="px-6 py-3">Nombre</th>
          <th className="px-6 py-3">Nickname</th>
          <th className="px-6 py-3">Correo</th>
          <th className="px-6 py-3">País</th>
          <th className="px-6 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Jugadores.map((jugador) => (
          <tr
            key={jugador.id_jugador}
            className="odd:bg-gray-900 even:bg-gray-800 border-b border-blue-900 hover:bg-blue-950 transition"
          >
            <td className="px-6 py-3">{jugador.nombre}</td>
            <td className="px-6 py-3">{jugador.nickname}</td>
            <td className="px-6 py-3">{jugador.correo}</td>
            <td className="px-6 py-3">{jugador.pais}</td>
            <td className="px-6 py-3 flex justify-center gap-2">
              <button
                onClick={() => setModalEditInfo(jugador)}
                className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-lg"
              >
                <LuPencil />
              </button>
              <button
                onClick={() => removeJugadores(jugador.id_jugador)}
                className="bg-red-700 hover:bg-red-600 text-white p-2 rounded-lg"
              >
                <LuTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Jugadores;
