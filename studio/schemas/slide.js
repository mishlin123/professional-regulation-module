
export default {
    name: 'slide',
    title: 'Content Slide',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Slide Title',
            type: 'string',
        },
        {
            name: 'content',
            title: 'Main Content (Markdown)',
            type: 'text',
            description: 'Use Markdown for formatting (**bold**, - lists, etc.)'
        },
        {
            name: 'explanation',
            title: 'Deep Dive / Explanation',
            type: 'text',
            description: 'The notes that appear in the sidebar.'
        },
        {
            name: 'order',
            title: 'Order Number',
            type: 'number',
            description: 'Used to sort the slides (1, 2, 3...)'
        },
        {
            name: 'media',
            title: 'Media',
            type: 'object',
            fields: [
                { name: 'type', type: 'string', title: 'Media Type', options: { list: ['image', 'icon', 'video'] } },
                { name: 'placeholder', type: 'string', title: 'Placeholder Label' },
                { name: 'asset', type: 'image', title: 'Image File' }
            ]
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'order'
        }
    }
}
