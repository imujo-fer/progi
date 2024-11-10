import useGetUserRegisterInfo from "../../hooks/useGetUserRegisterInfo";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  const { data } = useGetUserRegisterInfo({ registrationHash: "hash" });
  const email = data?.email || "";
  const role = data?.roles || [];
  console.log(data);
  const department = data?.department.name || "";
  return <RegisterForm email={email} roles={role} department={department} />;
}
