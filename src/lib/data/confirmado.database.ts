import { Generated, Selectable } from "kysely";

export interface ConfirmadoDatabase {
    t_events: EventsTable
    t_answers: AnswersTable
    v_answers_grouped_by_date: { answer_date: string, total_answers: number, event_id: string }
}

interface EventsTable {
    id: Generated<string>
    name: string
    admin_link: string
    shareble_link: string
    created_at: Generated<Date>
    updated_at: Generated<Date>
}

interface AnswersTable {
    id: Generated<string>
    event_id: string
    name: string
    email: string
    created_at: Generated<Date>
    updated_at: Generated<Date>
}

export type Answer = Selectable<AnswersTable>