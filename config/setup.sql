DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS shop CASCADE;
DROP TABLE IF EXISTS forums CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS goals CASCADE;

CREATE TABLE users (
  user_id INT GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(60) UNIQUE NOT NULL,
  password VARCHAR(140) NOT NULL,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  dabloons INT DEFAULT 0,
  goals JSON,
  mentor VARCHAR(120) DEFAULT '53f57cad12a2c697226b96c10f12db1d',
  PRIMARY KEY (user_id)
);

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
    title VARCHAR(60),
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

CREATE TABLE goals (
    goal_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50),
    content VARCHAR(250),
    created_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    update_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    user_id INT,
    PRIMARY KEY (goal_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);