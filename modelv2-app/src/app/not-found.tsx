import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <div className="text-center">
        {/* Desktop image: hidden on small screens */}
        <img
          src="/404NotFoundDesktop.svg"
          alt=""
          className="hidden sm:block mx-auto w-1/2 md:w-2/3 lg:w-2/3"
        />
        {/* Mobile image: visible only on small screens */}
        <img
          src="/404NotFoundResponsive.svg"
          alt=""
          className="block sm:hidden mx-auto w-1/2 xs:w-2/3"
        />
        <button className="mt-6 w-full max-w-xs mx-auto ">
          <Link href="/" className="bg-mainDef3 text-white py-3 px-10 text-xs rounded-lg hover:bg-buttonHover">
            HOME
          </Link>
        </button>
      </div>
    </div>
  );
}
