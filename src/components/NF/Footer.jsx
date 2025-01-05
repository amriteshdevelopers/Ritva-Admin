import React from "react";
import Logo from "../../assets/logo2.jpg"

const Footer = () => {
  return (
    <>
      <div className="bg-[#024d87]">
        <footer className="relative w-full text-white pt-10">
          <div className="w-full px-8 mx-auto ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h5 className="mb-6 text-3xl font-semibold text-white">
                    RitvaBuild
                  </h5>
                  <img src={Logo} className="h-[80px]"/>
                </div>
                <div className="mt-4 md:mt-0 md:ml-10">
                  <h5 className="mb-6 text-xl font-semibold text-white">
                    Address
                  </h5>
                  <p>P-7 (Keshav Nagar, Sitapur Road)</p>
                  <p>Lucknow, UP, India, 226020</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ul>
                  <p className="block mb-1 text-base font-semibold text-white">
                    Product
                  </p>
                  <li>
                    <a
                      href="#"
                      className="block text-white py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      Overview
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block text-white  py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block text-white py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      Solutions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block text-white  py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      Tutorials
                    </a>
                  </li>
                </ul>
                <ul>
                  <p className="block mb-1 text-base font-semibold text-white ">
                    Company
                  </p>
                  <li>
                    <a
                      href="/aboutUs"
                      className="block text-white py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="block text-white  py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="/partner"
                      className="block text-white  py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      Become a Partner
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block text-white  py-1 hover:text-slate-500 focus:text-slate-500 text-sm"
                    >
                      News
                    </a>
                  </li>
                </ul>
                <ul>
                  <p className="block mb-1 text-base font-semibold text-white ">
                    Social Connection
                  </p>
                  <li>
                    <a
                      href="https://wa.me/9557831091"
                      target="_blank"
                      className="block transition-opacity text-inherit hover:opacity-80 py-1"
                      aria-label="WhatsApp"
                    >
                      <div className="flex">
                      <svg
                        className="w-5 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.181c-.297-.149-1.758-.867-2.029-.966-.271-.099-.468-.149-.666.149s-.763.966-.934 1.164c-.171.198-.343.223-.64.074-.297-.149-1.255-.462-2.39-1.475-.883-.787-1.48-1.761-1.653-2.059-.171-.297-.018-.458.13-.606.133-.132.297-.343.446-.515.149-.172.198-.297.297-.495.099-.198.05-.373-.025-.522-.074-.148-.666-1.611-.914-2.21-.241-.579-.487-.501-.666-.511-.172-.007-.373-.01-.573-.01s-.522.074-.796.372c-.271.297-1.041 1.016-1.041 2.479s1.065 2.875 1.213 3.074c.149.198 2.091 3.2 5.067 4.487.709.306 1.262.488 1.694.626.712.227 1.36.195 1.87.118.571-.086 1.758-.718 2.007-1.411.248-.694.248-1.29.173-1.411-.074-.121-.271-.198-.573-.347zM12.005 2.003c5.523 0 9.997 4.474 9.997 9.997 0 5.524-4.474 9.997-9.997 9.997S2.008 17.524 2.008 12c0-5.523 4.474-9.997 9.997-9.997zm0-1.8C5.371.203.203 5.371.203 12c0 6.63 5.168 11.798 11.798 11.798S23.798 18.63 23.798 12c0-6.63-5.168-11.798-11.798-11.798z"></path>
                      </svg>
                      <p className="text-sm ml-1">Whatsapp</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/ritvabuild/"
                      target="_blank"
                      className="block transition-opacity text-inherit hover:opacity-80 py-1"
                    >
                      <div className="flex">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <p className="text-sm ml-1">Instagram</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/RitvaBuild"
                      target="_blank"
                      className="block transition-opacity text-inherit hover:opacity-80 py-1"
                    >
                      <div className="flex">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                      <p className="text-sm ml-1">X</p>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/pages/ritvabuild"
                      target="_blank"
                      className="block transition-opacity text-inherit hover:opacity-80 py-1"
                    ><div className="flex">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                       <p className="text-sm ml-1">Facebook</p>
                    </div>
                      
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-slate-200 md:flex-row md:justify-between">
              <p className="block mb-4 text-sm text-center text-white  md:mb-0">
                Copyright © {new Date().getFullYear()}
                <a href="/"> Ritva Build</a>. All
                Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Footer;
