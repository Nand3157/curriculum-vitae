import React, { useState } from 'react';
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Compass,
  Filter,
  Layers,
  MapPin,
  MessageSquare,
  Route,
  Search,
  Sparkles,
} from 'lucide-react';
import { ProjectItem } from '../data/resumeData';

interface ProjectPreviewSurfaceProps {
  project: ProjectItem;
  isExpanded: boolean;
}

export const ProjectPreviewSurface: React.FC<ProjectPreviewSurfaceProps> = ({
  project,
  isExpanded,
}) => {
  const [eduTab, setEduTab] = useState<'analytics' | 'recommendations' | 'schedule'>('analytics');
  const [jansetuFilter, setJansetuFilter] = useState<'all' | 'roads' | 'water'>('all');
  const [parkFilter, setParkFilter] = useState<'all' | 'covered' | 'available'>('all');

  if (project.id === 'eduversesocial') {
    return (
      <div className={`ui-preview ui-preview--eduverse ${isExpanded ? 'ui-preview--expanded' : ''}`}>
        <div className="ui-preview__chrome">
          <div className="ui-preview__dots" aria-hidden="true">
            <span className="chrome-dot chrome-dot--saffron" />
            <span className="chrome-dot chrome-dot--coral" />
            <span className="chrome-dot chrome-dot--sky" />
          </div>
          <span className="ui-preview__title">{project.liveDomainLabel}</span>
          <span className="ui-preview__tag">Workspace</span>
        </div>

        <div
          className="ui-preview__tabs"
          role="tablist"
          aria-label="EduVerseSocial interface modules"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            role="tab"
            aria-selected={eduTab === 'analytics'}
            className={`ui-tab ${eduTab === 'analytics' ? 'ui-tab--active' : ''}`}
            onClick={() => setEduTab('analytics')}
          >
            <BarChart3 size={13} aria-hidden="true" />
            <span>Analytics</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={eduTab === 'recommendations'}
            className={`ui-tab ${eduTab === 'recommendations' ? 'ui-tab--active' : ''}`}
            onClick={() => setEduTab('recommendations')}
          >
            <Sparkles size={13} aria-hidden="true" />
            <span>Recommendations</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={eduTab === 'schedule'}
            className={`ui-tab ${eduTab === 'schedule' ? 'ui-tab--active' : ''}`}
            onClick={() => setEduTab('schedule')}
          >
            <CalendarClock size={13} aria-hidden="true" />
            <span>Post Scheduler</span>
          </button>
        </div>

        <div className="ui-preview__body">
          {eduTab === 'analytics' && (
            <div className="edu-module-grid">
              <div className="edu-chart-panel">
                <div className="edu-panel-head">
                  <span className="edu-panel-label">Channel Activity Curve</span>
                  <span className="edu-panel-badge">Analytics View</span>
                </div>
                <svg viewBox="0 0 320 96" className="edu-main-svg" aria-hidden="true">
                  <defs>
                    <linearGradient id="eduPreviewFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="24" x2="320" y2="24" stroke="rgba(100,116,139,0.16)" />
                  <line x1="0" y1="54" x2="320" y2="54" stroke="rgba(100,116,139,0.16)" />
                  <line x1="0" y1="84" x2="320" y2="84" stroke="rgba(100,116,139,0.16)" />
                  <path
                    d="M0,76 C45,68 72,42 115,46 C158,50 185,22 232,26 C268,28 292,14 320,10 L320,96 L0,96 Z"
                    fill="url(#eduPreviewFill)"
                  />
                  <path
                    d="M0,76 C45,68 72,42 115,46 C158,50 185,22 232,26 C268,28 292,14 320,10"
                    fill="none"
                    stroke="#1D4ED8"
                    strokeWidth="2.5"
                  />
                  <circle cx="115" cy="46" r="4" fill="#0284C7" />
                  <circle cx="232" cy="26" r="4.5" fill="#D97706" />
                </svg>
              </div>

              <div className="edu-side-stack">
                <div className="edu-mini-card">
                  <span className="edu-mini-card__kicker">Recommendation Signal</span>
                  <p className="edu-mini-card__title">Carousel & thread formats aligned with active window</p>
                </div>
                <div className="edu-mini-card">
                  <span className="edu-mini-card__kicker">Scheduling Queue</span>
                  <p className="edu-mini-card__title">Next slot staged in publishing calendar</p>
                </div>
              </div>
            </div>
          )}

          {eduTab === 'recommendations' && (
            <div className="edu-recs-list">
              <div className="edu-rec-item">
                <span className="edu-rec-badge">Topic Cluster</span>
                <div className="edu-rec-content">
                  <strong>Educational Breakdown Series</strong>
                  <span>Suggested format: Multi-slide visual summary</span>
                </div>
                <span className="edu-rec-status">Ready to draft</span>
              </div>
              <div className="edu-rec-item">
                <span className="edu-rec-badge edu-rec-badge--saffron">Timing Insight</span>
                <div className="edu-rec-content">
                  <strong>Peak Audience Window Alignment</strong>
                  <span>Matches historical engagement cadence</span>
                </div>
                <span className="edu-rec-status">Queue slot open</span>
              </div>
            </div>
          )}

          {eduTab === 'schedule' && (
            <div className="edu-schedule-grid">
              <div className="edu-slot-card">
                <span className="edu-slot-day">MON · SLOT 01</span>
                <strong>Weekly Digest Post</strong>
                <span className="edu-slot-tag">Scheduled</span>
              </div>
              <div className="edu-slot-card edu-slot-card--highlight">
                <span className="edu-slot-day">WED · SLOT 02</span>
                <strong>Interactive Concept Thread</strong>
                <span className="edu-slot-tag">Recommended Slot</span>
              </div>
              <div className="edu-slot-card">
                <span className="edu-slot-day">FRI · SLOT 03</span>
                <strong>Community Q&A Prompt</strong>
                <span className="edu-slot-tag">Draft Queued</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (project.id === 'jansetu-ai') {
    return (
      <div className={`ui-preview ui-preview--jansetu ${isExpanded ? 'ui-preview--expanded' : ''}`}>
        <div className="ui-preview__chrome">
          <div className="ui-preview__dots" aria-hidden="true">
            <span className="chrome-dot chrome-dot--saffron" />
            <span className="chrome-dot chrome-dot--coral" />
            <span className="chrome-dot chrome-dot--sky" />
          </div>
          <span className="ui-preview__title">{project.liveDomainLabel}</span>
          <span className="ui-preview__tag">Civic AI</span>
        </div>

        <div
          className="ui-preview__tabs"
          role="tablist"
          aria-label="JANSETU AI infrastructure sector filter"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            role="tab"
            aria-selected={jansetuFilter === 'all'}
            className={`ui-tab ${jansetuFilter === 'all' ? 'ui-tab--active' : ''}`}
            onClick={() => setJansetuFilter('all')}
          >
            <Layers size={13} aria-hidden="true" />
            <span>All Civic Sectors</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={jansetuFilter === 'roads'}
            className={`ui-tab ${jansetuFilter === 'roads' ? 'ui-tab--active' : ''}`}
            onClick={() => setJansetuFilter('roads')}
          >
            <Route size={13} aria-hidden="true" />
            <span>Transit & Roads</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={jansetuFilter === 'water'}
            className={`ui-tab ${jansetuFilter === 'water' ? 'ui-tab--active' : ''}`}
            onClick={() => setJansetuFilter('water')}
          >
            <MessageSquare size={13} aria-hidden="true" />
            <span>Utilities & Drainage</span>
          </button>
        </div>

        <div className="ui-preview__body">
          <div className="jansetu-workspace">
            <div className="jansetu-map-panel">
              <svg viewBox="0 0 280 120" className="jansetu-preview-svg" aria-hidden="true">
                <rect width="280" height="120" fill="#F1F5F9" rx="6" />
                <path
                  d="M0 30 H280 M0 60 H280 M0 90 H280 M60 0 V120 M140 0 V120 M220 0 V120"
                  stroke="rgba(100,116,139,0.16)"
                  strokeWidth="1"
                />
                <path
                  d="M 32 92 L 105 56 L 178 68 L 244 28"
                  fill="none"
                  stroke="rgba(217, 119, 6, 0.2)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 32 92 L 105 56 L 178 68 L 244 28"
                  fill="none"
                  stroke="#D97706"
                  strokeWidth="2.2"
                  strokeDasharray="5 4"
                />

                {(jansetuFilter === 'all' || jansetuFilter === 'roads') && (
                  <>
                    <g transform="translate(105, 56)">
                      <circle r="12" fill="rgba(217, 119, 6, 0.2)" />
                      <circle r="5" fill="#D97706" />
                    </g>
                    <g transform="translate(244, 28)">
                      <circle r="13" fill="rgba(225, 29, 72, 0.2)" />
                      <circle r="5.5" fill="#E11D48" />
                    </g>
                  </>
                )}

                {(jansetuFilter === 'all' || jansetuFilter === 'water') && (
                  <>
                    <g transform="translate(32, 92)">
                      <circle r="10" fill="rgba(2, 132, 199, 0.2)" />
                      <circle r="4.5" fill="#0284C7" />
                    </g>
                    <g transform="translate(178, 68)">
                      <circle r="11" fill="rgba(2, 132, 199, 0.22)" />
                      <circle r="4.5" fill="#0284C7" />
                    </g>
                  </>
                )}
              </svg>
            </div>

            <div className="jansetu-queue-panel">
              <div className="jansetu-queue-header">
                <span>Prioritized Infrastructure Queue</span>
                <span className="jansetu-queue-chip">AI Clustered</span>
              </div>
              <div className="jansetu-queue-items">
                {(jansetuFilter === 'all' || jansetuFilter === 'roads') && (
                  <div className="jansetu-queue-row">
                    <span className="priority-indicator priority-indicator--high">P1</span>
                    <div className="jansetu-queue-text">
                      <strong>Arterial Road Surface & Junction Flow</strong>
                      <span>Grouped from recurring citizen reports</span>
                    </div>
                  </div>
                )}
                {(jansetuFilter === 'all' || jansetuFilter === 'water') && (
                  <div className="jansetu-queue-row">
                    <span className="priority-indicator priority-indicator--med">P2</span>
                    <div className="jansetu-queue-text">
                      <strong>Stormwater & Utility Line Maintenance</strong>
                      <span>Prioritized by ward feedback density</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ui-preview ui-preview--easypark ${isExpanded ? 'ui-preview--expanded' : ''}`}>
      <div className="ui-preview__chrome">
        <div className="ui-preview__dots" aria-hidden="true">
          <span className="chrome-dot chrome-dot--saffron" />
          <span className="chrome-dot chrome-dot--coral" />
          <span className="chrome-dot chrome-dot--sky" />
        </div>
        <span className="ui-preview__title">{project.liveDomainLabel}</span>
        <span className="ui-preview__tag">Maps & Filters</span>
      </div>

      <div
        className="ui-preview__tabs"
        role="tablist"
        aria-label="EasyPark parking filter controls"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          role="tab"
          aria-selected={parkFilter === 'all'}
          className={`ui-tab ${parkFilter === 'all' ? 'ui-tab--active' : ''}`}
          onClick={() => setParkFilter('all')}
        >
          <Compass size={13} aria-hidden="true" />
          <span>All Zones</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={parkFilter === 'available'}
          className={`ui-tab ${parkFilter === 'available' ? 'ui-tab--active' : ''}`}
          onClick={() => setParkFilter('available')}
        >
          <CheckCircle2 size={13} aria-hidden="true" />
          <span>Open Spots</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={parkFilter === 'covered'}
          className={`ui-tab ${parkFilter === 'covered' ? 'ui-tab--active' : ''}`}
          onClick={() => setParkFilter('covered')}
        >
          <Filter size={13} aria-hidden="true" />
          <span>Covered Bays</span>
        </button>
      </div>

      <div className="ui-preview__body">
        <div className="easypark-workspace">
          <div className="easypark-search-bar" aria-hidden="true">
            <Search size={13} />
            <span>Destination: Central Hub / University Corridor</span>
            <span className="easypark-active-filter">
              {parkFilter === 'all'
                ? '3 Zones Matched'
                : parkFilter === 'available'
                ? 'Immediate Entry'
                : 'Covered Access'}
            </span>
          </div>

          <div className="easypark-split">
            <div className="easypark-canvas-wrap">
              <svg viewBox="0 0 260 104" className="easypark-preview-svg" aria-hidden="true">
                <rect width="260" height="104" rx="6" fill="#F1F5F9" />
                <rect x="12" y="12" width="68" height="34" rx="4" fill="#E2E8F0" stroke="#CBD5E1" />
                <rect x="92" y="12" width="76" height="34" rx="4" fill="#E2E8F0" stroke="#CBD5E1" />
                <rect x="180" y="12" width="68" height="34" rx="4" fill="#E2E8F0" stroke="#CBD5E1" />
                <rect x="12" y="58" width="102" height="34" rx="4" fill="#E2E8F0" stroke="#CBD5E1" />
                <rect x="126" y="58" width="122" height="34" rx="4" fill="#E2E8F0" stroke="#CBD5E1" />

                <path
                  d="M 26 52 L 120 52 L 120 29 L 212 29"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="26" cy="52" r="4" fill="#0F172A" />

                <g transform="translate(212, 29)">
                  <circle r="9" fill="#1D4ED8" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="0" y="3" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="700">
                    P1
                  </text>
                </g>

                {parkFilter !== 'covered' && (
                  <g transform="translate(76, 75)">
                    <circle r="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.8" />
                    <text x="0" y="3" textAnchor="middle" fill="#0284C7" fontSize="8" fontWeight="700">
                      P2
                    </text>
                  </g>
                )}

                {parkFilter === 'all' && (
                  <g transform="translate(154, 75)">
                    <circle r="8" fill="#FFFFFF" stroke="#D97706" strokeWidth="1.8" />
                    <text x="0" y="3" textAnchor="middle" fill="#D97706" fontSize="8" fontWeight="700">
                      P3
                    </text>
                  </g>
                )}
              </svg>
            </div>

            <div className="easypark-cards">
              <div className="easypark-zone-card easypark-zone-card--selected">
                <div className="easypark-zone-head">
                  <MapPin size={13} />
                  <strong>Zone P1 — North Plaza Deck</strong>
                </div>
                <span>Interactive Map Pin · Direct Route Active</span>
              </div>
              <div className="easypark-zone-card">
                <div className="easypark-zone-head">
                  <MapPin size={13} />
                  <strong>Zone P2 — East Corridor Lot</strong>
                </div>
                <span>Location Search Match · Filter Compatible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
