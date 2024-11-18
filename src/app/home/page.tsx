"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import Link from 'next/link';
import '../home/home.css';

interface HomeData {
    image: string;
    name: string;
    linkdin: string;
    github: string;
    insta: string;
    logo: string;
    imageDev: string;
}

const Home: React.FC = () => {
    const [homeData, setHomeData] = useState<HomeData | null>(null);
    const [links, setLinks] = useState<HomeData | null>(null);
    const [logo, setLogo] = useState<{ [key: string]: HomeData } | null>(null);
    const [imageDev, setImageDev] = useState<HomeData | null>(null);

    useEffect(() => {
        const homeRef = ref(database, 'home');
        const linkRef = ref(database, 'home/links');
        const logoRef = ref(database, 'home/icon');
        const imageRef = ref(database, 'home/imageDev');

        get(homeRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setHomeData(snapshot.val());
                } else {
                    console.log("No home data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching home data: ", error);
            });

        get(linkRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setLinks(snapshot.val());
                } else {
                    console.log("No links data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching links data: ", error);
            });

        get(logoRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setLogo(snapshot.val());
                } else {
                    console.log("No logo data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching logo data: ", error);
            });

        get(imageRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setImageDev(snapshot.val());
                } else {
                    console.log("No image data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching image data: ", error);
            });
    }, []);

    return (
        <div className="main">
            <div className="flex items-center pb-28 h-screen">
                <div className="main-container grid grid-cols-2 gap-4 w-full ml-10">
                    <div className='flex flex-col justify-center items-center' style={{ width: '100%', height: '100%' }}>
                        <div className="name mr-60">
                            <h2 className="text-white font-thin text-2xl ">Hello, I am Parth</h2>
                        </div>
                        <div className="tagline flex m-5">
                            <p className=" taglinewords flex space-x-1 overflow-hidden animate-pulse">
                                {Array.from("a Full Stack Developer").map((char, i) => (
                                    <span
                                        key={i}
                                        className={`text-blue-500 animate-reveal delay-${i * 3} text-4xl m-3`}
                                    >{char}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <div>
                            <p className="paragraph w-96" style={{ width: "410px" }}>
                                Full-Stack Developer with ability to learn and collaborate
                                in rapidly changing enviroments and compositions.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 mt-5" style={{ gap: "140px" }}>
                            <div className="">
                                <Link href="/contact">
                                    <button className="bg-blue-500 p-2 rounded-lg text-white hover:opacity-50 transition duration-500 ease-in-out">Let&apos;s Talk</button>
                                </Link>
                            </div>
                            <div className="flex gap-2">
                                {links && Object.entries(links).map(([platform, url]) => (
                                    <div key={platform} className="">
                                        <a href={url} target="_blank">
                                            <img src={url} alt={platform} className="w-10 h-10 hover:opacity-50 cursor-pointer transition duration-500" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className='ring'>
                        {homeData && (
                            <div className="flex justify-center items-center">
                                <div className="w-full h-fulloverflow-hidden">
                                    <img className="parthimage" src={homeData.image} alt="Name is empty" style={{ objectFit: 'cover' }} />
                                </div>
                            </div>
                        )}
                        </div>
                    </div>

                </div>
                <div className="flex justify-center items-center w-24">
                    {homeData && (
                        <div className="devimage-container" >
                            <img className="devimage" src={homeData.imageDev} alt="Developer image" />
                        </div>
                    )}
                </div>
                {logo && Object.keys(logo).map((key, index) => {
                    const logoData = logo[key] as HomeData;
                    const position = getSpecificPosition(index);
                    const logoClassName = `logo-${index}`;
                    return (
                        <a key={key} target="_blank" className={`logo ${logoClassName}`} style={{ left: position.left, top: position.top }}>
                            <img src={logoData.logo} alt={`Icon ${key}`} />
                        </a>
                    );
                })}

            </div>

            <style>{`
                .home-container {
                    position: relative;
                }

                .logo{
                    position: absolute;
                    opacity: 0.4;
                    z-index: -1;
                }
    
                .logo {
                    position: absolute;
                    opacity: 0.4; 
 
                }
    
                @keyframes reveal {
                    0% {
                        opacity: 0;
                        transform: translateY(100%);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                }
    
                .animate-reveal {
                    animation: reveal 3s infinite;
                }
            `}</style>
        </div>
    );

    function getSpecificPosition(index: number) {

        switch (index) {
            case 0:
                return { left: '200px', top: '150px' };  // first line 1st image 
            case 1:
                return { left: '300px', top: '325px' };  // second line 1st image
            case 2:
                return { left: '200px', top: '500px' };  // third line 1st image
            case 3:
                return { left: '430px', top: '150px' };  // first line 2nd image
            case 4:
                return { left: '600px', top: '325px' };  // second line 2nd image
            case 5:
                return { left: '430px', top: '500px' };  // third line 2nd image
            case 6:
                return { left: '700px', top: '500px' };  // third line 3rd image
            case 7:
                return { left: '700px', top: '150px' };  // first line 3rd image
            default:
                return { left: '0', top: '0' };
        }
    }
};

export default Home;