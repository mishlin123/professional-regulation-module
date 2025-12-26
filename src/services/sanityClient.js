
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// User Config
const projectId = 'enpinorj';
const dataset = 'production'; // Default
const apiVersion = '2023-05-03';

export const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Faster response for public data
});

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source) => {
    return builder.image(source);
};

// Fetch the full course content (Slides and Scenarios)
// We order by 'order' field if present, or createAt
export const fetchCourseContent = async () => {
    // GROQ Query
    // We assume there's a 'course' document that holds references, OR we fetch all 'slide' and 'scenario' types.
    // Simplifying: Let's fetch all documents of type 'slide' or 'scenario' and sort them.
    // Ideally we would want a parent 'course' document to define order, but for migration ease:
    // We will assume documents have an 'order' number field.

    const query = `*[_type in ["slide", "scenario"]] | order(order asc) {
        _id,
        _type,
        title,
        content,
        explanation,
        order,
        // Slide specific
        media {
            type,
            placeholder,
            asset
        },
        // Scenario specific
        question,
        options[] {
            _key,
            text,
            feedback,
            isCorrect
        }
    }`;

    try {
        const result = await sanityClient.fetch(query);

        // Transform to match App's expected format (id, type, etc.)
        return result.map(item => ({
            id: item._id,
            type: item._type,
            title: item.title,
            content: item.content,
            explanation: item.explanation,
            // Slide
            media: item.media ? {
                type: item.media.type || 'image',
                placeholder: item.media.placeholder,
                imageUrl: item.media.asset ? urlFor(item.media.asset).width(800).url() : null
            } : null,
            // Scenario
            question: item.question,
            options: item.options ? item.options.map(opt => ({
                id: opt._key,
                text: opt.text,
                feedback: opt.feedback,
                isCorrect: opt.isCorrect
            })) : []
        }));
    } catch (error) {
        console.error("Sanity Fetch Error:", error);
        return null;
    }
};
