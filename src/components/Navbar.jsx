import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Nowicki Naturalnie
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Strona główna
          </Link>
          <Link to="/orders" className="hover:underline">
            Zamówienia
          </Link>
          <Link to="/products" className="hover:underline">
            Produkty
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
