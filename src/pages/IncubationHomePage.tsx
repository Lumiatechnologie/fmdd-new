import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18n';
import { Rocket, Target, Users, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Program {
  id: string;
  title: string;
  description: string;
  duration: string;
  _count?: { projects: number };
}

export default function IncubationHomePage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [programs, setPrograms] = useState<Program[]>([]);
  const [stats, setStats] = useState({
    projectsIncubated: 47,
    mentors: 12,
    fundingSecured: '15M DH'
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/incubation/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-blue-600 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-medium">{t('incubation.hero.badge')}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t('incubation.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              {t('incubation.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/incubation/diagnostic"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                {t('incubation.hero.startDiagnostic')}
                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <Link
                to="/incubation/programs"
                className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-all shadow-lg"
              >
                {t('incubation.hero.explorePrograms')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Rocket className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.projectsIncubated}+</div>
              <div className="text-gray-600">{t('incubation.stats.projectsIncubated')}</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.mentors}+</div>
              <div className="text-gray-600">{t('incubation.stats.mentors')}</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stats.fundingSecured}</div>
              <div className="text-gray-600">{t('incubation.stats.fundingSecured')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('incubation.programs.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('incubation.programs.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>⏱️ {program.duration}</span>
                      {program._count && (
                        <span>🚀 {program._count.projects} {t('incubation.programs.projects')}</span>
                      )}
                    </div>
                    <Link
                      to={`/incubation/programs/${program.id}`}
                      className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700"
                    >
                      {t('incubation.programs.learnMore')}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">{t('incubation.cta.title')}</h2>
          <p className="text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
            {t('incubation.cta.subtitle')}
          </p>
          <Link
            to="/incubation/diagnostic"
            className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-all transform hover:scale-105 shadow-lg"
          >
            {t('incubation.cta.button')}
            <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
}
