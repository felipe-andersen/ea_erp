
'use client'
import { useState, useRef } from 'react';
import { Header } from '@/components/organisms/header';
import { Main } from './main.view';
import { BottomNavigation } from '@/components/organisms/bottom-navigation/bottom-navigation.view';
import SideBar from '@/components/organisms/side-bar/side-bar.view';
import logger from '@/lib/pino';
import { ArrowLeftToLine, ArrowRightFromLine } from 'lucide-react';
import innerWidth from '@/hooks/useIsMobile';
import FloatingMessageButton from '@/components/organisms/FloatingMessageButton/FloatingMessageButton.view';
import { useEffect } from 'react';
import Script from 'next/script';


const moduleFileName = `templates/dashboard/dashboard.view.tsx`;

const loggerMsg = `> ${moduleFileName}`;

export default function Dashboard() {
    const [show, setShow] = useState(false);
    const [isSidebarExtended, setSidebarExtended] = useState(false);
    
    const target = useRef(null);

    logger.info(loggerMsg);

    // const Width = innerWidth();

    return (
        <div
            data-testid={'126g65d'}
            className='relative flex w-full h-full box-border  bg-zinc-300 overflow-hidden '
        >
            <Header pageName='Home' />
            <FloatingMessageButton />
            <div className={`w-full h-[calc(100%-88px)] md:h-[calc(100%-56px)] flex sm:top-14 fixed overflow-hidden z-[1006]`}>
                <SideBar isVisibleTitle={isSidebarExtended} />
                {/*<Main /> */}
            </div>
            <VLibras/>
            {/* {Width <= 768 ? <BottomNavigation /> : <></>} */}
        </div>
    )
}

export  function VLibras() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).VLibras) {
      new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
    }
  }, []);

  return (
    <>
      <Script
        src="https://vlibras.gov.br/app/vlibras-plugin.js"
        strategy="afterInteractive"
      />
    </>
  );
}