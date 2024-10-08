import { useAppStore } from "../../store/useAppStore";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import InputList from '../../components/Form/InputList';
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";

export default function NewPassword() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const initialValues = {
        password: '',
        rPassword: '',
    }

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

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm({
        defaultValues: initialValues, mode: 'onChange', reValidateMode: 'onChange'
    })

    const currentUrl = window.location.href
    const parsedUrl = new URL(currentUrl);
    const token = parsedUrl.searchParams.get('token');
    const { newPassword, change } = useAppStore()

    const getInputConfig = (inputName) => {
        let params = {
            label: '',
            type: '',
            placeholder: '',
            validations: '',
            messageError: ''
        }

        switch (inputName) {
            case 'password':
                params = {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: 'Crea una nueva contraseña',
                    validations: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                    messageError: `La contraseña debe contener:
                    \nMínimo 8 carácteres
                    \nUna letra mayúscula 
                    \nUna letra minúscula 
                    \nUn carácter especial`,
                };
                break;
            case 'rPassword':
                params = {
                    label: 'Repetir contraseña',
                    type: 'password',
                    placeholder: 'Repite la nueva contraseña',
                    validations: {
                        validate: (value) => value === watch('password') || 'Las contraseñas no coinciden',
                    },
                    messageError: 'Las contraseñas no coinciden',
                };
                break;
            default:
                break;
        }

        return params;
    };

    const handlePassword = async (formData) => {
        setLoading(true)
        const { password } = formData
        await newPassword(password, token)
        if (change) {
            navigate("/auth/login");
        }
        reset()
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

            <p className="text-2xl font-[500] text-black">
                Restablece tu contraseña
            </p>
            <form
                onSubmit={handleSubmit(handlePassword)}
                className="formUser"
                noValidate
            >
                <InputList
                    data={initialValues}
                    register={register}
                    errors={errors}
                    getInputConfig={getInputConfig}
                />

                <input
                    type="submit"
                    value='Cambiar contraseña'
                    className="inputSubmit"
                />
            </form>
            <Link
                to={'/auth/login'}
                className='link'
            >Volver al inicio</Link>
        </>
    )
}
