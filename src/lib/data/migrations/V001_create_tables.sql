CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE t_events (
    id UUID NOT NULL DEFAULT uuid_generate_v4() ,
    name VARCHAR(255) NOT NULL,
    admin_link VARCHAR(255) NOT NULL,
    shareble_link VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_answers (
    id UUID NOT NULL DEFAULT uuid_generate_v4() ,
    event_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);