import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, MapPin, DollarSign, Users, ArrowRight, Filter } from 'lucide-react';
import axios from 'axios';

interface FundingEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  organizer: string;
  deadline: string;
  amount: string;
  requirements: string;
  applicationUrl: string;
}

export default function FundingEventsPage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [events, setEvents] = useState<FundingEvent[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming'>('upcoming');
  const [typeFilter, setTypeFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [filter, typeFilter]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      let url = 'http://localhost:8000/api/funding/events';
      const params = new URLSearchParams();
      if (filter === 'upcoming') params.append('upcoming', 'true');
      if (typeFilter) params.append('type', typeFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await axios.get(url);
      setEvents(response.data.map((e: any) => ({
        ...e,
        requirements: e.requirements ? JSON.parse(e.requirements) : []
      })));
    } catch (error) {
      console.error('Failed to fetch funding events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'COMPETITION':
        return 'bg-purple-100 text-purple-700';
      case 'GRANT':
        return 'bg-blue-100 text-blue-700';
      case 'INVESTMENT':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'COMPETITION':
        return '🏆';
      case 'GRANT':
        return '💰';
      case 'INVESTMENT':
        return '📈';
      default:
        return '💼';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const daysLeft = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return { date: date.toLocaleDateString('fr-FR'), daysLeft };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('incubation.funding.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('incubation.funding.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 max-w-4xl mx-auto">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'upcoming'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('incubation.funding.upcoming')}
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('incubation.funding.all')}
            </button>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">{t('incubation.funding.allTypes')}</option>
            <option value="COMPETITION">{t('incubation.funding.competition')}</option>
            <option value="GRANT">{t('incubation.funding.grant')}</option>
            <option value="INVESTMENT">{t('incubation.funding.investment')}</option>
          </select>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {events.map((event) => {
              const { date, daysLeft } = formatDeadline(event.deadline);
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
                >
                  {/* Type Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(event.type)}`}>
                      {getTypeIcon(event.type)} {event.type}
                    </span>
                    {daysLeft > 0 && daysLeft <= 30 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                        ⏰ {daysLeft} {t('incubation.funding.daysLeft')}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{event.organizer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        {t('incubation.funding.deadline')}: {date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-semibold text-emerald-600">{event.amount}</span>
                    </div>
                  </div>

                  {/* Requirements */}
                  {event.requirements && event.requirements.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        {t('incubation.funding.requirements')}:
                      </p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {event.requirements.slice(0, 2).map((req: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-600">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <a
                    href={event.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                  >
                    {t('incubation.funding.apply')}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>
                </div>
              );
            })}
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('incubation.funding.noEvents')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
