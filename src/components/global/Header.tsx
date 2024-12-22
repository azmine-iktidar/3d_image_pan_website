import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-10 bg-transparent">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 transition-colors hover:text-gray-600 dark:text-white dark:hover:text-gray-300"
          >
            Pan and Zoom Viewer
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/about"
              className="text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 transition-colors hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
