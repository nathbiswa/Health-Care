
import DoctorDetailsCard from "@/Components/DoctorDetailsCard";

const DocDetailsPage = async ({ params }) => {
    const { id } = await params;
    console.log('from details', id);

    const res = await fetch(`http://localhost:8000/doclist/${id}`);

    const doctor = await res.json();
    console.log('from details', doctor)

    return (
        <div className="py-10 px-4">
            <DoctorDetailsCard
                doctor={doctor}
            />
        </div>
    );
};

export default DocDetailsPage;