import Image from "next/image";
import GlobalCard from "./GlobalCard";


const allDoclistFetch = async () => {
    const res = await fetch('http://localhost:8000/toprated');
    const data = await res.json();
    return data;
}


const TopratedPage = async () => {
    const doctors = await allDoclistFetch();
    // console.log("From all doclist", doctors);
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Top Rated Doctors
                </h2>
                <p>

                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    {doctors.map((doc) => <GlobalCard key={doc._id} doc={doc} />)}

                </div>
            </div>
        </section>
    );
};

export default TopratedPage;