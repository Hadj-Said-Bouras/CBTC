
import Image from "next/image";
import NavBar from "../components/navbar";
import MainHero from "../components/mainhero"

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[#6e5742] to-[#335e66] h-full  md:pb-40">
     <NavBar />
     <MainHero />
    </main>
  );
}

