CREATE TABLE IF NOT EXISTS data_collation (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_summary VARCHAR(512),
            details VARCHAR(2048),
            reg_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
