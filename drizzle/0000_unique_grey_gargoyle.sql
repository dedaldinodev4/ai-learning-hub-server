CREATE TABLE `_topics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(256) NOT NULL,
	`summary` varchar(256) NOT NULL,
	`quiz` json NOT NULL,
	`description` varchar(256),
	`userId` int NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `_topics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256) NOT NULL,
	`password` varchar(256),
	`provider` varchar(20) NOT NULL DEFAULT 'manual',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `_users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `_topics` ADD CONSTRAINT `_topics_userId__users_id_fk` FOREIGN KEY (`userId`) REFERENCES `_users`(`id`) ON DELETE no action ON UPDATE no action;