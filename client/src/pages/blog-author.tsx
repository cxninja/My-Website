import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Helmet } from "react-helmet-async";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Linkedin, Twitter, Github, Globe, Mail, Award, Clock } from "lucide-react";
import {
  sanityClient,
  AUTHOR_BY_SLUG_QUERY,
  POSTS_BY_AUTHOR_QUERY,
  resolveFlexibleImage,
  postUrl,
  type AuthorFull,
  type PostListItem,
} from "@/lib/sanity";

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  x: Twitter,
  github: Github,
  website: Globe,
  email: Mail,
};

const bioComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent pl-6 italic text-lg text-foreground my-6">
        {children}
      </blockquote>
    ),
    h4: ({ children }) => (
      <h4 className="font-display font-semibold text-xl text-foreground mt-6 mb-3">{children}</h4>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-accent underline underline-offset-2">
        {children}
      </a>
    ),
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogAuthor() {
  const [, params] = useRoute<{ slug: string }>("/blog/author/:slug");
  const slug = params?.slug;
  const [author, setAuthor] = useState<AuthorFull | null | undefined>(undefined);
  const [posts, setPosts] = useState<PostListItem[]>([]);

  useEffect(() => {
    if (!slug) return;
    Promise.all([
      sanityClient.fetch<AuthorFull | null>(AUTHOR_BY_SLUG_QUERY, { slug }),
      sanityClient.fetch<PostListItem[]>(POSTS_BY_AUTHOR_QUERY, { slug }),
    ])
      .then(([a, p]) => {
        setAuthor(a);
        setPosts(p ?? []);
      })
      .catch(() => setAuthor(null));
  }, [slug]);

  if (author === undefined) {
    return (
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="h-32 bg-muted/40 rounded-xl animate-pulse mb-8" />
          <div className="h-4 bg-muted/40 rounded animate-pulse w-2/3 mb-2" />
          <div className="h-4 bg-muted/40 rounded animate-pulse w-1/2" />
        </div>
      </section>
    );
  }

  if (!author) {
    return (
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl mb-4">Author not found</h1>
          <Link href="/blog" className="text-accent underline">
            ← Back to blog
          </Link>
        </div>
      </section>
    );
  }

  const avatarUrl = resolveFlexibleImage(author.avatar, { width: 240, height: 240 });
  const coverUrl = resolveFlexibleImage(author.coverImage, { width: 1600, height: 400 });

  // JSON-LD: Person schema
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: avatarUrl ?? undefined,
    sameAs: author.socialLinks?.filter((s) => s.platform !== "email").map((s) => s.url),
    knowsAbout: author.expertise,
  };

  return (
    <>
      <Helmet>
        <title>{`${author.name} — NovaTransform Blog`}</title>
        {author.bio && <meta name="description" content={author.bio} />}
        <script type="application/ld+json">{JSON.stringify(personJsonLd)}</script>
      </Helmet>

      <article className="pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-5xl mx-auto px-6 mb-6">
          <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/blog" className="hover:text-accent inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" />
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span>Authors</span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{author.name}</span>
          </nav>
        </div>

        {/* Cover */}
        {coverUrl && (
          <div className="max-w-5xl mx-auto px-6 mb-8">
            <div className="aspect-[5/1] rounded-2xl overflow-hidden bg-muted">
              <img
                src={coverUrl}
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* Profile header */}
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={author.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background shadow-lg object-cover"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-accent/30 to-primary/20 border-4 border-background flex items-center justify-center font-display font-bold text-4xl text-accent">
                  {author.name.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1
                className="font-display font-bold text-4xl md:text-5xl text-foreground mb-2"
                data-testid="author-name"
              >
                {author.name}
              </h1>
              {author.role && (
                <p className="text-lg text-muted-foreground mb-4">{author.role}</p>
              )}

              <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                {author.yearsExperience && (
                  <span className="inline-flex items-center gap-2">
                    <Award className="w-4 h-4 text-accent" />
                    {author.yearsExperience}+ years experience
                  </span>
                )}
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  {posts.length} {posts.length === 1 ? "article" : "articles"}
                </span>
              </div>

              {author.expertise && author.expertise.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6" data-testid="author-expertise">
                  {author.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {author.socialLinks && author.socialLinks.length > 0 && (
                <div className="flex items-center gap-3" data-testid="author-social">
                  {author.socialLinks.map((s) => {
                    const Icon = socialIconMap[s.platform] ?? Globe;
                    return (
                      <a
                        key={s._key}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="w-9 h-9 rounded-lg border border-border hover:border-accent hover:text-accent text-muted-foreground flex items-center justify-center transition-colors"
                        aria-label={s.platform}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Long bio */}
        {author.longBio && author.longBio.length > 0 && (
          <div className="max-w-3xl mx-auto px-6 mb-16">
            <h2 className="font-display font-bold text-2xl text-foreground mb-6">
              About {author.name.split(" ")[0]}
            </h2>
            <div className="text-lg" data-testid="author-long-bio">
              <PortableText value={author.longBio} components={bioComponents} />
            </div>
          </div>
        )}

        {/* Articles by author */}
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display font-bold text-3xl text-foreground mb-8">
            Articles by {author.name.split(" ")[0]}
          </h2>

          {posts.length === 0 ? (
            <p className="text-muted-foreground">No articles yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6" data-testid="author-posts">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={postUrl(post)}
                  className="group block rounded-xl border border-border overflow-hidden hover:border-accent/60 transition-colors"
                  data-testid={`author-post-${post.slug}`}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 flex-wrap">
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                      {post.readingMinutes && (
                        <>
                          <span>·</span>
                          <span>{post.readingMinutes} min read</span>
                        </>
                      )}
                      {post.categories?.[0] && (
                        <>
                          <span>·</span>
                          <span className="text-accent">{post.categories[0].title}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-xl text-foreground group-hover:text-accent transition-colors leading-tight mb-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
