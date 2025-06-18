import { Email, Facebook, LinkedIn, LocationOn, Phone, WhatsApp } from '@mui/icons-material'
import { Button, Container, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import React from 'react'

interface ContactsInterface {
  activeCard: 'welcome' | 'portfolio' | 'contact'
  setActiveCard: (card: 'welcome' | 'portfolio' | 'contact') => void
}


export default function Contacts({activeCard, setActiveCard}:ContactsInterface) {
  return (
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
  )
}
