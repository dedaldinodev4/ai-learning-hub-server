ALTER TABLE `_topics` MODIFY COLUMN `userId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `_topics` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `_users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `_topics` ADD `title` varchar(256) NOT NULL;