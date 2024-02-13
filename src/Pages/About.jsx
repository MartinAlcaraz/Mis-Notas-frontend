import React, { useEffect } from "react";
import { Card, Input, Typography, Button, CardBody } from "@material-tailwind/react";

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='py-24 px-[5%] md:px-[5%] lg:px-[5%] min-h-screen bg-secondary'>

            <Card >
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="">
                        About
                    </Typography>

                    <Typography variant="paragraph" color="blue-gray" className="font-normal">
                        Mis-Notas is an application to create and share your text notes, everything you want to do, remember or simply anything you need to write down.
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default About;