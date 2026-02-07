USE fmdd_laravel;

-- Admin User (password: password123)
INSERT INTO users (id, email, password, role, created_at, updated_at) 
VALUES ('a1234567-89ab-cdef-0123-456789abcdef', 'admin@fmdd.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', NOW(), NOW());

INSERT INTO profiles (id, user_id, first_name, last_name, bio, skills, preferences, created_at, updated_at) 
VALUES (UUID(), 'a1234567-89ab-cdef-0123-456789abcdef', 'FMDD', 'Administrator', 'Platform administrator', 
JSON_ARRAY('Management', 'Leadership', 'Platform Administration'), JSON_OBJECT('language', 'fr'), NOW(), NOW());

-- Regular User (password: password123)
INSERT INTO users (id, email, password, role, created_at, updated_at) 
VALUES ('b2345678-9abc-def0-1234-56789abcdef0', 'user@test.com', '$2y$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', NOW(), NOW());

INSERT INTO profiles (id, user_id, first_name, last_name, bio, skills, preferences, created_at, updated_at) 
VALUES (UUID(), 'b2345678-9abc-def0-1234-56789abcdef0', 'Test', 'User', 'Regular test user', 
JSON_ARRAY('Communication', 'Teamwork', 'Problem Solving'), JSON_OBJECT('language', 'en'), NOW(), NOW());

-- Formation
INSERT INTO formations (id, title, description, image, duration, level, category, is_paid, created_at, updated_at) 
VALUES (UUID(), 'Introduction au Marketing Digital', 
'Apprenez les bases du marketing digital: SEO, réseaux sociaux, email marketing, et publicité en ligne. Formation complète pour débutants.',
'https://images.unsplash.com/photo-1460925895917-afdab827c52f', '6 semaines', 'Débutant', 'Marketing', 0, NOW(), NOW());

-- Job Offer
INSERT INTO job_offers (id, title, company, location, type, category, duration, salary, description, skills, is_remote, created_at, updated_at) 
VALUES (UUID(), 'Développeur Web Full Stack', 'Tech Innovators SARL', 'Casablanca, Maroc', 'CDI', 'Tech', 'Permanent', 
'8000 - 12000 MAD', 'Nous recherchons un développeur web full stack passionné pour rejoindre notre équipe dynamique. Vous travaillerez sur des projets innovants utilisant React, Node.js et Laravel.', 
'JavaScript, React, Node.js, Laravel, MySQL, Git', 1, NOW(), NOW());

-- Verify data
SELECT 'Users created:' as info;
SELECT email, role FROM users;

SELECT 'Formations created:' as info;
SELECT title, category FROM formations;

SELECT 'Job Offers created:' as info;
SELECT title, company FROM job_offers;
