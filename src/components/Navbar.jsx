import { Link } from 'react-router-dom'
import { Package2 } from 'lucide-react' // Example icon, replace if you have a logo

function Navbar() {
  return (
    <nav className="bg-gradient-to-b from-[var(--primary-color)] to-[#6a360f] text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold font-[var(--header-font)] hover:opacity-90 transition-opacity">
          {/* Replace with actual logo if available */}
          {/* <img src="/logo.png" alt="Nowicki Naturalnie Logo" className="h-8 w-auto" /> */}
          <Package2 className="h-6 w-6" /> {/* Placeholder Icon */}
          Nowicki Naturalnie
        </Link>
        <div className="space-x-8">
          <Link 
            to="/" 
            className="relative font-medium text-[var(--accent-color)] hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Strona główna
          </Link>
          <Link 
            to="/orders" 
            className="relative font-medium text-[var(--accent-color)] hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Zamówienia
          </Link>
          <Link 
            to="/settings" 
            className="relative font-medium text-[var(--accent-color)] hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Ustawienia
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

