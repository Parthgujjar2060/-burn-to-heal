'use client';
import React, { useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import Link from 'next/link';

const links = ["Home", "About", "Avocations", "Contact"];

interface HomeData {
  logo: string;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = React.useState<HomeData | null>(null);
   

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
    <nav className="flex justify-between items-center px-10 py-5 h-13">
      <div style={{ marginLeft: '8%' }}>
        <img src={headerData?.logo} alt="icon" className="w-10 h-10" />
      </div>

      <ul className="flex justify-center space-x-8" style={{ margin: '0 auto' }}>
        {links.map((link) => (
          <li key={link} className="p-3 transition duration-500 ease-in-out hover:text-blue-500 ">
            <Link href={`/${link.toLowerCase()}`}>
              {link}
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <Link href="/contact">
          <button className="bg-blue-500 p-2 rounded-lg text-white hover:opacity-50 transition duration-500 ease-in-out">Let's Talk</button>
        </Link>
      </div>
    </nav>
  );
}

export default Header;