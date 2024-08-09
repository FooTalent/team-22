import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getReviews, getStudents, inviteStudent } from '../../services/students.services';
import { crearURLCompleta } from '../../utils/urifoto';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import AddStudentForm from '../../components/AddStudentForm';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';

const ViewStudent = () => {
  const { user, userDetail } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [score, setScore] = useState([])
  const [showInfo, setShowInfo] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      const fetchStudents = async () => {
        try {
          setLoading(true);
          const response = await getStudents(user.token);
          setStudents(response.data);
          const filter = { eid: userDetail._id }
          const res = await getReviews(user.token, filter)
          setScore(res.data)
        } catch (error) {
          console.error('Error fetching students', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchStudents();
    } else {
      setLoading(false);
    }
  }, [user, userDetail, refresh]);

  const handleShowInfo = () => setShowInfo(true);
  const handleShowGrades = () => setShowInfo(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddStudent = async (newStudent) => {
    try {
      const addedStudent = await inviteStudent(user.token, newStudent);
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar al alumno', error);
      setError(error.message);
    }
  };

  const handleBirthday = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
  }

  return (
    <div className="container mx-auto py-4 flex flex-col gap-14 text-card">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <button
            onClick={handleShowInfo}
            className={`w-[200px] border-2 px-4 py-3 rounded-lg leading-5 tracking-wide ease-out duration-600 hover:bg-Yellow hover:font-extrabold ${showInfo
              ? 'border-Yellow bg-Yellow font-extrabold'
              : 'border-Yellow text-black bg-YellowDeselect'
              }`}
          >
            Información Personal
          </button>
          <button
            onClick={handleShowGrades}
            className={`w-[144px] border-2 px-4 py-3 rounded-lg leading-5 tracking-wide ease-out duration-600 hover:bg-Yellow hover:font-extrabold ${!showInfo
              ? 'border-Yellow bg-Yellow font-extrabold'
              : 'border-Yellow text-black bg-YellowDeselect'
              }`}
          >
            Calificaciones
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="¿Qué estas buscando?"
              className="border border-Grey rounded-lg px-4 py-3 pl-11 w-[566px] h-[48px] bg-inputBg text-card placeholder:text-Grey outline-none focus:border-Purple hover:border-Purple"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444]" />
          </div>

          <button className="bg-Purple tracking-wide hover:bg-PurpleHover text-white font-extrabold px-4 py-3 rounded-lg h-[48px] ease-out duration-600">
            Buscar
          </button>
        </div>
      </div>

      <table className="flex flex-col bg-white gap-4">
        <thead className='border border-Purple rounded-xl py-6 shadow-customTable flex items-center gap-6'>
          <tr className='flex justify-between w-full px-4 text-tableHead text-lg leading-5'>
            {showInfo ? (
              <>
                <th className='max-w-[250px]'>Nombre y Apellido</th>
                <th className='max-w-[120px]'>Nivel</th>
                <th className='max-w-[168px] whitespace-nowrap'>Fecha de Nacimiento</th>
                <th className='max-w-[160px]'>Teléfono</th>
                <th className='max-w-[300px]'>Email</th>
              </>
            ) : (
              <>
                <th className='w-[250px]'>Nombre y Apellido</th>
                <th className='w-[160px]'>Nivel</th>
                <th className='w-[160px]'>Oral</th>
                <th className='w-[160px]'>Escrito</th>
                <th className='w-[160px]'>Lectura</th>
                <th className='w-[90px]'>Info.</th>
              </>
            )}
          </tr>
        </thead>

        <tbody className='border border-Purple rounded-xl shadow-customTable p-4 flex flex-col items-center'>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Cargando...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="text-center py-4 text-red-500">
                Error: {error}
              </td>
            </tr>
          ) : students.length > 0 ? (
            students.map((student, index) => (
              <tr
                key={student._id}
                className={`border-b text-tableHead ${index === 0 ? 'pt-0' : ''
                  } ${index === students.length - 1 ? 'border-none pb-0' : ''
                  } flex justify-between items-center w-full py-6 border-Purple gap-6`}
              >
                {showInfo ? (
                  <>
                    <td className='w-[250px] gap-4 items-center'>
                      {student.photo ? (
                        <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                      ) : (
                        <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                      )}
                      <span className='w-[184px]'>{student.first_name} {student.last_name}</span>
                    </td>
                    <td className='w-[120px]'>{student.level}</td>
                    <td className='max-w-[168px] whitespace-nowrap'>{handleBirthday(student.birthday)}</td>
                    <td className='w-[160px]'>{student.phone}</td>
                    <td className='w-[300px]'>{student.email}</td>
                  </>
                ) : (
                  <>
                    <td className='w-[250px] gap-6'>
                      {student.photo ? (
                        <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                      ) : (
                        <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                      )}
                      <span className='w-[184px]'>{student.first_name} {student.last_name}</span>
                    </td>
                    <td className='w-[160px]'>{student.level}</td>
                    <td className='w-[160px]'>{student.oral}</td>
                    <td className='w-[160px]'>{student.written}</td>
                    <td className='w-[160px]'>{student.reading}</td>
                    <td className='w-[90px]'>
                      <Link
                        to={`/student/${student._id}`}
                        className="bg-Purple hover:bg-PurpleHover whitespace-nowrap font-extrabold text-base text-white py-3 px-4 rounded-lg ease-out duration-600">
                        Ver más
                      </Link>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4">No se encontraron estudiantes</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleModalOpen}
          className="bg-Yellow hover:bg-card hover:text-Yellow font-extrabold tracking-wide flex gap-[10px] px-6 py-4 w-[370px] justify-center items-center rounded-lg text-xl leading-7 ease-out duration-600"
        >
          <span>Agregar alumno</span>
          <AddIcon />
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Agregar Alumno" modalSize='small'>
        <AddStudentForm
          onSubmit={handleAddStudent}
          onClose={handleModalClose}
        />
      </Modal>
    </div>
  );
};

export default ViewStudent;







