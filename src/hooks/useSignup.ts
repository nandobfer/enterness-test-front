import { useForm, SubmitHandler } from "react-hook-form"
import { api } from "../backend"
import { sleep } from "../tools/sleep"
import { AxiosError } from "axios"
import { useLogin } from "./useLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSignupSchema } from "../schemas/userFormSchema"
import { UserFormDto } from "../types/users/users.entity"

export const useSignup = (login: ReturnType<typeof useLogin>, onClose: () => void) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<UserFormDto & { password_confirmation: string }>({ resolver: zodResolver(userSignupSchema) })

    const onSubmit: SubmitHandler<UserFormDto> = async (data) => {
        try {
            const response = await api.post("/users", data)
            onClose()
            login.setValue("email", data.email)
            login.setValue("password", data.password)
            await login.submitForm()
        } catch (error) {
            if (error instanceof AxiosError) {
                setError("email", { message: error.response?.data.message })
            }
        } finally {
            await sleep(1000)
        }
    }

    const submitForm = handleSubmit(onSubmit)

    return {
        register,
        errors,
        isSubmitting,
        submitForm,
    }
}
