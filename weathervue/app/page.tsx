import Image from "next/image";
import Api from "./api";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  p-24 bg-blue-200">
     <Api />
    </main>
  );
}
