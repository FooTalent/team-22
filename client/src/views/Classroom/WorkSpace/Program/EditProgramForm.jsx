import React, { useEffect, useState } from 'react';
import { LEVELS } from '../../../../utils/valueLists';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import ButtonModal from '../../../../components/Form/ButtonModal';
import { getLanguages } from '../../../../services';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../../components/ErrorMessage';

const EditProgramForm = ({ onSubmit, onClose, program }) => {
  const [languageOptions, setLanguageOptions] = useState([]);
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
  const [programData, setProgramData] = useState({
    title: program.title,
    description: program.description,
    language: program.language,
    level: program.level,
  });

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const languages = await getLanguages();
        setLanguageOptions(languages.map(language => ({ value: language, label: language })));
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchValues();
  }, []);

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

  const handleFormSubmit = () => {
    onSubmit(programData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='flex flex-col gap-4 text-card justify-evenly'
    >
      <div className="flex flex-col gap-3 font-medium">
        <label className="p-0 text-custom">Título</label>
        <input
          type="text"
          name="title"
          value={programData.title}
          {...register("title", {
            required: "Escriba un titulo",
            onChange: (e) => {
              handleInputChange(e);
              clearErrors("title");
            }
          })}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe el nombre del programa...'
        />
        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-3 font-medium">
        <label className="p-0 text-custom">Descripción</label>
        <input
          type="text"
          name="description"
          value={programData.description}
          {...register("description", {
            required: "Brinde una descripción",
            onChange: (e) => {
              handleInputChange(e);
              clearErrors("description");
            }
          })}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe una breve descripción...'
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <DropdownSelect
        setValue={setValue}
        name="language"
        errors={errors}
        clearErrors={clearErrors}
        register={register("language", { required: "Selecciona un idioma" })}
        label="Idioma"
        options={languageOptions}
        selectedOption={programData.language}
        onSelect={(value) => handleSelectChange('language', value)}
      />

      <DropdownSelect
        setValue={setValue}
        name="level"
        errors={errors}
        clearErrors={clearErrors}
        register={register("level", { required: "Selecciona un nivel" })}
        label="Nivel"
        options={LEVELS.map(level => level.data)}
        selectedOption={programData.level}
        onSelect={(value) => handleSelectChange('level', value)}
      />

      <div className="grid grid-cols-2 gap-8 mt-6">
        <ButtonModal buttonAction={onClose} type='prev' label='Cancelar' />
        <ButtonModal buttonAction={onSubmit} type='next' label='Guardar Edición' />
      </div>
    </form>
  );
};

export default EditProgramForm;