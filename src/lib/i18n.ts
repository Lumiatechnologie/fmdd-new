import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      nav: {
        home: "Accueil",
        solutions: "Nos Solutions",
        academy: "FMDD Academy",
        academyDesc: "Formations certifiantes au Maroc",
        insertion: "Insertion Pro",
        insertionDesc: "Emploi et recrutement",
        entrepreneurship: "Entrepreneuriat",
        entrepreneurshipDesc: "Création d'entreprise",
        about: "Qui sommes-nous",
        partners: "Partenaires",
        contact: "Nous contacter",
        gallery: "Galerie",
        testimonials: "Témoignages",
        events: "Événements",
        blog: "Blog & Actualités",
        login: "Connexion",
        register: "S'inscrire",
        logout: "Déconnexion",
        joinFmdd: "Rejoindre FMDD"
      },
      hero: {
        badge: "Forum Marocain pour le Développement Durable",
        badgeShort: "🌱 Ensemble pour un avenir durable",
        title_part1: "Ensemble pour un",
        title_part2: "Maroc durable",
        title_part3: "et prospère",
        description: "Le FMDD accompagne les jeunes marocains vers l'excellence : formations certifiantes, insertion professionnelle et soutien à l'entrepreneuriat pour bâtir l'avenir du Maroc.",
        cta1: "Rejoindre le FMDD",
        cta2: "Découvrir le FMDD",
        stats: {
          youth: "Jeunes accompagnés",
          training: "Formations certifiantes",
          rate: "Taux d'insertion"
        },
        floating: {
          academy_title: "FMDD Academy",
          academy_desc: "+50 nouveaux cours",
          insertion_title: "Insertion Pro",
          insertion_desc: "87% taux de placement",
          community_title: "Communauté",
          community_desc: "15K+ membres actifs"
        }
      },
      home: {
        solutions: {
          badge: "Nos Solutions",
          title1: "Trois piliers pour votre",
          title2: "réussite",
          description: "Le Forum Marocain pour le Développement Durable vous offre trois voies vers la réussite professionnelle : formation, emploi et entrepreneuriat.",
          academy: {
            subtitle: "Formation professionnelle",
            description: "Développez vos compétences avec nos formations certifiantes en développement durable, compétences numériques et soft skills.",
            cta: "Voir les formations",
            features: [
              "Certifications reconnues par l'État",
              "Formateurs experts marocains",
              "Apprentissage en ligne flexible",
              "Attestations et diplômes officiels"
            ]
          },
          insertion: {
            subtitle: "Emploi et carrière",
            description: "Accédez aux meilleures opportunités d'emploi au Maroc. Notre plateforme met en relation les jeunes talents avec les entreprises.",
            cta: "Trouver un emploi",
            features: [
              "Matching intelligent candidat-emploi",
              "Offres dans toutes les régions",
              "Accompagnement personnalisé",
              "Partenariat avec 150+ entreprises"
            ]
          },
          entrepreneurship: {
            subtitle: "Création d'entreprise",
            description: "Concrétisez vos projets entrepreneuriaux au Maroc. Bénéficiez d'un accompagnement complet : incubation, mentorat, financement.",
            cta: "Lancer mon projet",
            features: [
              "Programme d'incubation complet",
              "Accès au financement",
              "Mentorat par des entrepreneurs",
              "Networking et événements"
            ]
          }
        },
        mission: {
          badge: "Notre Mission",
          title_part1: "Construire aujourd'hui",
          title_part2: "les solutions de demain",
          description: "Le FMDD s'engage à transformer le potentiel de la jeunesse marocaine en succès concret à travers sept piliers d'excellence.",
          pillars: {
            orientation: "Orientation",
            formation: "Formation",
            accompagnement: "Accompagnement",
            financement: "Financement",
            workshop: "Workshop",
            coaching: "Coaching",
            durability: "Durabilité"
          }
        },
        stats: {
          youth: { label: "Jeunes accompagnés", desc: "Bénéficiaires de nos programmes" },
          insertion: { label: "Taux d'insertion", desc: "De nos diplômés en emploi" },
          formations: { label: "Formations certifiantes", desc: "Disponibles sur notre plateforme" },
          partners: { label: "Entreprises partenaires", desc: "Qui recrutent nos talents" }
        },
        testimonials: {
          badge: "Témoignages",
          title1: "Ils ont transformé leur",
          title2: "parcours",
          description: "Découvrez les histoires inspirantes de jeunes qui ont réussi grâce à l'accompagnement du FMDD.",
          items: {
            1: { content: "Grâce à FMDD Academy, j'ai pu me former au développement web et décrocher mon premier emploi en seulement 6 mois.", role: "Développeuse Web" },
            2: { content: "Le programme 'Lancer un Projet' m'a permis de transformer mon idée en startup. Aujourd'hui, nous employons 12 personnes.", role: "Entrepreneur" },
            3: { content: "Insertion Pro m'a mise en relation avec des recruteurs qui cherchaient exactement mon profil. Très efficace !", role: "Chargée de Marketing" }
          }
        },
        partners: {
          badge: "Nos Partenaires"
        },
        cta: {
          title: "Prêt à transformer votre avenir ?",
          description: "Rejoignez les milliers de jeunes Marocains qui construisent leur réussite avec le FMDD. Inscription gratuite.",
          button1: "Créer mon compte gratuit",
          button2: "En savoir plus",
          features: "✓ Gratuit • ✓ Sans engagement • ✓ Accès immédiat"
        }
      },
      about: {
        badge: "Qui sommes-nous",
        title: "Engagés pour l'avenir de la jeunesse marocaine",
        description: "Le Forum Marocain pour le Développement Durable (FMDD) est une organisation dédiée à l'autonomisation des jeunes marocains à travers l'éducation, l'emploi et l'entrepreneuriat.",
        mission: {
          title: "Notre Mission",
          content: "Accompagner chaque jeune vers une réussite durable en lui offrant les outils, les compétences et les opportunités nécessaires pour s'épanouir dans le monde professionnel."
        },
        vision: {
          title: "Notre Vision",
          content: "Devenir le catalyseur de référence pour le développement des talents au Maroc, en bâtissant une société prospère et durable."
        },
        values: {
          title: "Nos Valeurs",
          excellence: "Excellence",
          integrity: "Intégrité",
          innovation: "Innovation",
          solidarity: "Solidarité"
        },
        stats: {
          founded: "Fondée en",
          members: "Membres actifs",
          projects: "Projets réalisés",
          partners: "Partenaires"
        }
      },
      contact: {
        badge: "Contactez-nous",
        title: "Une question ? Un projet ?",
        description: "Notre équipe est à votre écoute pour vous accompagner. N'hésitez pas à nous envoyer un message.",
        form: {
          name: "Nom complet",
          email: "Adresse e-mail",
          subject: "Sujet",
          message: "Votre message",
          submit: "Envoyer le message",
          sending: "Envoi en cours...",
          success: "Message envoyé avec succès !",
          error: "Une erreur est survenue lors de l'envoi."
        },
        info: {
          address: "Adresse",
          address_value: "Casablanca, Maroc",
          phone: "Téléphone",
          phone_value: "+212 645 466 188",
          email: "E-mail",
          email_value: "contact@fmdd.ma",
          working_hours: "Heures de travail",
          working_hours_value: "Lun - Ven: 09:00 - 18:00"
        }
      },
      auth: {
        loginTitle: "Bon retour",
        loginDescription: "Connectez-vous pour accéder à votre espace",
        loginAction: "Se connecter",
        registerAction: "Créer un compte",
        registerTitle: "Rejoindre FMDD",
        registerDescription: "Commencez votre parcours dès aujourd'hui",
        registerActionNow: "Rejoindre",
        noAccount: "Pas encore de compte ?",
        alreadyHaveAccount: "Déjà un compte ?",
        roleStudent: "Apprenant",
        roleMentor: "Mentor",
        loginSuccess: "Connexion réussie !",
        registerSuccess: "Compte créé avec succès !",
        loggingIn: "Connexion...",
        creatingAccount: "Création...",
        passwordPlaceholder: "Choisissez un mot de passe",
        confirmPasswordPlaceholder: "Confirmez le mot de passe",
        orContinueWith: "Ou continuer avec"
      },
      common: {
        learnMore: "En savoir plus",
        viewAll: "Voir tout",
        readMore: "Lire la suite",
        apply: "Postuler",
        register: "S'inscrire",
        search: "Rechercher",
        filter: "Filtrer",
        share: "Partager",
        download: "Télécharger"
      },
      pages: {
        dashboard: {
          title: "Mon Tableau de Bord",
          welcome: "Bienvenue sur votre espace personnel",
          stats: "Statistiques",
          activeCourses: "Formations en cours",
          appliedJobs: "Candidatures envoyées",
          mentoring: "Sessions de mentorat",
          projects: "Projets d'incubation"
        }
      },
      footer: {
        description: "Le Forum Marocain pour le Développement Durable œuvre pour l'épanouissement des jeunes marocains à travers la formation, l'emploi et l'entrepreneuriat.",
        quickLinks: "Liens Rapides",
        solutions: "Nos Solutions",
        contact: "Contact",
        newsletter: "Newsletter",
        newsletterText: "Inscrivez-vous pour recevoir nos actualités",
        subscribe: "S'abonner",
        rights: "Tous droits réservés"
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        solutions: "حلولنا",
        academy: "أكاديمية FMDD",
        academyDesc: "تكوينات معتمدة في المغرب",
        insertion: "الإدماج المهني",
        insertionDesc: "التوظيف والتشغيل",
        entrepreneurship: "ريادة الأعمال",
        entrepreneurshipDesc: "إنشاء المقاولات",
        about: "من نحن",
        partners: "شركاؤنا",
        contact: "اتصل بنا",
        gallery: "معرض الصور",
        testimonials: "شهادات",
        events: "الفعاليات",
        blog: "المدونة والأخبار",
        login: "تسجيل الدخول",
        register: "التسجيل",
        logout: "تسجيل الخروج",
        joinFmdd: "انضم إلى FMDD"
      },
      hero: {
        badge: "المنتدى المغربي للتنمية المستدامة",
        badgeShort: "🌱 معا من أجل مستقبل مستدام",
        title_part1: "معا من أجل",
        title_part2: "مغرب مستدام",
        title_part3: "ومزدهر",
        description: "يرافق المنتدى المغربي للتنمية المستدامة الشباب المغربي نحو التميز: تكوينات معتمدة، إدماج مهني ودعم لريادة الأعمال لبناء مستقبل المغرب.",
        cta1: "انضم إلى المنتدى",
        cta2: "اكتشف المنتدى",
        stats: {
          youth: "شباب مواكبون",
          training: "تكوينات معتمدة",
          rate: "معدل الإدماج"
        },
        floating: {
          academy_title: "أكاديمية FMDD",
          academy_desc: "+50 دورة جديدة",
          insertion_title: "الإدماج المهني",
          insertion_desc: "87% معدل التوظيف",
          community_title: "المجتمع",
          community_desc: "15 ألف+ عضو نشط"
        }
      },
      home: {
        solutions: {
          badge: "حلولنا",
          title1: "ثلاث ركائز من أجل",
          title2: "نجاحكم",
          description: "يوفر لكم المنتدى المغربي للتنمية المستدامة ثلاثة مسارات للنجاح المهني: التكوين، التشغيل وريادة الأعمال.",
          academy: {
            subtitle: "تكوين مهني",
            description: "طوّر مهاراتك من خلال دوراتنا التدريبية المعتمدة في التنمية المستدامة والمهارات الرقمية والمهارات اللينة.",
            cta: "عرض التكوينات",
            features: [
              "شهادات معترف بها من طرف الدولة",
              "مدربون خبراء مغاربة",
              "تعلم مرن عبر الإنترنت",
              "شهادات ودبلومات رسمية"
            ]
          },
          insertion: {
            subtitle: "التوظيف والمهنة",
            description: "الوصول إلى أفضل فرص العمل في المغرب. منصتنا تربط المواهب الشابة بالشركات التي توظف.",
            cta: "البحث عن عمل",
            features: [
              "مطابقة ذكية بين المرشح والوظيفة",
              "عروض في جميع جهات المغرب",
              "مواكبة شخصية",
              "شراكة مع أكثر من 150 شركة"
            ]
          },
          entrepreneurship: {
            subtitle: "إنشاء المقاولات",
            description: "جسدوا مشاريعكم المقاولاتية في المغرب. استفيدوا من مواكبة شاملة: الاحتضان، التوجيه والتمويل.",
            cta: "إطلاق مشروعي",
            features: [
              "برنامج احتضان كامل",
              "الوصول إلى التمويل",
              "توجيه من قبل مقاولين",
              "شبكات وأحداث"
            ]
          }
        },
        mission: {
          badge: "مهمتنا",
          title_part1: "نبني اليوم",
          title_part2: "حلول الغد",
          description: "يلتزم المنتدى المغربي للتنمية المستدامة بتحويل مهارات الشباب المغربي إلى نجاح ملموس من خلال سبع ركائز للتميز.",
          pillars: {
            orientation: "التوجيه",
            formation: "التكوين",
            accompagnement: "المواكبة",
            financement: "التمويل",
            workshop: "ورشات عمل",
            coaching: "التأطير",
            durability: "الاستدامة"
          }
        },
        stats: {
          youth: { label: "شباب مواكبون", desc: "المستفيدون من برامجنا" },
          insertion: { label: "معدل الإدماج", desc: "خريجونا في العمل" },
          formations: { label: "تكوينات معتمدة", desc: "متوفرة على منصتنا" },
          partners: { label: "الشركات الشريكة", desc: "التي توظف مواهبنا" }
        },
        testimonials: {
          badge: "شهادات",
          title1: "لقد غيروا",
          title2: "مسارهم",
          description: "اكتشف القصص الملهمة للشباب الذين نجحوا بفضل مواكبة المنتدى المغربي للتنمية المستدامة.",
          items: {
            1: { content: "بفضل أكاديمية FMDD، تمكنت من التدريب على تطوير الويب والحصول على وظيفتي الأولى في 6 أشهر فقط.", role: "مطورة ويب" },
            2: { content: "مكنني برنامج 'إطلاق مشروع' من تحويل فكرتي إلى شركة ناشئة. اليوم، نوظف 12 شخصاً.", role: "مقاول" },
            3: { content: "وضعتني خدمة الإدماج المهني في اتصال مع شركات التوظيف التي كانت تبحث عن ملفي الشخصي. فعال جداً!", role: "مسؤولة تسويق" }
          }
        },
        partners: {
          badge: "شركاؤنا"
        },
        cta: {
          title: "هل أنت مستعد لتغيير مستقبلك؟",
          description: "انضم إلى آلاف الشباب المغاربة الذين يبنون نجاحهم مع المنتدى المغربي للتنمية المستدامة. التسجيل مجاني.",
          button1: "أنشئ حسابي المجاني",
          button2: "اعرف المزيد",
          features: "✓ مجاني • ✓ بدون التزام • ✓ وصول فوري"
        }
      },
      about: {
        badge: "من نحن",
        title: "ملتزمون بمستقبل الشباب المغربي",
        description: "المنتدى المغربي للتنمية المستدامة (FMDD) هو منظمة مكرسة لتمكين الشباب المغربي من خلال التعليم والتشغيل وريادة الأعمال.",
        mission: {
          title: "مهمتنا",
          content: "مواكبة كل شاب نحو نجاح مستدام من خلال تزويده بالأدوات والمهارات والفرص اللازمة للازدهار في العالم المهني."
        },
        vision: {
          title: "رؤيتنا",
          content: "أن نصبح المحفز المرجعي لتطوير المواهب في المغرب، من خلال بناء مجتمع مزدهر ومستدام."
        },
        values: {
          title: "قيمنا",
          excellence: "التميز",
          integrity: "النزاهة",
          innovation: "الابتكار",
          solidarity: "التضامن"
        },
        stats: {
          founded: "تأسست في",
          members: "عضو نشط",
          projects: "مشروع منجز",
          partners: "شريك"
        }
      },
      contact: {
        badge: "اتصل بنا",
        title: "لديك سؤال؟ أو مشروع؟",
        description: "فريقنا في خدمتك لمواكبتك. لا تتردد في إرسال رسالة لنا.",
        form: {
          name: "الاسم الكامل",
          email: "البريد الإلكتروني",
          subject: "الموضوع",
          message: "رسالتك",
          submit: "إرسال الرسالة",
          sending: "جاري الإرسال...",
          success: "تم إرسال الرسالة بنجاح!",
          error: "حدث خطأ أثناء الإرسال."
        },
        info: {
          address: "العنوان",
          address_value: "الدار البيضاء، المغرب",
          phone: "الهاتف",
          phone_value: "+212 645 466 188",
          email: "البريد الإلكتروني",
          email_value: "contact@fmdd.ma",
          working_hours: "ساعات العمل",
          working_hours_value: "الاثنين - الجمعة: 09:00 - 18:00"
        }
      },
      auth: {
        loginTitle: "مرحباً بكم من جديد",
        loginDescription: "قم بتسجيل الدخول للوصول إلى حسابك",
        loginAction: "تسجيل الدخول",
        registerAction: "إنشاء حساب",
        registerTitle: "انضم إلى FMDD",
        registerDescription: "ابدأ رحلتك معنا اليوم",
        registerActionNow: "انضم الآن",
        noAccount: "ليس لديك حساب؟",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        roleStudent: "متعلم",
        roleMentor: "موجه",
        loginSuccess: "تم تسجيل الدخول بنجاح!",
        registerSuccess: "تم إنشاء الحساب بنجاح!",
        loggingIn: "جاري تسجيل الدخول...",
        creatingAccount: "جاري إنشاء الحساب...",
        passwordPlaceholder: "اختر كلمة مرور",
        confirmPasswordPlaceholder: "تأكيد كلمة المرور",
        orContinueWith: "أو المتابعة باستخدام"
      },
      common: {
        learnMore: "اعرف المزيد",
        viewAll: "عرض الكل",
        readMore: "اقرأ المزيد",
        apply: "تقدم بطلب",
        register: "سجّل",
        search: "بحث",
        filter: "تصفية",
        share: "مشاركة",
        download: "تحميل"
      },
      pages: {
        dashboard: {
          title: "لوحة التحكم",
          welcome: "مرحباً بكم في مساحتكم الخاصة",
          stats: "إحصائيات",
          activeCourses: "تكوينات جارية",
          appliedJobs: "طلبات مقدمة",
          mentoring: "جلسات التوجيه",
          projects: "مشاريع الاحتضان"
        }
      },
      footer: {
        description: "المنتدى المغربي للتنمية المستدامة يعمل من أجل ازدهار الشباب المغربي من خلال التكوين والتشغيل وريادة الأعمال.",
        quickLinks: "روابط سريعة",
        solutions: "حلولنا",
        contact: "اتصل بنا",
        newsletter: "النشرة الإخبارية",
        newsletterText: "اشترك لتلقي أخبارنا",
        subscribe: "اشترك",
        rights: "جميع الحقوق محفوظة"
      }
    }
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        solutions: "Our Solutions",
        academy: "FMDD Academy",
        academyDesc: "Certified training in Morocco",
        insertion: "Career Services",
        insertionDesc: "Employment and recruitment",
        entrepreneurship: "Entrepreneurship",
        entrepreneurshipDesc: "Business creation",
        about: "About Us",
        partners: "Partners",
        contact: "Contact Us",
        gallery: "Gallery",
        testimonials: "Testimonials",
        events: "Events",
        blog: "Blog & News",
        login: "Login",
        register: "Sign Up",
        logout: "Logout",
        joinFmdd: "Join FMDD"
      },
      hero: {
        badge: "Moroccan Forum for Sustainable Development",
        badgeShort: "🌱 Together for a sustainable future",
        title_part1: "Together for a",
        title_part2: "sustainable Morocco",
        title_part3: "and prosperous",
        description: "FMDD supports young Moroccans towards excellence: certified training, professional integration, and entrepreneurship support to build the future of Morocco.",
        cta1: "Join FMDD",
        cta2: "Discover FMDD",
        stats: {
          youth: "Young people supported",
          training: "Certified training",
          rate: "Placement rate"
        },
        floating: {
          academy_title: "FMDD Academy",
          academy_desc: "+50 new courses",
          insertion_title: "Career Services",
          insertion_desc: "87% placement rate",
          community_title: "Community",
          community_desc: "15K+ active members"
        }
      },
      home: {
        solutions: {
          badge: "Our Solutions",
          title1: "Three pillars for your",
          title2: "success",
          description: "The Moroccan Forum for Sustainable Development offers you three paths to professional success: training, employment, and entrepreneurship.",
          academy: {
            subtitle: "Professional training",
            description: "Develop your skills with our certified training in sustainable development, digital skills, and soft skills.",
            cta: "See training",
            features: [
              "State-recognized certifications",
              "Expert Moroccan trainers",
              "Flexible online learning",
              "Official certificates and diplomas"
            ]
          },
          insertion: {
            subtitle: "Employment and career",
            description: "Access the best job opportunities in Morocco. Our platform connects young talent with recruiting companies.",
            cta: "Find a job",
            features: [
              "Smart candidate-job matching",
              "Offers in all regions",
              "Personalized support",
              "Partnership with 150+ companies"
            ]
          },
          entrepreneurship: {
            subtitle: "Business creation",
            description: "Realize your entrepreneurial projects in Morocco. Benefit from comprehensive support: incubation, mentoring, and financing.",
            cta: "Start my project",
            features: [
              "Full incubation program",
              "Access to financing",
              "Mentoring by entrepreneurs",
              "Networking and events"
            ]
          }
        },
        mission: {
          badge: "Our Mission",
          title_part1: "Building today",
          title_part2: "the solutions of tomorrow",
          description: "FMDD is committed to transforming the potential of Moroccan youth into concrete success through seven pillars of excellence.",
          pillars: {
            orientation: "Orientation",
            formation: "Formation",
            accompagnement: "Accompagnement",
            financement: "Financement",
            workshop: "Workshop",
            coaching: "Coaching",
            durability: "Durability"
          }
        },
        stats: {
          youth: { label: "Young people supported", desc: "Beneficiaries of our programs" },
          insertion: { label: "Placement rate", desc: "Of our graduates in employment" },
          formations: { label: "Certified training", desc: "Available on our platform" },
          partners: { label: "Partner companies", desc: "That recruit our talent" }
        },
        testimonials: {
          badge: "Testimonials",
          title1: "They transformed their",
          title2: "journey",
          description: "Discover the inspiring stories of young people who succeeded thanks to FMDD support.",
          items: {
            1: { content: "Thanks to FMDD Academy, I was able to train in web development and land my first job in just 6 months.", role: "Web Developer" },
            2: { content: "The 'Launch a Project' program allowed me to turn my idea into a startup. Today, we employ 12 people.", role: "Entrepreneur" },
            3: { content: "Career Services put me in touch with recruiters who were looking exactly for my profile. Very effective!", role: "Marketing Manager" }
          }
        },
        partners: {
          badge: "Our Partners"
        },
        cta: {
          title: "Ready to transform your future ?",
          description: "Join the thousands of young Moroccans building their success with FMDD. Free registration.",
          button1: "Create my free account",
          button2: "Learn more",
          features: "✓ Free • ✓ No commitment • ✓ Immediate access"
        }
      },
      about: {
        badge: "About Us",
        title: "Committed to the future of Moroccan youth",
        description: "The Moroccan Forum for Sustainable Development (FMDD) is an organization dedicated to empowering Moroccan youth through education, employment, and entrepreneurship.",
        mission: {
          title: "Our Mission",
          content: "Supporting every young person towards sustainable success by offering them the tools, skills, and opportunities needed to flourish in the professional world."
        },
        vision: {
          title: "Our Vision",
          content: "To become the reference catalyst for talent development in Morocco, by building a prosperous and sustainable society."
        },
        values: {
          title: "Our Values",
          excellence: "Excellence",
          integrity: "Integrity",
          innovation: "Innovation",
          solidarity: "Solidarity"
        },
        stats: {
          founded: "Founded in",
          members: "Active members",
          projects: "Projects completed",
          partners: "Partners"
        }
      },
      contact: {
        badge: "Contact Us",
        title: "A question? A project?",
        description: "Our team is here to support you. Feel free to send us a message.",
        form: {
          name: "Full Name",
          email: "Email Address",
          subject: "Subject",
          message: "Your Message",
          submit: "Send Message",
          sending: "Sending...",
          success: "Message sent successfully!",
          error: "An error occurred during sending."
        },
        info: {
          address: "Address",
          address_value: "Casablanca, Morocco",
          phone: "Phone",
          phone_value: "+212 645 466 188",
          email: "Email",
          email_value: "contact@fmdd.ma",
          working_hours: "Working Hours",
          working_hours_value: "Mon - Fri: 09:00 - 18:00"
        }
      },
      auth: {
        loginTitle: "Welcome Back",
        loginDescription: "Enter your credentials to access your account",
        loginAction: "Sign In",
        registerAction: "Create account",
        registerTitle: "Join FMDD",
        registerDescription: "Start your journey today",
        registerActionNow: "Join Now",
        noAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        roleStudent: "Learner",
        roleMentor: "Mentor",
        loginSuccess: "Successfully logged in!",
        registerSuccess: "Account created successfully!",
        loggingIn: "Logging in...",
        creatingAccount: "Creating...",
        passwordPlaceholder: "Create a password",
        confirmPasswordPlaceholder: "Confirm password",
        orContinueWith: "Or continue with"
      },
      common: {
        learnMore: "Learn more",
        viewAll: "View all",
        readMore: "Read more",
        apply: "Apply",
        register: "Register",
        search: "Search",
        filter: "Filter",
        share: "Share",
        download: "Download"
      },
      pages: {
        dashboard: {
          title: "My Dashboard",
          welcome: "Welcome to your personal space",
          stats: "Statistics",
          activeCourses: "Active courses",
          appliedJobs: "Job applications",
          mentoring: "Mentoring sessions",
          projects: "Incubation projects"
        }
      },
      footer: {
        description: "The Moroccan Forum for Sustainable Development works for the flourishing of young Moroccans through training, employment and entrepreneurship.",
        quickLinks: "Quick Links",
        solutions: "Our Solutions",
        contact: "Contact",
        newsletter: "Newsletter",
        newsletterText: "Subscribe to receive our news",
        subscribe: "Subscribe",
        rights: "All rights reserved"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;