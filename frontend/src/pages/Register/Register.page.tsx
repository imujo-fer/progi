import useGetUserRegisterInfo from "../../hooks/useGetUserRegisterInfo";
import RegisterForm from "./components/RegisterForm";

export default function Register() {
  const { data } = useGetUserRegisterInfo({ registrationHash: "hash" });
  return (
    <RegisterForm
      email={data?.email || ""}
      roles={data?.roles || []}
      department={data?.department.name || ""}
    />
  );
}
