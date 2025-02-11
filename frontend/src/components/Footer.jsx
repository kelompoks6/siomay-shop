// import React from "react";

// const Footer = () => {
//     return(
//         <footer className="bg-color3 py-6 px-4 md:px-8">
//             <div className="container mx-auto flex justify-between items-center">
//                 <div className="text-left">
//                     <div className="align-left">
//                         <div className="text-center">
//                             <h2 className="text-2xl font-semibold text-color4">NGULARAN</h2>
//                             <h2 className="text-5xl font-semibold text-color4 mb-8">SHOP</h2>
//                         </div>
//                     <p>
//                         Ngularan adalah salah satu nama tempat di wilayah<br/>
//                         Kecamatan Boja, Kabupaten Kendal. Disana<br/> 
//                         terdapat destinasi makanan khas boja yaitu<br/> 
//                         SIOMAY NGULARAN dengan ciri khas sambal<br/> 
//                         kacang nya
//                     </p>
//                     </div>
//                     {/* <p className="text-sm mb-0">&copy; {new Date().getFullYear()} Kelompok 6. All rights reserved.</p> */}
//                 </div>
//                 <div className="text-right">
//                     <p className="text-3xl mb-0 font-semibold">Alamat</p>
//                     <p className="text-md mb-0 font-semibold">  V7MW+W5J, Ngularan,<br/> 
//                                                                 Ngabean, Kec. Boja, Kabupaten<br/> 
//                                                                 Kendal, Jawa Tengah 51381</p><br/> 
//                     <p className="text-3xl mb-0 font-semibold">Alamat</p>

//                 </div>
//             </div>
//         </footer>
//     );
// }

// export default Footer;

import React from "react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";

const Footer = () => {
    return(
        <footer className="bg-color3 py-6 px-4 md:px-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Kolom Kiri */}
                <div className="text-left">
                <div className="align-left">
                    <div className="">
                        <h2 className="text-2xl font-semibold text-color2">NGULARAN</h2>
                        <h2 className="text-5xl font-semibold text-color2 mb-4">SHOP</h2>
                    </div>
                     <p className="font-semibold">
                        Ngularan adalah salah satu nama tempat di wilayah<br/>
                        Kecamatan Boja, Kabupaten Kendal. Disana<br/> 
                        terdapat destinasi makanan khas boja yaitu<br/> 
                        SIOMAY NGULARAN dengan ciri khas sambal<br/> 
                        kacang nya
                     </p>
                   </div>
                </div>

                 {/* Kolom Kanan - Rata Kiri & Sejajar, Digeser ke Kanan */}
<div className="flex flex-col items-start text-left gap-4 ml-auto pl-8">
    <div>
        <p className="text-2xl font-bold py-5">Alamat</p>
    </div>
    <div className="flex items-center gap-2">
        <FaLocationDot className="text-2xl mr-4" />
        <p className="text-md font-semibold">
            V7MW+W5J, Ngularan, Ngabean, Kec. Boja,<br/>
            Kabupaten Kendal, Jawa Tengah 51381
        </p>
    </div>
    <div className="flex items-center gap-2">
        <FaPhone className="text-2xl mr-4" />
        <p className="text-md font-semibold">+62 812-3456-7890</p>
    </div>
</div>
            </div>

               {/* Garis Pembatas */}
                <hr className="border-t border-black mt-8"/> 
                {/* Footer Bottom (Copyright & Social Media) */}
                <div className="flex justify-between items-center mt-5">
                    <p className="text-sm mb-0">&copy; {new Date().getFullYear()} Kelompok 6. All rights reserved.</p>
                    
                    {/* Ikon Sosial Media */}
                    <div className="flex gap-4 text-2xl">
                        <FaFacebook />
                        <IoLogoInstagram />
                    </div>
                </div>

        </footer>
    );
}

export default Footer;

