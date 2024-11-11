import useGetUserRegisterInfo from "../../hooks/useGetUserRegisterInfo";
import RegisterForm from "./components/RegisterForm";
import { registerRoute } from "./register.routes";

export default function Register() {
  const { hash } = registerRoute.useParams();
  const { data } = useGetUserRegisterInfo({ registrationHash: hash });
  return (
    <RegisterForm
      email={data?.email || ""}
      roles={data?.roles || []}
      department={data?.department.name || ""}
    />
  );
}
