'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Home,
  Briefcase,
  IdCard,
  Key,
  GraduationCap,
  FileText,
  Book,
  HelpCircle,
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Desktop Header Nav Items (5 items matching live header)
  const navItems = [
    { label: 'Home', href: '/', key: 'home', icon: Home },
    { label: 'Latest Jobs', href: '/latest-jobs', key: 'jobs', icon: Briefcase },
    { label: 'Admit Card', href: '/admit-card', key: 'admit', icon: IdCard },
    { label: 'Answer Key', href: '/answer-key', key: 'key', icon: Key },
    { label: 'Result', href: '/result', key: 'result', icon: GraduationCap },
  ];

  // Drawer Nav Items (Full list matching mobile/tablet side drawer)
  const drawerNavItems = [
    { label: 'Home', href: '/', key: 'home', icon: Home },
    { label: 'Latest Jobs', href: '/latest-jobs', key: 'jobs', icon: Briefcase },
    { label: 'Admit Card', href: '/admit-card', key: 'admit', icon: IdCard },
    { label: 'Answer Key', href: '/answer-key', key: 'key', icon: Key },
    { label: 'Result', href: '/result', key: 'result', icon: GraduationCap },
    { label: 'Syllabus', href: '/syllabus', key: 'syllabus', icon: FileText },
    { label: 'Previous Year Papers', href: '/pyq', key: 'pyq', icon: Book },
    { label: 'Study Notes', href: '/notes', key: 'notes', icon: HelpCircle },
  ];

  const handleDrawerToggle = (isOpen: boolean) => {
    setDrawerOpen(isOpen);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
  };

  useEffect(() => {
    setDrawerOpen(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }, [pathname]);

  const isNavActive = (itemHref: string) => {
    if (!pathname) return false;
    const cleanPath = pathname.replace(/\/$/, '') || '/';
    const cleanHref = itemHref.replace(/\/$/, '') || '/';

    if (cleanHref === '/') return cleanPath === '/';
    if (cleanHref === '/latest-jobs') return cleanPath === '/latest-jobs' || cleanPath === '/jobs';
    if (cleanHref === '/admit-card') return cleanPath === '/admit-card' || cleanPath.includes('admit');
    if (cleanHref === '/answer-key') return cleanPath === '/answer-key' || cleanPath.includes('key');
    if (cleanHref === '/result') return cleanPath === '/result' || cleanPath.includes('result');
    if (cleanHref === '/syllabus') return cleanPath === '/syllabus';
    if (cleanHref === '/pyq') return cleanPath === '/pyq';
    if (cleanHref === '/notes') return cleanPath === '/notes';

    return cleanPath === cleanHref || cleanPath.startsWith(cleanHref);
  };

  return (
    <>
      {/* Clean White Sticky Navbar (Matching original PHP includes/header.php) */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Brand Logotype */}
          <Link href="/" className="nav-brand">
            <img
              src="https://upload.odishaaspirants.com/oalogo.png"
              alt="Odisha Aspirants Logo"
              width={42}
              height={42}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/oalogo.png';
              }}
              style={{
                width: '42px',
                height: '42px',
                objectFit: 'contain',
                borderRadius: '50%',
                flexShrink: 0,
              }}
            />
            <span className="nav-brand-title">Odisha Aspirants</span>
          </Link>

          {/* Desktop Navigation Menu */}
          <ul className="nav-menu">
            {navItems.map((item) => {
              const active = isNavActive(item.href);
              return (
                <li key={item.key}>
                  <Link href={item.href} className={`nav-link ${active ? 'active' : ''}`}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile & Tablet Drawer Toggle Button */}
          <button className="nav-toggle-btn" onClick={() => handleDrawerToggle(true)} aria-label="Open Navigation">
            <Menu style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <Link href="/" className={`bottom-nav-link ${isNavActive('/') ? 'active' : ''}`}>
          <Home style={{ width: '20px', height: '20px' }} />
          <span>Home</span>
        </Link>
        <Link href="/latest-jobs" className={`bottom-nav-link ${isNavActive('/latest-jobs') ? 'active' : ''}`}>
          <Briefcase style={{ width: '20px', height: '20px' }} />
          <span>Jobs</span>
        </Link>
        <Link href="/admit-card" className={`bottom-nav-link ${isNavActive('/admit-card') ? 'active' : ''}`}>
          <IdCard style={{ width: '20px', height: '20px' }} />
          <span>Admit</span>
        </Link>
        <Link href="/answer-key" className={`bottom-nav-link ${isNavActive('/answer-key') ? 'active' : ''}`}>
          <Key style={{ width: '20px', height: '20px' }} />
          <span>Key</span>
        </Link>
        <Link href="/result" className={`bottom-nav-link ${isNavActive('/result') ? 'active' : ''}`}>
          <GraduationCap style={{ width: '20px', height: '20px' }} />
          <span>Result</span>
        </Link>
      </div>

      {/* Mobile & Tablet Off-Canvas Drawer */}
      <div className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => handleDrawerToggle(false)}>
        <aside className="drawer-aside" onClick={(e) => e.stopPropagation()}>
          <div className="drawer-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src="https://upload.odishaaspirants.com/oalogo.png"
                alt="Odisha Aspirants Logo"
                width={34}
                height={34}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/oalogo.png';
                }}
                style={{
                  width: '34px',
                  height: '34px',
                  objectFit: 'contain',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#0b4ca3' }}>
                Odisha Aspirants
              </span>
            </div>
            <button className="drawer-close" onClick={() => handleDrawerToggle(false)} aria-label="Close menu">
              &times;
            </button>
          </div>

          <ul className="drawer-menu">
            {drawerNavItems.map((item) => {
              const active = isNavActive(item.href);
              const IconComp = item.icon;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`drawer-link ${active ? 'active' : ''}`}
                    onClick={() => handleDrawerToggle(false)}
                  >
                    <IconComp style={{ width: '18px', height: '18px' }} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>

      <style jsx>{`
        .navbar {
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 80px;
          z-index: 1000;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }

        .nav-container {
          max-width: 1240px;
          width: 100%;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
          box-sizing: border-box;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          height: 100%;
        }

        .nav-brand-title {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          font-size: 1.45rem;
          font-weight: 800;
          color: #0b4ca3;
          letter-spacing: -0.3px;
          white-space: nowrap;
        }

        .nav-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          height: 80px;
        }

        .nav-menu li {
          height: 80px;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          font-size: 0.92rem;
          font-family: 'Poppins', sans-serif;
          padding: 0 0.6rem;
          transition: all 0.2s ease;
          border-bottom: 3px solid transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          height: 80px;
          line-height: 80px;
          position: relative;
        }

        .nav-link:hover {
          color: #0b4ca3;
        }

        .nav-link.active {
          color: #0b4ca3 !important;
          font-weight: 700 !important;
          border-bottom: 3px solid #ff7a00 !important;
          background: transparent !important;
        }

        .nav-toggle-btn {
          display: none;
          background: none;
          border: none;
          color: #0f172a;
          cursor: pointer;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .nav-toggle-btn:hover {
          background: #f1f5f9;
        }

        /* Mobile Bottom Nav */
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 64px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-top: 1px solid #e2e8f0;
          z-index: 9999;
          box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
          justify-content: space-around;
          align-items: center;
          padding: 0 0.5rem;
        }

        .bottom-nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          text-decoration: none;
          color: #64748b;
          font-size: 0.72rem;
          font-weight: 600;
          font-family: 'Poppins', sans-serif;
          height: 100%;
          flex: 1;
        }

        .bottom-nav-link.active {
          color: #0b4ca3;
          font-weight: 700;
        }

        /* Mobile & Tablet Off-Canvas Drawer */
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 10000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .drawer-overlay.open {
          opacity: 1;
          pointer-events: auto;
        }

        .drawer-aside {
          position: fixed;
          top: 0;
          left: -320px;
          width: 300px;
          height: 100%;
          background: #ffffff;
          box-shadow: 10px 0 30px rgba(0, 0, 0, 0.1);
          z-index: 10001;
          display: flex;
          flex-direction: column;
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .drawer-overlay.open .drawer-aside {
          left: 0;
        }

        .drawer-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-close {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          cursor: pointer;
          color: #0f172a;
          transition: all 0.2s;
        }

        .drawer-close:hover {
          background: #fee2e2;
          color: #ef4444;
          border-color: #fecaca;
        }

        .drawer-menu {
          list-style: none;
          padding: 1.25rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1;
          overflow-y: auto;
        }

        .drawer-link {
          display: flex !important;
          flex-direction: row !important;
          align-items: center !important;
          justify-content: flex-start !important;
          gap: 14px !important;
          padding: 0.85rem 1.25rem;
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.2s;
          font-size: 0.95rem;
          font-family: 'Poppins', sans-serif;
          white-space: nowrap;
          width: 100%;
          box-sizing: border-box;
        }

        .drawer-link span {
          display: inline-block;
          font-size: 0.95rem;
        }

        .drawer-link:hover,
        .drawer-link.active {
          color: #0b4ca3;
          background: #eff6ff;
          font-weight: 700;
        }

        @media (max-width: 1200px) {
          .nav-menu {
            display: none;
          }
          .nav-toggle-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            padding: 0;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            height: 64px;
          }
          .mobile-bottom-nav {
            display: flex;
          }
        }

        @media (max-width: 480px) {
          .nav-brand-title {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
