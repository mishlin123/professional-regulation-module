export const scenarios = [
    {
        id: 'texting',
        title: 'Out of Hours Texting',
        description: 'A student texts you late at night regarding an assignment. How do you respond?',
        difficulty: 'Beginner',
        context: "It's 9:30 PM on a Tuesday. You are relaxing at home when your personal mobile phone buzzes. It's a text message from a student, Sarah, who is panicked about an assignment due tomorrow. She says: \"Miss, I'm so sorry! I lost the worksheet for tomorrow. Can you send me a picture of it? Please!\"",
        options: [
            {
                id: 'reply_now',
                text: 'Reply immediately with a photo of the worksheet to help her out.',
                feedback: 'Caution: While well-intentioned, this blurs professional boundaries. By responding late at night on a personal advice, you set a precedent that you are available 24/7. This can lead to burnout and potential misunderstandings about the nature of your relationship.',
                isCorrect: false
            },
            {
                id: 'reply_boundaries',
                text: 'Reply stating: "Please do not text my personal number. Email me and we will discuss tomorrow."',
                feedback: 'Better, but slightly risky. Responding at all confirms that this channel of communication works. It is often better to not engage via personal text at all.',
                isCorrect: false
            },
            {
                id: 'wait_official',
                text: 'Do not reply to the text. Address the issue the next morning at school.',
                feedback: 'Correct. This strictly maintains the boundary between your personal life and professional role. You can speak to Sarah in the morning to provide the worksheet and kindly remind her of the appropriate communication channels (school email).',
                isCorrect: true
            }
        ]
    },
    {
        id: 'social_media',
        title: 'Social Media Friend Request',
        description: 'You receive a friend request from a current student on Facebook.',
        difficulty: 'Intermediate',
        context: "You open your Facebook app and see a friend request from 'Jack T.', a student currently in your Year 10 English class. You use your Facebook account to share photos of your family and weekends.",
        options: [
            {
                id: 'accept',
                text: 'Accept the request. It helps build rapport with students.',
                feedback: 'Incorrect. Connecting with current students on personal social media platforms is a significant breach of professional boundaries. It exposes your private life to students and can lead to allegations of inappropriate conduct.',
                isCorrect: false
            },
            {
                id: 'decline_ignore',
                text: 'Decline the request and say nothing.',
                feedback: 'Acceptable, but missing an educational opportunity. Simply declining fixes the immediate issue, but the student might try again or wonder why.',
                isCorrect: false
            },
            {
                id: 'decline_explain',
                text: 'Decline the request. Briefly mention in class generally that teachers cannot be friends with students on social media.',
                feedback: 'Correct. This enforces the boundary and provides the necessary context so students understand it is a professional rule, not a personal rejection.',
                isCorrect: true
            }
        ]
    },
    {
        id: 'gift',
        title: 'The Expensive Gift',
        description: 'A parent offers you a high-value gift at the end of the term.',
        difficulty: 'Advanced',
        context: "It's the last day of term. The mother of a student who has struggled this year hands you a gift bag. Inside is a designer watch that you know costs around $200. She says, 'Thank you so much for getting James through this year.'",
        options: [
            {
                id: 'accept_thanks',
                text: 'Accept the gift gracefully to avoid offending the parent.',
                feedback: 'Incorrect. Accepting gifts of significant value can be perceived as bribery or creating a conflict of interest. Most educational codes of conduct explicitly forbid accepting expensive gifts.',
                isCorrect: false
            },
            {
                id: 'refuse_polite',
                text: 'Politely refuse, explaining that you cannot accept expensive gifts due to school policy.',
                feedback: 'Correct. This is the professional response. It blames the "policy" rather than rejecting the gesture personally, maintaining the relationship while upholding ethics.',
                isCorrect: true
            },
            {
                id: 'accept_donate',
                text: 'Accept the gift but donate it to the school raffle.',
                feedback: 'Risky. While the intention is good, the initial acceptance still creates a perception issue. It is better to decline the gift in the first place.',
                isCorrect: false
            }
        ]
    }
];
