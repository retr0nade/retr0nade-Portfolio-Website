import React from 'react';
import { motion } from 'framer-motion';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-16 h-20 md:w-20 md:h-24"
        whileHover="hover"
    >
        <motion.div
            className="absolute inset-0"
            variants={{
                hover: { y: -16, rotate: Math.random() * 20 - 10 }
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        >
            {children}
        </motion.div>
    </motion.a>
);

const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/retr0nade', img: '/assets/footer/github.png' },
    { name: 'Instagram', href: 'https://instagram.com/shreyasdeb', img: 'https://framerusercontent.com/images/qyHjNFaKZK3J0IgI963dEUUJ4.png' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/shreyas-deb-73a090295', img: 'https://framerusercontent.com/images/RYuwqCxHlxrSfIOO7JZreY9YX9Q.png' },
];

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 rounded-t-3xl py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <a href="mailto:shreyasdeb@gmail.com" className="font-medium text-xl md:text-2xl font-['Inter_Display'] text-black hover:text-black/70 transition-colors">
                            hello@shreyasdeb
                        </a>
                        <p className="text-black/50 mt-2 font-['Inter_Display']">© 2025 SHREYAS DEB. Crafted with LOVE and ENTHUSIASM ⚡</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 md:gap-4">
                        {socialLinks.map(link => (
                            <SocialIcon key={link.name} href={link.href}>
                                <img src={link.img} alt={link.name} className="w-full h-full object-contain" />
                            </SocialIcon>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;