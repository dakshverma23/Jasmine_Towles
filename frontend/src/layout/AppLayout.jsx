import { Badge, Drawer } from "antd";
import { LayoutDashboard, LogIn, LogOut, Menu, ShoppingBag, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [
  ["About", "/about"],
  ["Products", "/products"],
  ["Facilities", "/facilities"],
  ["Quality", "/quality"],
  ["Careers", "/careers"],
  ["Contact", "/contact"]
];

export default function AppLayout({ children }) {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sessionAction = () => {
    if (user) logout();
    else navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-ven-cream text-ven-ink">
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="ven-container">
          <div className="neo-panel flex items-center justify-between px-4 py-3 md:px-5">
            <Link to="/" className="group flex items-center gap-3 text-ven-ink">
              <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-ven-ink text-ven-cream shadow-[0_12px_28px_rgba(16,19,20,0.24)]">
                <Sparkles size={18} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-display text-xl font-semibold leading-none md:text-2xl">Jasmine Towels</span>
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-ven-muted sm:block">
                  Future textile systems
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {links.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `rounded-[8px] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all ${
                      isActive ? "bg-ven-ink text-ven-cream" : "text-ven-muted hover:bg-white/80 hover:text-ven-ink"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {user?.role === "admin" && (
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  aria-label="Admin dashboard"
                  className="hidden h-11 w-11 place-items-center rounded-[8px] border border-ven-line bg-white/70 text-ven-ink transition-all hover:border-[#00a6a6] hover:text-[#00a6a6] md:grid"
                >
                  <LayoutDashboard size={18} />
                </button>
              )}
              <button
                type="button"
                onClick={sessionAction}
                aria-label={user ? "Logout" : "Login"}
                className="hidden h-11 w-11 place-items-center rounded-[8px] border border-ven-line bg-white/70 text-ven-ink transition-all hover:border-[#ff6f61] hover:text-[#ff6f61] sm:grid"
              >
                {user ? <LogOut size={18} /> : <LogIn size={18} />}
              </button>
              <Badge count={totalItems} offset={[-3, 3]}>
                <Link
                  to="/cart"
                  aria-label="Order cart"
                  className="grid h-11 w-11 place-items-center rounded-[8px] border border-ven-line bg-white/70 text-ven-ink transition-all hover:border-[#00a6a6] hover:text-[#00a6a6]"
                >
                  <ShoppingBag size={18} />
                </Link>
              </Badge>
              <Link to="/products" className="ven-btn hidden md:inline-flex">
                Place Order
              </Link>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center rounded-[8px] border border-ven-line bg-white/70 lg:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        placement="right"
        width={340}
        closeIcon={<X size={20} />}
        title={<span className="font-display text-2xl font-semibold">Navigation</span>}
      >
        <nav className="flex flex-col gap-3">
          {links.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-[8px] px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] ${
                  isActive ? "bg-ven-ink text-ven-cream" : "bg-white/60 text-ven-muted"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/products" onClick={() => setMenuOpen(false)} className="ven-btn mt-4 w-full text-center">
            Place Order
          </Link>
          {user?.role === "admin" && (
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/admin");
              }}
              className="ven-btn-outline w-full"
            >
              Admin
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              sessionAction();
            }}
            className="ven-btn-outline w-full"
          >
            {user ? "Logout" : "Login"}
          </button>
        </nav>
      </Drawer>

      <main>{children}</main>

      <footer className="border-t border-ven-line bg-[#101314] text-ven-cream">
        <div className="ven-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-3xl font-semibold">Jasmine Towels Pvt. Ltd.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/62">
              Export-grade textile manufacturing across Madurai and Sivagangai, built for bulk orders,
              custom runs, and reliable fulfillment.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["ISO 9001", "ISO 14001", "ISO 45001"].map((item) => (
                <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/70">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#00d1c7]">Navigate</p>
            <div className="flex flex-col gap-3">
              {links.map(([label, path]) => (
                <Link key={path} to={path} className="text-sm text-white/62 transition-colors hover:text-white">
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#b7e85f]">Facilities</p>
            <p className="text-sm text-white/62">Madurai / Sivagangai</p>
            <p className="mt-8 text-xs font-bold uppercase tracking-[0.16em] text-white/42">
              Copyright {new Date().getFullYear()} Jasmine Towels
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
