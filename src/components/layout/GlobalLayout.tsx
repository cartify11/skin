import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../header/Header';
import { FooterSection } from '../home/FooterSection';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { ScrollToTop } from './ScrollToTop';

export const GlobalLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col relative text-[#121816] antialiased">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterSection />
      <WhatsAppButton />
    </div>
  );
};
