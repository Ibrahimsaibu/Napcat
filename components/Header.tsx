import Link from "next/link";

function Header() {
  return (
    <header className="w-full from-[#D5EAFF] to-[#E8D2FF] bg-gradient-95 ">
      <div className="h-20 sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl px-4 mx-auto w-full flex justify-between items-center  py-8">
        <Link href="/">
          <p className="tracking-tight  text-2xl lg:text-3xl font-black">
            Napcat
          </p>
        </Link>

        <Link
          href="https://napcat.io"
          className=" font-medium text-center rounded-md shadow-md border hover:shadow-lg cursor-pointer hover-animation py-2 px-4  text-base bg-emerald-200 hover:bg-emerald-100 text-black border-emerald-200  inline-block active:scale-90 transition duration-150"
        >
          Join Napcat
        </Link>
      </div>
    </header>
  );
}

export default Header;
