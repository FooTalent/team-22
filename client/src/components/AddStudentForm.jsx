import React, { useState } from 'react';
import { LEVELS, LEVELS_MAP } from '../utils/valueLists';
import ButtonModal from './Form/ButtonModal';

const AddStudentForm = ({ onSubmit, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('A1-A2');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ first_name: firstName, last_name: lastName, email, level, birthday, phone });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className='flex flex-col gap-2'>
        <label htmlFor="nombre" className='p-0 text-lg leading-5 font-medium'>Nombre</label>
        <input
          type="text"
          id='nombre'
          placeholder="Ingresa tu nombre"
          value={firstName}
          onChange={(e) =>
            setFirstName(e.target.value)}
          className={`border ${firstName ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="apellido" className='p-0 text-lg leading-5 font-medium'>Apellido</label>
        <input
          id='apellido'
          type="text"
          placeholder="Ingresa tu apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={`border ${lastName ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="email" className='p-0 text-lg leading-5 font-medium'>Email</label>
        <input
          id='email'
          type="email"
          placeholder="Ingresa tu Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`border ${email ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="nivel" className='p-0 text-lg leading-5 font-medium'>Nivel</label>
        <select
          id='nivel'
          name="level"
          value={level}
          onChange={(value) => setLevel(value)}
          className={`border ${level ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
          style={{ color: LEVELS_MAP[level] }}
        >
          <option value='' disabled>Selecciona el nivel</option>
          {LEVELS.map((level, i) => (
            <option key={i} value={level.data}>
              {level.data}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="fechaNacimiento" className='p-0 text-lg leading-5 font-medium'>Fecha de nacimiento</label>
        <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className={`border ${birthday ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="tel" className='p-0 text-lg leading-5 font-medium'>Teléfono</label>
        <input
          id='tel'
          type="tel"
          placeholder="+54 - 11 - 0000 - 0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={`border ${phone ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
        />
      </div>

      <div className="grid grid-cols-2 gap-8 mt-5">
        <ButtonModal buttonAction={onClose} type={'prev'} label={'Cancelar'} />
        <ButtonModal type={'submit'} label={'Guardar'} />
      </div>
    </form>
  );
};

export default AddStudentForm;
