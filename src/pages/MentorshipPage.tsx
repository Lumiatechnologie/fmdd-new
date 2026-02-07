import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Calendar, Clock, Filter, ArrowRight } from 'lucide-react';
import axios from 'axios';

interface Mentor {
  id: string;
  userId: string;
  expertise: string;
  bio: string;
  rating: number;
  sessionsCount: number;
  availability: string;
}

export default function MentorshipPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMentors();
  }, [selectedExpertise]);

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const url = selectedExpertise
        ? `http://localhost:8000/api/mentorship/mentors?expertise=${selectedExpertise}`
        : 'http://localhost:8000/api/mentorship/mentors';
      const response = await axios.get(url);
      setMentors(response.data.map((m: any) => ({
        ...m,
        expertise: JSON.parse(m.expertise),
        availability: m.availability ? JSON.parse(m.availability) : null
      })));
    } catch (error) {
      console.error('Failed to fetch mentors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSession = async (mentorId: string) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await axios.post(
        'http://localhost:8000/api/mentorship/request',
        { mentorId: user.id, menteeId: user.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert(t('incubation.mentorship.requestSent'));
    } catch (error) {
      console.error('Failed to request mentorship:', error);
      alert(t('incubation.mentorship.requestFailed'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('incubation.mentorship.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('incubation.mentorship.subtitle')}
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex items-center gap-4 max-w-4xl mx-auto">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">{t('incubation.mentorship.allExpertise')}</option>
            <option value="Cleantech">Cleantech</option>
            <option value="Fundraising">Fundraising</option>
            <option value="Marketing">Marketing</option>
            <option value="ESG">ESG</option>
          </select>
        </div>

        {/* Mentors Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
              >
                {/* Avatar & Rating */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {mentor.userId.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{mentor.rating.toFixed(1)}</span>
                      <span className="text-sm text-gray-500">
                        ({mentor.sessionsCount} {t('incubation.mentorship.sessions')})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mb-4 line-clamp-3">{mentor.bio}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.slice(0, 3).map((exp: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
                    >
                      {exp}
                    </span>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      +{mentor.expertise.length - 3}
                    </span>
                  )}
                </div>

                {/* Availability */}
                {mentor.availability && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>{mentor.availability.days?.join(', ')}</span>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleRequestSession(mentor.id)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  {t('incubation.mentorship.requestSession')}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {mentors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('incubation.mentorship.noMentors')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
