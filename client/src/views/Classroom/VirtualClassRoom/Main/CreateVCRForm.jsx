import { useEffect, useState } from 'react';
import { getPrograms } from '../../../../services/programs.services';
import { getStudents, inviteStudent } from '../../../../services/students.services';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import { useAppStore } from '../../../../store/useAppStore';
import Modal from '../../../../components/Modal';
import AddStudentForm from '../../../../components/AddStudentForm';

const CreateVCRForm = ({ onSubmit, onClose, teacherId, token }) => {
  const { user } = useAppStore();
  const [programData, setProgramData] = useState({
    studentIds: [],
    daysOfWeek: [],
    startDateTime: '',
  });
  const [refresh, setRefresh] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPrograms = await getPrograms(token, teacherId);
        setPrograms(fetchedPrograms.data);
        const fetchedStudents = await getStudents(token, teacherId);
        setStudents(fetchedStudents.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, teacherId, refresh]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === 'startDate' || name === 'time') {
        const date = newData.startDate || prevData.startDate;
        const time = newData.time || prevData.time;
        if (date && time) {
          newData.startDateTime = `${date}T${time}`;
        }
      }
      return newData;
    });
  };

  const handleSelectChange = (field, value) => {
    setProgramData({
      ...programData,
      [field]: value,
    });
  };

  const handleStudentChange = (studentId) => {
    const selected = students.find(student => student._id === studentId)
    setSelectedStudent(selected);
  };

  const handleAddStudent = () => {
    if (selectedStudent && !programData.studentIds.includes(selectedStudent._id)) {
      setProgramData({
        ...programData,
        studentIds: [...programData.studentIds, selectedStudent._id],
      });
      setSelectedStudent(null);
    }
  };

  const handleRemoveStudent = (studentId) => {
    setProgramData({
      ...programData,
      studentIds: programData.studentIds.filter(id => id !== studentId),
    });
  };

  const handleDayChange = (day) => {
    setProgramData((prevData) => {
      const daysOfWeek = prevData.daysOfWeek.includes(day)
        ? prevData.daysOfWeek.filter((d) => d !== day)
        : [...prevData.daysOfWeek, day];
      return { ...prevData, daysOfWeek };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...programData, startDateTime: programData.startDateTime });
  };

  // MODAL STUDENT
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAddOneMoreStudent = async (newStudent) => {
    try {
      const addedStudent = await inviteStudent(user.token, newStudent);
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar al alumno', error);
    }
    console.log(newStudent);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <DropdownSelect
            label="Programa"
            options={programs.map(program => ({ label: program.title, value: program._id }))}
            selectedOption={
              programData.templateId ? 
              programs.find(program => program._id === programData.templateId).title
              : 'Seleccionar programa'
            }
            onSelect={(value) => handleSelectChange('templateId', value)}
          />
        </div>
        <div className="mb-4 w-full">
          <div className="flex items-center mb-2">
            <DropdownSelect
              label="Estudiante/s"
              options={students.map(student => ({ label: `${student.last_name}, ${student.first_name}`, value: student._id }))}
              selectedOption={selectedStudent ? `${selectedStudent.last_name}, ${selectedStudent.first_name}` : 'Seleccionar Estudiante'}
              onSelect={handleStudentChange}
            />
            <button
              type="button"
              onClick={handleAddStudent}
              className="self-end ml-2 bg-Yellow text-darkGray px-5 py-3 rounded-md hover:bg-darkGray hover:text-Yellow duration-150"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleModalOpen}
              className="self-end ml-2 bg-Yellow text-darkGray px-4 py-3 rounded-md hover:bg-darkGray hover:text-Yellow duration-150"
            >
              Invitar
            </button>
          </div>
          <div className="flex flex-col">
            {programData.studentIds.map((studentId) => {
              const student = students.find((s) => s._id === studentId);
              return (
                <div key={studentId} className="flex items-center m-1 p-2 border rounded-md bg-gray-200">
                  <span>{student ? `${student.last_name}, ${student.first_name}` : 'Estudiante desconocido'}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(studentId)}
                    className="ml-2 text-red-500"
                  >
                    x
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 px-0">Fecha de inicio</label>
          <div className='flex gap-10'>
            <input
              type="date"
              name="startDate"
              value={programData.startDate}
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded-md"
            />

            <input
              type="time"
              name="time"
              value={programData.time}
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <label className='px-0'>Hora fin</label>
          <input
              type="time"
              name="endTime"
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded-md"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Seleccionar Día/s</label>
          <div className='flex flex-row gap-5'>
            {days.map((day) => (
              <div className='relative' key={day}>
                <input
                  type="checkbox"
                  id={day}
                  name="daysOfWeek"
                  value={day}
                  onChange={() => handleDayChange(day)}
                  checked={programData.daysOfWeek.includes(day)}
                  className="hidden"
                />
                <label htmlFor={day}
                  className={`flex items-center justify-center w-10 h-10 border-2 rounded-full cursor-pointer font-medium text-lg ${programData.daysOfWeek.includes(day)
                    ? 'bg-Purple text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                  {day.slice(0, 2).toUpperCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="w-full bg-transparent text-Purple border border-Purple px-4 py-2 rounded-md mr-2 hover:bg-Purple hover:text-white duration-150"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full bg-Purple text-white px-4 py-2 rounded-md hover:bg-PurpleHover duration-150"
          >
            Crear Aula
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Agregar Alumno" modalSize='medium'>
        <AddStudentForm
          onSubmit={handleAddOneMoreStudent}
          onClose={handleModalClose}
        />
      </Modal>
    </>
  );
};

export default CreateVCRForm;
