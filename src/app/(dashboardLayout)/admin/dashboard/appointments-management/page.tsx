import AppointmentsTable from "@/components/modules/Admin/AppointmentsManagement/AppointmentsTable";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAppointments } from "@/services/admin/appointmentsManagement";
import { Suspense } from "react";


const AppointmentsManagementPage = async (
    { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) => {

    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const response = await getAppointments(queryString);


    return (
        <>
            <div className="space-y-6">
                <ManagementPageHeader
                    title="Appointment Management"
                    description="View and manage all appointments"
                />
            </div>

            <div className="pt-5 pb-2">
                <Suspense fallback={<TableSkeleton columns={7} />}>
                    <AppointmentsTable appointments={response?.data || []} />
                </Suspense>
            </div>

            <TablePagination
                currentPage={response?.meta?.page || 1}
                totalPages={response?.meta?.totalPages || 1}
            />
        </>
    );
};

export default AppointmentsManagementPage;