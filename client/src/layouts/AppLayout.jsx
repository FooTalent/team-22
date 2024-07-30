import LogoHeader from '../components/LogoHeader'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore'
import { useEffect } from 'react'
import NavProfile from '../components/NavProfile'
import NavBar from '../components/NavBar'
import CurrentTime from '../components/CurrentTime'

export default function AppLayout() {
    const navigate = useNavigate()
    const { status, localLogin, fetchCurrentUser } = useAppStore()

    useEffect(() => {
        const initialize = async () => {
            await localLogin();
            await fetchCurrentUser();
        };
        initialize();
    }, [status]);

    if (!status) {
        navigate('/auth/login');
    }

    return (
        <>
            <div className='min-h-screen'>
                <header className='bg-Purple flex items-center justify-between w-full h-[80px] px-[115px] py-[16px]'>
                    <LogoHeader />
                    <NavBar />
                    <NavProfile />
                </header>
                <CurrentTime />
                <div className='mt-10'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}