import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="bg-gray-900 shadow-lg border-b border-gray-800">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://www.giantbomb.com/a/uploads/square_small/10/101958/2069403-demonee_ho.png"
              className="h-16"
              alt="Logo Demonica Torneum"
            />
            <span className="text-3xl font-extrabold text-white tracking-wide">
              Demonica Torneum
            </span>
          </Link>
        </div>
        <div className="bg-gray-800 py-6 px-4 flex justify-center gap-10 flex-wrap">
          <NavCard to="/torneo" title="Torneos">
            {/* Trophy Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M6 3h12a2 2 0 012 2v3a5 5 0 01-5 5H9a5 5 0 01-5-5V5a2 2 0 012-2z" />
            </svg>
          </NavCard>
          <NavCard to="/videojuegos" title="Videojuegos">
            {/* Game Controller Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h.01M15 12h.01M12 9v6M3 7h18v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7z" />
            </svg>
          </NavCard>
          <NavCard to="/Jugadores" title="Jugadores">
            {/* User Group Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </NavCard>
          <NavCard to="/Equipos" title="Equipos">
            {/* Users Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v-2" />
            </svg>
          </NavCard>
        </div>
      </nav>

      <main className="bg-gray-50 min-h-screen p-6">
        <Outlet />
      </main>
    </>
  );
};

const NavCard = ({ to, title, children }) => (
  <Link
    to={to}
    className="flex flex-col items-center bg-gray-700 hover:bg-green-600 text-white p-6 rounded-3xl w-32 h-32 shadow-lg transition duration-300 ease-in-out"
  >
    {children}
    <span className="mt-3 text-lg font-semibold">{title}</span>
  </Link>
);

export default Layout;
