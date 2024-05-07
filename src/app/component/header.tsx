'use client';
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import Link from 'next/link';

const links = ["Home", "About", "Avocations", "Contact"];

interface HomeData {
  logo: string;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = React.useState<HomeData | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const headerRef = ref(database, 'header');

    get(headerRef).then((snapshot) => {
      if (snapshot.exists()) {
        setHeaderData(snapshot.val());
      }
      else {
        console.log("No data available");
      }

    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }, []);

  return (
    <nav className="flex justify-between items-center px-10 py-4 h-13">
      <div>
        <img src={headerData?.logo} alt="icon" className="w-10 h-10" />
      </div>
      <ul className="flex space-x-7">
        {links.map((link) => (
          <li key={link} className="p-3 transition duration-500 ease-in-out hover:text-blue-500">
            <Link href={`/${link.toLowerCase()}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Header;