'use client';

import { Button, Container, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import bg1 from '../public/bg/bg1.jpg';
import bg2 from '../public/bg/bg2.jpg';
import bg3 from '../public/bg/bg3.jpg';
import photo1 from '../public/done/photo/photo1.jpg';
import photo2 from '../public/done/photo/photo1.jpg';
import video1 from '../public/done/videos/video1.jpg';
import video2 from '../public/done/videos/video1.jpg';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBackIosNew, ArrowForwardIos, Email, Facebook, LinkedIn, LocationOn, Phone, PhotoCamera, PlayCircleOutline, Videocam, WhatsApp } from '@mui/icons-material';


const backgrounds = [bg1, bg2, bg3];
const photos = [photo1, photo2, photo1, photo2];
const videos = [video1, video2, video1, video2];

export default function HomePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<'welcome' | 'portfolio' | 'contact'>('welcome');

  const photoRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.up('md'));

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
  if (ref.current) {
    const amount = direction === 'left' ? -300 : 300;
    ref.current.scrollBy({ left: amount, behavior: 'smooth' });
  }
};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-black">

      {/* Card Welcome */}
      <AnimatePresence>
        {activeCard === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-10"
          >
            {/* Background apenas no card de boas-vindas */}
            <div className="absolute inset-0 -z-10">
              {backgrounds.map((bg, i) => (
                <Image
                  key={i}
                  src={bg}
                  alt={`Background ${i}`}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${i === currentIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  priority={i === 0}
                />
              ))}
              <div className="absolute inset-0 bg-black/60" />
            </div>
            <Container
              maxWidth="md"
              className="h-screen flex flex-col items-center justify-center text-center text-white"
            >
              <Typography variant="h2" className="!text-4xl md:!text-5xl font-bold">
                Capturamos Histórias em Cada Frame
              </Typography>
              <Typography className="mt-4 text-lg md:text-xl">
                Produção profissional de fotos e vídeos para sua marca
              </Typography>
              <div className="flex gap-4 mt-8">
                <Button
                  variant="contained"
                  onClick={() => setActiveCard('portfolio')}
                  sx={{
                    backgroundColor: '#4caf50', // Verde padrão do MUI
                    '&:hover': {
                      backgroundColor: '#388e3c', // Verde escuro no hover
                    },
                  }}
                >
                  Ver Portfólio
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setActiveCard('contact')}
                  sx={{
                    color: '#4caf50',
                    borderColor: '#4caf50',
                    '&:hover': {
                      backgroundColor: 'rgba(76, 175, 80, 0.08)', // verde claro com opacidade
                      borderColor: '#388e3c',
                      color: '#388e3c',
                    },
                  }}
                >
                  Contactar
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Portfólio */}
      <AnimatePresence>
        {activeCard === 'portfolio' && (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 px-4 pt-20 pb-10 text-white min-h-screen bg-black"
          >
            <Container maxWidth="md">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Portfólio</Typography>
                <Button variant="text" color="inherit" onClick={() => setActiveCard('welcome')}>
                  ⬅ Voltar
                </Button>
              </div>

              <div className="flex items-center gap-2 text-white mb-2">
                <PhotoCamera sx={{ fontSize: 24 }} />
                <Typography className="text-xl">Trabalhos em Foto</Typography>
              </div>
              <div className="relative mb-6">
                {isLaptop && (
                  <>
                    <IconButton
                      onClick={() => scroll(photoRef, 'left')}
                      className="absolute top-1/2 left-0 z-10 text-white"
                      sx={{ transform: 'translateY(-50%)', position: 'absolute' }}
                    >
                      <ArrowBackIosNew sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => scroll(photoRef, 'right')}
                      className="absolute top-1/2 right-0 z-10 text-white"
                      sx={{ transform: 'translateY(-50%)', position: 'absolute' }}
                    >
                      <ArrowForwardIos sx={{ color: 'white' }}/>
                    </IconButton>
                  </>
                )}

                <div
                  ref={photoRef}
                  className="overflow-x-auto whitespace-nowrap scroll-smooth"
                >
                  <div className="flex gap-4">
                    {photos.map((src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt={`Foto ${i + 1}`}
                        width={200}
                        height={120}
                        className="rounded-lg shadow-md object-cover hover:scale-105 transition"
                      />
                    ))}
                  </div>
                </div>
              </div>


              <div className="flex items-center gap-2">
                <Videocam sx={{ fontSize: 24, color: 'white' }} />
                <Typography className="text-xl text-white">Trabalhos em Vídeo</Typography>
              </div>
              <div className="relative mb-6">
                {isLaptop && (
                  <>
                    <IconButton
                      onClick={() => scroll(videoRef, 'left')}
                      className="absolute top-1/2 left-0 z-10 text-white"
                      sx={{ transform: 'translateY(-50%)', position: 'absolute' }}
                    >
                      <ArrowBackIosNew sx={{ color: 'white' }}/>
                    </IconButton>
                    <IconButton
                      onClick={() => scroll(videoRef, 'right')}
                      className="absolute top-1/2 right-0 z-10 text-white"
                      sx={{ transform: 'translateY(-50%)', position:'absolute' }}
                    >
                      <ArrowForwardIos sx={{ color: 'white' }}/>
                    </IconButton>
                  </>
                )}

                <div
                  ref={videoRef}
                  className="overflow-x-auto whitespace-nowrap scroll-smooth"
                >
                  <div className="flex gap-4">
                    {videos.map((src, i) => (
                      <div key={i} className="relative group">
                        <Image
                          src={src}
                          alt={`Vídeo ${i + 1}`}
                          width={200}
                          height={120}
                          className="rounded-lg shadow-md object-cover hover:scale-105 transition"
                        />
                        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-black/40 transition">
                          <PlayCircleOutline sx={{ fontSize: 48, color: 'white' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Contato */}
      <AnimatePresence>
        {activeCard === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="relative z-20 px-4 pt-20 pb-10 text-white min-h-screen bg-neutral-900"
          >
            <Container maxWidth="sm">
              <div className="flex justify-between items-center mb-6">
                <Typography variant="h4">Contactos</Typography>
                <Button variant="text" color="inherit" onClick={() => setActiveCard('welcome')}>
                  ⬅ Voltar
                </Button>
              </div>

              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3">
                  <Email color="primary" /> contacto@empresa.com
                </div>
                <div className="flex items-center gap-3">
                  <Phone sx={{ color: '#4caf50' }} /> +258 84 000 0000
                </div>
                <div className="flex items-center gap-3">
                  <WhatsApp sx={{ color: '#25d366' }} /> +258 84 000 0000
                </div>
                <div className="flex items-center gap-3">
                  <LocationOn sx={{ color: '#f44336' }} /> Av. Julius Nyerere, Maputo
                </div>
                <div className="flex items-center gap-3">
                  <Facebook sx={{ color: '#1877F2' }} /> facebook.com/empresa
                </div>
                <div className="flex items-center gap-3">
                  <LinkedIn sx={{ color: '#0077B5' }} /> linkedin.com/company/empresa
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}