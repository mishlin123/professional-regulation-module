
export default {
    name: 'scenario',
    title: 'Interactive Scenario',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Scenario Title',
            type: 'string',
        },
        {
            name: 'content',
            title: 'Scenario Description',
            type: 'text',
        },
        {
            name: 'question',
            title: 'Question',
            type: 'string',
        },
        {
            name: 'options',
            title: 'Options',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'text', type: 'string', title: 'Option Text' },
                    { name: 'feedback', type: 'text', title: 'Feedback Message' },
                    { name: 'isCorrect', type: 'boolean', title: 'Is Correct?', initialValue: false }
                ]
            }]
        },
        {
            name: 'explanation',
            title: 'Deep Dive / Explanation',
            type: 'text',
        },
        {
            name: 'order',
            title: 'Order Number',
            type: 'number',
        }
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'question'
        }
    }
}
