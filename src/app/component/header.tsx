'use client';
import React, { useEffect, useRef, useState } from 'react';
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
  const [headerData, setHeaderData] = useState<HomeData | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number, y: number }>({ x: 700, y: 700 });
  const [blinking, setBlinking] = useState<boolean>(true);
  const [showLinks, setShowLinks] = useState<boolean>(false);
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

  useEffect(() => {
    if (windowWidth < 769) {
      setBlinking(true);
      const timeout = setTimeout(() => setBlinking(false), 2000); 

      return () => clearTimeout(timeout);
    }
  }, [windowWidth]);

  const navigationClick = () => {
    setShowLinks(!showLinks);
  };

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
        <div
          ref={dragRef}
          className={`accessibility-controller ${blinking ? 'blinking' : ''}`}
          style={{ position: 'absolute', left: position.x, top: position.y }}
          onMouseDown={handleMouseDown}
          onClick={navigationClick}
        ></div>
      )}

      {windowWidth < 769 && (
        <div className={`link-circle-wrapper ${showLinks ? 'show' : ''}`} style={{ position: 'absolute', left: position.x, top: position.y }}>
          <Link href="/home">
            <div className={`link-circle link-home ${showLinks ? 'show' : ''}`}>Home</div>
          </Link>
          <Link href="/about">
            <div className={`link-circle link-about ${showLinks ? 'show' : ''}`}>About</div>
          </Link>
          <Link href="/avocations">
            <div className={`link-circle link-avocations ${showLinks ? 'show' : ''}`}>Avocations</div>
          </Link>
          <Link href="/contact">
            <div className={`link-circle link-contact ${showLinks ? 'show' : ''}`}>Contact</div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
