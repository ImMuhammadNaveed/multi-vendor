import logo from '../../static/logo.svg'
import { IoLogoFacebook } from "react-icons/io";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import footerpayment from '../../static/footer-payment.png'
import { Link } from 'react-router-dom'
function FooterLinks() {
    return (
        <>
            <div className=" bg-black py-15">
                <div className='grid grid-cols-4 w-[90%] m-auto'>
                    <div>
                    <img src={logo} alt="" />
                    <p className='text-white my-5'>The home and elements needed to create beautiful products</p>
                    <div className='text-white flex'>
                        <IoLogoFacebook size={25} className='mr-4 cursor-pointer' />
                        <FaTwitter size={25} className='mr-4 cursor-pointer' />
                        <AiFillInstagram size={25} className='mr-4 cursor-pointer' />
                        <FaYoutube size={25} className='mr-4 cursor-pointer' />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-bold mb-2'>Company</p>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>About us</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Careers</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Store Locations</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Our Blog</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Reviews</Link>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-bold mb-2'>Shop</p>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Game & Video</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Phone & Tablets</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Computers & Laptops</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Sport Watches</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Events</Link>
                </div>
                <div className='flex flex-col'>
                    <p className='text-white font-bold mb-2'>Support</p>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>FAQ</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Reviews</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Contact Us</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Shpping</Link>
                    <Link className='text-sm text-[#9CA3AF] mb-1 hover:text-[#2DD4BF]'>Live Chat</Link>
                </div>
            </div>
                </div>
                
            <div className='bg-black pb-10'>
                <div className='flex justify-between w-[80%] m-auto'>
                    <p className='text-[#9CA3AF] text-sm'>© 2026 M.Naveed. All rights reserved.</p>
                    <p className='text-[#9CA3AF] text-sm'>Terms. Privacy Policy</p>
                    <img src={footerpayment} alt="" />
                </div>

            </div>
        </>
    )
}


export default FooterLinks