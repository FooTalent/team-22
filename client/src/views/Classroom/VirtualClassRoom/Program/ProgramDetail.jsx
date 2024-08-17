import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { createClass, deleteClass, getProgramById, updateProgram } from '../../../../services/programs.services';
import Modal from '../../../../components/Modal';
import CreateClassForm from './CreateClassForm';
import ClassroomCard from './ClassroomCard';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import BackButton from '../../../../components/BackButtom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditVCRForm from './EditVCRForm';
import CreatedClass from '../Class/CreatedClass'
import logo from '/CreasteUnaClase.png';
import popUp from '/Popup_EliminarClase.png'

const ProgramDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    // Edit Program
  const [program, setProgram] = useState(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // Create Class
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [newClassId, setNewClassId] = useState(null);
    // Delete Class
    const [idClass, setIdClass] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      const fetchProgram = async () => {
        try {
          setLoading(true);
          const response = await getProgramById(user.token, eid);
          setProgram(response);
        } catch (error) {
          console.error('Error buscando el programa', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProgram();
    } else {
      setLoading(false);
    }
  }, [user, eid, refresh]);

  useEffect(() => {
    if (location.state === 'edit') {
      setIsModalEditOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  const handleEditProgram = async (newProgram) => {
    try {
      await updateProgram(user.token, eid, newProgram);
      setRefresh(!refresh);
      setIsModalEditOpen(false);
    } catch (error) {
      console.error('Error al actualizar el programa', error);
      setError(error.message);
    }
  };

  const handleCreateClass = async (classData) => {
    try {
      const newClass = await createClass(user.token, classData);
      setNewClassId(newClass.data._id)
      setRefresh(!refresh);
      setIsModalOpen(false);
      setIsCreated(true);
    } catch (error) {
      console.error('Error al crear la clase', error);
      setError(error.message);
    }
  };

  const handleDeleteClass = (id) => {
    setIdClass(id)
    setDeleteModal(true)
  }

  const handleConfirmDelete = async () => {
    await deleteClass(user.token, idClass)
    setDeleteModal(false)
    setRefresh(prevRefresh => !prevRefresh)
  }

  const handleEditClass = (classId) => {
    navigate(`/aulavirtual/clase/${classId}`);
  };

  if (loading) return <p className="text-center">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-row justify-between items-center mb-4'>
        <BackButton />
        <div className="flex items-center">
          <span className="text-white px-2 py-1 rounded mr-2" style={{backgroundColor: LEVELS_MAP[program.level]}}>{program.level}</span>
          <h1 className="text-3xl font-bold">{program.title}</h1>
        </div>
        <div className='flex items-center gap-6'>
          <button
            className={`flex items-center gap-4 bg-card hover:bg-Yellow font-extrabold text-Yellow hover:text-card border-2 border-card hover:border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={() => setIsModalEditOpen(true)}
          >
            Editar <EditIcon />
          </button>
          <button
            className={`flex items-center gap-4 bg-Yellow hover:bg-card font-extrabold text-card hover:text-Yellow border-2 border-Yellow hover:border-card rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={() => setIsModalOpen(true)}
          >
            Crear clase<AddIcon />
          </button>
        </div>
      </div>

      <div className="mt-6">
        {program.description ? (
          <p className="mb-2"><strong>Descripción:</strong> {program.description}</p>
        ) : null}
        <p className="mb-2"><strong>Idioma:</strong> {program.language}</p>
        <p className="mb-4"><strong>Profesor:</strong> {program.teacher.last_name}, {program.teacher.first_name}</p>
        {program.students.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold">Alumnos:</h3>
            <ul>
              {program.students.map((student) => (
                <li key={student._id}>{student.last_name}, {student.first_name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {program.classes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {program.classes.map((classroom) => (
            <ClassroomCard
              key={classroom._id}
              classroom={classroom}
              buttonFunction={handleEditClass}
              deleteButton={handleDeleteClass}
            />
          ))}
        </div>
      ) : (
        <p>No tiene clases cargadas</p>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Clase">
        <CreateClassForm
          programData={program}
          onSubmit={handleCreateClass}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
      <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} title="Editar Aula">
        <EditVCRForm
          onSubmit={handleEditProgram}
          program={program}
          onClose={() => setIsModalEditOpen(false)}
          teacherId={''}
          token={user.token}
        />
      </Modal>
      <Modal isOpen={isCreated} onClose={() => setIsCreated(false)} modalSize={'small'}>
        <CreatedClass
          onClose={() => setIsCreated(false)}
          logo={logo}
          pathNewClass={`/workspace/class/${newClassId}`}
        />
      </Modal>
      <Modal modalSize={'small'} isOpen={deleteModal}>
          <div className="flex justify-center ">
            <img src={popUp} alt="Eliminar clase" />
          </div>
          <div className='flex gap-4'>
            <button
              onClick={() => setDeleteModal(false)}
              className="w-full px-4 py-2 border border-Purple text-Purple  rounded-md hover:bg-Purple hover:text-white">
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="w-full px-4 py-2 bg-Purple text-white rounded-md hover:bg-PurpleHover">
              Eliminar clase
            </button>
          </div>
      </Modal>
    </div>
  );
};

export default ProgramDetail;
