'use client';
import {get, ref} from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { database } from '@/app/DbSetUp/firebase';

export default function Home() {
  
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    const homeRef = ref(database, 'Home');

    get(homeRef).then((snapshot) => {
      if (snapshot.exists()) {
        setHomeData(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  } , []);


  return (
    <div className=" bg-[#081B29]">
      <h1>Home</h1>
    </div>
  );
}
