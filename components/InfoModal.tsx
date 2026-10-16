import { useEffect, useRef } from "react";
import type { PortfolioObject } from "@/data/types";

type InfoModalProps = {
  object: PortfolioObject | null;
  onClose: () => void;
};

export function InfoModal({ object, onClose }: InfoModalProps) {
  const panelRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!object) {
      return;
    }

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Tab") {
        const elements = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button, input, select, textarea, [tabindex="0"]',
        );
        if (elements?.length) {
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [object, onClose]);

  if (!object) {
    return null;
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <article
        ref={panelRef}
        aria-labelledby="portfolio-modal-title"
        aria-modal="true"
        className="modal-panel"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="modal-header">
          <div>
            <h2 id="portfolio-modal-title">{object.modal.title}</h2>
            <p>{object.summary}</p>
          </div>
          <button
            aria-label="Close modal"
            className="icon-button"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </header>

        <div className="modal-body">
          {object.modal.sections.map((section) => (
            <section className="modal-section" key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </section>
          ))}

          {object.modal.actions.length > 0 && (
            <div className="modal-actions">
              {object.modal.actions.map((action) => (
                <a
                  className={`modal-action ${action.variant === "secondary" ? "secondary" : ""}`}
                  href={action.href}
                  key={action.label}
                  rel="noreferrer"
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                >
                  {action.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
