import Image from "next/image";
import GlobalCard from "./GlobalCard";


const allDoclistFetch = async () => {
    const res = await fetch('https://appionment-server.vercel.app/toprated');
    const data = await res.json();
    return data;
}


const TopratedPage = async () => {
    const doctors = await allDoclistFetch();

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="w-full md:w-[500px] text-center mx-auto">
                    <h2 className="text-sm md:text-3xl font-bold text-center text-gray-800 mb-10">
                        Top Rated Doctors
                    </h2>
                    <p className="text-sm text-gray-500 md:text-md">
                        Find the best doctors with top ratings, <br /> verified reviews, and proven expertise.
                    </p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                    {doctors.map((doc) => <GlobalCard key={doc._id} doc={doc} />)}

                </div>
            </div>
        </section>
    );
};

export default TopratedPage;