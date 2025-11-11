import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {

    const defaultDashboard = getDefaultDashboardRoute(role)

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ['Admin', 'Doctor', 'Patient']
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ['Admin', 'Doctor', 'Patient']
                },
            ]
        },
        {
            title: 'Settings',
            items: [
                {
                    title: 'Change Password',
                    href: '/change-password',
                    icon: 'Settings',
                    roles: ['Patient']
                }
            ]
        },
    ]
}

export const doctorNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "Appointments",
                href: "/doctor/dashboard/appointments",
                icon: "Calendar", 
                badge: "3",
                roles: ['Doctor'],
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock", 
                roles: ['Doctor'],
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText", 
                roles: ['Doctor'],
            },
        ],
    }
]

export const patientNavItems: NavSection[] = [
    {
        title: 'Appointments',
        items: [
            {
                title: 'My Appointments',
                href: '/dashboard/my-appointments',
                icon: 'Calender',
                roles: ['Patient']
            },
            {
                title: 'Book Appointment',
                href: '/consultation',
                icon: 'ClipboardList',
                roles: ['Patient']
            },
        ]
    },
    {
        title: 'Medical Records',
        items: [
            {
                title: 'My Prescriptions',
                href: '/dashboard/my-prescriptions',
                icon: 'FileText',
                roles: ['Patient']
            },
            {
                title: 'Health Records',
                href: '/dashboard/health-records',
                icon: 'Activity',
                roles: ['Patient']
            },
        ]
    }
]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", 
                roles: ['Admin'],
            },
            {
                title: "Doctors",
                href: "/admin/dashboard/doctors-management",
                icon: "Stethoscope", 
                roles: ['Admin'],
            },
            {
                title: "Patients",
                href: "/admin/dashboard/patients-management",
                icon: "Users", 
                roles: ['Admin'],
            },
        ],
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "Calendar", 
                roles: ['Admin'],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock", 
                roles: ['Admin'],
            },
            {
                title: "Specialities",
                href: "/admin/dashboard/specialities-management",
                icon: "Hospital", 
                roles: ['Admin'],
            },
        ],
    }
]


export const getNavItemsByRole = (role: UserRole): NavSection[] =>{
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "Admin":
            return [...commonNavItems, ...adminNavItems];
        case "Doctor":
            return [...commonNavItems, ...doctorNavItems];
        case "Patient":
            return [...commonNavItems, ...patientNavItems];
        default:
            return [];
    }
}

