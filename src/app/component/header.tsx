'use client';
import React, { useEffect, useState } from 'react';
import { ref, get, set } from 'firebase/database';
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
    <nav className="flex justify-center">
      <div>
        <img src={headerData?.logo} alt="icon" className="w-10 h-10" />
      </div>
      <ul className="flex justify-around  ">
        {links.map((link) => (
          <li key={link} className="p-4">
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