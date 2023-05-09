DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS shop CASCADE;
DROP TABLE IF EXISTS forums CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS user_mentor_history CASCADE;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(140) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  dabloons INT DEFAULT 0,
  goals JSON,
  st_goals JSON DEFAULT '[]',
  mentor VARCHAR(120) DEFAULT 'Morgan',
  is_admin BOOLEAN DEFAULT FALSE,
  owned_mentors JSON DEFAULT '[]',
  PRIMARY KEY (user_id)
);

INSERT INTO users(username, password, dabloons, goals, is_admin, owned_mentors)
VALUES ('stef', '$2b$10$9DvfbVwvWt7.KYKBm8/x8.fAc4cW8zkX9izaKVitBl8oYYM9i3GJG', 999999999, '[]', true, '["Morgan"]'),
('banana', '$2b$10$ARvS2TEGm9ct6uIGSscHF.TMMIp60wEmRMXSM3N/IpT4nQIdIM5ce', 999999999, '[]', true, '["Morgan"]'),
('bart', '$2b$10$ARvS2TEGm9ct6uIGSscHF.TMMIp60wEmRMXSM3N/IpT4nQIdIM5ce', 999999999, '[]', true, '["Morgan"]'),
('mihai', '$2b$10$ARvS2TEGm9ct6uIGSscHF.TMMIp60wEmRMXSM3N/IpT4nQIdIM5ce', 999999999, '[]', true, '["Morgan"]');

CREATE TABLE shop (
    shop_id INT GENERATED ALWAYS AS IDENTITY,
    item_id INT,
    name VARCHAR(60),
    price INT,
    user_id INT,
    PRIMARY KEY (shop_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE forums (
    forum_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(60) NOT NULL,
    content VARCHAR(250),
    created_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    user_id INT,
    PRIMARY KEY (forum_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(60) NOT NULL,
    comment VARCHAR(500),
    created_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    update_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    user_id INT,
    forum_id INT,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (forum_id) REFERENCES forums(forum_id) ON DELETE CASCADE
);

CREATE TABLE user_mentor_history (
    history_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    history JSON DEFAULT '{}',
    PRIMARY KEY (history_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO user_mentor_history(user_id) VALUES (1), (2), (3), (4);