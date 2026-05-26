import { useEffect, useState } from "react";
import { useParams, Link } from "wouter";
import { SEO } from "@/lib/seo";
import { FadeIn } from "@/components/motion/fade-in";
import { MetricChip, AnimatedCounter } from "@/components/metric-chip";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Quote, Sparkles } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  sanityClient,
  EDGY_INSIGHT_BY_SLUG_QUERY,
  resolveFlexibleImage,
  type EdgyInsightDetail,
  type StoryChapter,
} from "@/lib/sanity";

const richTextComponents: PortableTextComponents = {
  block: {
    h4: ({ children }) => (
      <h4 className="font-display font-bold text-xl text-foreground mt-6 mb-3">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-4 italic text-foreground my-4">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const newTab = value?.newTab;
      return (
        <a
          href={value?.href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className="text-accent underline underline-offset-2"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2 text-muted-foreground">{children}</ol>
    ),
  },
};

function StoryChapterBlock({ chapter }: { chapter: StoryChapter }) {
  const heroImage = chapter.images?.[0];
  const heroUrl = heroImage ? resolveFlexibleImage(heroImage, { width: 1200 }) : null;

  return (
    <FadeIn>
      <section className="mb-12 border-l-2 border-accent/30 pl-6">
        {chapter.eyebrow && (
          <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">
            {chapter.eyebrow}
          </p>
        )}
        <h3 className="font-display font-bold text-2xl text-foreground mb-4">
          {chapter.title}
        </h3>

        {chapter.paragraphs && (
          <div className="prose prose-lg max-w-none mb-4">
            <PortableText value={chapter.paragraphs} components={richTextComponents} />
          </div>
        )}

        {chapter.bullets && chapter.bullets.length > 0 && (
          <ul className="list-disc pl-6 mb-4 space-y-2 text-muted-foreground">
            {chapter.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        )}

        {chapter.highlights && chapter.highlights.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            {chapter.highlights.map((h) => (
              <div
                key={h._key}
                className="p-4 rounded-lg bg-accent/5 border border-accent/20"
              >
                <div className="font-display font-bold text-2xl text-accent">{h.metric}</div>
                <div className="text-xs text-muted-foreground mt-1">{h.label}</div>
              </div>
            ))}
          </div>
        )}

        {chapter.pullQuote && (
          <blockquote className="border-l-4 border-accent pl-4 italic text-lg text-foreground my-4">
            "{chapter.pullQuote}"
          </blockquote>
        )}

        {heroUrl && (
          <figure className="my-6">
            <img src={heroUrl} alt={heroImage?.alt || chapter.title} className="w-full rounded-lg" />
            {heroImage?.caption && (
              <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                {heroImage.caption}
              </figcaption>
            )}
          </figure>
        )}
      </section>
    </FadeIn>
  );
}

export default function EdgyInsightDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [insight, setInsight] = useState<EdgyInsightDetail | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch<EdgyInsightDetail | null>(EDGY_INSIGHT_BY_SLUG_QUERY, { slug })
      .then((data) => setInsight(data))
      .catch(() => setInsight(null));
  }, [slug]);

  if (insight === undefined) {
    return (
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-10 w-2/3 bg-muted/50 rounded animate-pulse mb-6" />
          <div className="h-64 bg-muted/40 rounded-xl animate-pulse mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-muted/40 rounded animate-pulse" />
            <div className="h-4 bg-muted/40 rounded animate-pulse w-11/12" />
            <div className="h-4 bg-muted/40 rounded animate-pulse w-10/12" />
          </div>
        </div>
      </section>
    );
  }

  if (!insight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Edgy Insight Not Found</h1>
          <Button asChild data-testid="button-back-to-edgy-insights-not-found">
            <Link href="/edgy-insights">← Back to Edgy Insights</Link>
          </Button>
        </div>
      </div>
    );
  }

  const heroImageUrl = resolveFlexibleImage(insight.image, { width: 1400, height: 600 });
  const seoTitle = insight.seo?.metaTitle || `${insight.title} | Edgy Insight | Varun Goel`;
  const seoDesc = insight.seo?.metaDescription || insight.summary;

  return (
    <>
      <SEO title={seoTitle} description={seoDesc} />

      {/* Header */}
      <section className="pt-24 pb-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <Button
              variant="ghost"
              asChild
              className="mb-6 p-0 hover:bg-transparent hover:text-accent"
              data-testid="button-back-to-edgy-insights"
            >
              <Link href="/edgy-insights">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Edgy Insights
              </Link>
            </Button>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                {insight.industry}
              </span>
              <span className="text-muted-foreground text-sm">{insight.year}</span>
              {insight.capabilities?.map((cap) => (
                <span
                  key={cap}
                  className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium"
                >
                  {cap}
                </span>
              ))}
            </div>

            <h1
              className="font-display font-bold text-4xl md:text-5xl mb-4"
              data-testid="edgy-insight-title"
            >
              {insight.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{insight.summary}</p>

            {heroImageUrl && (
              <div className="mb-8">
                <img
                  src={heroImageUrl}
                  alt={insight.image?.alt || insight.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg"
                />
              </div>
            )}

            {insight.metrics && insight.metrics.length > 0 && (
              <div className="flex flex-wrap gap-3" data-testid="insight-metrics">
                {insight.metrics.map((metric, index) => (
                  <MetricChip
                    key={metric._key ?? metric.label}
                    label={metric.label}
                    delta={metric.delta}
                    unit={metric.unit ?? ""}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Challenge */}
        {insight.context && insight.context.length > 0 && (
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Challenge</h2>
              <div className="prose prose-lg max-w-none" data-testid="insight-context">
                <PortableText value={insight.context} components={richTextComponents} />
              </div>
            </section>
          </FadeIn>
        )}

        {/* Approach */}
        {insight.approach && insight.approach.length > 0 && (
          <FadeIn delay={0.1}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Approach</h2>
              <div className="space-y-4" data-testid="insight-approach">
                {insight.approach.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm font-medium text-accent">{index + 1}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* Solution */}
        {insight.solution && insight.solution.length > 0 && (
          <FadeIn delay={0.2}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Solution</h2>
              <Card className="border border-border">
                <CardContent className="p-8 prose prose-lg max-w-none">
                  <PortableText value={insight.solution} components={richTextComponents} />
                </CardContent>
              </Card>
            </section>
          </FadeIn>
        )}

        {/* Story chapters */}
        {insight.storyChapters && insight.storyChapters.length > 0 && (
          <FadeIn delay={0.3}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">The Story</h2>
              {insight.storyChapters.map((ch) => (
                <StoryChapterBlock key={ch._key} chapter={ch} />
              ))}
            </section>
          </FadeIn>
        )}

        {/* Outcomes */}
        {insight.outcomes && insight.outcomes.length > 0 && (
          <FadeIn delay={0.4}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Outcomes</h2>
              <div className="grid md:grid-cols-2 gap-6" data-testid="insight-outcomes">
                {insight.outcomes.map((outcome) => (
                  <Card key={outcome._key ?? outcome.metric} className="border border-border">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">{outcome.metric}</h3>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Before</span>
                        <span className="font-medium">
                          <AnimatedCounter
                            value={outcome.before}
                            suffix={outcome.unit || ""}
                            duration={1.5}
                          />
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">After</span>
                        <span className="font-medium text-accent">
                          <AnimatedCounter
                            value={outcome.after}
                            suffix={outcome.unit || ""}
                            duration={2}
                          />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* Lessons */}
        {insight.lessons && insight.lessons.length > 0 && (
          <FadeIn delay={0.5}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Lessons & Takeaways</h2>
              <div className="grid md:grid-cols-2 gap-4" data-testid="insight-lessons">
                {insight.lessons.map((lesson, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-5 rounded-lg bg-accent/5 border border-accent/20"
                  >
                    <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-foreground leading-relaxed">{lesson}</p>
                  </div>
                ))}
              </div>
            </section>
          </FadeIn>
        )}

        {/* Testimonial */}
        {insight.testimonial && insight.testimonial.quote && (
          <FadeIn delay={0.6}>
            <section className="mb-16">
              <h2 className="font-display font-bold text-2xl mb-6">Testimonial</h2>
              <Card className="border border-accent/20 bg-accent/5">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-accent mb-4" />
                  <blockquote className="text-lg italic text-foreground mb-6">
                    "{insight.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-muted rounded-full mr-4" />
                    <div>
                      <div className="font-semibold">{insight.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {[insight.testimonial.title, insight.testimonial.company]
                          .filter(Boolean)
                          .join(", ")}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </FadeIn>
        )}

        <Separator className="mb-16" />

        {/* CTA */}
        <FadeIn delay={0.7}>
          <section className="text-center">
            <h2 className="font-display font-bold text-3xl mb-4">
              Ready for Your NovaTransform?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how to unleash similar explosive results in your transformation journey.
              Every edgy insight starts with bold action.
            </p>
            <Button
              asChild
              className="magnetic-button bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3"
              data-testid="button-connect-edgy-insight-cta"
            >
              <Link href="/connect">Ignite Your Edge</Link>
            </Button>
          </section>
        </FadeIn>
      </div>
    </>
  );
}
