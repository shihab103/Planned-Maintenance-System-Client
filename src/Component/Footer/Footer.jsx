export default function Footer() {
  return (
    <footer className="py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Branding */}
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold">SRS</h1>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Right side: Links */}
        <div className="flex gap-4">
          <a href="/" className="hover:text-indigo-400 transition">
            Home
          </a>
          <a href="/about" className="hover:text-indigo-400 transition">
            About
          </a>
          <a href="/contact" className="hover:text-indigo-400 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
