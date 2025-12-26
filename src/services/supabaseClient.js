
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybfckzbwqifrtkjrwrmj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZmNremJ3cWlmcnRranJ3cm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2OTg1ODYsImV4cCI6MjA4MjI3NDU4Nn0.qIvQ48EpBnM6660oIK7sSLN7pmdN-FLQGjrPdNQvdsA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// User Management
export const saveUser = async (name) => {
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
            completed: stats.total >= 3,
            score: `${stats.correct}/${stats.total} (${percentage}%)`
        };
    });
}

// Course CMS
export const fetchCourse = async (courseId) => {
    // Try to fetch from Supabase
    try {
        const { data, error } = await supabase
            .from('courses')
            .select('data')
            .eq('id', courseId)
            .single();

        if (error || !data) {
            console.warn("Course not found in Supabase, using local fallback.");
            return null; // Signal to use local data
        }
        return data.data; // Assuming 'data' column holds the JSON array
    } catch (err) {
        console.error("Error fetching course:", err);
        return null;
    }
}

export const saveCourse = async (courseId, courseContent) => {
    try {
        // Upsert course data
        const { error } = await supabase
            .from('courses')
            .upsert({ id: courseId, data: courseContent, updated_at: new Date() });

        if (error) throw error;
        return true;
    } catch (err) {
        console.error("Error saving course:", err);
        return false;
    }
}
