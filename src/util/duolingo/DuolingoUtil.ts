export const checkPractisedToday = (currentStreak: string): boolean => {

    if (currentStreak) {
        const lastStreakDay = new Date(currentStreak["endDate"]);
        return new Date().toDateString() === lastStreakDay.toDateString();
    }
    return false;
};