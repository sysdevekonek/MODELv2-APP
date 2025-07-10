export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full h-32 bg-mainDef3 shadow z-40 flex items-center px-4">
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute top-0 right-0 w-3/4 h-full bg-mainDef2"
          style={{
            clipPath: 'polygon(99.8% 44%, 100% 0%, 25.6% 0%)',
          }}
        ></div>
      </div>
      <div>
        <a href="/dashboard">
          <img src="./../modellogowhite.png" alt="MODEL Logo" className="w-[15rem] h-auto" />
        </a>
      </div>
    </header>
  );
}