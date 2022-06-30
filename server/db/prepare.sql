-- cmnts.comments definition
CREATE TABLE `comments` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `parent_id` mediumint DEFAULT NULL,
  `post_id` mediumint DEFAULT NULL,
  `user_id` mediumint DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- cmnts.upvotes definition
CREATE TABLE `upvotes` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `comment_id` mediumint NOT NULL,
  `user_id` mediumint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- cmnts.users definition
CREATE TABLE `users` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `avatar_url` text NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- populate cmnts.users
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/R9jk4Yh/avataaars8.png', 'Rae Wood');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/QcSX5TP/avataaars7.png', 'Wyatt Watts');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/nPJdf2y/avataaars6.png', 'Marcelina Sherida');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/tJmxXB7/avataaars5.png', 'Jennifer Morris');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/fHGbySZ/avataaars4.png', 'Joseph Rodrigues');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/FB5NwRZ/avataaars3.png', 'Andrei Kirk');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/gjx99xT/avataaars2.png', 'Ksawery Padilla');
INSERT INTO cmnts.users (avatar_url, name) VALUES('https://i.ibb.co/BsFPcKZ/avataaars1.png', 'Sean Mcdowell');
