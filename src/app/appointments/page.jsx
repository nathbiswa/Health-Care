import GlobalCard from "@/Components/GlobalCard";

const allAppoinmentDocFetch = async () => {
    const res = await fetch('http://localhost:8000/doclist');
    const data = await res.json();
    return data;
}


const AppoinmentPage = async () => {
    const doctors = await allAppoinmentDocFetch();
    // console.log("From all doclist", doctors);
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


                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    {doctors.map((doc) => <GlobalCard key={doc._id} doc={doc} />)}

                </div>
            </div>
        </section>
    );
};

export default AppoinmentPage;