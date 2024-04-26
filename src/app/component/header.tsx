import React from 'react';

const links = ["Home","About","Avocations","Contact"]; 

export default function Header() {
  return (
    <nav className="flex justify-center"> 
      <ul className="flex justify-around">
        {links.map((link) => (
          <li key={link} className="p-4">
            <a href={`/${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}