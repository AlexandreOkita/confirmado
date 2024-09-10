"use server";

import { ConfirmadoDatabase } from "../data/confirmado.database";
import { createKysely } from '@vercel/postgres-kysely';
import { v4 as uuidv4 } from 'uuid';

export async function insertEvent(name: string): Promise<{ adminLink: string, sharebleLink: string }> {
    let appendVersion = '';
    const db = createKysely<ConfirmadoDatabase>();
    const uuid = uuidv4();

    const eventsWithName = await db.selectFrom('t_events').where('name', '=', name).selectAll().execute();
    if (eventsWithName.length > 0) {
        appendVersion = `-${eventsWithName.length}`;
    }

    const adminLink = `/${uuid}`;
    const formattedName = name.replace(/\s+/g, '-').toLowerCase();
    const sharebleLink = `/${formattedName}${appendVersion}`;

    await db.insertInto('t_events').values({
        id: uuid,
        name: name,
        admin_link: adminLink,
        shareble_link: sharebleLink,
    }).execute();

    return {
        adminLink: adminLink,
        sharebleLink: sharebleLink
    };
}

export async function getEventBySharebleLink(sharebleLink: string): Promise<{ id: string, name: string, admin_link: string, shareble_link: string }> {
    const db = createKysely<ConfirmadoDatabase>();
    const event = await db.selectFrom('t_events').where('shareble_link', '=', sharebleLink).selectAll().execute();
    if (event.length === 0) {
        throw new Error(`Event with shareble link ${sharebleLink} not found`);
    }
    return event[0];
}
