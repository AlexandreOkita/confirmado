"use server";

import { Answer, ConfirmadoDatabase } from "../data/confirmado.database";
import { createKysely } from '@vercel/postgres-kysely';
import { getEventBySharebleLink } from "./events.repository";

export async function insertAnswer(name: string, email: string, currentLink: string) {
    const db = createKysely<ConfirmadoDatabase>();

    const eventId = (await getEventBySharebleLink(currentLink)).id;

    await db.insertInto('t_answers').values({
        name: name,
        email: email,
        event_id: eventId
    }).execute();
}

export async function getAnswersByEventId(eventId: string): Promise<Answer[]> {
    const db = createKysely<ConfirmadoDatabase>();
    return db.selectFrom('t_answers').where('event_id', '=', eventId).selectAll().execute();
}

export async function getAnswerGroupedByDate(eventId: string): Promise<{ answer_date: string, total_answers: number }[]> {
    const db = createKysely<ConfirmadoDatabase>();
    return db
        .selectFrom('v_answers_grouped_by_date')
        .where('event_id', '=', eventId)
        .selectAll()
        .execute();
}
