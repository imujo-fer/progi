import { Link } from "@tanstack/react-router";
import { Button } from "antd";

interface ActionButtonProps {
  requestNumber: string;
}

export default function ActionButton({ requestNumber }: ActionButtonProps) {
  const statusItem = {
    action: "Review Request",
    link: `${requestNumber}/review`,
  };

  return (
    <>
      {statusItem ? (
        <Link to={statusItem.link}>
          <Button className="w-48">{statusItem.action}</Button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
