
import Image from "next/image";
import NavBar from "../components/navbar";
import MainHero from "../components/mainhero"

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-[#8c6d53] to-[#6fa0ae] h-screen">
     <NavBar />
     <MainHero />
    </main>
  );
}
