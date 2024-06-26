import Image from "next/image";
import Form from "@/components/Form.js"

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-700 ">
      {/* <Image src="/assets/background.png" width={100000} height={100000} className="absolute h-full w-full bg-cover bg-center"/> */}
       <h1 className="text-center w-full h-full bg-gradient-to-r from-amber-400 via-orange-700 to-yellow-400 bg-clip-text text-transparent font-semibold text-6xl pt-44">WeatherReporter<br/>
       <p className="text-center text-4xl text-black mt-4">Hello Folks!! Welcome to Weather Reporter.<br/>It is a web application where you can see weather of any city.</p>
       </h1>
        <Form/>
    </div>
  );
}
