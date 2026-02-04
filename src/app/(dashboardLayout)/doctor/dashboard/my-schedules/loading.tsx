import { TableSkeleton } from "@/components/shared/TableSkeleton";

export default function DoctorMySchedulesLoading() {
  return <TableSkeleton columns={8} rows={10} />;
}