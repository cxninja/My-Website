import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { Search, Clock, TrendingUp, Sparkles, X } from "lucide-react";
import {
  sanityClient,
  POSTS_QUERY,
  FEATURED_POSTS_QUERY,
  TRENDING_POSTS_QUERY,
  SEARCH_POSTS_QUERY,
  resolveFlexibleImage,
  postUrl,
  type PostListItem,
} from "@/lib/sanity";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostCard({ post, size = "default" }: { post: PostListItem; size?: "default" | "compact" }) {
  const imageUrl = resolveFlexibleImage(post.mainImage, {
    width: size === "compact" ? 600 : 800,
    height: size === "compact" ? 338 : 450,
  });

  return (
    <Link
      href={postUrl(post)}
      className="group block rounded-xl border border-border overflow-hidden hover:border-accent/60 transition-colors h-full flex flex-col"
      data-testid={`blog-card-${post.slug}`}
    >
      {imageUrl ? (
        <div className={`${size === "compact" ? "aspect-[16/9]" : "aspect-[16/9]"} overflow-hidden bg-muted`}>
          <img
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className={`${size === "compact" ? "aspect-[16/9]" : "aspect-[16/9]"} bg-gradient-to-br from-accent/20 to-primary/10`} />
      )}
      <div className={`${size === "compact" ? "p-4" : "p-6"} flex-1 flex flex-col`}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 flex-wrap">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {post.readingMinutes && (
            <>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingMinutes} min
              </span>
            </>
          )}
          {post.categories?.[0] && (
            <>
              <span>·</span>
              <span className="text-accent">{post.categories[0].title}</span>
            </>
          )}
        </div>
        <h3
          className={`font-display font-bold ${size === "compact" ? "text-base" : "text-xl"} text-foreground group-hover:text-accent transition-colors leading-tight`}
        >
          {post.title}
        </h3>
        {size !== "compact" && post.excerpt && (
          <p className="text-sm text-muted-foreground mt-3 line-clamp-3 flex-1">{post.excerpt}</p>
        )}
        {post.author?.name && (
          <p className="text-xs text-muted-foreground mt-4">by {post.author.name}</p>
        )}
      </div>
    </Link>
  );
}

