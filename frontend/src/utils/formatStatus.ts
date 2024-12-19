import { TripStatusStatusEnum } from "@/api_gen";

export default function formatStatus(status: TripStatusStatusEnum) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
