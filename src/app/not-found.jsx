import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="text-center">

                {/* 404 Text */}
                <h1 className="text-7xl font-bold text-blue-600">404</h1>

                {/* Message */}
                <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                    Page Not Found
                </h2>

                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                    Sorry, the page you are looking for doesn’t exist or has been moved.
                </p>

                {/* Button */}
                <Link
                    href="/"
                    className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}