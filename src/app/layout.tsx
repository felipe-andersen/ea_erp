import { initalizeTracing } from './tracing';
import { initObservability } from './instrumentation';
initalizeTracing()
initObservability()
import type { Metadata } from "next";
import {Aleo, Archivo, Quicksand, Lexend } from "next/font/google";
import "./globals.scss";
import Head from "next/head";
import Script from "next/script";


const quicksand = Quicksand({
    variable: "--font-quicksand",
    subsets: ["latin"],
});

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});
  
const archivo = Archivo({
    variable: "--font-archivo-serif",
    subsets: ["latin"],
});
  
const aleoSerif = Aleo({
    variable: "--font-aleo-serif",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Embarque Angra",
    description: "Aproveite o melhor de Angra dos Reis com experiências únicas",
};

export default function RootLayout({
    children,
    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${lexend.variable} ${quicksand.variable} ${aleoSerif.variable} ${archivo.variable} antialiased flex justify-center w-full bg-neutral-100 overflow-hidden`}
            >
                <Script 
                    src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
                    strategy="afterInteractive"
                    // onLoad={() => {
                    //     // Se a lib global estiver no window
                    //     // if (typeof window !== 'undefined') {
                    //     //     console.log('Script carregado!');
                    //         // window.minhaLib.init();
                    //     }
                    // }}
                />
                {children}
            </body>
        </html>
    )
}