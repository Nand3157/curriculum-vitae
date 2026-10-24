import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  Calendar,
  Layers,
  MapPin,
  MessageSquareWarning,
  Navigation,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { ProjectItem, RESUME_DATA } from '../data/resumeData';

interface ProjectConstellation3DProps {
  activeProjectId: ProjectItem['id'] | null;
  onSelectProject: (id: ProjectItem['id']) => void;
  scrollProgress: number;
  reducedMotion: boolean;
}

export const ProjectConstellation3D: React.FC<ProjectConstellation3DProps> = ({
  activeProjectId,
  onSelectProject,
  scrollProgress,
  reducedMotion,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [hoveredId, setHoveredId] = useState<ProjectItem['id'] | null>(null);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const renderFrame = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w * 0.5 + pointer.x * 18;
      const cy = h * 0.5 + pointer.y * 18;

      const radial = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.max(w, h) * 0.62);
      radial.addColorStop(0, 'rgba(2, 132, 199, 0.11)');
      radial.addColorStop(0.45, 'rgba(29, 78, 216, 0.05)');
      radial.addColorStop(1, 'rgba(248, 250, 252, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.62);

      const rings = [112, 188, 258];
      rings.forEach((radius, idx) => {
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.strokeStyle =
          idx === 1 ? 'rgba(2, 132, 199, 0.28)' : 'rgba(100, 116, 139, 0.16)';
        ctx.lineWidth = 1;
        ctx.setLineDash(idx === 1 ? [5, 7] : []);
        ctx.stroke();

        const angle = time * (idx % 2 === 0 ? 0.35 : -0.25) + idx * 2.1;
        const px = Math.cos(angle) * radius;
        const py = Math.sin(angle) * radius;
        ctx.fillStyle = idx === 0 ? '#D97706' : idx === 1 ? '#0284C7' : '#E11D48';
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      if (!reducedMotion && isInView) {
        time += 0.012;
        animationFrameId = window.requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
    };
  }, [pointer.x, pointer.y, reducedMotion, isInView]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    setPointer({
      x: Math.max(-1, Math.min(1, nx)),
      y: Math.max(-1, Math.min(1, ny)),
    });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
    setHoveredId(null);
  };

  const clampedScroll = reducedMotion ? 0 : Math.min(1, Math.max(0, scrollProgress));
  const stageRotateX = reducedMotion ? 10 : 12 - pointer.y * 5 - clampedScroll * 6;
  const stageRotateY = reducedMotion ? -11 : -12 + pointer.x * 7 + clampedScroll * 6;
  const stageTranslateY = reducedMotion ? 0 : clampedScroll * 44;

  const projects = RESUME_DATA.projects;

  return (
    <div
      ref={stageRef}
      className="constellation-stage"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="region"
      aria-label="Interactive 3D Project Constellation. Select any artifact to unfold its case study below."
    >
      <canvas
        ref={canvasRef}
        className="constellation-canvas"
        aria-hidden="true"
      />

      <div className="constellation-hud-top">
        <span className="constellation-hud__badge">
          <Layers size={13} aria-hidden="true" />
          <span>Interactive Project Constellation</span>
        </span>
        <span className="constellation-hud__hint">
          Select an artifact to inspect below
        </span>
      </div>

      <div
        className="constellation-scene"
        style={
          {
            '--stage-rx': `${stageRotateX.toFixed(2)}deg`,
            '--stage-ry': `${stageRotateY.toFixed(2)}deg`,
            '--stage-ty': `${stageTranslateY.toFixed(1)}px`,
            '--scroll-factor': clampedScroll.toFixed(3),
          } as React.CSSProperties
        }
      >
        <div className="constellation-desk-plane" aria-hidden="true">
          <span className="constellation-desk-plane__coord">
            22.3072° N, 73.1812° E · VADODARA
          </span>
        </div>

        {/* ARTIFACT 1: EduVerseSocial */}
        <button
          type="button"
          className={`artifact-3d artifact-3d--eduverse ${
            hoveredId === 'eduversesocial' || activeProjectId === 'eduversesocial'
              ? 'artifact-3d--active'
              : ''
          }`}
          onMouseEnter={() => setHoveredId('eduversesocial')}
          onFocus={() => setHoveredId('eduversesocial')}
          onBlur={() => setHoveredId(null)}
          onClick={() => onSelectProject('eduversesocial')}
          aria-label="Inspect EduVerseSocial: Social media management platform featuring analytics, content recommendations, and post scheduling"
        >
          <div className="artifact-3d__base">
            <div className="artifact-header">
              <span className="artifact-index">{projects[0].liveDomainLabel}</span>
              <span className="artifact-dot artifact-dot--cobalt" />
            </div>

            <div className="eduverse-visual" aria-hidden="true">
              <div className="eduverse-analytics-card">
                <div className="eduverse-analytics-card__head">
                  <span className="mini-mono">Analytics Stream</span>
                  <span className="mini-pill mini-pill--cobalt">Live</span>
                </div>
                <svg
                  viewBox="0 0 180 48"
                  className="eduverse-chart-svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="eduGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,38 Q26,32 45,22 T92,24 T138,11 T180,6 L180,48 L0,48 Z"
                    fill="url(#eduGrad)"
                  />
                  <path
                    d="M0,38 Q26,32 45,22 T92,24 T138,11 T180,6"
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="2.2"
                  />
                  <circle cx="45" cy="22" r="3.2" fill="#0284C7" />
                  <circle cx="138" cy="11" r="3.5" fill="#D97706" />
                </svg>
              </div>

              <div className="eduverse-sublayers">
                <div className="eduverse-rec-tile">
                  <Sparkles size={11} />
                  <span>Content Recs</span>
                </div>
                <div className="eduverse-sched-tile">
                  <Calendar size={11} />
                  <span>Post Queue</span>
                </div>
              </div>
            </div>

            <div className="artifact-footer">
              <div className="artifact-footer__text">
                <span className="artifact-title">{projects[0].title}</span>
                <span className="artifact-caption">Analytics · Recs · Scheduling</span>
              </div>
              <span className="artifact-action-icon" aria-hidden="true">
                <ArrowDownRight size={15} />
              </span>
            </div>
          </div>

          <div className="artifact-3d__floating-chip artifact-3d__floating-chip--top" aria-hidden="true">
            <span className="chip-indicator chip-indicator--sky" />
            <span>Scheduled Queue</span>
          </div>
        </button>

        {/* ARTIFACT 2: JANSETU AI */}
        <button
          type="button"
          className={`artifact-3d artifact-3d--jansetu ${
            hoveredId === 'jansetu-ai' || activeProjectId === 'jansetu-ai'
              ? 'artifact-3d--active'
              : ''
          }`}
          onMouseEnter={() => setHoveredId('jansetu-ai')}
          onFocus={() => setHoveredId('jansetu-ai')}
          onBlur={() => setHoveredId(null)}
          onClick={() => onSelectProject('jansetu-ai')}
          aria-label="Inspect JANSETU AI: AI-powered civic platform for analyzing citizen feedback and prioritizing infrastructure needs"
        >
          <div className="artifact-3d__base">
            <div className="artifact-header">
              <span className="artifact-index">{projects[1].liveDomainLabel}</span>
              <span className="artifact-dot artifact-dot--saffron" />
            </div>

            <div className="jansetu-visual" aria-hidden="true">
              <div className="jansetu-map-plane">
                <svg viewBox="0 0 200 86" className="jansetu-map-svg">
                  <path
                    d="M 10 20 L 190 20 M 10 45 L 190 45 M 10 70 L 190 70 M 45 6 L 45 80 M 100 6 L 100 80 M 155 6 L 155 80"
                    stroke="rgba(100, 116, 139, 0.18)"
                    strokeWidth="1"
                  />
                  <path
                    d="M 24 64 L 68 42 L 122 50 L 172 20"
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2.2"
                    strokeDasharray="4 3"
                  />
                  <path
                    d="M 24 64 L 68 42 L 122 50 L 172 20"
                    fill="none"
                    stroke="rgba(217, 119, 6, 0.2)"
                    strokeWidth="7"
                  />
                  <g transform="translate(24, 64)">
                    <circle r="7" fill="rgba(2, 132, 199, 0.18)" />
                    <circle r="3.5" fill="#0284C7" />
                  </g>
                  <g transform="translate(68, 42)">
                    <circle r="9" fill="rgba(217, 119, 6, 0.22)" />
                    <circle r="4" fill="#D97706" />
                  </g>
                  <g transform="translate(122, 50)">
                    <circle r="8" fill="rgba(225, 29, 72, 0.2)" />
                    <circle r="4" fill="#E11D48" />
                  </g>
                  <g transform="translate(172, 20)">
                    <circle r="10" fill="rgba(217, 119, 6, 0.24)" />
                    <circle r="4.5" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.2" />
                  </g>
                </svg>

                <div className="jansetu-node-overlay">
                  <span className="jansetu-tag jansetu-tag--priority">
                    <MessageSquareWarning size={11} />
                    <span>Civic Triage</span>
                  </span>
                  <span className="jansetu-tag">Infra Priority</span>
                </div>
              </div>
            </div>

            <div className="artifact-footer">
              <div className="artifact-footer__text">
                <span className="artifact-title">{projects[1].title}</span>
                <span className="artifact-caption">Civic Feedback · Infra Priority</span>
              </div>
              <span className="artifact-action-icon" aria-hidden="true">
                <ArrowDownRight size={15} />
              </span>
            </div>
          </div>

          <div className="artifact-3d__floating-chip artifact-3d__floating-chip--saffron" aria-hidden="true">
            <span className="chip-indicator chip-indicator--saffron" />
            <span>AI Priority Triage</span>
          </div>
        </button>

        {/* ARTIFACT 3: EasyPark */}
        <button
          type="button"
          className={`artifact-3d artifact-3d--easypark ${
            hoveredId === 'easypark' || activeProjectId === 'easypark'
              ? 'artifact-3d--active'
              : ''
          }`}
          onMouseEnter={() => setHoveredId('easypark')}
          onFocus={() => setHoveredId('easypark')}
          onBlur={() => setHoveredId(null)}
          onClick={() => onSelectProject('easypark')}
          aria-label="Inspect EasyPark: Parking discovery app with interactive maps, location search, and parking filters"
        >
          <div className="artifact-3d__base">
            <div className="artifact-header">
              <span className="artifact-index">{projects[2].liveDomainLabel}</span>
              <span className="artifact-dot artifact-dot--sky" />
            </div>

            <div className="easypark-visual" aria-hidden="true">
              <div className="easypark-search-row">
                <span className="easypark-search-pill">
                  <Navigation size={10} />
                  <span>Search destination...</span>
                </span>
                <span className="easypark-filter-pill">
                  <SlidersHorizontal size={10} />
                  <span>Filters</span>
                </span>
              </div>

              <div className="easypark-map-box">
                <svg viewBox="0 0 190 66" className="easypark-map-svg">
                  <rect x="8" y="8" width="46" height="22" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
                  <rect x="64" y="8" width="54" height="22" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
                  <rect x="128" y="8" width="52" height="22" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
                  <rect x="8" y="38" width="68" height="20" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />
                  <rect x="86" y="38" width="94" height="20" rx="3" fill="#E2E8F0" stroke="#CBD5E1" />

                  <path
                    d="M 20 34 L 81 34 L 81 19 L 154 19"
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle cx="20" cy="34" r="3.5" fill="#0F172A" />
                  <g transform="translate(154, 19)">
                    <circle r="7.5" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                    >
                      P
                    </text>
                  </g>
                  <g transform="translate(59, 48)">
                    <circle r="5.5" fill="rgba(2, 132, 199, 0.2)" stroke="#0284C7" strokeWidth="1.4" />
                  </g>
                </svg>
              </div>
            </div>

            <div className="artifact-footer">
              <div className="artifact-footer__text">
                <span className="artifact-title">{projects[2].title}</span>
                <span className="artifact-caption">Interactive Maps · Search · Filters</span>
              </div>
              <span className="artifact-action-icon" aria-hidden="true">
                <ArrowDownRight size={15} />
              </span>
            </div>
          </div>

          <div className="artifact-3d__floating-chip artifact-3d__floating-chip--bottom" aria-hidden="true">
            <MapPin size={11} />
            <span>Zone P-04 Open</span>
          </div>
        </button>
      </div>

      <div className="constellation-dock" role="group" aria-label="Quick jump to project artifacts">
        {projects.map((proj) => {
          const isSelected = activeProjectId === proj.id || hoveredId === proj.id;
          return (
            <button
              key={proj.id}
              type="button"
              className={`constellation-dock__item ${
                isSelected ? 'constellation-dock__item--active' : ''
              }`}
              onMouseEnter={() => setHoveredId(proj.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectProject(proj.id)}
            >
              <span className={`artifact-dot artifact-dot--${proj.accentColor}`} aria-hidden="true" />
              <span className="constellation-dock__label">{proj.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
