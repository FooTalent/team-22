import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { dayjsLocalizer } from 'react-big-calendar';
import ClassCalendar from '../../components/user/calendar/ClassCalendar';
import ModalCalendar from '../../components/user/calendar/ModalCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Toast } from '../../utils/toast';
import { deleteClass, getClassesByTeacherAndDate } from '../../services/programs.services'
import popUp from '/ImagesVCR/EliminarAula.png'
import ButtonModal from '../../components/Form/ButtonModal';
import Modal from '../../components/Modal';

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const { user, userDetail } = useAppStore()
    const [classes, setClasses] = useState([])
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [classIdToDelete, setClassIdToDelete] = useState(null);

    useEffect(() => {
        fetchTeacherClasses()
    }, [])

    const fetchTeacherClasses = async () => {
        // startDate=2024-07-01&endDate=2024-08-01
        const newClasses = await getClassesByTeacherAndDate(user.token, userDetail._id, '')
        if (!newClasses.isError) {
            setClasses(newClasses.data);
        } else {
            Toast.fire({
                title: 'No ha sido posible obtener las clases',
                icon: 'error'
            })
        }
    }

    const handleDate = (date) => {
        return dayjs(date).format('dddd D [-] MMMM [-] YYYY')
            .split(' ')
            .map((item, index) => (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item))
            .join(' ');
    };

    const handleNavigate = (action, view) => {
        const newDate = action === 'PREV' ? dayjs(date).subtract(1, view).toDate()
            : action === 'NEXT' ? dayjs(date).add(1, view).toDate()
                : new Date();
        setDate(newDate);
    };

    const handleSelectSlot = (e) => {
        setDate(dayjs(e.start).toDate());
        setOpen(true);
    };

    const handleDelete = (classId) => {
        setOpen(false);
        setDeleteModal(true);
        setClassIdToDelete(classId);
    }

    const handleCancelDelete = () => {
        setDeleteModal(false)
        setOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (!classIdToDelete) return;

        try {
            const response = await deleteClass(user.token, classIdToDelete);
            if (!response.isError) {
                Toast.fire({
                    title: 'Clase eliminada con éxito',
                    icon: 'success',
                });
                setDeleteModal(false);
                setOpen(true);
                fetchTeacherClasses();
            } else {
                Toast.fire({
                    title: 'No se pudo eliminar la clase',
                    icon: 'error',
                });
            }
        } catch (error) {
            Toast.fire({
                title: 'Error en la solicitud de eliminación',
                icon: 'error',
            });
        }
    }

    return (
        <>
            <main className='container mx-auto flex flex-col gap-5'>
                <ClassCalendar
                    localizer={localizer}
                    date={date}
                    handleNavigate={handleNavigate}
                    handleSelectSlot={handleSelectSlot}
                    handleDate={handleDate}
                    data={classes}
                />
            </main>

            <ModalCalendar
                open={open}
                setOpen={setOpen}
                onNavigate={handleNavigate}
                label={handleDate(date)}
                data={classes}
                selectedDay={date}
                openModalDelete={handleDelete}
                confirmDelete={handleConfirmDelete}
            />

            <Modal modalSize={'xsmall'} isOpen={deleteModal}>
                <div className='flex flex-col gap-8'>
                    <div className="flex justify-center ">
                        <img src={popUp} alt="Eliminar aula" />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <ButtonModal buttonAction={handleCancelDelete} type={'prev'} label={'Cancelar'} />
                        <ButtonModal buttonAction={handleConfirmDelete} label={'Eliminar aula'} />
                    </div>
                </div>

            </Modal>
        </>
    );
}