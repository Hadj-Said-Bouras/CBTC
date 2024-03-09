import Image from "next/image";
import Api from "./api";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Api />
    </main>
  );
}
