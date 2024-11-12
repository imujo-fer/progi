import { Navigate } from "@tanstack/react-router";
import useGetUserRegisterInfo from "../../hooks/useGetUserRegisterInfo";
import RegisterForm from "./components/RegisterForm";
import { registerRoute } from "./register.routes";
import { Skeleton } from "antd";

export default function Register() {
  const { hash } = registerRoute.useParams();
  const { data, error, isLoading } = useGetUserRegisterInfo({
    registrationHash: hash,
  });

  if (isLoading) return <Skeleton />;
  if (error) return <Navigate to="/login" />;

  if (data)
    return (
      <RegisterForm
        email={data?.email || ""}
        roles={data?.roles || []}
        department={data?.department.name || ""}
      />
    );
}
