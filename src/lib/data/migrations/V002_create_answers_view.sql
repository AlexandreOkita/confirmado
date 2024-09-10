CREATE VIEW v_answers_grouped_by_date AS
SELECT
    DATE (created_at) AS answer_date,
    COUNT(*) AS total_answers,
    event_id
FROM t_answers
GROUP BY
    DATE (created_at),
    event_id
ORDER BY answer_date;