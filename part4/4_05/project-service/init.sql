CREATE TABLE "project_table" (
    id SERIAL,
    content VARCHAR(140) NOT NULL,
    done BOOLEAN DEFAULT FALSE
);

INSERT INTO project_table (content) VALUES ('TODO 1');
INSERT INTO project_table (content) VALUES ('TODO 2');