import { PrivatePage } from "../auth/PrivatePage";
import { UserRegisterPage } from "../pages/UserRegister";

export const UserRegisterRouter = {
  path: "/colaborator-register",
  element: (
    <PrivatePage>
      <UserRegisterPage />
    </PrivatePage>
  ),
};
