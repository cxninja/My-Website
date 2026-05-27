import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import {
  ArrowLeft,
  Clock,
  Info,
  Lightbulb,
  AlertTriangle,
  AlertOctagon,
  StickyNote,
  Linkedin,
  Twitter,
  Github,
  Globe,
  Mail,
  CalendarClock,
  ArrowRight,
  List,
  Link2,
  Share2,
  Check,
  User,
} from "lucide-react";
import {
  sanityClient,
  POST_BY_SLUG_QUERY,
  RELATED_POSTS_QUERY,
  urlFor,
  resolveFlexibleImage,
  postUrl,
  type PostDetail,
  type PostListItem,
} from "@/lib/sanity";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Extract plain text from a PortableText block. */
function blockText(block: any): string {
  if (!block?.children) return "";
  return block.children.map((c: any) => c.text ?? "").join("");
}

/** Headings extracted from body for the TOC. */
type Heading = { id: string; text: string; level: 2 | 3 };

function extractHeadings(body: any[] | undefined): Heading[] {
  if (!body) return [];
  const headings: Heading[] = [];
  for (const block of body) {
    if (block?._type !== "block") continue;
    if (block.style === "h2" || block.style === "h3") {
      const text = blockText(block);
      if (!text) continue;
      headings.push({
        id: slugify(text),
        text,
        level: block.style === "h2" ? 2 : 3,
      });
    }
  }
  return headings;
}

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  x: Twitter,
  github: Github,
  website: Globe,
  email: Mail,
};

const calloutStyles: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; ring: string; bg: string; iconColor: string }
> = {
  info: { icon: Info, ring: "border-blue-500/30", bg: "bg-blue-500/5", iconColor: "text-blue-500" },
  tip: { icon: Lightbulb, ring: "border-green-500/30", bg: "bg-green-500/5", iconColor: "text-green-500" },
  warning: { icon: AlertTriangle, ring: "border-amber-500/30", bg: "bg-amber-500/5", iconColor: "text-amber-500" },
  danger: { icon: AlertOctagon, ring: "border-red-500/30", bg: "bg-red-500/5", iconColor: "text-red-500" },
  note: { icon: StickyNote, ring: "border-border", bg: "bg-muted/40", iconColor: "text-muted-foreground" },
};

const calloutInnerComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-foreground/90 leading-relaxed mb-2 last:mb-0">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-2 space-y-1 text-foreground/90">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 mb-2 space-y-1 text-foreground/90">{children}</ol>,
  },
};

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => {
      const id = slugify(blockText(value));
      return (
        <h2 id={id} className="scroll-mt-28 font-display font-bold text-3xl text-foreground mt-12 mb-4">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const id = slugify(blockText(value));
      return (
        <h3 id={id} className="scroll-mt-28 font-display font-bold text-2xl text-foreground mt-8 mb-3">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => (
      <h4 className="font-display font-semibold text-xl text-foreground mt-6 mb-2">{children}</h4>
    ),
    lead: ({ children }) => (
      <p className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 font-light">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-6 italic text-lg text-foreground my-6">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => <p className="text-foreground/90 leading-relaxed mb-5">{children}</p>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-2">{children}</span>,
    "strike-through": ({ children }) => <span className="line-through">{children}</span>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded bg-muted text-foreground text-sm font-mono">{children}</code>
    ),
    link: ({ children, value }) => {
      const newTab = value?.newTab ?? value?.openInNewTab;
      return (
        <a
          href={value?.href}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          className="text-accent underline underline-offset-2 hover:opacity-80"
        >
          {children}
        </a>
      );
    },
    highlight: ({ children, value }) => {
      const colorClass: Record<string, string> = {
        yellow: "bg-yellow-200/60",
        pink: "bg-pink-200/60",
        green: "bg-green-200/60",
        blue: "bg-blue-200/60",
        orange: "bg-orange-200/60",
      };
      const cls = colorClass[value?.color] ?? "bg-yellow-200/60";
      return <mark className={`${cls} px-0.5 rounded`}>{children}</mark>;
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-foreground/90">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-foreground/90">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img src={urlFor(value).width(1200).fit("max").url()} alt={value.alt || ""} loading="lazy" decoding="async" className="w-full rounded-lg" />
          {value.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    inlineImage: ({ value }) => {
      const url = resolveFlexibleImage(value?.image, { width: 1200 });
      if (!url) return null;
      return (
        <figure className="my-8">
          <img src={url} alt={value?.image?.alt || ""} loading="lazy" decoding="async" className="w-full rounded-lg" />
          {value?.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
    calloutBlock: ({ value }) => {
      const style = calloutStyles[value?.tone] ?? calloutStyles.info;
      const Icon = style.icon;
      return (
        <aside className={`my-8 border ${style.ring} ${style.bg} rounded-xl p-5 flex gap-4`}>
          <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
          <div className="flex-1">
            {value?.title && <p className="font-display font-bold text-foreground mb-2">{value.title}</p>}
            {value?.body && <PortableText value={value.body} components={calloutInnerComponents} />}
          </div>
        </aside>
      );
    },
    dividerBlock: ({ value }) => {
      if (value?.style === "dots") {
        return (
          <div className="my-10 flex justify-center gap-2 text-muted-foreground">
            <span>·</span>
            <span>·</span>
            <span>·</span>
          </div>
        );
      }
      if (value?.style === "asterisk") {
        return <div className="my-10 text-center text-muted-foreground">*</div>;
      }
      return <hr className="my-10 border-border" />;
    },
  },
};

// ─── Sidebar widgets ─────────────────────────────────────────────────────────

function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!headings.length) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => !!e);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <div className="border-b border-border pb-6 mb-6" data-testid="table-of-contents">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4 flex items-center gap-2">
        <List className="w-3.5 h-3.5 text-accent" />
        On this page
      </p>
      <nav>
        <ul className="space-y-1.5 text-sm">
          {headings.map((h) => (
            <li key={h.id} className={h.level === 3 ? "pl-4" : ""}>
              <a
                href={`#${h.id}`}
                className={`block py-1 leading-snug border-l-2 pl-3 transition-colors ${
                  activeId === h.id
                    ? "text-accent border-accent font-medium"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-border"
                }`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function SidebarAuthorCard({ author }: { author: NonNullable<PostDetail["author"]> }) {
  const avatarUrl = resolveFlexibleImage(author.avatar, { width: 120, height: 120 });
  return (
    <div className="border-b border-border pb-6 mb-6" data-testid="sidebar-author">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4 flex items-center gap-2">
        <User className="w-3.5 h-3.5 text-accent" />
        Written by
      </p>
      <div className="flex items-center gap-3 mb-3">
        <Link href={`/blog/author/${author.slug}`} className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center font-display font-bold text-base text-accent">
              {author.name.charAt(0)}
            </div>
          )}
        </Link>
        <div className="min-w-0">
          <Link
            href={`/blog/author/${author.slug}`}
            className="font-display font-semibold text-foreground hover:text-accent block leading-tight"
          >
            {author.name}
          </Link>
          {author.role && <p className="text-xs text-muted-foreground leading-tight">{author.role}</p>}
        </div>
      </div>
      {author.bio && <p className="text-xs text-muted-foreground leading-relaxed mb-3">{author.bio}</p>}
      {author.socialLinks && author.socialLinks.length > 0 && (
        <div className="flex items-center gap-2">
          {author.socialLinks.slice(0, 4).map((s) => {
            const Icon = socialIconMap[s.platform] ?? Globe;
            return (
              <a
                key={s._key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer me"
                className="w-7 h-7 rounded-md text-muted-foreground hover:text-accent hover:bg-accent/10 flex items-center justify-center transition-colors"
                aria-label={`${author.name} on ${s.platform}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ShareWidget({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";

  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const enc = (v: string) => encodeURIComponent(v);
  const tw = `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`;
  const li = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`;

  return (
    <div data-testid="share-widget">
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4 flex items-center gap-2">
        <Share2 className="w-3.5 h-3.5 text-accent" />
        Share
      </p>
      <div className="flex items-center gap-2">
        <a
          href={tw}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-colors"
          aria-label="Share on X"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={li}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <button
          onClick={copy}
          className="w-9 h-9 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

// ─── Bottom-of-article blocks (unchanged) ────────────────────────────────────

function AuthorBioBlock({ author }: { author: NonNullable<PostDetail["author"]> }) {
  const avatarUrl = resolveFlexibleImage(author.avatar, { width: 200, height: 200 });
  return (
    <section
      className="mt-16 pt-12 border-t border-border bg-secondary/30 rounded-2xl p-8"
      data-testid="author-bio-block"
    >
      <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-4">About the author</p>
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Link href={`/blog/author/${author.slug}`} className="flex-shrink-0">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={author.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-background shadow-md"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center font-display font-bold text-3xl text-accent">
              {author.name.charAt(0)}
            </div>
          )}
        </Link>
        <div className="flex-1">
          <Link
            href={`/blog/author/${author.slug}`}
            className="font-display font-bold text-xl text-foreground hover:text-accent"
          >
            {author.name}
          </Link>
          {author.role && <p className="text-sm text-muted-foreground mb-3">{author.role}</p>}
          {author.bio && <p className="text-foreground/90 leading-relaxed mb-4">{author.bio}</p>}
          {author.expertise && author.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {author.expertise.slice(0, 6).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <Link
            href={`/blog/author/${author.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View full profile
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedPosts({ posts }: { posts: PostListItem[] }) {
  if (!posts.length) return null;
  return (
    <section className="mt-16 pt-12 border-t border-border" data-testid="related-posts">
      <h2 className="font-display font-bold text-2xl text-foreground mb-6">More from the blog</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link
            key={p._id}
            href={postUrl(p)}
            className="group block rounded-xl border border-border p-5 hover:border-accent/60 transition-colors"
            data-testid={`related-post-${p.slug}`}
          >
            {p.categories?.[0] && (
              <p className="text-xs text-accent uppercase tracking-wider font-semibold mb-2">
                {p.categories[0].title}
              </p>
            )}
            <h3 className="font-display font-bold text-lg text-foreground group-hover:text-accent transition-colors leading-tight mb-2">
              {p.title}
            </h3>
            {p.excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function BlogPost() {
  const [, paramsWithCat] = useRoute<{ categorySlug: string; slug: string }>(
    "/blog/:categorySlug/:slug"
  );
  const [, paramsLegacy] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = paramsWithCat?.slug ?? paramsLegacy?.slug;
  const [post, setPost] = useState<PostDetail | null | undefined>(undefined);
  const [related, setRelated] = useState<PostListItem[]>([]);

  useEffect(() => {
    if (!slug) return;
    sanityClient
      .fetch<PostDetail | null>(POST_BY_SLUG_QUERY, { slug })
      .then((p) => {
        setPost(p);
        if (p?.categories && p.categories.length > 0) {
          sanityClient
            .fetch<{ ref: string }[]>(
              `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0].categories[]{"ref": _ref}`,
              { slug }
            )
            .then((refs) => {
              if (!refs?.length) return;
              return sanityClient
                .fetch<PostListItem[]>(RELATED_POSTS_QUERY, {
                  excludeId: p._id,
                  categoryRefs: refs.map((r) => r.ref),
                })
                .then(setRelated);
            })
            .catch(() => {});
        }
      })
      .catch(() => setPost(null));
  }, [slug]);

  const headings = useMemo(() => extractHeadings(post?.body), [post?.body]);

  if (post === undefined) {
    return (
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="h-10 w-2/3 bg-muted/50 rounded animate-pulse mb-6" />
          <div className="h-72 bg-muted/40 rounded-xl animate-pulse mb-8" />
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl mb-4">Post not found</h1>
          <Link href="/blog" className="text-accent underline">
            ← Back to blog
          </Link>
        </div>
      </section>
    );
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt || "";
  const authorAvatarUrl = post.author ? resolveFlexibleImage(post.author.avatar) : null;
  const heroUrl = resolveFlexibleImage(post.mainImage, { width: 1400, height: 1050 });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: description,
    image: heroUrl ? [heroUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: post.author
      ? {
          "@type": "Person",
          name: post.author.name,
          url: `https://novatransform.com/blog/author/${post.author.slug}`,
          jobTitle: post.author.role,
          image: authorAvatarUrl ?? undefined,
          sameAs: post.author.socialLinks?.filter((s) => s.platform !== "email").map((s) => s.url),
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "NovaTransform",
      logo: {
        "@type": "ImageObject",
        url: "https://novatransform.com/images/MainLogo.png",
      },
    },
    keywords: post.seo?.keywords?.join(", "),
    articleSection: post.categories?.[0]?.title,
    wordCount: post.readingMinutes ? post.readingMinutes * 200 : undefined,
  };

  const updatedNeeded =
    post.updatedAt &&
    post.publishedAt &&
    new Date(post.updatedAt).getTime() - new Date(post.publishedAt).getTime() > 86400_000;

  return (
    <>
      <Helmet>
        <title>{`${title} — NovaTransform Blog`}</title>
        {description && <meta name="description" content={description} />}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        {heroUrl && <meta property="og:image" content={heroUrl} />}
        <meta property="article:published_time" content={post.publishedAt} />
        {post.updatedAt && <meta property="article:modified_time" content={post.updatedAt} />}
        {post.author?.name && <meta property="article:author" content={post.author.name} />}
        {post.categories?.[0]?.title && (
          <meta property="article:section" content={post.categories[0].title} />
        )}
        {post.seo?.keywords?.map((k) => (
          <meta key={k} property="article:tag" content={k} />
        ))}
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
      </Helmet>

      {/* ── Hero: full-bleed image with overlaid text ─────────────────── */}
      <section
        className={`relative ${heroUrl ? "min-h-[70vh] md:min-h-[78vh]" : "pt-28 pb-12 bg-secondary/30"} border-b border-border overflow-hidden`}
        data-testid="post-hero"
      >
        {heroUrl && (
          <>
            {/* Background image */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroUrl}
                alt={post.mainImage?.alt || post.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Gradient + dark scrim for legibility */}
            <div
              className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/60 to-black/20"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 z-10 bg-gradient-to-r from-black/40 to-transparent"
              aria-hidden="true"
            />
          </>
        )}

        <div
          className={`relative z-20 max-w-6xl mx-auto px-6 ${heroUrl ? "pt-32 pb-16 md:pt-40 md:pb-20 min-h-[70vh] md:min-h-[78vh] flex flex-col justify-end" : ""}`}
        >
          <nav
            className={`text-xs mb-6 ${heroUrl ? "text-white/80" : "text-muted-foreground"}`}
            aria-label="Breadcrumb"
          >
            <Link
              href="/blog"
              className={`inline-flex items-center gap-1 ${heroUrl ? "hover:text-white" : "hover:text-accent"}`}
            >
              <ArrowLeft className="w-3 h-3" />
              Blog
            </Link>
            {post.categories?.[0] && (
              <>
                <span className="mx-2">/</span>
                <span className={heroUrl ? "text-white" : "text-foreground"}>
                  {post.categories[0].title}
                </span>
              </>
            )}
          </nav>

          <div className="max-w-4xl">
            <div
              className={`flex items-center gap-3 text-xs mb-5 flex-wrap ${heroUrl ? "text-white/80" : "text-muted-foreground"}`}
            >
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingMinutes && (
                <>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingMinutes} min read
                  </span>
                </>
              )}
              {post.categories?.[0] && (
                <>
                  <span>·</span>
                  <span
                    className={`font-medium ${heroUrl ? "text-accent-foreground bg-accent/90 px-2 py-0.5 rounded" : "text-accent"}`}
                  >
                    {post.categories[0].title}
                  </span>
                </>
              )}
            </div>

            <h1
              className={`font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 ${heroUrl ? "text-white drop-shadow-md" : "text-foreground"}`}
              data-testid="blog-post-title"
            >
              {post.title}
            </h1>

            {updatedNeeded && (
              <div
                className={`inline-flex items-center gap-2 text-xs ${heroUrl ? "text-white/70" : "text-muted-foreground"}`}
                data-testid="last-updated"
              >
                <CalendarClock className="w-3 h-3" />
                Last updated {formatDate(post.updatedAt!)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 2-column body: sticky sidebar + article ───────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12">
          {/* Sticky left sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28" data-testid="post-sidebar">
              {post.author && <SidebarAuthorCard author={post.author} />}
              <TableOfContents headings={headings} />
              <ShareWidget title={post.title} />
            </div>
          </aside>

          {/* Article body */}
          <div className="lg:col-span-8">
            <article className="max-w-none" data-testid="blog-post-body">
              {post.excerpt && (
                <p
                  className="text-xl md:text-2xl text-foreground/90 leading-relaxed mb-8 font-light border-l-4 border-accent pl-5"
                  data-testid="blog-post-excerpt"
                >
                  {post.excerpt}
                </p>
              )}
              {post.body && <PortableText value={post.body} components={portableComponents} />}
            </article>

            {/* FAQs */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="mt-16 pt-12 border-t border-border" data-testid="blog-post-faqs">
                <h2 className="font-display font-bold text-3xl text-foreground mb-8">Frequently asked</h2>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group border border-border rounded-xl p-5 open:bg-secondary/40 transition-colors"
                    >
                      <summary className="cursor-pointer font-display font-semibold text-lg text-foreground list-none flex items-start justify-between gap-4">
                        <span>{faq.question}</span>
                        <span className="text-muted-foreground group-open:rotate-45 transition-transform text-2xl leading-none">
                          +
                        </span>
                      </summary>
                      <div className="mt-4 text-foreground/90">
                        <PortableText
                          value={faq.answer}
                          components={{
                            block: {
                              normal: ({ children }) => (
                                <p className="leading-relaxed mb-3">{children}</p>
                              ),
                            },
                            marks: {
                              strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              link: ({ children, value }) => (
                                <a href={value?.href} className="text-accent underline underline-offset-2">
                                  {children}
                                </a>
                              ),
                            },
                          }}
                        />
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {post.author && <AuthorBioBlock author={post.author} />}
            <RelatedPosts posts={related} />
          </div>
        </div>
      </section>
    </>
  );
}
