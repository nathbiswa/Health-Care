
import DoctorDetailsCard from "@/Components/DoctorDetailsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
export const metadata = {
    title: "Doctor Details - Book Appointments with Top Doctors",
};

const DocDetailsPage = async ({ params }) => {

    const { token } = await auth.api.getToken({
        headers: await headers() // you need to pass the headers object.
    });

    const { id } = await params;

    const res = await fetch(`https://appionment-server.vercel.app/doclist/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
    });

    const doctor = await res.json();


    return (
        <div className="py-10 px-4">
            <DoctorDetailsCard
                doctor={doctor}
            />
        </div>
    );
};

export default DocDetailsPage;