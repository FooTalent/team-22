import React, { useState } from 'react';
import { dayjsLocalizer } from 'react-big-calendar';
import ClassCalendar from '../../components/user/calendar/ClassCalendar';
import Modal from '../../components/user/calendar/Modal';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);

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

    return (
        <>
            <main className='flex flex-col gap-5 px-10'>
                <ClassCalendar
                    localizer={localizer}
                    date={date}
                    handleNavigate={handleNavigate}
                    handleSelectSlot={handleSelectSlot}
                    events={events}
                    handleDate={handleDate}
                />
            </main>

            <Modal
                open={open}
                setOpen={setOpen}
                onNavigate={handleNavigate}
                label={handleDate(date)}
            />
        </>
    );
}