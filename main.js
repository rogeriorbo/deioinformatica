

import React from 'react';
import ReactDOM from 'react-dom/client';
import { motion } from 'motion/react';

// Utility Functions (from utils.ts)
const handleLinkClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
};

// Icon Components (from constants.tsx)
const ComputerIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"}));
const NetworkIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"}));
const ShieldIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.417l5.5-5.5a12.025 12.025 0 013.118-1.583A12.025 12.025 0 0112 14.5a12.025 12.025 0 013.382-1.083 12.02 12.02 0 005.5 5.5A12.02 12.02 0 0018.382 7.984z"}));
const CloudIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"}));
const SupportIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"}));
const ServerIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"}));
const WhatsAppIcon = ({className}) => React.createElement("svg",{viewBox:"0 0 16 16",className,fill:"currentColor",xmlns:"http://www.w3.org/2000/svg", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{d:"M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.31-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"}));
const UserIcon = ({className}) => React.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className,fill:"none",viewBox:"0 0 24 24",stroke:"currentColor", "aria-hidden":"true",focusable:"false"}, React.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"}));
const FacebookIcon = ({className}) => React.createElement("svg",{fill:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className,viewBox:"0 0 24 24"},React.createElement("path",{d:"M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"}));
const InstagramIcon = ({className}) => React.createElement("svg",{fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",className,viewBox:"0 0 24 24"},React.createElement("rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}),React.createElement("path",{d:"M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"}));
const LinkedInIcon = ({className}) => React.createElement("svg",{fill:"currentColor",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"0",className,viewBox:"0 0 24 24"},React.createElement("path",{stroke:"none",d:"M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"}),React.createElement("circle",{cx:"4",cy:"4",r:"2",stroke:"none"}));
const EmailIcon = ({className}) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", focusable: "false" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }));
const PhoneIcon = ({className}) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", focusable: "false" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }));
const LocationIcon = ({className}) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", focusable: "false" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" }));
const HelpCircleIcon = ({className}) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }));
const MessageCircleIcon = ({className}) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }));
const SettingsIcon = ({className}) => React.createElement("svg", { className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }));


// App Constants (from constants.tsx)
const NAV_LINKS = [{name:"Serviços",href:"#services"},{name:"Sobre Nós",href:"#about"},{name:"Depoimentos",href:"#testimonials"},{name:"FAQ",href:"#faq"},{name:"Contato",href:"#contact"},{name:"WebMail",href:"https://webmail.deioinfo.com.br",external:!0}];
const SERVICES_LIST = [{icon:React.createElement(ComputerIcon,{className:"w-12 h-12 text-secondary"}),title:"Manutenção de Hardware",description:"Diagnóstico e reparo de computadores, notebooks e periféricos com peças de alta qualidade."},{icon:React.createElement(NetworkIcon,{className:"w-12 h-12 text-secondary"}),title:"Infraestrutura de Redes",description:"Projetamos e implementamos redes cabeadas e Wi-Fi robustas e seguras para sua casa ou empresa."},{icon:React.createElement(ShieldIcon,{className:"w-12 h-12 text-secondary"}),title:"Segurança Digital",description:"Proteção completa contra vírus, malware e ameaças online, garantindo a integridade dos seus dados."},{icon:React.createElement(SupportIcon,{className:"w-12 h-12 text-secondary"}),title:"Suporte Técnico Remoto",description:"Soluções rápidas e eficientes para problemas de software e configuração, sem sair de casa."},{icon:React.createElement(CloudIcon,{className:"w-12 h-12 text-secondary"}),title:"Soluções em Nuvem",description:"Configuração de backup e armazenamento em nuvem para garantir que seus arquivos estejam sempre seguros."},{icon:React.createElement(ServerIcon,{className:"w-12 h-12 text-secondary"}),title:"Servidores Linux e Windows",description:"Gerenciamento, configuração e otimização de servidores para garantir máxima performance e segurança."}];
const TESTIMONIALS_LIST=[{image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=388&auto=format&fit=crop",quote:"A Déio Informática transformou nossa infraestrutura de TI. O suporte é rápido, eficiente e a equipe está sempre disposta a ajudar. Recomendo fortemente!",name:"Ana Silva",title:"CEO, Startup InovaTech"},{image:"https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=500&auto=format&fit=crop",quote:"Desde que implementamos as soluções de rede e segurança com a Déio, nossa escola nunca esteve tão conectada e protegida. Um serviço essencial e de alta qualidade.",name:"Carlos Pereira",title:"Diretor de TI, Colégio Aprender+"},{image:"https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=461&auto=format&fit=crop",quote:"O contrato de manutenção para o nosso condomínio foi a melhor decisão. Problemas são resolvidos antes mesmo de se tornarem um incômodo para os moradores. Excelente!",name:"Mariana Costa",title:"Síndica, Condomínio Morada Feliz"}];

// App Constants (from constants.tsx)
const Header = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMobileLinkClick = (e) => {
        handleLinkClick(e);
        setIsOpen(false);
    };
    
    const focusStyles = "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary focus-visible:ring-offset-dark-bg";

    return React.createElement("header", { className: `sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-light-bg/80 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}` },
        React.createElement("nav", { className: "container mx-auto px-6 py-4" },
            React.createElement("div", { className: "flex items-center justify-between" },
                React.createElement("a", { href: "#home", onClick: handleLinkClick, className: `text-2xl font-bold text-text-primary hover:text-secondary transition-colors rounded-md ${focusStyles}` }, "Déio Informática"),
                React.createElement("div", { className: "hidden md:flex items-center space-x-8" },
                    NAV_LINKS.map(link => React.createElement("a", { key: link.name, href: link.href, onClick: link.external ? undefined : handleLinkClick, className: `text-text-secondary hover:text-text-primary transition-colors duration-300 rounded-md p-1 -m-1 ${focusStyles}`, target: link.external ? '_blank' : '_self', rel: link.external ? 'noopener noreferrer' : undefined },
                        link.name,
                        link.external && React.createElement("span", { className: "sr-only" }, " (abre em nova aba)")
                    ))
                ),
                React.createElement("a", { href: "#contact", onClick: handleLinkClick, className: `hidden md:block bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-secondary/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${focusStyles}` }, "Fale Conosco"),
                React.createElement("div", { className: "md:hidden" },
                    React.createElement("button", { onClick: () => setIsOpen(!isOpen), type: "button", className: `text-text-secondary hover:text-text-primary rounded-md ${focusStyles}`, "aria-controls": "mobile-menu", "aria-expanded": isOpen, "aria-label": isOpen ? "Fechar menu" : "Abrir menu" },
                        React.createElement("span", { className: "sr-only" }, isOpen ? "Fechar menu" : "Abrir menu"),
                        React.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" },
                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: !isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12" })
                        )
                    )
                )
            ),
            isOpen && React.createElement("div", { className: "md:hidden mt-4 bg-light-bg rounded-lg p-4", id: "mobile-menu", role: "menu" },
                NAV_LINKS.map(link => React.createElement("a", { key: link.name, href: link.href, onClick: link.external ? () => setIsOpen(false) : handleMobileLinkClick, className: "block py-2 px-4 text-sm text-text-secondary hover:bg-dark-bg hover:text-text-primary rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary focus-visible:ring-offset-light-bg", target: link.external ? '_blank' : '_self', rel: link.external ? 'noopener noreferrer' : undefined, role: "menuitem" },
                    link.name,
                    link.external && React.createElement("span", { className: "sr-only" }, " (abre em nova aba)")
                )),
                React.createElement("a", { href: "#contact", onClick: handleMobileLinkClick, role: "menuitem", className: "block text-center mt-4 bg-primary hover:bg-secondary text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-secondary/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary focus-visible:ring-offset-light-bg" }, "Fale Conosco")
            )
        )
    );
};

