import React from 'react';
import { Link } from 'react-router-dom';
export function Footer() {
  return <footer className="bg-white text-black border-t border-gray-200 py-16 px-4 md:px-8 mt-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Internal Links */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg mb-2">Intern</h3>
          <Link to="/" className="text-gray-600 hover:text-black transition-colors">
            Inici
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-black transition-colors">
            Qui Som
          </Link>
          <Link to="/team" className="text-gray-600 hover:text-black transition-colors">
            Equip
          </Link>
          <Link to="/projects" className="text-gray-600 hover:text-black transition-colors">
            Projectes
          </Link>
        </div>

        {/* Contact */}
        <div className="flex flex-col space-y-4">
          <h3 className="font-bold text-lg mb-2">Contacte</h3>
          <a href="mailto:hello@duckhats.cat" className="text-gray-600 hover:text-black transition-colors">
            hello@duckhats.cat
          </a>
          <div className="pt-4">
            <h4 className="font-bold text-sm mb-2">Xarxes Socials</h4>
            <a href="#" className="text-gray-600 hover:text-black transition-colors">
              @duckhats
            </a>
          </div>
        </div>

        {/* DuckHats Info */}
        <div className="flex flex-col space-y-4 md:items-end md:text-right">
          <h3 className="font-display font-bold text-2xl mb-2">DuckHats</h3>
          <div className="h-px w-24 bg-black my-4 md:ml-auto" />
          <p className="text-gray-600 text-sm">
            amb amor i codi
            <br />
            des de l'estany
          </p>
          <p className="text-gray-400 text-xs mt-8">© 2024 DuckHats</p>
        </div>
      </div>
    </footer>;
}