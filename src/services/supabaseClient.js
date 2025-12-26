
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybfckzbwqifrtkjrwrmj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmNremJ3cWlmcnRranJ3cm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2OTg1ODYsImV4cCI6MjA4MjI3NDU4Nn0.qIvQ48EpBnM6660oIK7sSLN7pmdN-FLQGjrPdNQvdsA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User Management
export const saveUser = async (name) => {
    // Ideally we would have a users table, but for this PoC we just pass the name through
    // or we could log a 'session_start' event if we had an events table.
    return { name };
}

// Analytics
export const saveProgress = async (userName, courseId, slideId) => {
    try {
        await supabase.from('user_progress').insert({
            user_name: userName,
            course_id: courseId,
            current_slide: slideId
        });
    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

export const saveQuizResult = async (userName, courseId, questionId, isCorrect) => {
    try {
        await supabase.from('quiz_results').insert({
            user_name: userName,
            question_id: questionId,
            is_correct: isCorrect
        });
    } catch (error) {
        console.error("Error saving quiz result:", error);
    }
}

export const fetchAnalytics = async () => {
    const { data, error } = await supabase.from('quiz_results').select('*');

    if (error) {
        console.error("Error fetching analytics:", error);
        return [];
    }

    // Aggregating data for the dashboard
    const userStats = {};

    data.forEach(row => {
        if (!userStats[row.user_name]) {
            userStats[row.user_name] = { total: 0, correct: 0 };
        }
        userStats[row.user_name].total += 1;
        if (row.is_correct) {
            userStats[row.user_name].correct += 1;
        }
    });

    return Object.keys(userStats).map(name => {
        const stats = userStats[name];
        const percentage = Math.round((stats.correct / stats.total) * 100);
        return {
            name: name,
            completed: stats.total >= 3, // Assuming roughly 3-4 questions implies significant progress for this PoC
            score: `${stats.correct}/${stats.total} (${percentage}%)`
        };
    });
}
