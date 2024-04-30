import React from 'react';
import Link from 'next/link';

const links = ["Home","About","Avocations","Contact"]; 

export default function Header() {
  return (
    <nav className="flex justify-center"> 
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