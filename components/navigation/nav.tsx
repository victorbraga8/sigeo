// import { auth } from "@/server/auth";
// import UserButton from "./user-button";
// import { Button } from "../ui/button";
// import Logo from "./logo";
import Link from "next/link";

export default async function Nav() {
  return (
    <header className=" bg-lime-700 w-screen py-4">
      <nav>
        <ul className="flex justify-center gap-20">
          {/* <li className="text-slate-800">
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/sandbox"}>SandBox</Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
