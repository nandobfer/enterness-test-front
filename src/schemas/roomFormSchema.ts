import z from "zod"

export const roomFormSchema = z.object({
    name: z.string().min(3, "o nome deve ter no mínimo 3 caracteres"),
    password: z.string().min(3, "a senha deve ter no mínimo 3 caracteres").optional(),
    user_id: z.uuid()
})

