import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { OriginShowcase } from "@/components/sections/OriginShowcase";
import { MenuInfusiones } from "@/components/sections/menu/MenuInfusiones";
import { Nosotros } from "@/components/sections/Nosotros";
import { Ubicacion } from "@/components/sections/Ubicacion";
import { Contacto } from "@/components/sections/Contacto";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <OriginShowcase />
        <Nosotros />
        <MenuInfusiones />
        
        <Ubicacion />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
