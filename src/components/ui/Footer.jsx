'use client';

import * as motion from 'motion/react-client';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO, ROUTES } from '../../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2">
            <Link href={ROUTES.home}>
              <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                <Image src="/NEG Logo gradient white.png" alt="Nomad Express Group Logo" width={40} height={16} className="object-contain" />
                <span className="text-white font-semibold text-sm tracking-tight">NomadExpressGroup</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your trusted partner in freight transportation for almost a decade. Professional service, reliable delivery.
            </p>
            <div className="space-y-2">
              <div className="text-gray-400 text-sm">
                <span className="font-semibold text-white">Transportation Services:</span><br />
                <a href={`tel:${COMPANY_INFO.phone.transportation.replace(/[()-\s]/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone.transportation}
                </a>
              </div>
              <div className="text-gray-400 text-sm">
                <span className="font-semibold text-white">Driver Employment:</span><br />
                <a href={`tel:${COMPANY_INFO.phone.employment.replace(/[()-\s]/g, '')}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone.employment}
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href={`${ROUTES.services}/full-truckload`} className="hover:text-white transition-colors">Full Truckload (FTL)</Link></li>
              <li><Link href={`${ROUTES.services}/ltl`} className="hover:text-white transition-colors">Less Than Truckload (LTL)</Link></li>
              <li><Link href={`${ROUTES.services}/heavy-haul`} className="hover:text-white transition-colors">Heavy Haul Loads</Link></li>
              <li><Link href={`${ROUTES.services}/refrigerated`} className="hover:text-white transition-colors">Refrigerated Transport</Link></li>
              <li><Link href={ROUTES.services} className="hover:text-white transition-colors">All Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href={ROUTES.about} className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/#team" className="hover:text-white transition-colors">Our Team</Link></li>
              <li><Link href={ROUTES.careers} className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href={ROUTES.contact} className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-x-4 flex ">
              <Link href={ROUTES.quote}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="btn-primary block text-white px-4 py-2 rounded text-sm font-medium text-center transition-all duration-200"
                >
                  Get Quote
                </motion.div>
              </Link>
              <Link href={ROUTES.contact}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="block border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded text-sm font-medium text-center transition-all"
                >
                  Contact Us
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-sm">
                © {currentYear} Nomad Express Group. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs">
                Website developed by{' '}
                <a 
                  href="https://zcodesite.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Zcode
                </a>
              </p>
            </div>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link href={ROUTES.privacy} className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href={ROUTES.terms} className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
