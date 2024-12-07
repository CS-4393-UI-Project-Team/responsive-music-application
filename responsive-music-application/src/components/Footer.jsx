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
    <footer className="bg-black text-white py-3 px-2">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <div className="flex items-center mb-3">
            <img
              src={assets.SoundWave_Logo} // Corrected to use assets
              alt="SoundWave Logo"
              className="w-8 h-8 mr-2"
            />
            <span className="text-lg font-bold">SoundWave</span>
          </div>
          <div className="flex space-x-3 mt-2">
            {/* Social Media Icons */}
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-[#06A0B5] w-5 h-5 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faTwitter}
              className="text-[#06A0B5] w-5 h-5 cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faFacebookF}
              className="text-[#06A0B5] w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col">
          <h2 className="text-gray-400 font-medium text-sm mb-2">COMPANY</h2>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:text-gray-300">About</li>
            <li className="cursor-pointer hover:text-gray-300">Jobs</li>
            <li className="cursor-pointer hover:text-gray-300">
              For the Record
            </li>
          </ul>
        </div>

        {/* Communities Links */}
        <div className="flex flex-col">
          <h2 className="text-gray-400 font-medium text-sm mb-2">
            COMMUNITIES
          </h2>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:text-gray-300">For Artists</li>
            <li className="cursor-pointer hover:text-gray-300">Developers</li>
            <li className="cursor-pointer hover:text-gray-300">Advertising</li>
            <li className="cursor-pointer hover:text-gray-300">Investors</li>
            <li className="cursor-pointer hover:text-gray-300">Vendors</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="flex flex-col mt-6 md:mt-0">
          <h2 className="text-gray-400 font-medium text-sm mb-2">
            USEFUL LINKS
          </h2>
          <ul className="space-y-1 text-sm">
            <li className="cursor-pointer hover:text-gray-300">Support</li>
            <li className="cursor-pointer hover:text-gray-300">Web Player</li>
            <li className="cursor-pointer hover:text-gray-300">
              Free Mobile App
            </li>
          </ul>
        </div>
      </div>

      {/* Legal Links */}
      <div className="container mx-auto mt-6 text-xs text-gray-500 flex flex-wrap justify-between">
        <div className="space-x-3">
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
        <div className="mt-2 md:mt-0">© 2024 SoundWave</div>
      </div>
    </footer>
  );
};

export default Footer;
