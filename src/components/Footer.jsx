import { Typography } from "@material-tailwind/react";
import LinkedInIcon from "../icons/LinkedIn.svg"
import GitHub from "../icons/GitHub.svg"

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full">
            <div className="mx-auto w-full max-w-7xl px-8 py-2">
                <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
                    <Typography variant="h6" className="mb-4">
                        Mis Notas
                    </Typography>
                </div>
                <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                    <Typography
                        variant="small"
                        className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                    >
                        Desarrollado por A. Martin Alcaraz. 
                        <br/>
                        &copy; {currentYear}
                    </Typography>
                    <div className="flex gap-4 text-blue-gray-900 sm:justify-center">

                        <Typography className="opacity-80 transition-opacity hover:opacity-100">
                            <a href='https://www.linkedin.com/in/angel-martin-alcaraz/' target="_blank"><img className='h-6 w-6' src={LinkedInIcon} alt='LinkedIn' title='LinkedIn'/></a>
                        </Typography>
                        <Typography className="opacity-80 transition-opacity hover:opacity-100">
                            <a href='https://github.com/MartinAlcaraz' target="_blank"><img className='h-6 w-6' src={GitHub} alt='GitHub' title='GitHub'/></a>
                        </Typography>

                    </div>
                </div>
            </div>
        </footer>
    );
}