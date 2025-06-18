import axios from 'axios';
import { useEffect, useState } from 'react';
import { LuPencil, LuTrash } from "react-icons/lu";
import { TournamentModal } from '../components/TournamentModal';
import { ToastContainer, toast } from 'react-toastify';


function Torneo() {
  const [Torneos, setTorneos] = useState([]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [currentTorneo, setCurrentTorneo] = useState({});
  const [videojuegos, setVideojuegos] = useState([]);

  useEffect(() => {
    fetchTorneos();
    fetchVideojuegos();
  }, []);

  const fetchTorneos = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-torneos')
      if (response.status === 200) {
        setTorneos(response.data.data);
      }
    } catch (error) {
      console.error("Error al cargar torneos", error);
    }
  };

  const fetchVideojuegos = () => {
    axios.get(import.meta.env.VITE_TORNEO_ENDPOINT + '/listar-videojuegos')
      .then((response) => setVideojuegos(response.data.data))
      .catch(error => console.error(error));
  };

  const setModalEditInfo = (torneo) => {
    setIsModalShow(true);
    setCurrentTorneo(torneo);
  };

  const handleChangeTorneo = (event) => {
    setCurrentTorneo({
      ...currentTorneo,
      [event.name]: event.value
    });
  };

  const createOrUpdateTorneo = async () => {
    const data = {
      nombre: currentTorneo.nombre,
      limite_equipos: currentTorneo.limite_equipos,
      modalidad: currentTorneo.modalidad,
      videojuego_id: currentTorneo.videojuego_id
    };

    if (currentTorneo.id_torneo) {
      try {
        await axios.put(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/actualizar-torneo/' + currentTorneo.id_torneo, data);
        toast("Actualización exitosa");
        setIsModalShow(false);
        fetchTorneos();
      } catch (error) {
        console.error("Error al actualizar torneo", error);
      }
    } else {
      try {
        await axios.post(
          import.meta.env.VITE_TORNEO_ENDPOINT + '/create-tournament',
          { ...data, premio: "Lo que sea" }
        );
        toast("Creación exitosa");
        setIsModalShow(false);
        fetchTorneos();
      } catch (error) {
        console.error("Error al crear torneo", error);
      }
    }
  };

  const removeTorneo = async (torneo_id) => {
    if (confirm("Estas seguro que deseas borrar?")) {
      try {
        await axios.delete(import.meta.env.VITE_TORNEO_ENDPOINT + '/eliminar-torneo/' + currentTorneo.videojuego_id);
        toast("Eliminación exitosa");
        fetchTorneos();
      } catch (error) {
        console.error("Error al eliminar torneo", error);
      }
    }
  };

  const openTournamentModal = () => {
    setCurrentTorneo({});
    setIsModalShow(true);
  };

  return (
    <>
      <TournamentModal
        videojuegos={videojuegos}
        torneo={currentTorneo}
        isShow={isModalShow}
        onClose={() => setIsModalShow(false)}
        onChangeTorneo={handleChangeTorneo}
        onSubmit={createOrUpdateTorneo}
      />
   <div className="relative overflow-x-auto w-full max-w-6xl shadow-2xl rounded-xl ring-1 ring-yellow-600/40">
    <table className="w-full text-sm text-left text-gray-300">
      <thead className="text-xs uppercase bg-yellow-900 text-yellow-300">
        <tr>
          <th className="px-6 py-3">Nombre del torneo</th>
          <th className="px-6 py-3">Límite de jugadores</th>
          <th className="px-6 py-3">Modalidad</th>
          <th className="px-6 py-3">Videojuego</th>
          <th className="px-6 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {Torneos.map(torneo => (
          <tr
            key={torneo.id}
            className="odd:bg-gray-900 even:bg-gray-800 border-b border-yellow-900 hover:bg-yellow-950 transition"
          >
            <td className="px-6 py-4">{torneo.nombre}</td>
            <td className="px-6 py-4">{torneo.limite_equipos}</td>
            <td className="px-6 py-4">{torneo.modalidad}</td>
            <td className="px-6 py-4">{torneo.videojuego?.nombre}</td>
            <td className="px-6 py-4 flex gap-2 justify-center">
              <button
                onClick={() => setModalEditInfo(torneo)}
                className="bg-yellow-600 hover:bg-yellow-500 text-black p-2 rounded-lg"
              >
                <LuPencil />
              </button>
              <button
                onClick={() => removeTorneo(torneo.torneo_id)}
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
      
    </>
  );
}

export default Torneo;
