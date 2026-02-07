-- Test Data for FMDD Laravel Backend

-- Admin User
INSERT INTO users (id, email, password, role, created_at, updated_at) VALUES
(UUID(), 'admin@fmdd.com', '$2y$12$6EGfxgJTl8xfk9Pz4Kq5f.d0eQp8GJLxK0kH5oBvT8lZrKdNpXYsG', 'ADMIN', NOW(), NOW());

SET @admin_id = (SELECT id FROM users WHERE email = 'admin@fmdd.com');

INSERT INTO profiles (id, user_id, first_name, last_name, bio, skills, preferences, created_at, updated_at) VALUES
(UUID(), @admin_id, 'FMDD', 'Administrator', 'Platform administrator account', 
 JSON_ARRAY('Management', 'Leadership', 'Platform Administration'), 
 JSON_OBJECT('language', 'fr'), NOW(), NOW());

-- Regular User  
INSERT INTO users (id, email, password, role, created_at, updated_at) VALUES
(UUID(), 'user@test.com', '$2y$12$6EGfxgJTl8xfk9Pz4Kq5f.d0eQp8GJLxK0kH5oBvT8lZrKdNpXYsG', 'USER', NOW(), NOW());

SET @user_id = (SELECT id FROM users WHERE email = 'user@test.com');

INSERT INTO profiles (id, user_id, first_name, last_name, bio, skills, preferences, created_at, updated_at) VALUES
(UUID(), @user_id, 'Test', 'User', 'Regular test user account',
 JSON_ARRAY('Communication', 'Teamwork', 'Problem Solving'),
 JSON_OBJECT('language', 'en'), NOW(), NOW());

-- Formation (Course)
INSERT INTO formations (id, title, description, image, duration, level, category, is_paid, created_at, updated_at) VALUES
(UUID(), 'Introduction au Marketing Digital', 
 'Apprenez les bases du marketing digital: SEO, réseaux sociaux, email marketing, et publicité en ligne. Formation complète pour débutants.',
 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
 '6 semaines', 'Débutant', 'Marketing', 0, NOW(), NOW());

-- Job Offer
INSERT INTO job_offers (id, title, company, location, type, category, duration, salary, description, skills, is_remote, created_at, updated_at) VALUES
(UUID(), 'Développeur Web Full Stack',
 'Tech Innovators SARL',
 'Casablanca, Maroc',
 'CDI',
 'Tech',
 'Permanent',
 '8000 - 12000 MAD',
 'Nous recherchons un développeur web full stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, Node.js et Laravel.',
 'JavaScript, React, Node.js, Laravel, MySQL, Git',
 1, NOW(), NOW());

-- Password for both accounts is: password123
