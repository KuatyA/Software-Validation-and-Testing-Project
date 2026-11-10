
--drop tables for reinitialization--
DROP TABLE IF EXISTS feedback CASCADE;
DROP TABLE IF EXISTS submission CASCADE;
DROP TABLE IF EXISTS task CASCADE;
DROP TABLE IF EXISTS meeting CASCADE;
DROP TABLE IF EXISTS advisor_availability CASCADE;
DROP TABLE IF EXISTS student CASCADE;
DROP TABLE IF EXISTS project_group CASCADE;
DROP TABLE IF EXISTS project CASCADE;
DROP TABLE IF EXISTS advisor CASCADE;

--custom types--
CREATE TYPE task_exec_status AS ENUM('TO_DO', 'IN_PROGRESS', 'FINISHED', 'LATE');
CREATE TYPE meeting_exec_status AS ENUM('REQUESTED', 'APPROVED', 'REJECTED', 'APPROACHING', 'IN_SESSION', 'ENDED', 'PASSED');
CREATE TYPE submission_exec_status AS ENUM('APPROVED', 'PENDING', 'REVISION_REQUESTED');

--Independent Tables--
CREATE TABLE advisor(
    advisor_id SERIAL PRIMARY KEY,
    advisor_name VARCHAR(60),
    advisor_surname VARCHAR(60) NOT NULL,
    advisor_mail VARCHAR(60) UNIQUE NOT NULL,
    advisor_password VARCHAR(30) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
CREATE TABLE project(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(60) NOT NULL,
    project_description VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Dependency on advisor + project--
CREATE TABLE project_group(
    group_id SERIAL PRIMARY KEY,
    group_name VARCHAR(60) UNIQUE NOT NULL,
    group_advisor INT REFERENCES advisor(advisor_id) ON DELETE SET NULL,
    group_project INT REFERENCES project(project_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--Dependency on project_group--
CREATE TABLE student(
    student_id SERIAL PRIMARY KEY,
    student_name VARCHAR(60) NOT NULL,
    student_surname VARCHAR(60) NOT NULL,
    student_mail VARCHAR(60) UNIQUE NOT NULL,
    student_password VARCHAR(30) NOT NULL,
    student_group_id INT REFERENCES project_group(group_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

--Dependency on advisor--
CREATE TABLE advisor_availability(
    availability_id SERIAL PRIMARY KEY,
    availability_advisor_id INT REFERENCES advisor(advisor_id) ON DELETE SET NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    availability_date DATE NOT NULL,
    is_booked BOOLEAN
);

--Dependency on advisor + project_group--
CREATE TABLE meeting(
    meeting_id SERIAL PRIMARY KEY,
    meetting_status meeting_exec_status NOT NULL DEFAULT 'REQUESTED',
    meeting_advisor INT REFERENCES advisor(advisor_id) ON DELETE SET NULL,
    meeting_group INT REFERENCES project_group(group_id) ON DELETE SET NULL,
    meeting_scheduled_at_hour TIMESTAMP NOT NULL,
    meeting_scheduled_at_date DATE NOT NULL
);

--Dependency on project_group + student + project + advisor--
CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(60) NOT NULL,
    task_assigned_group_id INT REFERENCES project_group(group_id) ON DELETE SET NULL,
    task_assigned_student_id INT REFERENCES student(student_id) ON DELETE SET NULL,
    task_due_date DATE,
    task_description VARCHAR(300),
    task_status task_exec_status NOT NULL DEFAULT 'TO_DO',
    task_project INT REFERENCES project(project_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES advisor(advisor_id) ON DELETE SET NULL
);

--Dependency on task + project_group + student--
CREATE TABLE submission(
    submission_id SERIAL PRIMARY KEY,
    submission_task_id INT REFERENCES task(task_id) ON DELETE SET NULL,
    submission_group_id INT REFERENCES project_group(group_id) ON DELETE SET NULL,
    file_path VARCHAR(255) NOT NULL,
    submission_status submission_exec_status NOT NULL DEFAULT 'PENDING',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by INT REFERENCES student(student_id) ON DELETE SET NULL,
    version_no INT NOT NULL
);

--Dependency on sunbmission + advisor--
CREATE TABLE feedback(
    feedback_id SERIAL PRIMARY KEY,
    feedback_submission_id INT REFERENCES submission(submission_id) ON DELETE SET NULL,
    feedback_advisor_id INT REFERENCES advisor(advisor_id) ON DELETE SET NULL,
    feedback_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

