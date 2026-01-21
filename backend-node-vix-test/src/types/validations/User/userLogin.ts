import z from "zod";
import { userPasswordSchema } from "./userPassword";

export const userLoginSchema = z.object({
  password: userPasswordSchema,
  email: z.string().email("Invalid email"),
});

export type TUserLogin = z.infer<typeof userLoginSchema>;