function FeaturedHero({ post }: { post: PostListItem }) {
  const imageUrl = resolveFlexibleImage(post.mainImage, { width: 1400, height: 700 });
  return (
    <Link
      href={postUrl(post)}
      className="group block rounded-2xl border border-border overflow-hidden hover:border-accent/60 transition-colors relative"
      data-testid={`featured-hero-${post.slug}`}
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="aspect-[16/10] md:aspect-auto bg-muted overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/30 to-primary/10" />
          )}
        </div>
        <div className="p-8 md:p-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-accent font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Featured
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 flex-wrap">
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
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors mb-4 leading-tight">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
          )}
          {post.author?.name && (
            <p className="text-xs text-muted-foreground mt-4">by {post.author.name}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

function TrendingItem({ post, rank }: { post: PostListItem; rank: number }) {
  return (
    <Link
      href={postUrl(post)}
      className="group flex gap-3 p-3 -mx-3 rounded-lg hover:bg-muted/60 transition-colors"
      data-testid={`trending-${post.slug}`}
    >
      <span className="font-display font-bold text-2xl text-accent/60 group-hover:text-accent w-8 flex-shrink-0">
        {String(rank).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <h3 className="font-display font-semibold text-sm text-foreground group-hover:text-accent transition-colors leading-snug line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {post.readingMinutes ? `${post.readingMinutes} min · ` : ""}
          {post.categories?.[0]?.title ?? ""}
        </p>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<PostListItem[] | null>(null);
  const [featured, setFeatured] = useState<PostListItem[]>([]);
  const [trending, setTrending] = useState<PostListItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<PostListItem[] | null>(null);
  const [searching, setSearching] = useState(false);
  const searchTimer = useRef<number | null>(null);

  useEffect(() => {
    Promise.all([
      sanityClient.fetch<PostListItem[]>(POSTS_QUERY),
      sanityClient.fetch<PostListItem[]>(FEATURED_POSTS_QUERY),
      sanityClient.fetch<PostListItem[]>(TRENDING_POSTS_QUERY),
    ])
      .then(([a, f, t]) => {
        setPosts(a);
        setFeatured(f ?? []);
        setTrending(t ?? []);
      })
      .catch((e) => setError(e.message ?? "Failed to load posts"));
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimer.current) window.clearTimeout(searchTimer.current);
    const q = query.trim();
    if (!q) {
      setSearchResults(null);
      setSearching(false);
      return;
    }
    setSearching(true);
    searchTimer.current = window.setTimeout(() => {
      // GROQ `match` is whitespace-tokenized and supports trailing wildcards only.
      // Split into words and append `*` to each so partial matches work.
      const tokens = q
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .map((w) => `${w}*`)
        .join(" ");
      sanityClient
        .fetch<PostListItem[]>(SEARCH_POSTS_QUERY, { q: tokens })
        .then((r) => setSearchResults(r ?? []))
        .catch(() => setSearchResults([]))
        .finally(() => setSearching(false));
    }, 300);
    return () => {
      if (searchTimer.current) window.clearTimeout(searchTimer.current);
    };
  }, [query]);

  const featuredHero = featured[0] ?? posts?.[0];
  const featuredRest = featured.slice(1, 4);

  const latestPosts = useMemo(() => {
    if (!posts) return [];
    const featuredIds = new Set(featured.map((f) => f._id));
    return posts.filter((p) => !featuredIds.has(p._id));
  }, [posts, featured]);

  return (
    <>
      <Helmet>
        <title>Blog — NovaTransform</title>
        <meta
          name="description"
          content="Field notes on transformation, AI, retention, and scaling — from Varun Goel and the NovaTransform team."
        />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-3 font-semibold">
                The NovaTransform Blog
              </p>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-foreground leading-tight">
                Field notes from the edge.
              </h1>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
                Thinking out loud about transformation, AI, and the messy reality of scaling teams.
              </p>
            </div>

            {/* Search */}
            <div className="md:w-80 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-accent/50 transition-colors"
                  data-testid="blog-search-input"
                  aria-label="Search blog"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search results view (replaces everything else when active) */}
      {query.trim() && (
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display font-bold text-xl text-foreground mb-2">
              {searching
                ? "Searching…"
                : `${searchResults?.length ?? 0} result${(searchResults?.length ?? 0) === 1 ? "" : "s"} for "${query}"`}
            </h2>
            {!searching && searchResults && searchResults.length === 0 && (
              <p className="text-muted-foreground mt-4">
                Nothing matched. Try a different keyword.
              </p>
            )}
            {searchResults && searchResults.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" data-testid="search-results">
                {searchResults.map((p) => (
                  <PostCard key={p._id} post={p} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Default (non-search) view */}
      {!query.trim() && (
        <>
          {error && (
            <section className="px-6 pb-8">
              <div className="max-w-6xl mx-auto">
                <div className="p-6 border border-destructive/30 bg-destructive/5 rounded-lg text-sm">
                  Couldn't load posts: {error}
                </div>
              </div>
            </section>
          )}

          {!posts && !error && (
            <section className="px-6 pb-16">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-80 rounded-xl bg-muted/40 animate-pulse" />
                ))}
              </div>
            </section>
          )}

          {posts && posts.length === 0 && (
            <section className="px-6 pb-16">
              <div className="max-w-6xl mx-auto">
                <div className="p-10 border border-border rounded-xl text-center text-muted-foreground">
                  No posts published yet. Check back soon.
                </div>
              </div>
            </section>
          )}

          {posts && posts.length > 0 && (
            <>
              {/* Featured hero */}
              {featuredHero && (
                <section className="px-6 pb-12">
                  <div className="max-w-6xl mx-auto">
                    <FeaturedHero post={featuredHero} />
                  </div>
                </section>
              )}

              {/* Two-column: latest grid + trending sidebar */}
              <section className="px-6 pb-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
                  {/* Main column */}
                  <div className="lg:col-span-8">
                    {/* Featured rest */}
                    {featuredRest.length > 0 && (
                      <div className="mb-12">
                        <div className="flex items-center gap-2 mb-6">
                          <Sparkles className="w-4 h-4 text-accent" />
                          <h2 className="font-display font-bold text-xl text-foreground">
                            More featured
                          </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {featuredRest.map((p) => (
                            <PostCard key={p._id} post={p} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Latest */}
                    {latestPosts.length > 0 && (
                      <div>
                        <h2 className="font-display font-bold text-xl text-foreground mb-6">
                          Latest articles
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-6" data-testid="latest-grid">
                          {latestPosts.map((p) => (
                            <PostCard key={p._id} post={p} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar */}
                  <aside className="lg:col-span-4">
                    {trending.length > 0 && (
                      <div className="bg-secondary/40 border border-border rounded-2xl p-6 sticky top-28">
                        <div className="flex items-center gap-2 mb-6">
                          <TrendingUp className="w-4 h-4 text-accent" />
                          <h2 className="font-display font-bold text-base text-foreground uppercase tracking-wider">
                            Trending
                          </h2>
                        </div>
                        <div className="space-y-1" data-testid="trending-sidebar">
                          {trending.map((p, i) => (
                            <TrendingItem key={p._id} post={p} rank={i + 1} />
                          ))}
                        </div>
                      </div>
                    )}
                  </aside>
                </div>
              </section>
            </>
          )}
        </>
      )}
    </>
  );
}
