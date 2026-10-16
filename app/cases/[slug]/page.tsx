import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteNav } from "@/components/SiteChrome";
import { caseStudies } from "@/data/portfolio";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  return {
    title: study?.title ?? "Case not found",
    description: study?.summary,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();
  return (
    <>
      <SiteNav />
      <main className="case-page section-wrap">
        <Link className="text-link" href="/#work">
          ← All selected work
        </Link>
        <p className="eyebrow">{study.category}</p>
        <h1>{study.title}</h1>
        <p className="case-lead">{study.summary}</p>
        <p className="case-context">{study.context}</p>
        <div className="tags">
          {study.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="case-sections">
          {study.sections.map((section, index) => (
            <section key={section.heading}>
              <span className="section-number">0{index + 1}</span>
              <div>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </div>
            </section>
          ))}
        </div>
        <aside className="case-source">
          <strong>About the evidence</strong>
          <p>
            Adapted from my completed academic worksheet and supporting lab
            notes. This public summary preserves the scope and limitations of
            the exercise; it does not publish an executable, an active phishing
            destination or personal account details.
          </p>
        </aside>
        <Link className="button button-secondary" href="/#work">
          Back to selected work
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
