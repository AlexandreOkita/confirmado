import { Answer } from "@/lib/data/confirmado.database";
import { getAnswerGroupedByDate, getAnswersByEventId } from "@/lib/repository/answers.repository";

export default class AdminController {
    static async fetchAnswers(eventId: string): Promise<Answer[]> {
        return getAnswersByEventId(eventId);
    }

    static async fetchAnswersGroupedByDate(eventId: string): Promise<{ answer_date: string, total_answers: number }[]> {
        return getAnswerGroupedByDate(eventId);
    }
}