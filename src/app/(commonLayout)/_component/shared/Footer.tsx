"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import logo from "../../../../../public/logo/logo2.png";

export default function Footer() {
    return (
        <footer className="bg-[#0f172a] text-gray-300 py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand Info */}
                <div>
                    <div className="flex items-center group">
                        <div className="relative w-12 h-12 overflow-hidden group-hover:scale-105 transition-transform duration-200">
                            <Image src={logo} alt="Logo" fill />
                        </div>
                        <span className="text-xl ml-2 font-bold bg-linear-to-r from-emerald-400 to-blue-500 text-transparent bg-clip-text group-hover:from-teal-400 group-hover:to-purple-500 transition-all duration-300">
                            Pathfinder
                        </span>
                    </div>
                    <p className="text-sm mb-4 leading-relaxed">
                        Your trusted companion for exploring destinations, discovering hidden gems,
                        and connecting with the best local guides.
                    </p>

                    <div className="flex space-x-4">
                        <Link href="#" aria-label="Facebook" className="hover:text-emerald-400 transition-colors">
                            <Facebook size={18} />
                        </Link>
                        <Link href="#" aria-label="Twitter" className="hover:text-emerald-400 transition-colors">
                            <Twitter size={18} />
                        </Link>
                        <Link href="#" aria-label="Instagram" className="hover:text-emerald-400 transition-colors">
                            <Instagram size={18} />
                        </Link>
                        <Link href="#" aria-label="LinkedIn" className="hover:text-emerald-400 transition-colors">
                            <Linkedin size={18} />
                        </Link>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Destinations</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Popular Tours</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Top Guides</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Reviews</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Travel Blog</Link></li>
                    </ul>
                </div>

                {/* For Guides */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">For Guides</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Become a Guide</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Guide Dashboard</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Training Resources</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Success Stories</Link></li>
                        <li><Link href="#" className="hover:text-emerald-400 transition-colors">Help Center</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <Phone size={16} className="text-emerald-400 mt-1" />
                            <div>
                                <p>+880 1700-987654</p>
                                <p className="text-gray-400">Mon–Fri 9am–6pm BST</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-2">
                            <Mail size={16} className="text-emerald-400 mt-1" />
                            <div>
                                <p>support@pathfinder.com</p>
                                <p className="text-gray-400">24/7 Email Support</p>
                            </div>
                        </li>

                        <li className="flex items-start gap-2">
                            <MapPin size={16} className="text-emerald-400 mt-1" />
                            <div>
                                <p>House #45, Road #12</p>
                                <p className="text-gray-400">Banani, Dhaka-1213, Bangladesh</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom */}
            <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>© {new Date().getFullYear()} Pathfinder. All rights reserved.</p>

                <div className="flex space-x-4 mt-3 md:mt-0">
                    <Link href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
                    <Link href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
                    <Link href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    );
}