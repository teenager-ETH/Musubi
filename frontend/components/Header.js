import { ConnectButton } from "web3uikit";
import Link from "next/link";
import LoginForm from "./loginForm";

export default function Header() {
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <h1 className="py-4 px-4 font-bold text-3xl">Musubi</h1>
      <div className="flex flex-row items-center">
        <Link href="/" className="mr-4 p-6">
          Talent Pool
        </Link>
        <Link href="/talent-badge" className="mr-4 p-6">
          List Badge
        </Link>
        <Link href="/coding-pod" className="mr-4 p-6">
          Start a Test
        </Link>
        <ConnectButton moralisAuth={false} />
        <LoginForm />
      </div>
    </nav>
  );
}
