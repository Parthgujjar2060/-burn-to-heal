"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import '../about/about.css';
import Image from 'next/image';
import other from 'public/other.svg';
import laptop from 'public/laptop.png';
import person from 'public/person.png';
import professional from 'public/professional.png';
import figma from 'public/figma.png';
import android from 'public/android.png';

interface aboutData {
    paragraph: string;
    skills: {
        interpersonalskills: { [key: string]: string };
        otherskills: { [key: string]: string };
        professional: { [key: string]: string };
        ui: { [key: string]: string };
        webdev: { [key: string]: string };
    };
}

const svgContent = (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="50" viewBox="0 0 86 91">
        <path id="android" data-name="Icon material-android" d="M20.2,68.25a4.082,4.082,0,0,0,4.3,3.792h4.3V85.313C28.8,88.46,31.681,91,35.25,91s6.45-2.54,6.45-5.687V72.042h8.6V85.313C50.3,88.46,53.181,91,56.75,91s6.45-2.54,6.45-5.687V72.042h4.3a4.082,4.082,0,0,0,4.3-3.792V30.333H20.2ZM9.45,30.333c-3.569,0-6.45,2.54-6.45,5.687V62.562C3,65.71,5.881,68.25,9.45,68.25s6.45-2.54,6.45-5.688V36.021C15.9,32.874,13.019,30.333,9.45,30.333Zm73.1,0c-3.569,0-6.45,2.54-6.45,5.687V62.562c0,3.147,2.881,5.688,6.45,5.688S89,65.71,89,62.562V36.021C89,32.874,86.119,30.333,82.55,30.333ZM61.179,8.19l5.59-4.929a1.727,1.727,0,0,0,0-2.692,2.333,2.333,0,0,0-3.053,0L57.352,6.18A27.881,27.881,0,0,0,46,3.792,28.292,28.292,0,0,0,34.562,6.18L28.155.569a2.333,2.333,0,0,0-3.053,0,1.727,1.727,0,0,0,0,2.692l5.633,4.967C24.371,12.361,20.2,19,20.2,26.542H71.8C71.8,19,67.629,12.323,61.179,8.19ZM37.4,18.958H33.1V15.167h4.3Zm21.5,0H54.6V15.167h4.3Z" transform="translate(-3)" fill="#081b29" />
    </svg>
);

const figmaContent = (
    <svg xmlns="http://www.w3.org/2000/svg" width="56.992" height="82" viewBox="0 0 56.992 82">
        <path id="figma" data-name="Icon awesome-figma" d="M44.215,27.339c7.868,0,14.246-6.12,14.246-13.669S52.083,0,44.215,0H15.724C7.861,0,1.486,6.116,1.486,13.661S7.861,27.323,15.724,27.323c-7.868,0-14.246,6.12-14.246,13.669S7.856,54.661,15.724,54.661c-7.868,0-14.25,6.112-14.254,13.661S7.839,82,15.707,82s14.25-6.112,14.254-13.661v-41Zm0,0c-7.863,0-14.238,6.116-14.238,13.661s6.374,13.661,14.238,13.661S58.453,48.545,58.453,41,52.08,27.34,44.217,27.339Z" transform="translate(-1.47)" fill="#112e42" />
    </svg>
);

const professionalContent = (
    <svg xmlns="http://www.w3.org/2000/svg" width="69.5" height="69.983" viewBox="0 0 69.5 69.983">
        <path id="Icon_material-person" data-name="Icon material-person" d="M40.75,40.991A17.5,17.5,0,1,0,23.375,23.5,17.431,17.431,0,0,0,40.75,40.991Zm0,8.748C29.152,49.739,6,55.6,6,67.235v8.748H75.5V67.235C75.5,55.6,52.348,49.739,40.75,49.739Z" transform="translate(-6 -6)" fill="#081b29" />
    </svg>
);

const 

const About = () => {
    const [data, setData] = useState<aboutData | null>(null);

    useEffect(() => {
        const aboutRef = ref(database, 'about');
        get(aboutRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setData(snapshot.val());
                } else {
                    console.log("No about data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching about data: ", error);
            });
    }, []);

    return (
        <div className="about-container">
            {data && (
                <div className="about-content">
                    <div className="flex-container">
                        <div className="border">
                            <p>{data.paragraph}</p>
                        </div>
                    </div>
                    <div className="grid-container">
                        <div>
                            <div>
                                <div>
                                    {svgContent}
                                </div>
                                <h2>Other Skills</h2>
                                <ul>
                                    {Object.values(data.skills.otherskills).map((skill, index) => (
                                        <li key={index}>• {skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2>Interpersonal Skills</h2>
                                <ul>
                                    {Object.values(data.skills.interpersonalskills).map((skill, index) => (
                                        <li key={index}>• {skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2>Professional Skills</h2>
                                <ul>
                                    {Object.values(data.skills.professional).map((skill, index) => (
                                        <li key={index}>• {skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2>UI Skills</h2>
                                <ul>
                                    {Object.values(data.skills.ui).map((skill, index) => (
                                        <li key={index}>• {skill}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h2>Web Development Skills</h2>
                                <ul>
                                    {Object.values(data.skills.webdev).map((skill, index) => (
                                        <li key={index}>• {skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h3>Achievements</h3>
                            <p>Your achievements here...</p>
                        </div>
                        <div>
                            <h3>Primary interest</h3>
                            <p>Your primary interests here...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
