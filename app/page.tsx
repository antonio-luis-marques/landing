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
import { ArrowBackIosNew, ArrowForwardIos, PhotoCamera, Videocam } from '@mui/icons-material';
import Contacts from '@/components/contacts/Contacts';
import YouTubePlayer from '../components/videoplayer/VideoPlayer';


const backgrounds = [bg1, bg2, bg3];
const photos = [photo1, photo2, photo1, photo2, photo1, photo2, photo1, photo2];
const videoLinks = [
  'https://www.youtube.com/watch?v=qV-tFfNPsB8',
  'https://www.youtube.com/watch?v=dYGFJPXs2Rs',
  'https://www.youtube.com/watch?v=cOwkzEAi4l4',
  'https://www.youtube.com/watch?v=daeZfKcH6AM'
];
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
                      <ArrowForwardIos sx={{ color: 'white' }} />
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
                      <ArrowBackIosNew sx={{ color: 'white' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => scroll(videoRef, 'right')}
                      className="absolute top-1/2 right-0 z-10 text-white"
                      sx={{ transform: 'translateY(-50%)', position: 'absolute' }}
                    >
                      <ArrowForwardIos sx={{ color: 'white' }} />
                    </IconButton>
                  </>
                )}

                <div
                  ref={videoRef}
                  className="overflow-x-auto whitespace-nowrap scroll-smooth"
                >
                  <div className="flex gap-4 relative">
                    {videoLinks.map((url) => (
                      // <div key={url} className="w-72 overflow-hidden">
                        <YouTubePlayer key={url}  youtubeUrl={url} />
                      // </div>
                    ))}

                  </div>
                </div>
              </div>

            </Container>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Contato */}
      <Contacts activeCard={activeCard} setActiveCard={setActiveCard} />
    </div>
  );
}