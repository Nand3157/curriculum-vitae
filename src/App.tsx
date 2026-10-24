import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { Header } from './components/Header';
import { ProjectConstellation3D } from './components/ProjectConstellation3D';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ProjectItem, RESUME_DATA } from './data/resumeData';

export function App() {
  const [expandedProjectId, setExpandedProjectId] = useState<ProjectItem['id'] | null>(
    null
  );
  const [activeSection, setActiveSection] = useState<string>('work');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroThreshold = Math.max(window.innerHeight * 0.75, 420);
      setScrollProgress(Math.min(1, Math.max(0, scrollY / heroThreshold)));

      const sectionIds = ['work', 'about', 'skills', 'credentials', 'contact'];
      let current = 'work';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectConstellationProject = (projectId: ProjectItem['id']) => {
    setExpandedProjectId(projectId);
    const targetCard = document.getElementById(`project-${projectId}`);
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  const handleCopyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      window.setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? null : prev));
      }, 2200);
    } catch {
      if (text.startsWith('http')) {
        window.open(text, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = `mailto:${text}`;
      }
    }
  };

  return (
    <div id="top" className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="ambient-backdrop" aria-hidden="true">
        <div className="ambient-bloom ambient-bloom--cobalt" />
        <div className="ambient-bloom ambient-bloom--sky" />
        <div className="ambient-bloom ambient-bloom--saffron" />
      </div>

      <Header activeSection={activeSection} />

      <main id="main-content">
        {/* HERO SECTION */}
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy-col">
              <div className="availability-banner">
                <span className="availability-pulse" aria-hidden="true" />
                <span className="availability-text">
                  {RESUME_DATA.person.availability}
                </span>
              </div>

              <h1 id="hero-title" className="hero-title">
                {RESUME_DATA.person.name}
              </h1>

              <p className="hero-subtitle">
                Second-year <strong>B.Tech Computer Science and Engineering</strong> student at{' '}
                <strong>{RESUME_DATA.person.university}</strong> crafting web applications across
                analytics workflows, civic AI triage, and spatial discovery.
              </p>

              <div className="hero-cta-group">
                <a href="#work" className="btn btn--primary btn--lg">
                  <span>Explore my work</span>
                  <ArrowDown size={16} aria-hidden="true" />
                </a>
                <a
                  href={`mailto:${RESUME_DATA.person.links.email}`}
                  className="btn btn--secondary btn--lg"
                >
                  <Mail size={16} aria-hidden="true" />
                  <span>{RESUME_DATA.person.links.email}</span>
                </a>
              </div>

              <dl className="hero-meta-strip" aria-label="Quick profile facts">
                <div className="hero-meta-item">
                  <dt>Academic Track</dt>
                  <dd>B.Tech CSE · 2025–2029</dd>
                </div>
                <div className="hero-meta-item">
                  <dt>Location</dt>
                  <dd>{RESUME_DATA.person.location}</dd>
                </div>
                <div className="hero-meta-item">
                  <dt>Core Focus</dt>
                  <dd>Web Engineering & DSA</dd>
                </div>
              </dl>
            </div>

            <div className="hero-constellation-col">
              <ProjectConstellation3D
                activeProjectId={expandedProjectId}
                onSelectProject={handleSelectConstellationProject}
                scrollProgress={scrollProgress}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </section>

        {/* SELECTED WORK SECTION */}
        <SelectedWorkSection
          expandedId={expandedProjectId}
          onToggleExpand={setExpandedProjectId}
          reducedMotion={reducedMotion}
        />

        {/* ABOUT SECTION */}
        <section id="about" className="section about-section" aria-labelledby="about-heading">
          <div className="container">
            <div className="about-editorial-layout">
              <div className="about-left-meta">
                <h2 id="about-heading" className="section-title">
                  Building practical software from first principles.
                </h2>

                <div className="tricolor-rule" aria-hidden="true">
                  <span className="tricolor-rule__seg tricolor-rule__seg--saffron" />
                  <span className="tricolor-rule__seg tricolor-rule__seg--coral" />
                  <span className="tricolor-rule__seg tricolor-rule__seg--sky" />
                </div>

                <div className="about-fact-sheet">
                  <div className="about-fact-row">
                    <span className="about-fact-label">
                      <MapPin size={14} aria-hidden="true" />
                      Base
                    </span>
                    <span className="about-fact-value">{RESUME_DATA.person.location}</span>
                  </div>
                  <div className="about-fact-row">
                    <span className="about-fact-label">
                      <GraduationCap size={14} aria-hidden="true" />
                      Institution
                    </span>
                    <span className="about-fact-value">{RESUME_DATA.person.university}</span>
                  </div>
                  <div className="about-fact-row">
                    <span className="about-fact-label">
                      <Mail size={14} aria-hidden="true" />
                      Email
                    </span>
                    <a
                      href={`mailto:${RESUME_DATA.person.links.email}`}
                      className="about-fact-value about-fact-link"
                    >
                      {RESUME_DATA.person.links.email}
                    </a>
                  </div>
                  <div className="about-fact-row">
                    <span className="about-fact-label">
                      <Globe size={14} aria-hidden="true" />
                      Languages
                    </span>
                    <span className="about-fact-value">
                      {RESUME_DATA.person.languages.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="about-right-prose">
                <blockquote className="about-pullquote">
                  “Excited about software engineering, solving problems, and creating technology
                  solutions.”
                </blockquote>

                <div className="about-paragraphs">
                  {RESUME_DATA.person.aboutParagraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="about-pillars">
                  <div className="about-pillar-card">
                    <h3>Web Development Projects</h3>
                    <p>
                      Hands-on experience assembling complete frontend interfaces for social media
                      management, civic reporting, and map-based parking discovery.
                    </p>
                  </div>
                  <div className="about-pillar-card">
                    <h3>Problem-Solving Foundation</h3>
                    <p>
                      Grounded in Data Structures and Algorithms (DSA) with multi-language
                      coursework across Python, C++, Java, JavaScript, and MySQL.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS SECTION */}
        <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
          <div className="container">
            <div className="section-header section-header--split">
              <div>
                <h2 id="skills-heading" className="section-title">
                  Languages, web technologies, and engineering tools.
                </h2>
              </div>
              <p className="section-lead">
                Organized directly from coursework and project work—presented clearly without
                arbitrary percentage bars.
              </p>
            </div>

            <div className="skills-matrix" role="list">
              {RESUME_DATA.skills.map((group) => (
                <div key={group.category} className="skill-domain-card" role="listitem">
                  <div className="skill-domain-card__header">
                    <span className="skill-domain-card__code">{group.code}</span>
                    <Terminal size={15} className="skill-domain-card__icon" aria-hidden="true" />
                  </div>
                  <h3 className="skill-domain-card__title">{group.category}</h3>
                  <ul className="skill-tag-list" aria-label={group.category}>
                    {group.items.map((item) => (
                      <li key={item} className="skill-tag">
                        <span className="skill-tag__dot" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS (CREDENTIALS) SECTION */}
        <section
          id="credentials"
          className="section credentials-section"
          aria-labelledby="credentials-heading"
        >
          <div className="container">
            <div className="section-header section-header--split">
              <div>
                <h2 id="credentials-heading" className="section-title">
                  Education & Verified Certifications
                </h2>
              </div>
              <p className="section-lead">
                Academic standing at {RESUME_DATA.person.university} and verified technical
                credentials issued via Credly.
              </p>
            </div>

            {/* Credentials Identity & Verification Strip with Email */}
            <div className="credential-identity-strip" aria-label="Credential verification contact details">
              <div className="credential-identity-strip__main">
                <ShieldCheck size={18} className="credential-identity-strip__icon" aria-hidden="true" />
                <div>
                  <span className="credential-identity-strip__title">
                    Credential & Academic Verification Contact
                  </span>
                  <p className="credential-identity-strip__desc">
                    Issued to <strong>{RESUME_DATA.person.name}</strong> · Registered email:{' '}
                    <a
                      href={`mailto:${RESUME_DATA.person.links.email}`}
                      className="credential-email-link"
                    >
                      {RESUME_DATA.person.links.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="credential-identity-strip__actions">
                <a
                  href={`mailto:${RESUME_DATA.person.links.email}`}
                  className="btn btn--secondary btn--sm"
                >
                  <Mail size={14} aria-hidden="true" />
                  <span>{RESUME_DATA.person.links.email}</span>
                </a>
                <button
                  type="button"
                  className="btn btn--ghost btn--sm"
                  onClick={() =>
                    handleCopyText('cred-email', RESUME_DATA.person.links.email)
                  }
                  aria-label="Copy credential verification email address"
                >
                  {copiedKey === 'cred-email' ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} aria-hidden="true" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="credentials-grid">
              {/* Education Column */}
              <div className="credentials-column" aria-labelledby="edu-subhead">
                <div className="credentials-subhead">
                  <BookOpen size={17} aria-hidden="true" />
                  <h3 id="edu-subhead">Education</h3>
                </div>

                <div className="education-list">
                  {RESUME_DATA.education.map((edu) => (
                    <article
                      key={`${edu.institution}-${edu.qualification}`}
                      className={`edu-card ${edu.isPrimary ? 'edu-card--primary' : ''}`}
                    >
                      <div className="edu-card__top">
                        <span className="edu-card__period">{edu.period}</span>
                        {edu.isPrimary && (
                          <span className="edu-card__badge">Current Degree</span>
                        )}
                      </div>
                      <h4 className="edu-card__degree">{edu.qualification}</h4>
                      <p className="edu-card__school">{edu.institution}</p>

                      <dl className="edu-metrics-row">
                        {edu.metrics.map((metric) => (
                          <div key={metric.label} className="edu-metric-box">
                            <dt className="edu-metric-box__label">{metric.label}</dt>
                            <dd className="edu-metric-box__value">{metric.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </article>
                  ))}
                </div>
              </div>

              {/* Certifications & Training Column */}
              <div className="credentials-column" aria-labelledby="cert-subhead">
                <div className="credentials-subhead">
                  <Award size={17} aria-hidden="true" />
                  <h3 id="cert-subhead">Certifications & Training (Credly Badges)</h3>
                </div>

                <div className="certifications-list">
                  {RESUME_DATA.certifications.map((cert) => (
                    <a
                      key={cert.title}
                      href={cert.badgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-card cert-card--link"
                      aria-label={`Verify ${cert.title} issued by ${cert.issuer} on Credly (opens in a new tab)`}
                    >
                      <div className="cert-card__badge-mark" aria-hidden="true">
                        <Award size={18} />
                      </div>
                      <div className="cert-card__content">
                        <span className="cert-card__domain">{cert.domain}</span>
                        <h4 className="cert-card__title">{cert.title}</h4>
                        <p className="cert-card__issuer">{cert.issuer}</p>
                      </div>
                      <span className="cert-card__verify-cta">
                        <span>Verify Badge</span>
                        <ExternalLink size={14} aria-hidden="true" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="section contact-section" aria-labelledby="contact-heading">
          <div className="container">
            <div className="contact-panel">
              <div className="contact-panel__glow" aria-hidden="true" />

              <div className="contact-panel__content">
                <div className="availability-banner">
                  <span className="availability-pulse" aria-hidden="true" />
                  <span className="availability-text">
                    Available for Software Development Internships
                  </span>
                </div>

                <h2 id="contact-heading" className="contact-title">
                  Let’s connect on internship opportunities and engineering projects.
                </h2>

                <p className="contact-lead">
                  Based in {RESUME_DATA.person.location} and studying Computer Science &
                  Engineering at {RESUME_DATA.person.university}. Reach out directly via email,
                  connect on LinkedIn, or inspect my repositories on GitHub.
                </p>

                <div className="contact-cards-grid contact-cards-grid--three">
                  {/* Direct Email Verified Card */}
                  <div className="contact-channel-card">
                    <div className="contact-channel-card__top">
                      <span className="contact-channel-card__label">Direct Email</span>
                      <span className="contact-channel-card__status">Verified</span>
                    </div>
                    <h3 className="contact-channel-card__name">Email</h3>
                    <p className="contact-channel-card__handle">
                      {RESUME_DATA.person.links.email}
                    </p>
                    <div className="contact-channel-card__actions">
                      <a
                        href={`mailto:${RESUME_DATA.person.links.email}`}
                        className="btn btn--primary btn--sm"
                      >
                        <Mail size={14} aria-hidden="true" />
                        <span>Send Email</span>
                      </a>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() =>
                          handleCopyText('email', RESUME_DATA.person.links.email)
                        }
                        aria-label="Copy email address"
                      >
                        {copiedKey === 'email' ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} aria-hidden="true" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* LinkedIn Verified Card */}
                  <div className="contact-channel-card">
                    <div className="contact-channel-card__top">
                      <span className="contact-channel-card__label">Professional Network</span>
                      <span className="contact-channel-card__status">Verified</span>
                    </div>
                    <h3 className="contact-channel-card__name">LinkedIn</h3>
                    <p className="contact-channel-card__handle">
                      {RESUME_DATA.person.links.linkedinHandle}
                    </p>
                    <div className="contact-channel-card__actions">
                      <a
                        href={RESUME_DATA.person.links.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary btn--sm"
                      >
                        <span>Connect on LinkedIn</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() =>
                          handleCopyText('linkedin', RESUME_DATA.person.links.linkedin)
                        }
                        aria-label="Copy LinkedIn profile URL"
                      >
                        {copiedKey === 'linkedin' ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} aria-hidden="true" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* GitHub Verified Card */}
                  <div className="contact-channel-card">
                    <div className="contact-channel-card__top">
                      <span className="contact-channel-card__label">Code & Repositories</span>
                      <span className="contact-channel-card__status">Verified</span>
                    </div>
                    <h3 className="contact-channel-card__name">GitHub</h3>
                    <p className="contact-channel-card__handle">
                      {RESUME_DATA.person.links.githubHandle}
                    </p>
                    <div className="contact-channel-card__actions">
                      <a
                        href={RESUME_DATA.person.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary btn--sm"
                      >
                        <span>Explore GitHub</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        onClick={() =>
                          handleCopyText('github', RESUME_DATA.person.links.github)
                        }
                        aria-label="Copy GitHub profile URL"
                      >
                        {copiedKey === 'github' ? (
                          <>
                            <Check size={14} aria-hidden="true" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} aria-hidden="true" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer" role="contentinfo">
        <div className="container footer-inner">
          <div className="footer-brand">
            <div className="brand-tricolor" aria-hidden="true">
              <span className="brand-tricolor__dot brand-tricolor__dot--saffron" />
              <span className="brand-tricolor__dot brand-tricolor__dot--coral" />
              <span className="brand-tricolor__dot brand-tricolor__dot--sky" />
            </div>
            <span className="footer-brand__name">{RESUME_DATA.person.name}</span>
            <span className="footer-brand__sep" aria-hidden="true">
              /
            </span>
            <span className="footer-brand__meta">
              {RESUME_DATA.person.degree} · {RESUME_DATA.person.university}
            </span>
          </div>

          <div className="footer-links">
            <a href="#top" className="footer-link">
              Back to top
            </a>
            <a
              href={`mailto:${RESUME_DATA.person.links.email}`}
              className="footer-link"
            >
              {RESUME_DATA.person.links.email}
            </a>
            <a
              href={RESUME_DATA.person.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a
              href={RESUME_DATA.person.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
