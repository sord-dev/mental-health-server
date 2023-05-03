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
  PRIMARY KEY (user_id)
);

CREATE TABLE shop (
    shop_id INT GENERATED ALWAYS AS IDENTITY,
    item_id INT,
    name VARCHAR(60),
    price INT,
    user_id INT,
    PRIMARY KEY (shop_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);

CREATE TABLE forums (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(60),
    content VARCHAR(250),
    created_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    user_id INT,
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);

CREATE TABLE comments (
    comment_id INT GENERATED ALWAYS AS IDENTITY,
    content VARCHAR(250),
    created_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    update_at timestamp DEFAULT 
    CURRENT_TIMESTAMP,
    user_id INT,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES users("user_id")
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
    FOREIGN KEY (user_id) REFERENCES users("user_id")
);