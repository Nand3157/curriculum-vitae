import React, { useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Code2,
  Globe,
  Layers,
  Minimize2,
} from 'lucide-react';
import { ProjectItem, RESUME_DATA } from '../data/resumeData';
import { ProjectPreviewSurface } from './ProjectPreviewSurface';

interface SelectedWorkSectionProps {
  expandedId: ProjectItem['id'] | null;
  onToggleExpand: (id: ProjectItem['id'] | null) => void;
  reducedMotion: boolean;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  expandedId,
  onToggleExpand,
  reducedMotion,
}) => {
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!expandedId) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        const currentId = expandedId;
        onToggleExpand(null);
        requestAnimationFrame(() => {
          triggerRefs.current[currentId]?.focus();
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedId, onToggleExpand]);

  const handleCardPointerMove = (event: React.PointerEvent<HTMLElement>, isExpanded: boolean) => {
    if (reducedMotion || isExpanded || event.pointerType === 'touch') return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    const rx = (((event.clientY - rect.top) / rect.height - 0.5) * -3.5).toFixed(2);
    const ry = (((event.clientX - rect.left) / rect.width - 0.5) * 3.5).toFixed(2);
    el.style.setProperty('--glow-x', `${x.toFixed(1)}%`);
    el.style.setProperty('--glow-y', `${y.toFixed(1)}%`);
    el.style.setProperty('--card-rx', `${rx}deg`);
    el.style.setProperty('--card-ry', `${ry}deg`);
  };

  const handleCardPointerLeave = (event: React.PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    el.style.setProperty('--card-rx', '0deg');
    el.style.setProperty('--card-ry', '0deg');
  };

  const expandedProject = RESUME_DATA.projects.find((p) => p.id === expandedId);

  return (
    <section
      id="work"
      className="section work-section"
      aria-labelledby="work-heading"
    >
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {expandedProject
          ? `${expandedProject.title} case study panel expanded. Press Escape to collapse.`
          : 'All project case study panels collapsed.'}
      </div>

      <div className="container">
        <div className="section-header section-header--split">
          <div>
            <h2 id="work-heading" className="section-title">
              Selected software systems, assembled in interactive layers.
            </h2>
          </div>
          <p className="section-lead">
            Launch any live application or repository directly, or unfold a project card in
            place to inspect its architectural layers and interactive interface preview.
          </p>
        </div>

        <div className="projects-gallery">
          {RESUME_DATA.projects.map((project) => {
            const isExpanded = expandedId === project.id;
            const isReceded = expandedId !== null && !isExpanded;
            const panelId = `project-panel-${project.id}`;
            const titleId = `project-title-${project.id}`;

            return (
              <article
                key={project.id}
                id={`project-${project.id}`}
                ref={(node) => {
                  cardRefs.current[project.id] = node;
                }}
                className={`project-card project-card--${project.accentColor} ${
                  isExpanded ? 'project-card--expanded' : ''
                } ${isReceded ? 'project-card--receded' : ''}`}
                aria-labelledby={titleId}
                onPointerMove={(e) => handleCardPointerMove(e, isExpanded)}
                onPointerLeave={handleCardPointerLeave}
              >
                <div className="project-card__top-bar">
                  <span className="project-card__coord">{project.coordinates}</span>
                  <div className="project-card__top-actions">
                    <span className="project-card__category-pill">{project.category}</span>
                    <button
                      ref={(node) => {
                        triggerRefs.current[project.id] = node;
                      }}
                      type="button"
                      className={`project-toggle-btn ${
                        isExpanded ? 'project-toggle-btn--active' : ''
                      }`}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => onToggleExpand(isExpanded ? null : project.id)}
                    >
                      <span>{isExpanded ? 'Collapse layer' : 'Unfold layer'}</span>
                      {isExpanded ? (
                        <ChevronUp size={15} aria-hidden="true" />
                      ) : (
                        <ChevronDown size={15} aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="project-card__main-grid">
                  <div className="project-card__info">
                    <h3 id={titleId} className="project-card__title">
                      <button
                        type="button"
                        className="project-title-button"
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        onClick={() => onToggleExpand(isExpanded ? null : project.id)}
                      >
                        {project.title}
                      </button>
                    </h3>

                    <p className="project-card__summary">{project.summary}</p>

                    <ul className="project-capabilities" aria-label={`${project.title} core capabilities`}>
                      {project.capabilities.map((cap) => (
                        <li key={cap} className="project-Capabilities__item">
                          <span className="capability-bullet" aria-hidden="true" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="project-card__cta-row">
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary btn--sm"
                        aria-label={`Open ${project.title} Live Demo (${project.liveDomainLabel})`}
                      >
                        <Globe size={14} aria-hidden="true" />
                        <span>Live Demo</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary btn--sm"
                        aria-label={`Open ${project.title} GitHub repository (${project.repoSlug})`}
                      >
                        <Code2 size={14} aria-hidden="true" />
                        <span>GitHub Repo</span>
                        <ArrowUpRight size={14} aria-hidden="true" />
                      </a>

                      <button
                        type="button"
                        className="btn btn--ghost btn--sm"
                        aria-expanded={isExpanded}
                        aria-controls={panelId}
                        onClick={() => onToggleExpand(isExpanded ? null : project.id)}
                      >
                        <Layers size={14} aria-hidden="true" />
                        <span>{isExpanded ? 'Close layers' : 'Inspect layers'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="project-card__preview-col">
                    <ProjectPreviewSurface project={project} isExpanded={isExpanded} />
                  </div>
                </div>

                <div
                  id={panelId}
                  className={`project-expanded-panel ${
                    isExpanded ? 'project-expanded-panel--open' : ''
                  }`}
                  role="region"
                  aria-label={`${project.title} expanded architectural layers`}
                  hidden={!isExpanded}
                >
                  <div className="project-expanded-panel__inner">
                    <div className="expanded-panel-header">
                      <h4 className="expanded-panel-title">
                        How {project.title} is structured in layers
                      </h4>

                      <button
                        type="button"
                        className="btn btn--ghost btn--sm expanded-close-btn"
                        onClick={() => {
                          onToggleExpand(null);
                          triggerRefs.current[project.id]?.focus();
                        }}
                      >
                        <Minimize2 size={14} aria-hidden="true" />
                        <span>Collapse (Esc)</span>
                      </button>
                    </div>

                    <div className="layers-breakdown-grid">
                      {project.layers.map((layer) => (
                        <div key={layer.id} className="layer-spec-card">
                          <div className="layer-spec-card__head">
                            <span className="capability-bullet" aria-hidden="true" />
                            <span className="layer-spec-card__label">{layer.label}</span>
                          </div>
                          <p className="layer-spec-card__detail">{layer.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="expanded-panel-footer">
                      <div className="architecture-notes">
                        <span className="architecture-notes__heading">Architectural Notes</span>
                        <ul className="architecture-notes__list">
                          {project.architectureNotes.map((note) => (
                            <li key={note}>{note}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="verified-links-box">
                        <span className="verified-links-box__label">Deployed Application & Source</span>
                        <p className="verified-links-box__copy">
                          Explore the live production build at{' '}
                          <code>{project.liveDomainLabel}</code> or inspect the source code in{' '}
                          <code>{project.repoSlug}</code>.
                        </p>
                        <div className="verified-links-box__actions">
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary btn--sm"
                          >
                            <Globe size={14} aria-hidden="true" />
                            <span>Launch Live Demo</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--secondary btn--sm"
                          >
                            <Code2 size={14} aria-hidden="true" />
                            <span>View Repository</span>
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
