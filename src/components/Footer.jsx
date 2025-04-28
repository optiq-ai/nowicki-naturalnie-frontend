import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react' // Import icons

function Footer() {
  // TODO: Fetch these dynamically from settings/context in a real app
  const companyName = "Nowicki Naturalnie";
  const companyDescription = "Naturalne wędliny wytwarzane według tradycyjnych receptur, bez konserwantów i ulepszaczy.";
  const companyAddress = "ul. Gruszowa 5, 63-500 Potaśnia";
  const companyPhone = "+48 62 730 08 00";
  const companyEmail = "kontakt@nowickinaturalnie.pl";
  const facebookUrl = "https://facebook.com/nowickinaturalnie";
  const instagramUrl = "https://instagram.com/nowickinaturalnie";
  const twitterUrl = ""; // Add if available

  return (
    <footer className="bg-gradient-to-t from-[var(--primary-color)] to-[#6a360f] text-white p-8 mt-auto shadow-inner">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 font-[var(--header-font)] text-[var(--accent-color)]">{companyName}</h3>
            <p className="text-[var(--accent-color)]/90 text-sm leading-relaxed">{companyDescription}</p>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:text-white transition-colors duration-300">
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:text-white transition-colors duration-300">
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
              )}
              {twitterUrl && (
                <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-color)] hover:text-white transition-colors duration-300">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
              )}
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[var(--header-font)] text-[var(--accent-color)]">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-[var(--accent-color)] flex-shrink-0" />
                <span className="text-[var(--accent-color)]/90">{companyAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[var(--accent-color)] flex-shrink-0" />
                <a href={`tel:${companyPhone.replace(/\s/g, '')}`} className="text-[var(--accent-color)]/90 hover:text-white transition-colors duration-300">{companyPhone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[var(--accent-color)] flex-shrink-0" />
                <a href={`mailto:${companyEmail}`} className="text-[var(--accent-color)]/90 hover:text-white transition-colors duration-300">{companyEmail}</a>
              </li>
            </ul>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-lg font-bold mb-4 font-[var(--header-font)] text-[var(--accent-color)]">Nawigacja</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-[var(--accent-color)]/90 hover:text-white transition-colors duration-300">Strona główna</Link></li>
              <li><Link to="/orders" className="text-[var(--accent-color)]/90 hover:text-white transition-colors duration-300">Zamówienia</Link></li>
              <li><Link to="/settings" className="text-[var(--accent-color)]/90 hover:text-white transition-colors duration-300">Ustawienia</Link></li>
              {/* Add other relevant links if needed */}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[var(--secondary-color)]/50 mt-8 pt-6 text-center text-sm text-[var(--accent-color)]/80">
          <p>© {new Date().getFullYear()} {companyName}. Wszelkie prawa zastrzeżone.</p>
          {/* Optional: Links to privacy policy, terms, etc. */}
          {/* <div className="mt-2 space-x-4">
            <Link to="/privacy-policy" className="hover:text-white">Polityka prywatności</Link>
            <Link to="/terms" className="hover:text-white">Regulamin</Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer

