import { useForm, SubmitHandler } from "react-hook-form"
import { UserFormDto } from "../types/src/users/users.entity"
import { api, WebTokens } from "../backend"
import { sleep } from "../tools/sleep"
import { AxiosError } from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { userLoginSchema } from "../schemas/userFormSchema"
import { useUser } from "./useUser"

export const useLogin = () => {
    const user = useUser()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        setValue,
    } = useForm<UserFormDto>({ resolver: zodResolver(userLoginSchema) })

    const onSubmit: SubmitHandler<UserFormDto> = async (data) => {
        try {
            const response = await api.post<WebTokens>("/auth/login", data)
            user.onLogin(response.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    setError("password", { message: error.response?.data.message })
                }
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
        setValue,
    }
}
