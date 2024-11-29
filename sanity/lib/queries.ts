import { defineQuery } from "next-sanity";

// If there is a search, return search results; otherwise, return all.
export const STARTUPS_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search ] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
        _id, name, image, bio
    },
    views,
    description,
    category,
    image,
}`)
// A little thing here: if I search using keyword "united" and obtain my results, then click on the category "United States" in one of these result,
// the search bar will not clear the "united" keyword, but instead it covers the "united states" search.
// Pressing the "x" button will temperarily reveal the "united states" keyword before reloading the page.

export const STARTUP_BY_ID_QUERY = defineQuery(`
    *[_type == "startup" && defined(slug.current) && _id == $id ][0] {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
        _id, name, username, image, bio
    },
    views,
    description,
    category,
    image,
    pitch
}`)

export const STARTUP_VIEWS_QUERY = defineQuery(`
    *[_type == "startup" && _id == $id][0] {
        _id, views
    }
`)

// If a user creates a post, then that user should also be allowed to change that post.
export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio}
`)

// For getting the user in user profile page.
export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0] {
    _id,
    id,
    name,
    username,
    email,
    image,
    bio}
`)

// For allowing viewers to get all startups from a given user.
export const STARTUPS_BY_AUTHOR_QUERY = defineQuery(`
    *[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    author -> {
        _id, name, image, bio
    },
    views,
    description,
    category,
    image,
}`)

// Fetch highlighted posts by this website.
export const PLAYLIST_BY_SLUG_QUERY =
  defineQuery(`*[_type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[]->{
    _id,
    _createdAt,
    title,
    slug,
    author->{
      _id,
      name,
      slug,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch
  }
}`);