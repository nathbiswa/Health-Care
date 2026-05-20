import SearchableDoctors from "@/Components/SearchableDoctors";


const allAppoinmentDocFetch = async () => {
    const res = await fetch('https://appionment-server.vercel.app/doclist');
    const data = await res.json();
    return data;
}

const AppoinmentPage = async () => {
    const doctors = await allAppoinmentDocFetch();

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="w-[300px] mx-auto">
                    <h2 className="text-3xl text-center font-bold text-gray-800 mb-10">
                        All Appoinment
                    </h2>
                    <p className="text-gray text-center">
                        Find the right doctor for your needs from our list of available appointments.
                    </p>
                </div>

                <SearchableDoctors initialDoctors={doctors} />

            </div>
        </section>
    );
};

export default AppoinmentPage;