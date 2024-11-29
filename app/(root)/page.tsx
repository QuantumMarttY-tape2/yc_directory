import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query?: string }>
}) {
  const query = (await searchParams).query;

  // Extract search.
  const params = { search: query || null}

  // Extract session.
  const session = await auth();

  // Fetch posts from clients. Refreshs the page every time a change is applied.
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Meme Startup Companies for Real-World Leaders</h1>
        {/* "!" is used here to overwrite specific settings. */}
        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>

        {/* Search Bar. */}
        <SearchForm query={query} />
      </section>
      
      <section className="section_container">
        {/* Search indicator. */}
        <p className="text-30-semibold">
          {query ? `Search Results for "${query}"` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            // If there are posts:
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            // Otherwise:
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
