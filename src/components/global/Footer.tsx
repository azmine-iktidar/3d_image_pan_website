// eslint-disable jsx-no-target-blank
/* eslint-disable @next/next/no-img-element */
// components/Footer.js
export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full p-2 text-white  lg:absolute">
      <div className="flex items-center justify-center text-center">
      <div className="flex items-center justify-center z-50">
        <p className="text-xs ">Designed by </p>
      
        <a
          href="https://zogros.com"
          className="ml-1"
          target="_blank"
          rel="noopener"
        >
          <img
            src="https://zogros.com/images/logos/logo-z-text-light.svg"
            width="80"
            alt="zogros logo"
          />
        </a>
     
      </div>
      </div>
    </footer>
  );
}
