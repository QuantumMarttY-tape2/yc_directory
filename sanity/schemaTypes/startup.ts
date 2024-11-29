import { defineField, defineType } from "sanity";

// Get user data from their authentication (GitHub in this case).
export const startup = defineType({
    name: "startup",
    title: 'Startup',
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
            name: 'author',
            type: 'reference',
            to: { type: 'author' }
        }),
        defineField({
            name: 'views',
            type: 'number',
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'category',
            type: 'string',
            validation: (Rule) => Rule.min(1).max(50).required().error("Please enter a country"),
        }),

        // Can be improved here for inserting image.
        defineField({
            name: 'image',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'pitch',
            type: 'markdown',
        }),
    ],
})