export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full bg-transparent py-4 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-2 text-center">
        <div className="flex flex-col items-center space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0">
          <a
            href="https://zogros.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <p className="text-sm">Designed by</p>
            <img
              src="https://zogros.com/images/logos/logo-z-text-light.svg"
              alt="Zogros logo"
              width="100"
            />
          </a>
          <span className="hidden text-gray-400 lg:inline">|</span>
          <a
            href="https://www.fiverr.com/users/azmineiktidar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold transition-colors hover:text-cyan-400"
          >
            Developed by Iktidar
          </a>
        </div>
      </div>
    </footer>
  );
}
