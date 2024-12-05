// src/components/Footer.jsx

import React from "react";
import { assets } from "../assets/assets"; // Importing assets from assets.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <img
              src={assets.SoundWave_Logo} // Corrected to use assets
              alt="SoundWave Logo"
              className="w-10 h-10 mr-2"
            />
            <span className="text-2xl font-bold">SoundWave</span>
          </div>
          <div className="flex space-x-4 mt-4">
            {/* Social Media Icons */}
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-[#06A0B5] w-6 h-6 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-[#06A0B5] w-6 h-6 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-[#06A0B5] w-6 h-6 cursor-pointer"
            />
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col">
          <h2 className="text-gray-400 font-semibold mb-4">COMPANY</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300">About</li>
            <li className="cursor-pointer hover:text-gray-300">Jobs</li>
            <li className="cursor-pointer hover:text-gray-300">
              For the Record
            </li>
          </ul>
        </div>

        {/* Communities Links */}
        <div className="flex flex-col">
          <h2 className="text-gray-400 font-semibold mb-4">COMMUNITIES</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300">For Artists</li>
            <li className="cursor-pointer hover:text-gray-300">Developers</li>
            <li className="cursor-pointer hover:text-gray-300">Advertising</li>
            <li className="cursor-pointer hover:text-gray-300">Investors</li>
            <li className="cursor-pointer hover:text-gray-300">Vendors</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col mt-8 md:mt-0">
          <h2 className="text-gray-400 font-semibold mb-4">USEFUL LINKS</h2>
          <ul className="space-y-2">
            <li className="cursor-pointer hover:text-gray-300">Support</li>
            <li className="cursor-pointer hover:text-gray-300">Web Player</li>
            <li className="cursor-pointer hover:text-gray-300">
              Free Mobile App
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Links */}
      <div className="container mx-auto mt-10 text-sm text-gray-500 flex flex-wrap justify-between">
        <div className="space-x-4">
          <span className="cursor-pointer hover:text-gray-300">Legal</span>
          <span className="cursor-pointer hover:text-gray-300">
            Privacy Center
          </span>
          <span className="cursor-pointer hover:text-gray-300">
            Privacy Policy
          </span>
          <span className="cursor-pointer hover:text-gray-300">Cookies</span>
          <span className="cursor-pointer hover:text-gray-300">About Ads</span>
        </div>
        <div className="mt-4 md:mt-0">© 2024 SoundWave</div>
      </div>
    </footer>
  );
};

export default Footer;
