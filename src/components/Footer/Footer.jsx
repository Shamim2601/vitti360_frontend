import React from "react";
import { Link } from "react-router-dom";
import logo from "/favicon.ico";
import { FaWhatsapp, FaPhone, FaFacebook, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-400 border-t-2 border-t-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center">
          <div className="w-full p-4 md:w-1/2 lg:w-5/12">
            <div className="flex flex-col items-center justify-between">
              {/* <div className="mb-2">
                <img src={logo} alt="logo" className="w-12" />
              </div> */}
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved by <strong>Vitti360</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="w-full p-4 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              {/* <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                Social
              </h3> */}
              <div className="flex justify-center space-x-4">
                <a href="https://api.whatsapp.com/send?phone=+8801789279732" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <FaWhatsapp size={24} />
                </a>
                <a href="mailto:kohinurnishi05@gmail.com" className="text-gray-600 hover:text-gray-900">
                  <MdEmail size={24} />
                </a>
                <a href="tel:+8801789279732" className="text-gray-600 hover:text-gray-900">
                  <FaPhone size={24} />
                </a>
                <a href="https://www.youtube.com/@samamun60" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <FaYoutube size={24} />
                </a>
                <a href="https://www.facebook.com/vitti360" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* <div className="w-full p-4 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/support"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

          {/* <div className="w-full p-4 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}

        </div>
      </div>
    </footer>
  );
}

export default Footer;
