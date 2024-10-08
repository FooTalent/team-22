import { useForm } from "react-hook-form";
import { useAppStore } from "../../store/useAppStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputList from "../../components/Form/InputList";
import Spinner from "../../components/Spinner/Spinner";

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const initialValues = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { userLogin, localLogin, status, userLoginGoogle } = useAppStore()

    const getInputConfig = (inputName) => {
        let params = {
            label: '',
            type: '',
            placeholder: '',
            validations: '',
            messageError: ''
        }

        switch (inputName) {
            case 'email':
                params = {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Ingresa tu email'
                };
                break;
            case 'password':
                params = {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: 'Ingresa tu contraseña'
                };
                break;
            default:
                break;
        }
        return params;
    };

    useEffect(() => {
        if (status) {
            navigate('/')
        }
    }, [status]);

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    const handleLogin = async (formData) => {
        setLoading(true)
        await userLogin(formData)
        await localLogin()
        setLoading(false)
    }

    const handleGoogleLogin = async () => {
        setLoading(true)
        await userLoginGoogle()
        setLoading(false)
    }

    return (
        <>
            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <Spinner />
                    </div>
                )
            }

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="formUser"
                noValidate
            >

                <InputList
                    data={initialValues}
                    register={register}
                    errors={errors}
                    getInputConfig={getInputConfig}
                />
                <Link
                    to={'/auth/forgot-password'}
                    className="link">
                    ¿Olvidaste tu contraseña?
                </Link>
                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="inputSubmit"
                />
            </form>
            <div className="flex w-full justify-between items-center">
                <hr className="w-full border border-black" />
                <span className="mx-2 text-black font-normal text-sm">O</span>
                <hr className="w-full border border-black" />
            </div>
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-4 cursor-pointer w-full px-6 py-[10px] border border-Grey rounded-lg shadow-sm bg-white">
                <img
                    className="w-[18px] h-[18px]"
                    src="/googleIcon.png"
                    alt="Google"
                />
                <span className="text-sm font-semibold">Continuar con Google</span>
            </button>

            <div className="flex justify-center items-center">
                <span className="font-semibold text-sm">¿No tienes cuenta?{' '}
                    <Link
                        to={'/auth/register'}
                        className="link">
                        Crear Cuenta
                    </Link>
                </span>
            </div>

        </>
    )
}

export default Login
