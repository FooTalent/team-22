import React, { useState } from 'react';
import { LANGUAGES, LEVELS } from '../../../utils/valueLists';
import DropdownSelect from '../DropdownSelect';
import ButtonModal from '../../../components/Form/ButtonModal';

const CreateProgramForm = ({ onSubmit, onClose }) => {
  const [programData, setProgramData] = useState({
    title: '',
    description: '',
    language: LANGUAGES[0],
    level: LEVELS[0].data,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData({
      ...programData,
      [name]: value,
    });
  };

  const handleSelectChange = (field, value) => {
    setProgramData({
      ...programData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(programData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 text-card justify-evenly'
    >
      <div className="flex flex-col gap-3 font-medium">
        <label className="p-0 text-custom">Título</label>
        <input
          type="text"
          name="title"
          value={programData.title}
          onChange={handleInputChange}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe el nombre del programa...'
        />
      </div>

      <DropdownSelect
        label="Idioma"
        options={LANGUAGES}
        selectedOption={programData.language}
        onSelect={(value) => handleSelectChange('language', value)}
      />

      <DropdownSelect
        label="Nivel"
        options={LEVELS.map(level => level.data)}
        selectedOption={programData.level}
        onSelect={(value) => handleSelectChange('level', value)}
      />

      <div className="flex flex-col gap-3 font-medium">
        <label className="p-0 text-custom">Descripción</label>
        <input
          type="text"
          name="description"
          value={programData.description}
          onChange={handleInputChange}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe una breve descripción...'
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <ButtonModal buttonAction={onClose} type='prev' label='Cancelar' />
        <ButtonModal buttonAction={onClose} type='next' label='Crear Programa' />
      </div>
    </form>
  );
};

export default CreateProgramForm;