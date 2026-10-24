import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Mail, Menu, X } from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

interface HeaderProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'credentials', label: 'Credentials', href: '#credentials' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleMobileNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}
      role="banner"
    >
      <div className="container header-inner">
        <a
          href="#top"
          className="brand-mark"
          aria-label="Nand Patel — Return to top of portfolio"
        >
          <span className="brand-monogram" aria-hidden="true">
            <span className="brand-monogram__letters">{RESUME_DATA.person.monogram}</span>
            <span className="brand-tricolor" aria-hidden="true">
              <span className="brand-tricolor__dot brand-tricolor__dot--saffron" />
              <span className="brand-tricolor__dot brand-tricolor__dot--coral" />
              <span className="brand-tricolor__dot brand-tricolor__dot--sky" />
            </span>
          </span>
          <span className="brand-identity">
            <span className="brand-identity__name">{RESUME_DATA.person.name}</span>
            <span className="brand-identity__role">B.Tech CSE · GSFC University</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'nav-link--active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="header-actions">
          <a
            href={`mailto:${RESUME_DATA.person.links.email}`}
            className="header-ext-link"
            aria-label={`Email Nand Patel at ${RESUME_DATA.person.links.email}`}
          >
            <Mail size={14} aria-hidden="true" />
            <span>{RESUME_DATA.person.links.email}</span>
          </a>
          <a
            href={RESUME_DATA.person.links.github}
            className="header-ext-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nand Patel on GitHub (opens in a new tab)"
          >
            <span>GitHub</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn--primary btn--sm header-cta">
            Internship Inquiry
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => {
              const next = !menuOpen;
              setMenuOpen(next);
              if (next) {
                requestAnimationFrame(() => {
                  firstMobileLinkRef.current?.focus();
                });
              }
            }}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation-drawer"
        className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation" className="container mobile-drawer__inner">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id}>
                <a
                  ref={idx === 0 ? firstMobileLinkRef : undefined}
                  href={item.href}
                  className={`mobile-nav-link ${
                    activeSection === item.id ? 'mobile-nav-link--active' : ''
                  }`}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={handleMobileNavClick}
                >
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-drawer__footer">
            <a
              href={`mailto:${RESUME_DATA.person.links.email}`}
              className="btn btn--secondary"
              tabIndex={menuOpen ? 0 : -1}
              onClick={handleMobileNavClick}
            >
              <Mail size={15} aria-hidden="true" />
              <span>Email Nand</span>
            </a>
            <a
              href={RESUME_DATA.person.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
              tabIndex={menuOpen ? 0 : -1}
              onClick={handleMobileNavClick}
            >
              <span>LinkedIn</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