const ParticleNetwork = () => {
    const canvasRef = React.useRef(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        const resizeCanvas = () => {
            // Only update width/height if it actually changes and canvas is available
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        
        let width = canvas.width;
        let height = canvas.height;
        
        let particles = [];
        const properties = {
            particleColor: 'rgba(59, 130, 246, 0.7)', // Tailwind blue-500 equivalent
            lineColor: 'rgba(59, 130, 246, 0.25)',
            particleAmount: Math.floor((width * height) / 12000), // Responsive amount
            defaultRadius: 2,
            variantRadius: 2,
            defaultSpeed: 0.4,
            variantSpeed: 0.8,
            linkDistance: 130,
        };

        const mouse = { x: null, y: null };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        const handleResize = () => {
            resizeCanvas();
            width = canvas.width;
            height = canvas.height;
            particles = [];
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.speed = properties.defaultSpeed + Math.random() * properties.variantSpeed;
                this.directionAngle = Math.floor(Math.random() * 360);
                this.color = properties.particleColor;
                this.radius = properties.defaultRadius + Math.random() * properties.variantRadius;
                this.vector = {
                    x: Math.cos(this.directionAngle) * this.speed,
                    y: Math.sin(this.directionAngle) * this.speed
                };
            }
            update() {
                this.border();
                this.x += this.vector.x;
                this.y += this.vector.y;
            }
            border() {
                if (this.x >= width || this.x <= 0) this.vector.x *= -1;
                if (this.y >= height || this.y <= 0) this.vector.y *= -1;
                if (this.x > width) this.x = width;
                if (this.y > height) this.y = height;
                if (this.x < 0) this.x = 0;
                if (this.y < 0) this.y = 0;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const initParticles = () => {
            properties.particleAmount = Math.floor((width * height) / 12000); // Recalculate on resize
            for (let i = 0; i < properties.particleAmount; i++) {
                particles.push(new Particle());
            }
        };

        const drawLines = () => {
            let x1, y1, x2, y2, length, opacity;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    x1 = particles[i].x;
                    y1 = particles[i].y;
                    x2 = particles[j].x;
                    y2 = particles[j].y;
                    length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

                    if (length < properties.linkDistance) {
                        opacity = 1 - length / properties.linkDistance;
                        ctx.lineWidth = 0.5;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.8})`;
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
                
                // Mouse interaction
                if (mouse.x && mouse.y) {
                    let mouseDist = Math.sqrt(Math.pow(particles[i].x - mouse.x, 2) + Math.pow(particles[i].y - mouse.y, 2));
                    if (mouseDist < properties.linkDistance * 1.5) {
                        opacity = 1 - mouseDist / (properties.linkDistance * 1.5);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (canvas) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return React.createElement("canvas", { 
        ref: canvasRef, 
        className: "absolute inset-0 w-full h-full z-10 pointer-events-auto" 
    });
};

const Hero = () => {
    const focusStyles = "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary focus-visible:ring-offset-dark-bg/70";
    return React.createElement("section", { id: "home", className: "relative h-screen flex items-center justify-center text-center overflow-hidden bg-cover bg-center bg-no-repeat", style: { backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')" } },
        React.createElement("div", { className: "absolute inset-0 bg-black/70 z-0" }),
        React.createElement(ParticleNetwork, null),
        React.createElement(motion.div, { 
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8 },
            className: "relative z-20 container mx-auto px-4 md:px-6 pointer-events-none" 
        },
            React.createElement("h1", { className: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] mb-3 sm:mb-4 leading-tight pointer-events-auto" }, "Déio Informática"),
            React.createElement("p", { className: "text-xl md:text-2xl text-blue-400 font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-6 md:mb-8 pointer-events-auto" }, "\"O mundo em suas mãos.\""),
            React.createElement("p", { className: "max-w-3xl mx-auto text-gray-200 font-medium text-lg md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-10 sm:mb-12 pointer-events-auto" }, 
                "Soluções completas e inovadoras em tecnologia para impulsionar seu sucesso. ",
                React.createElement("br", { className: "hidden sm:block" }),
                "Da manutenção à segurança, estamos aqui para ajudar."
            ),
            React.createElement("a", { href: "#services", onClick: handleLinkClick, className: `bg-primary hover:bg-blue-500 text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-base sm:text-lg pointer-events-auto ${focusStyles}` }, "Explore Nossos Serviços")
        ),
        React.createElement("div", { className: "absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto" },
            React.createElement("a", { href: "#services", onClick: handleLinkClick, "aria-label": "Scroll down", className: `rounded-full ${focusStyles}` },
                React.createElement("svg", { className: "w-8 h-8 text-text-secondary animate-bounce", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 14l-7 7m0 0l-7-7m7 7V3" })
                )
            )
        )
    );
};

const ServiceCard = ({ service, index }) => {
    const iconElement = typeof service.icon === 'string' ? (
        service.icon === 'computer' ? React.createElement(ComputerIcon, {className:"w-8 h-8 text-secondary"}) :
        service.icon === 'network' ? React.createElement(NetworkIcon, {className:"w-8 h-8 text-secondary"}) :
        service.icon === 'shield' ? React.createElement(ShieldIcon, {className:"w-8 h-8 text-secondary"}) :
        service.icon === 'support' ? React.createElement(SupportIcon, {className:"w-8 h-8 text-secondary"}) :
        service.icon === 'cloud' ? React.createElement(CloudIcon, {className:"w-8 h-8 text-secondary"}) :
        service.icon === 'server' ? React.createElement(ServerIcon, {className:"w-8 h-8 text-secondary"}) :
        React.createElement(ComputerIcon, {className:"w-8 h-8 text-secondary"})
    ) : service.icon;

    return React.createElement(motion.div, { 
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay: index * 0.1 },
        className: "bg-light-bg border border-gray-800 rounded-xl p-6 md:p-8 transform hover:-translate-y-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/20" 
    },
        React.createElement("div", { className: "flex items-center justify-center h-16 w-16 rounded-full bg-dark-bg mb-6" }, iconElement),
        React.createElement("h3", { className: "text-xl font-bold text-text-primary mb-3" }, service.title),
        React.createElement("p", { className: "text-text-secondary leading-relaxed" }, service.description)
    );
};

const Services = () => {
    return React.createElement("section", { id: "services", className: "py-16 sm:py-20 bg-dark-bg", "aria-labelledby": "services-heading" },
        React.createElement("div", { className: "container mx-auto px-6" },
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-50px" },
                transition: { duration: 0.5 },
                className: "text-center mb-12" 
            },
                React.createElement("h2", { id: "services-heading", className: "text-4xl font-extrabold text-text-primary mb-4" }, "Nossos Serviços"),
                React.createElement("p", { className: "text-lg text-text-secondary max-w-2xl mx-auto" }, "Oferecemos uma gama completa de serviços de TI para atender todas as suas necessidades tecnológicas."),
                React.createElement("div", { className: "mt-4 w-24 h-1 bg-primary mx-auto rounded-full" })
            ),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" },
                React.useContext(DataContext).services.map((service, index) => React.createElement(ServiceCard, { key: service.id || index, service: service, index: index }))
            )
        )
    );
};

const About = () => {
    return React.createElement("section", { id: "about", className: "py-20 bg-light-bg overflow-hidden", "aria-labelledby": "about-heading" },
        React.createElement("div", { className: "container mx-auto px-6" },
            React.createElement("div", { className: "flex flex-col lg:flex-row items-center gap-12" },
                React.createElement(motion.div, { 
                    initial: { opacity: 0, x: -30 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, margin: "-50px" },
                    transition: { duration: 0.6 },
                    className: "lg:w-1/2" 
                },
                    React.createElement("img", { src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop", alt: "Equipe Déio Informática trabalhando em um escritório moderno", className: "rounded-2xl shadow-2xl object-cover w-full h-full" })
                ),
                React.createElement(motion.div, { 
                    initial: { opacity: 0, x: 30 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true, margin: "-50px" },
                    transition: { duration: 0.6, delay: 0.2 },
                    className: "lg:w-1/2 text-center lg:text-left" 
                },
                    React.createElement("h2", { id: "about-heading", className: "text-4xl font-extrabold text-text-primary mb-4" }, "Sobre a Déio Informática"),
                    React.createElement("div", { className: "mt-2 mb-6 w-24 h-1 bg-primary mx-auto lg:mx-0 rounded-full" }),
                    React.useContext(DataContext).about.split('\n').filter(p=>p.trim()).map((p, i) => React.createElement("p", { key: i, className: "text-text-secondary text-lg mb-6 leading-relaxed" }, p)),
                    React.createElement("a", { href: "#contact", onClick: handleLinkClick, className: "bg-secondary hover:bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-light-bg" }, "Vamos Conversar")
                )
            )
        )
    );
};

const TestimonialCard = ({ testimonial, index }) => {
    return React.createElement(motion.div, { 
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-50px" },
        transition: { duration: 0.5, delay: index * 0.1 },
        className: "bg-light-bg border border-gray-800 rounded-xl p-6 md:p-8 flex flex-col h-full transform hover:-translate-y-2 transition-all duration-300 ease-in-out shadow-lg hover:shadow-primary/20" 
    },
        React.createElement("div", { className: "flex-grow" },
            React.createElement("blockquote", { className: "text-text-secondary leading-relaxed italic" }, `"${testimonial.quote}"`)
        ),
        React.createElement("footer", { className: "mt-6 flex items-center gap-4" },
            React.createElement("img", { src: testimonial.image, alt: `Foto de ${testimonial.name}`, className: "w-16 h-16 rounded-full object-cover shadow-md flex-shrink-0" }),
            React.createElement("div", null,
                React.createElement("p", { className: "font-bold text-text-primary" }, testimonial.name),
                React.createElement("p", { className: "text-sm text-text-secondary" }, testimonial.title)
            )
        )
    );
};

const Testimonials = () => {
    return React.createElement("section", { id: "testimonials", className: "py-16 sm:py-20 bg-dark-bg", "aria-labelledby": "testimonials-heading" },
        React.createElement("div", { className: "container mx-auto px-6" },
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-50px" },
                transition: { duration: 0.5 },
                className: "text-center mb-12" 
            },
                React.createElement("h2", { id: "testimonials-heading", className: "text-4xl font-extrabold text-text-primary mb-4" }, "O Que Nossos Clientes Dizem"),
                React.createElement("p", { className: "text-lg text-text-secondary max-w-2xl mx-auto" }, "Feedback real de parceiros que confiam em nosso trabalho e expertise."),
                React.createElement("div", { className: "mt-4 w-24 h-1 bg-primary mx-auto rounded-full" })
            ),
            React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" },
                React.useContext(DataContext).testimonials.map((testimonial, index) => React.createElement(TestimonialCard, { key: testimonial.id || index, testimonial: testimonial, index: index }))
            )
        )
    );
};

const CorporateChatIcon = ({ className }) => React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true", focusable: "false" }, React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" }));
const Corporate = () => {
    const focusStyles = "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary";

    return React.createElement("section", { id: "corporate", className: "relative py-20 bg-cover bg-center bg-fixed", style: { backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')" }, "aria-labelledby": "corporate-heading" },
        React.createElement("div", { className: "absolute inset-0 bg-dark-bg/70" }),
        React.createElement("div", { className: "relative container mx-auto px-6" },
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-50px" },
                transition: { duration: 0.7 },
                className: "bg-light-bg/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto" 
            },
                React.createElement("div", { className: "flex flex-col lg:flex-row items-center lg:items-stretch" },
                    React.createElement("div", { className: "lg:w-1/2 p-8 md:p-12 text-center lg:text-left" },
                        React.createElement("h2", { id: "corporate-heading", className: "text-3xl md:text-4xl font-extrabold text-primary mb-4 leading-tight" }, "Parceria Estratégica em TI para Empresas, Escolas e Condomínios"),
                        React.createElement("p", { className: "text-text-secondary text-lg mb-8 leading-relaxed" }, "Garanta a continuidade e a eficiência da sua operação com nossos contratos de suporte de TI. Oferecemos soluções personalizadas que previnem problemas, otimizam sua infraestrutura e permitem que sua equipe foque no que realmente importa: o crescimento do seu negócio."),
                        React.createElement("a", { href: "#contact", onClick: handleLinkClick, className: `inline-flex items-center justify-center gap-3 bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-secondary/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-lg ${focusStyles} focus-visible:ring-offset-light-bg` },
                            React.createElement(CorporateChatIcon, { className: "w-6 h-6" }),
                            React.createElement("span", null, "Quero suporte para meu negócio!")
                        )
                    ),
                    React.createElement("div", { className: "lg:w-1/2 w-full flex items-center p-4 md:p-6" },
                        React.createElement("img", { src: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg", alt: "Desenvolvedor trabalhando em um laptop com múltiplas telas, representando soluções de TI corporativas.", className: "w-full rounded-2xl shadow-2xl" })
                    )
                )
            )
        )
    );
};

const FAQ_DATA = [
    {
        question: "Vocês fazem atendimento em domicílio ou na empresa?",
        answer: "Sim! Trabalhamos com atendimento na sua empresa ou residência, garantindo conveniência e agilidade.\n\nAlém disso, oferecemos:\n\n• Suporte em Nosso Laboratório: Para serviços que exigem ferramentas especializadas.\n• Suporte Remoto: Ideal para a resolução rápida de problemas de software."
    },
    {
        question: "Vocês cobram taxa de visita?",
        answer: "A taxa de visita varia de acordo com a sua localização. Entre em contato conosco informando seu bairro ou CEP para consultarmos.\n\nPara suporte remoto, uma avaliação prévia pode muitas vezes evitar custos de deslocamento."
    },
    {
        question: "Como funciona o sistema de garantia?",
        answer: "Seguimos rigorosamente o Código de Defesa do Consumidor para sua tranquilidade:\n\n• Serviços de Manutenção: Oferecemos uma garantia padrão de 90 dias em todos os serviços prestados.\n• Componentes novos: Peças de hardware substituídas ou vendidas por nós possuem garantia do fabricante, variando de 3 a 12 meses."
    },
    {
        question: "Quais as formas de pagamento aceitas?",
        answer: "Buscamos oferecer flexibilidade para atender às suas necessidades:\n\n• Pessoa Física: PIX, cartões de crédito e débito (com opções de parcelamento seguro).\n• Pessoa Jurídica/Condomínios: Trabalhamos também com faturamento via boleto ou transferência bancária para contratos de manutenção recorrente."
    },
    {
        question: "Formatam computadores e notebooks? Vou perder meus arquivos?",
        answer: "Sim, realizamos formatação completa e instalação limpa do sistema operacional.\n\n• Segurança de Dados: Antes de iniciar, executamos o Backup Preventivo de todos os seus arquivos essenciais (fotos, documentos, planilhas).\n• Restauração: Após a formatação, copiamos os arquivos de volta para a sua máquina, garantindo que nada seja perdido no processo."
    },
    {
        question: "Vocês montam PC Gamer ou Workstations sob medida?",
        answer: "Com certeza! Nosso processo de montagem é completo:\n\n• Consultoria Personalizada: Entendemos seu objetivo (jogos, edição de vídeos, produtividade) e indicamos o melhor custo-benefício.\n• Montagem Profissional: Realizamos a montagem física com foco em organização interna (cable management), para um visual limpo e melhor refrigeração.\n• Validação: Finalizamos com testes estressantes para certificar que o equipamento opere em máxima potência com total segurança."
    },
    {
        question: "Dica Rápida: Meu notebook está esquentando muito e desligando. O que pode ser?",
        answer: "Este é um sinal clássico de falha no sistema de refrigeração.\n\n• Causas comuns: Acúmulo de poeira nas ventoinhas ou degradação da pasta térmica (responsável por dissipar o calor).\n• O que fazer: Desligue o aparelho imediatamente para evitar danos graves ao processador ou placa-mãe.\n• Solução: Entre em contato conosco para uma Manutenção Preventiva (limpeza física especializada e troca da pasta térmica)."
    },
    {
        question: "Dica Rápida: O monitor não liga, mas a CPU liga. O que fazer?",
        answer: "Antes de solicitar suporte técnico, execute estes passos básicos:\n\n• Conexões: Verifique se o cabo de vídeo (HDMI/VGA/DisplayPort) está fixado corretamente em ambas as pontas.\n• Energia do Monitor: Certifique-se de que o monitor está conectado à tomada e com o botão de energia ativo.\n• Placa de Vídeo: Se você possui uma placa de vídeo dedicada (offboard), confirme se o cabo de vídeo está conectado nela e não na placa-mãe.\n• Memória RAM: Pode haver mau contato nas memórias. Se nada resolver, chame a Déio Informática!"
    },
    {
        question: "Dica Rápida: Meu computador está muito lento. O que pode ser?",
        answer: "Existem várias causas possíveis. Aqui estão as mais comuns:\n\n• Armazenamento: O uso de HDs mecânicos antigos é o principal gargalo. A transição para um SSD moderno torna a máquina até 10x mais rápida.\n• Hardware: Falta de memória RAM ou sobrecarga na energia.\n• Software: Excesso de programas iniciando com o Windows ou infecções por vírus.\n\nSolicite uma análise técnica conosco para identificarmos o melhor upgrade para o seu caso."
    },
    {
        question: "Dica Rápida: A internet no meu computador não funciona. O que verificar?",
        answer: "Problemas de conexão podem ser frustrantes, tente estes passos:\n\n• Reinicialização: Reinicie seu modem/roteador e o computador. Isso resolve 90% dos casos.\n• Cabos/Wi-Fi: Verifique se o cabo de rede está bem encaixado ou se a rede Wi-Fi correta está selecionada.\n• Configurações: Verifique se o ícone de rede apresenta um triângulo amarelo ou 'sem acesso à internet'.\n\nSe o problema persistir, entre em contato para verificarmos sua placa de rede ou configurações de IP."
    },
    {
        question: "Dica Rápida: Meu computador travou com uma tela azul. O que fazer?",
        answer: "A famosa 'Tela Azul da Morte' indica um problema crítico no sistema.\n\n• O que fazer: Anote o código de erro que aparece na tela (ex: CRITICAL_PROCESS_DIED).\n• Reinicie: Force o desligamento e tente reiniciar. Se o erro persistir, não insista.\n• Causa: Pode estar ligada a drivers corrompidos, falhas físicas na memória RAM ou no HD/SSD.\n\nEvite tentar reparos avançados sozinho para não perder seus dados. Leve a um técnico especializado."
    }
];

const FAQSection = () => {
    const { faqs } = React.useContext(DataContext);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [displayedText, setDisplayedText] = React.useState(faqs[0]?.answer || "");
    
    React.useEffect(() => {
        if (!faqs || faqs.length === 0) return;
        const answer = faqs[selectedIndex]?.answer || "";
        setDisplayedText(""); // Start empty for clean transition
        let i = 0;
        const timer = setInterval(() => {
            i++;
            setDisplayedText(answer.substring(0, i));
            if (i >= answer.length) {
                clearInterval(timer);
            }
        }, 30);
        return () => clearInterval(timer);
    }, [selectedIndex, faqs]);
    
    return React.createElement("section", { id: "faq", className: "py-24 bg-dark-bg", "aria-labelledby": "faq-heading" },
        React.createElement("div", { className: "container mx-auto px-6 max-w-3xl" },
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-50px" },
                transition: { duration: 0.5 },
                className: "text-center mb-16" 
            },
                React.createElement("h2", { id: "faq-heading", className: "text-3xl md:text-4xl font-extrabold text-white mb-6" }, "Dúvidas e Dicas Rápidas"),
                React.createElement("div", { className: "w-20 h-1.5 bg-primary mx-auto rounded-full" })
            ),
            React.createElement("div", { className: "space-y-10" },
                React.createElement("div", { className: "relative" },
                    React.createElement("label", { htmlFor: "faq-select", className: "block text-sm font-medium text-text-secondary mb-3" }, "Selecione uma dúvida:"),
                    React.createElement("select", { 
                        id: "faq-select",
                        value: selectedIndex,
                        onChange: (e) => setSelectedIndex(parseInt(e.target.value)),
                        className: "w-full bg-light-bg text-text-primary px-6 py-4 rounded-xl border border-gray-700 outline-none transition-all duration-300 font-bold text-lg focus:border-primary focus:shadow-[0_0_0_4px_rgba(59,130,246,0.1)]"
                    }, 
                        faqs.map((faq, index) => React.createElement("option", { key: faq.id || index, value: index }, faq.question))
                    )
                ),
                React.createElement(motion.div, {
                    key: selectedIndex,
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.5 },
                    className: "bg-light-bg/50 border border-gray-800 rounded-2xl p-8 shadow-inner min-h-[200px]"
                },
                    React.createElement("h3", { className: "text-primary font-bold text-lg mb-4" }, "Resposta:"),
                    React.createElement("p", { className: "text-gray-100 leading-relaxed text-base md:text-lg font-medium tracking-wide whitespace-pre-wrap" }, displayedText)
                )
            )
        )
    );
};

const Contact = () => {
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = React.useState({});
    const [status, setStatus] = React.useState({ message: '', type: '' });
    const FORM_ENDPOINT = "https://formspree.io/f/meoloydp";
    const focusStyles = "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary";
    const focusStylesLightBg = `${focusStyles} focus-visible:ring-offset-light-bg`;

    const validateField = (name, value) => {
        let error = '';
        if (name === 'name' && !value.trim()) error = 'O nome é obrigatório.';
        if (name === 'email') {
            if (!value.trim()) error = 'O email é obrigatório.';
            else if (!/\S+@\S+\.\S+/.test(value)) error = 'O formato do email é inválido.';
        }
        if (name === 'message' && !value.trim()) error = 'A mensagem é obrigatória.';
        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) validateField(name, value);
    };

    const validateForm = () => {
        const { name, email, message } = formData;
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'O nome é obrigatório.';
        if (!email.trim()) newErrors.email = 'O email é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'O formato do email é inválido.';
        if (!message.trim()) newErrors.message = 'A mensagem é obrigatória.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;
        setStatus({ message: 'Enviando mensagem...', type: 'loading' });
        try {
            const response = await fetch(FORM_ENDPOINT, {
                method: 'POST', body: new FormData(e.currentTarget), headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                setStatus({ message: 'Mensagem enviada com sucesso!', type: 'success' });
                setFormData({ name: '', email: '', message: '' });
                setErrors({});
            } else {
                const data = await response.json();
                setStatus({ message: data.errors?.map(err => err.message).join(', ') || 'Ocorreu um erro.', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'Ocorreu um erro de rede. Tente novamente.', type: 'error' });
        } finally {
            setTimeout(() => setStatus({ message: '', type: '' }), 5000);
        }
    };
    
    return React.createElement("section", { id: "contact", className: "py-20 bg-dark-bg relative", "aria-labelledby": "contact-heading" },
        React.createElement("div", { className: "container mx-auto px-6" },
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-50px" },
                transition: { duration: 0.5 },
                className: "text-center mb-12" 
            },
                React.createElement("h2", { id: "contact-heading", className: "text-4xl font-extrabold text-text-primary mb-4" }, "Entre em Contato"),
                React.createElement("p", { className: "text-lg text-text-secondary max-w-2xl mx-auto" }, "Tem alguma dúvida ou precisa de um orçamento? Nos envie uma mensagem!"),
                React.createElement("div", { className: "mt-4 w-24 h-1 bg-primary mx-auto rounded-full" })
            ),
            React.createElement(motion.div, { 
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-50px" },
                transition: { duration: 0.5, delay: 0.2 },
                className: "max-w-4xl mx-auto flex flex-col md:flex-row gap-10 bg-light-bg p-8 md:p-12 rounded-2xl border border-gray-800 shadow-2xl" 
            },
                React.createElement("div", { className: "md:w-1/2" },
                    React.createElement("form", { onSubmit: handleSubmit, action: FORM_ENDPOINT, method: "POST", className: "space-y-4", noValidate: true },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "name", className: "block text-sm font-medium text-text-secondary mb-2" }, "Nome"),
                            React.createElement("input", { type: "text", id: "name", name: "name", value: formData.name, onChange: handleChange, onBlur: e => validateField(e.target.name, e.target.value), className: `w-full bg-dark-bg border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary transition ${errors.name ? 'border-red-500' : 'border-gray-700'}`, required: true, autoComplete: "name", "aria-invalid": !!errors.name, "aria-describedby": errors.name ? "name-error" : undefined }),
                            errors.name && React.createElement("p", { id: "name-error", className: "text-red-400 text-sm mt-1" }, errors.name)
                        ),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "email", className: "block text-sm font-medium text-text-secondary mb-2" }, "Email"),
                            React.createElement("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleChange, onBlur: e => validateField(e.target.name, e.target.value), className: `w-full bg-dark-bg border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary transition ${errors.email ? 'border-red-500' : 'border-gray-700'}`, required: true, autoComplete: "email", "aria-invalid": !!errors.email, "aria-describedby": errors.email ? "email-error" : undefined }),
                            errors.email && React.createElement("p", { id: "email-error", className: "text-red-400 text-sm mt-1" }, errors.email)
                        ),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "message", className: "block text-sm font-medium text-text-secondary mb-2" }, "Mensagem"),
                            React.createElement("textarea", { id: "message", name: "message", rows: 5, value: formData.message, onChange: handleChange, onBlur: e => validateField(e.target.name, e.target.value), className: `w-full bg-dark-bg border rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-secondary transition ${errors.message ? 'border-red-500' : 'border-gray-700'}`, required: true, "aria-invalid": !!errors.message, "aria-describedby": errors.message ? "message-error" : undefined }),
                            errors.message && React.createElement("p", { id: "message-error", className: "text-red-400 text-sm mt-1" }, errors.message)
                        ),
                        React.createElement("div", { className: "pt-2" },
                            React.createElement("button", { type: "submit", disabled: status.type === 'loading', className: `w-full bg-primary hover:bg-secondary text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-secondary/40 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed ${focusStylesLightBg}` }, status.type === 'loading' ? 'Enviando...' : 'Enviar Mensagem')
                        ),
                        React.createElement("div", { "aria-live": "polite", "aria-atomic": "true", className: "h-6" },
                            status.message && React.createElement("p", { className: `text-center mt-4 ${status.type === 'success' ? 'text-green-400' : status.type === 'error' ? 'text-red-400' : 'text-text-secondary'}` }, status.message)
                        )
                    )
                ),
                React.createElement("div", { className: "md:w-1/2 flex flex-col justify-center text-center md:text-left space-y-6" },
                    React.createElement("h3", { className: "text-2xl font-bold text-text-primary" }, "Informações de Contato"),
                    React.createElement("p", { className: "text-text-secondary" }, "Prefere outro método? Nos encontre aqui:"),
                    React.createElement("div", { className: "space-y-4" },
                        React.createElement("div", { className: "flex items-center justify-center md:justify-start gap-3" }, React.createElement(UserIcon, { className: "w-6 h-6 text-secondary" }), React.createElement("span", { className: "text-text-primary" }, "Rogério Oliveira")),
                        React.createElement("div", { className: "flex items-center justify-center md:justify-start gap-3" }, React.createElement(EmailIcon, { className: "w-6 h-6 text-secondary" }), React.createElement("a", { href: "mailto:contato@deioinfo.com.br", className: `text-text-primary hover:text-secondary rounded-md ${focusStylesLightBg}` }, "contato@deioinfo.com.br")),
                        React.createElement("div", { className: "flex items-center justify-center md:justify-start gap-3" }, React.createElement(PhoneIcon, { className: "w-6 h-6 text-secondary" }), React.createElement("a", { href: "tel:+5521979776578", className: `text-text-primary hover:text-secondary rounded-md ${focusStylesLightBg}` }, "(21) 97977-6578")),
                        React.createElement("div", { className: "flex items-center justify-center md:justify-start gap-3" }, React.createElement(LocationIcon, { className: "w-6 h-6 text-secondary" }), React.createElement("span", { className: "text-text-primary" }, "Rio de Janeiro - RJ"))
                    )
                )
            )
        )
    );
};

const Footer = () => {
    const { settings } = React.useContext(DataContext);
    const phoneNumber = settings?.phone || "5521979776578";
    const defaultMessage = "Olá! Gostaria de saber mais sobre os serviços da Déio Informática.";
    const fallbackWhatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    
    // Fallback or use real settings
    const socialLinks = [
        { name: 'Facebook', href: settings?.facebook || 'https://facebook.com', icon: React.createElement(FacebookIcon, { className: "w-5 h-5" })},
        { name: 'Instagram', href: settings?.instagram || 'https://instagram.com', icon: React.createElement(InstagramIcon, { className: "w-5 h-5" })},
        { name: 'LinkedIn', href: settings?.linkedin || 'https://linkedin.com', icon: React.createElement(LinkedInIcon, { className: "w-5 h-5" })},
        { name: 'WhatsApp', href: settings?.whatsapp || fallbackWhatsappUrl, icon: React.createElement(WhatsAppIcon, {className: "w-5 h-5"}) }
    ].filter(link => link.href && link.href.trim() !== "");

    const footerLinks = [...NAV_LINKS];
    // Coluna 1 terá 3 itens, Coluna 2 terá os restantes (3)
    const col1 = footerLinks.slice(0, 3);
    const col2 = footerLinks.slice(3);

    const getLinkIcon = (name) => {
        switch (name) {
            case 'Serviços': return React.createElement(ComputerIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
            case 'Sobre Nós': return React.createElement(UserIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
            case 'Depoimentos': return React.createElement(MessageCircleIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
            case 'FAQ': return React.createElement(HelpCircleIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
            case 'Contato': return React.createElement(PhoneIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
            case 'WebMail': return React.createElement(EmailIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
            default: return React.createElement(ComputerIcon, { className: "w-4 h-4 text-secondary flex-shrink-0 group-hover:text-primary transition-colors" });
        }
    };

    return React.createElement("footer", { className: "border-t border-gray-800" },
        React.createElement("div", { className: "bg-light-bg pt-16 pb-12" },
            React.createElement("div", { className: "container mx-auto px-6" },
                React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-12 gap-8" },
                    
                    React.createElement("div", { className: "md:col-span-12 lg:col-span-4 space-y-4" },
                        React.createElement("a", { href: "#home", onClick: handleLinkClick, className: "inline-block text-2xl font-bold text-text-primary hover:text-secondary transition-colors focus:outline-none" }, 
                            "Déio Informática"
                        ),
                        React.createElement("p", { className: "text-text-secondary text-sm max-w-sm mt-4 leading-relaxed" }, 
                            "Nossa missão é simplificar a tecnologia para você focar no que realmente importa."
                        ),
                        React.createElement("div", { className: "flex items-center space-x-8 pt-6" }, 
                            socialLinks.map(link => React.createElement("a", { 
                                key: link.name, 
                                href: link.href, 
                                target: "_blank", 
                                rel: "noopener noreferrer", 
                                className: "text-text-secondary hover:text-secondary transition-transform duration-300 transform hover:scale-110 focus:outline-none",
                                "aria-label": link.name 
                            }, React.cloneElement(link.icon, { className: "w-6 h-6" })))
                        )
                    ),

                    React.createElement("div", { className: "md:col-span-6 lg:col-span-4 lg:ml-12" },
                        React.createElement("h3", { className: "text-text-primary font-bold mb-4" }, 
                            "Links Rápidos"
                        ),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4" }, 
                            React.createElement("ul", { className: "space-y-3" }, 
                                col1.map(link => React.createElement("li", { key: link.name }, 
                                    React.createElement("a", { 
                                        href: link.href, 
                                        onClick: link.isRoute || link.external ? undefined : handleLinkClick,
                                        target: link.external ? '_blank' : '_self',
                                        className: `group flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${link.name.includes('Admin') ? 'text-secondary hover:text-orange-400' : 'text-text-secondary hover:text-primary'} focus:outline-none`
                                    }, 
                                        getLinkIcon(link.name),
                                        link.name
                                    )
                                ))
                            ),
                            React.createElement("ul", { className: "space-y-3" }, 
                                col2.map(link => React.createElement("li", { key: link.name }, 
                                    React.createElement("a", { 
                                        href: link.href, 
                                        onClick: link.isRoute || link.external ? undefined : handleLinkClick,
                                        target: link.external ? '_blank' : '_self',
                                        className: `group flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${link.name.includes('Admin') ? 'text-secondary hover:text-orange-400' : 'text-text-secondary hover:text-primary'} focus:outline-none`
                                    }, 
                                        getLinkIcon(link.name),
                                        link.name
                                    )
                                ))
                            )
                        )
                    ),

                    React.createElement("div", { className: "md:col-span-6 lg:col-span-4 lg:flex lg:flex-col lg:items-end" },
                        React.createElement("div", { className: "w-full lg:w-3/4" },
                            React.createElement("h3", { className: "text-text-primary font-bold mb-4" }, "Contato"),
                            React.createElement("ul", { className: "space-y-5" },
                                React.createElement("li", { className: "flex items-center text-sm group" }, 
                                    React.createElement(PhoneIcon, { className: "w-5 h-5 text-secondary mr-3 flex-shrink-0" }),
                                    React.createElement("a", { href: `tel:+${(settings?.phone || "5521979776578").replace(/\D/g, '')}`, className: "text-text-secondary hover:text-white font-medium transition-colors focus:outline-none" }, settings?.phone || "(21) 97977-6578")
                                ),
                                React.createElement("li", { className: "flex items-center text-sm group" }, 
                                    React.createElement(EmailIcon, { className: "w-5 h-5 text-secondary mr-3 flex-shrink-0" }),
                                    React.createElement("a", { href: `mailto:${settings?.email || "contato@deioinfo.com.br"}`, className: "text-text-secondary hover:text-white font-medium transition-colors focus:outline-none break-all" }, settings?.email || "contato@deioinfo.com.br")
                                ),
                                React.createElement("li", { className: "flex items-center text-sm group" }, 
                                    React.createElement(LocationIcon, { className: "w-5 h-5 text-secondary mr-3 flex-shrink-0" }),
                                    React.createElement("span", { className: "text-text-secondary font-medium cursor-default" }, settings?.location || "Rio de Janeiro, RJ")
                                ),
                                React.createElement("li", { className: "pt-4 mt-4 border-t border-gray-800" }, 
                                    React.createElement("a", { href: "/admin", className: "inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-orange-400 transition-colors focus:outline-none" }, 
                                        React.createElement(SettingsIcon, { className: "w-4 h-4 flex-shrink-0" }),
                                        "Painel do Administrador"
                                    )
                                )
                            )
                        )
                    )
                )
            )
        ),
        
        React.createElement("div", { className: "bg-dark-bg py-5 border-t border-gray-800" },
            React.createElement("div", { className: "container mx-auto px-6 flex justify-center items-center" },
                React.createElement("p", { className: "text-text-secondary text-xs text-center" }, 
                    `© ${new Date().getFullYear()} Déio Informática. Todos os direitos reservados.`
                )
            )
        )
    );
};

const WhatsAppWidget = () => {
    const { settings } = React.useContext(DataContext);
    const phoneNumber = settings?.phone || "5521979776578";
    const defaultMessage = "Olá! Gostaria de falar com o suporte da Déio Informática.";
    const fallbackWhatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    const finalUrl = settings?.whatsapp || fallbackWhatsappUrl;
    
    const focusStyles = "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500 focus-visible:ring-offset-dark-bg";

    return React.createElement("a", { 
        href: finalUrl, 
        target: "_blank", 
        rel: "noopener noreferrer",
        className: `fixed bottom-8 right-8 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center ${focusStyles}`,
        "aria-label": "Chat no WhatsApp"
    }, React.createElement(WhatsAppIcon, { className: "w-8 h-8" }));
};

const TawkToWidget = () => {
    React.useEffect(() => {
        try {
            var Tawk_API=window.Tawk_API||{}, Tawk_LoadStart=new Date();
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/69de7a715e62a61c354bb444/1jm6gsitq';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            if (s0 && s0.parentNode) {
                s0.parentNode.insertBefore(s1,s0);
            }
        } catch (e) {
            console.warn("Tawk.to could not be loaded:", e);
        }
    }, []);

    return null;
};

import { db, auth } from './firebaseConfig.js';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firestoreUtils.js';

// Connection test as per guidelines
async function testConnection() {
  try {
    // Just a regular getDoc to verify connection in an async way
    await getDoc(doc(db, 'test', 'connection'));
    console.log("Firebase initialized.");
  } catch (error) {
    // This is often expected in some preview environments, we don't want to alarm the user
    console.warn("Firebase partially offline or connecting...");
  }
}
testConnection();

export const DataContext = React.createContext({
    services: SERVICES_LIST,
    testimonials: TESTIMONIALS_LIST,
    faqs: FAQ_DATA,
    about: "Fundada com a paixão por tecnologia e o compromisso com a excelência, a Déio Informática nasceu para simplificar o complexo mundo da TI. Nossa missão é fornecer soluções tecnológicas eficientes e personalizadas, capacitando nossos clientes a atingir seu pleno potencial.\n\nCom uma equipe de especialistas dedicados, estamos sempre atualizados com as últimas tendências para oferecer o melhor em suporte, segurança e inovação. Acreditamos que a tecnologia deve ser uma aliada, e trabalhamos incansavelmente para que isso seja uma realidade para você.",
    settings: {
        phone: "5521979776578",
        email: "contato@deioinfo.com.br",
        location: "Rio de Janeiro, RJ",
        facebook: "https://facebook.com",
        instagram: "https://instagram.com",
        linkedin: "https://linkedin.com",
        whatsapp: "https://wa.me/5521979776578"
    }
});

// Main App Component
const App = () => {
    const mainRef = React.useRef(null);
    const baseTitle = 'Déio Informática';
    
    const [siteData, setSiteData] = React.useState({
        services: SERVICES_LIST,
        testimonials: TESTIMONIALS_LIST,
        faqs: FAQ_DATA,
        about: "Fundada com a paixão por tecnologia e o compromisso com a excelência, a Déio Informática nasceu para simplificar o complexo mundo da TI. Nossa missão é fornecer soluções tecnológicas eficientes e personalizadas, capacitando nossos clientes a atingir seu pleno potencial.\n\nCom uma equipe de especialistas dedicados, estamos sempre atualizados com as últimas tendências para oferecer o melhor em suporte, segurança e inovação. Acreditamos que a tecnologia deve ser uma aliada, e trabalhamos incansavelmente para que isso seja uma realidade para você.",
        settings: {
            phone: "5521979776578",
            email: "contato@deioinfo.com.br",
            location: "Rio de Janeiro, RJ",
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            whatsapp: "https://wa.me/5521979776578"
        }
    });

    React.useEffect(() => {
        const fetchContent = async () => {
            try {
                // Fetch Services
                const s = await getDocs(collection(db, 'services'));
                const loadedServices = s.docs.map(doc => ({id: doc.id, ...doc.data()})).sort((a,b) => (a.order || 0) - (b.order || 0));
                
                // Fetch FAQs
                const f = await getDocs(collection(db, 'faqs'));
                const loadedFaqs = f.docs.map(doc => ({id: doc.id, ...doc.data()})).sort((a,b) => (a.order || 0) - (b.order || 0));
                
                // Fetch Testimonials
                const t = await getDocs(collection(db, 'testimonials'));
                const loadedTestimonials = t.docs.map(doc => ({id: doc.id, ...doc.data()})).sort((a,b) => (a.order || 0) - (b.order || 0));

                // Fetch About
                let loadedAbout = siteData.about;
                const aRef = await getDoc(doc(db, 'content', 'about'));
                if (aRef.exists()) loadedAbout = aRef.data().text;

                // Fetch Settings
                let loadedSettings = siteData.settings;
                const sRef = await getDoc(doc(db, 'content', 'settings'));
                if (sRef.exists()) loadedSettings = sRef.data();

                setSiteData({
                    services: loadedServices.length > 0 ? loadedServices : SERVICES_LIST,
                    faqs: loadedFaqs.length > 0 ? loadedFaqs : FAQ_DATA,
                    testimonials: loadedTestimonials.length > 0 ? loadedTestimonials : TESTIMONIALS_LIST,
                    about: loadedAbout,
                    settings: loadedSettings
                });
            } catch (err) {
                handleFirestoreError(err, OperationType.GET, 'multiple_collections', auth);
                console.error("Erro ao carregar do Firebase, usando dados estáticos.", err);
            }
        };
        fetchContent();
    }, []);

    React.useEffect(() => {
        const sectionTitles = { 'home': 'O mundo em suas mãos', 'services': 'Nossos Serviços', 'about': 'Sobre Nós', 'testimonials': 'Depoimentos', 'faq': 'Perguntas Frequentes', 'corporate': 'Soluções Corporativas', 'contact': 'Entre em Contato' };
        const sections = mainRef.current?.querySelectorAll('section[id]');
        if (!sections?.length) return;
        document.title = `${sectionTitles['home']} | ${baseTitle}`;
        const observer = new IntersectionObserver(entries => {
            let mostVisibleEntry = null;
            for (const entry of entries) {
                if (entry.isIntersecting && (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio)) {
                    mostVisibleEntry = entry;
                }
            }
            if (mostVisibleEntry) {
                const title = sectionTitles[mostVisibleEntry.target.id];
                const newTitle = title ? `${title} | ${baseTitle}` : `${baseTitle} - O mundo em suas mãos.`;
                if (document.title !== newTitle) document.title = newTitle;
            }
        }, { threshold: Array.from({ length: 11 }, (_, i) => i * 0.1), rootMargin: "-50px 0px -50px 0px" });
        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    return React.createElement(DataContext.Provider, { value: siteData },
        React.createElement("div", { className: "bg-dark-bg text-text-primary" },
            React.createElement(Header, null),
            React.createElement("main", { ref: mainRef },
                React.createElement(Hero, null),
                React.createElement(Services, null),
                React.createElement(About, null),
                React.createElement(Testimonials, null),
                React.createElement(Corporate, null),
                React.createElement(FAQSection, null),
                React.createElement(Contact, null)
            ),
            React.createElement(Footer, null),
            React.createElement(TawkToWidget, null)
        )
    );
};

// Entry Point
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Could not find root element to mount to");

const root = ReactDOM.createRoot(rootElement);

if (window.location.pathname.startsWith('/admin')) {
    import('./Admin.jsx').then(module => {
        const AdminPanel = module.default;
        root.render(React.createElement(React.StrictMode, null, React.createElement(AdminPanel, null)));
    });
} else {
    root.render(React.createElement(React.StrictMode, null, React.createElement(App, null)));
}