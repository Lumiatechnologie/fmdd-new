 import i18n from 'i18next';
 import { initReactI18next } from 'react-i18next';
 
 const resources = {
   fr: {
     translation: {
       // Navigation
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
         joinFmdd: "Rejoindre FMDD"
       },
       // Hero
       hero: {
         badge: "🌱 Ensemble pour un avenir durable",
         title: "Construisez Votre Avenir avec le FMDD",
         subtitle: "Le Forum Marocain pour le Développement Durable accompagne les jeunes marocains vers la réussite : formations certifiantes, insertion professionnelle et entrepreneuriat.",
         cta1: "Découvrir nos formations",
         cta2: "Explorer les opportunités"
       },
       // Common
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
       // Pages
       pages: {
         gallery: {
           title: "Galerie FMDD",
           subtitle: "Découvrez nos moments forts, événements et succès à travers notre galerie photos et vidéos."
         },
         testimonials: {
           title: "Témoignages",
           subtitle: "Découvrez les histoires inspirantes de nos bénéficiaires et partenaires."
         },
         events: {
           title: "Événements",
           subtitle: "Participez à nos événements de formation, networking et développement professionnel.",
           upcoming: "Événements à venir",
           past: "Événements passés"
         },
         blog: {
           title: "Blog & Actualités",
           subtitle: "Restez informé des dernières actualités du FMDD et du développement durable au Maroc.",
           categories: "Catégories",
           recentPosts: "Articles récents"
         }
       },
       // Footer
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
       // Navigation
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
         joinFmdd: "انضم إلى FMDD"
       },
       // Hero
       hero: {
         badge: "🌱 معا من أجل مستقبل مستدام",
         title: "ابنِ مستقبلك مع FMDD",
         subtitle: "المنتدى المغربي للتنمية المستدامة يرافق الشباب المغربي نحو النجاح: تكوينات معتمدة، إدماج مهني وريادة الأعمال.",
         cta1: "اكتشف تكويناتنا",
         cta2: "استكشف الفرص"
       },
       // Common
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
       // Pages
       pages: {
         gallery: {
           title: "معرض FMDD",
           subtitle: "اكتشف لحظاتنا المميزة وفعالياتنا ونجاحاتنا من خلال معرض الصور والفيديو."
         },
         testimonials: {
           title: "شهادات",
           subtitle: "اكتشف القصص الملهمة لمستفيدينا وشركائنا."
         },
         events: {
           title: "الفعاليات",
           subtitle: "شارك في فعالياتنا للتكوين والتواصل والتطوير المهني.",
           upcoming: "الفعاليات القادمة",
           past: "الفعاليات السابقة"
         },
         blog: {
           title: "المدونة والأخبار",
           subtitle: "ابق على اطلاع بآخر أخبار FMDD والتنمية المستدامة في المغرب.",
           categories: "الفئات",
           recentPosts: "المقالات الأخيرة"
         }
       },
       // Footer
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
       // Navigation
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
         joinFmdd: "Join FMDD"
       },
       // Hero
       hero: {
         badge: "🌱 Together for a sustainable future",
         title: "Build Your Future with FMDD",
         subtitle: "The Moroccan Forum for Sustainable Development supports young Moroccans towards success: certified training, professional integration and entrepreneurship.",
         cta1: "Discover our training",
         cta2: "Explore opportunities"
       },
       // Common
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
       // Pages
       pages: {
         gallery: {
           title: "FMDD Gallery",
           subtitle: "Discover our highlights, events and successes through our photo and video gallery."
         },
         testimonials: {
           title: "Testimonials",
           subtitle: "Discover the inspiring stories of our beneficiaries and partners."
         },
         events: {
           title: "Events",
           subtitle: "Participate in our training, networking and professional development events.",
           upcoming: "Upcoming Events",
           past: "Past Events"
         },
         blog: {
           title: "Blog & News",
           subtitle: "Stay informed about the latest FMDD news and sustainable development in Morocco.",
           categories: "Categories",
           recentPosts: "Recent Posts"
         }
       },
       // Footer
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