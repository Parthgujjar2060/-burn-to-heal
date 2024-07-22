'use client';
import React, { useEffect, useRef } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import Image from 'next/image';
import '../component/header.css';
import Link from 'next/link';

const links = ["Home", "About", "Avocations", "Contact"];

interface HomeData {
  logo: string;
}

const Header: React.FC = () => {
  const [headerData, setHeaderData] = React.useState<HomeData | null>(null);
  const [windowWidth, setWindowWidth] = React.useState<number>(0);
  const [dragging, setDragging] = React.useState<boolean>(false);
  const [position, setPosition] = React.useState<{ x: number, y: number }>({ x:700, y: 700});
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headerRef = ref(database, 'header');

    get(headerRef).then((snapshot) => {
      if (snapshot.exists()) {
        setHeaderData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {

    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  return (
    <nav className="flex justify-between items-center px-10 py-5 h-13">
      <div style={{ marginLeft: '8%' }}>
        {headerData?.logo && (
          <Image src={headerData.logo} alt="icon" width={40} height={40} className="w-10 h-10" />
        )}
      </div>

      <ul className="navbar flex justify-center space-x-8" style={{ margin: '0 auto' }}>
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
          <button className="bg-blue-500 p-2 rounded-lg text-white hover:opacity-50 transition duration-500 ease-in-out">Let&apos;s Talk</button>
        </Link>
      </div>

      {windowWidth < 769 && (
        <div ref={dragRef}
          className="accessibility-controller"
          style={{ position: 'absolute', left: position.x, top: position.y }}
          onMouseDown={handleMouseDown}>
        </div>
      )}
    </nav>
  );
};

export default Header;
