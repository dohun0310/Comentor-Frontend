import { Logo } from "../Logo";

export function Header() {
  return (
    <header
      className="flex h-16 sm:h-20 md:h-[100px] w-full items-center justify-center"
    >
      <Logo />
    </header>
  );
}