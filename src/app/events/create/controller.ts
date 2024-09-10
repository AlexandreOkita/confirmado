import { insertEvent } from "@/lib/repository/events.repository";

export function createEvent(name: string): Promise<{ adminLink: string, sharebleLink: string }> {
    return insertEvent(name);
}