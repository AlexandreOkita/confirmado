import { Answer } from "@/lib/data/confirmado.database";
import { getAnswerGroupedByDate, getAnswersByEventId } from "@/lib/repository/answers.repository";

export default class AdminController {
    static async fetchAnswers(eventId: string): Promise<Answer[]> {
        return getAnswersByEventId(eventId);
    }

    static async fetchAnswersGroupedByDate(eventId: string): Promise<{ answer_date: string, total_answers: number }[]> {
        return getAnswerGroupedByDate(eventId);
    }

    static populateAnswersChartWithMissingDates(answers: { answer_date: string, total_answers: number }[]): { answer_date: string, total_answers: number }[] {
        const dates = answers.map(answer => answer.answer_date);
        const allDates = [];
        const currentDate = new Date(dates[0]);
        const today = new Date();
        while (currentDate <= today) {
            allDates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        const answersWithMissingDates = allDates.map(date => {
            const answer = answers.find(answer => this.formatDate(new Date(answer.answer_date)) === date);
            const total_answers = answer ? answer.total_answers : 0;
            return { answer_date: date, total_answers };
        });

        return answersWithMissingDates;
    }

    private static formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}