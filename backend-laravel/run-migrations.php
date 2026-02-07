<?php

// Direct migration script as workaround for Laravel migration issues
$pdo = new PDO('mysql:host=127.0.0.1;dbname=fmdd_laravel', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

echo "Starting manual migrations...\n\n";

try {
    // Create migrations table
    $pdo->exec("CREATE TABLE IF NOT EXISTS migrations (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        batch INT NOT NULL
    )");
    echo "✅ Migrations table created\n";

    // Users table
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id CHAR(36) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT 'USER',
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Users table created\n";

    // Profiles table
    $pdo->exec("CREATE TABLE IF NOT EXISTS profiles (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) UNIQUE NOT NULL,
        first_name VARCHAR(255) NULL,
        last_name VARCHAR(255) NULL,
        bio TEXT NULL,
        avatar VARCHAR(255) NULL,
        skills JSON NULL,
        preferences JSON NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    echo "✅ Profiles table created\n";

    // Formations table
    $pdo->exec("CREATE TABLE IF NOT EXISTS formations (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NULL,
        duration VARCHAR(255) NULL,
        level VARCHAR(255) NULL,
        category VARCHAR(255) NULL,
        is_paid BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Formations table created\n";

    // Modules table
    $pdo->exec("CREATE TABLE IF NOT EXISTS modules (
        id CHAR(36) PRIMARY KEY,
        formation_id CHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        content TEXT NULL,
        `order` INT NOT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE
    )");
    echo "✅ Modules table created\n";

    // Interview Preps table
    $pdo->exec("CREATE TABLE IF NOT EXISTS interview_preps (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        category VARCHAR(255) NOT NULL,
        video_url VARCHAR(255) NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Interview Preps table created\n";

    // Quizzes table
    $pdo->exec("CREATE TABLE IF NOT EXISTS quizzes (
        id CHAR(36) PRIMARY KEY,
        module_id CHAR(36) NULL,
        interview_prep_id CHAR(36) NULL,
        title VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE,
        FOREIGN KEY (interview_prep_id) REFERENCES interview_preps(id) ON DELETE CASCADE
    )");
    echo "✅ Quizzes table created\n";

    // Questions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS questions (
        id CHAR(36) PRIMARY KEY,
        quiz_id CHAR(36) NOT NULL,
        text TEXT NOT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
    )");
    echo "✅ Questions table created\n";

    // Options table
    $pdo->exec("CREATE TABLE IF NOT EXISTS options (
        id CHAR(36) PRIMARY KEY,
        question_id CHAR(36) NOT NULL,
        text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
    )");
    echo "✅ Options table created\n";

    // Certificates table
    $pdo->exec("CREATE TABLE IF NOT EXISTS certificates (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        formation_id CHAR(36) NOT NULL,
        issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        verify_url VARCHAR(255) UNIQUE NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE
    )");
    echo "✅ Certificates table created\n";

    // Badges table
    $pdo->exec("CREATE TABLE IF NOT EXISTS badges (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(255) NOT NULL
    )");
    echo "✅ Badges table created\n";

    // User Badges table
    $pdo->exec("CREATE TABLE IF NOT EXISTS user_badges (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        badge_id CHAR(36) NOT NULL,
        earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE
    )");
    echo "✅ User Badges table created\n";

    // Course Progressions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS course_progressions (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        formation_id CHAR(36) NOT NULL,
        progress INT DEFAULT 0,
        is_completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        UNIQUE KEY unique_user_formation (user_id, formation_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (formation_id) REFERENCES formations(id) ON DELETE CASCADE
    )");
    echo "✅ Course Progressions table created\n";

    // Job Offers table
    $pdo->exec("CREATE TABLE IF NOT EXISTS job_offers (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL,
        category VARCHAR(255) NULL,
        duration VARCHAR(255) NULL,
        salary VARCHAR(255) NULL,
        description TEXT NOT NULL,
        skills TEXT NULL,
        is_remote BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Job Offers table created\n";

    // Applications table
    $pdo->exec("CREATE TABLE IF NOT EXISTS applications (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        job_id CHAR(36) NOT NULL,
        status VARCHAR(255) DEFAULT 'PENDING',
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (job_id) REFERENCES job_offers(id) ON DELETE CASCADE
    )");
    echo "✅ Applications table created\n";

    // Incubation Programs table
    $pdo->exec("CREATE TABLE IF NOT EXISTS incubation_programs (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        objectives JSON NOT NULL,
        stages JSON NOT NULL,
        duration VARCHAR(255) NULL,
        requirements JSON NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Incubation Programs table created\n";

    // Projects table
    $pdo->exec("CREATE TABLE IF NOT EXISTS projects (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(255) DEFAULT 'IDEATION',
        diagnostic JSON NULL,
        program_id CHAR(36) NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (program_id) REFERENCES incubation_programs(id) ON DELETE SET NULL
    )");
    echo "✅ Projects table created\n";

    // Mentorings table
    $pdo->exec("CREATE TABLE IF NOT EXISTS mentorings (
        id CHAR(36) PRIMARY KEY,
        mentor_id CHAR(36) NOT NULL,
        mentee_id CHAR(36) NOT NULL,
        status VARCHAR(255) DEFAULT 'REQUESTED',
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (mentor_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (mentee_id) REFERENCES users(id) ON DELETE CASCADE
    )");
    echo "✅ Mentorings table created\n";

    // Workshops table
    $pdo->exec("CREATE TABLE IF NOT EXISTS workshops (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(255) NOT NULL,
        duration VARCHAR(255) NULL,
        format VARCHAR(255) NULL,
        resources JSON NULL,
        video_url VARCHAR(255) NULL,
        max_participants INT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Workshops table created\n";

    // Mentors table
    $pdo->exec("CREATE TABLE IF NOT EXISTS mentors (
        id CHAR(36) PRIMARY KEY,
        user_id CHAR(36) UNIQUE NOT NULL,
        expertise JSON NOT NULL,
        bio TEXT NULL,
        availability JSON NULL,
        rating FLOAT DEFAULT 0,
        sessions_count INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Mentors table created\n";

    // Mentorship Sessions table
    $pdo->exec("CREATE TABLE IF NOT EXISTS mentorship_sessions (
        id CHAR(36) PRIMARY KEY,
        mentoring_id CHAR(36) NOT NULL,
        mentor_id CHAR(36) NOT NULL,
        scheduled_at TIMESTAMP NOT NULL,
        duration INT DEFAULT 60,
        status VARCHAR(255) DEFAULT 'SCHEDULED',
        notes TEXT NULL,
        feedback JSON NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (mentoring_id) REFERENCES mentorings(id) ON DELETE CASCADE,
        FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE
    )");
    echo "✅ Mentorship Sessions table created\n";

    // Funding Events table
    $pdo->exec("CREATE TABLE IF NOT EXISTS funding_events (
        id CHAR(36) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        type VARCHAR(255) NOT NULL,
        organizer VARCHAR(255) NULL,
        deadline TIMESTAMP NOT NULL,
        amount VARCHAR(255) NULL,
        requirements JSON NULL,
        application_url VARCHAR(255) NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "✅ Funding Events table created\n";

    // Funding Applications table
    $pdo->exec("CREATE TABLE IF NOT EXISTS funding_applications (
        id CHAR(36) PRIMARY KEY,
        project_id CHAR(36) NOT NULL,
        event_id CHAR(36) NOT NULL,
        status VARCHAR(255) DEFAULT 'SUBMITTED',
        submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        documents JSON NULL,
        notes TEXT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        UNIQUE KEY unique_project_event (project_id, event_id),
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES funding_events(id) ON DELETE CASCADE
    )");
    echo "✅ Funding Applications table created\n";

    // Project Milestones table
    $pdo->exec("CREATE TABLE IF NOT EXISTS project_milestones (
        id CHAR(36) PRIMARY KEY,
        project_id CHAR(36) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT NULL,
        status VARCHAR(255) DEFAULT 'PENDING',
        due_date TIMESTAMP NULL,
        completed_at TIMESTAMP NULL,
        `order` INT NOT NULL,
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )");
    echo "✅ Project Milestones table created\n";

    echo "\n🎉 All tables created successfully!\n";

} catch (PDOException $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
