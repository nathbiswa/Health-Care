import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* About */}
                <div>
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Health Care
                    </h2>
                    <p className="text-sm leading-6">
                        We provide trusted healthcare solutions with modern technology and expert doctors.
                        Your health is our top priority.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="hover:text-white">Home</Link></li>
                        <li><Link href="/services" className="hover:text-white">Services</Link></li>
                        <li><Link href="/doctors" className="hover:text-white">Doctors</Link></li>
                        <li><Link href="/appointments" className="hover:text-white">Appointments</Link></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Support</h2>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                        <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white"><FaFacebookF /></a>
                        <a href="#" className="hover:text-white"><FaTwitter /></a>
                        <a href="#" className="hover:text-white"><FaInstagram /></a>
                        <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm">
                © {new Date().getFullYear()} Health Care. All rights reserved.
            </div>
        </footer>
    );
}