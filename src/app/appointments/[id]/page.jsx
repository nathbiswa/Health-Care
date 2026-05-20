
import DoctorDetailsCard from "@/Components/DoctorDetailsCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DocDetailsPage = async ({ params }) => {

    const { token } = await auth.api.getToken({
        headers: await headers() // you need to pass the headers object.
    });
    // console.log('token from details', token)

    const { id } = await params;

    const res = await fetch(`https://appionment-server.vercel.app/doclist/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
    });

    const doctor = await res.json();
    // console.log('from details', doctor)

    return (
        <div className="py-10 px-4">
            <DoctorDetailsCard
                doctor={doctor}
            />
        </div>
    );
};

export default DocDetailsPage;