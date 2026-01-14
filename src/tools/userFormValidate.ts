import z from "zod"

export const userLoginSchema = z.object({
    email: z.email("e-mail inválido"),
    password: z.string().min(3, "a senha deve ter no mínimo 3 caracteres"),
})

export const userSignupSchema = userLoginSchema
    .extend({
        password_confirmation: z.string().min(3, "a confirmação de senha deve ter no mínimo 3 caracteres"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        error: "as senhas não coincidem",
        path: ["password_confirmation"],

    })
