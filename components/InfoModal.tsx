import { useEffect } from "react";
import type { PortfolioObject } from "@/data/types";

type InfoModalProps = {
  object: PortfolioObject | null;
  onClose: () => void;
};

export function InfoModal({ object, onClose }: InfoModalProps) {
  useEffect(() => {
    if (!object) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [object, onClose]);

  if (!object) {
    return null;
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose} role="presentation">
      <article
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
          <button aria-label="Close modal" className="icon-button" onClick={onClose} type="button">
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
