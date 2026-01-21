import { z } from "zod";
import { userPasswordSchema } from "./userPassword";

export const userCreatedSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: userPasswordSchema,
  email: z.string().email("Invalid email"),
  profileImgUrl: z.string().nullable().optional(),
  role: z.enum(["admin", "member", "manager"]).optional(),
  idBrandMaster: z.number().optional(),
  isActive: z.boolean().optional().default(false),
});

export type TUserCreated = z.infer<typeof userCreatedSchema>;
