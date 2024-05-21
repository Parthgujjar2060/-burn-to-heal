"use client";
import React, { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/app/DbSetUp/firebase';
import '../home/home.css';

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
        <div>
            <h1>About</h1>
            {data && (
                <div>
                    <p>{data.paragraph}</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <div>
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
                </div>
            )}
        </div>
    );
};

export default About;
