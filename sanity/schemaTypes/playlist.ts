import { defineField, defineType } from "sanity";

// Get user data from their authentication (GitHub in this case).
export const playlist = defineType({
    name: "playlist",
    title: 'Playlists',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
            }
        }),
        defineField({
            name: 'select',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'startup' }] }]
        })
    ],
})