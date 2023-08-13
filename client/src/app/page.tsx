"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import UserName from "./(pages)/UserName/UserName";

export default function Home() {
   return (
    <>
      <div>
        <UserName />
      </div>
    </>
  );
}
