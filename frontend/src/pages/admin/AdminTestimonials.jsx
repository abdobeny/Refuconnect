import React, { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Skeleton from '../../components/ui/Skeleton';
import { CheckCircle, XCircle, AlertCircle, Star, MessageSquare } from 'lucide-react';
import RejectTestimonialModal from '../../components/admin/RejectTestimonialModal';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pending: 'En attente',
  approved: 'Approuvé',
  rejected: 'Rejeté',
};

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [rejectingId, setRejectingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axiosClient.get('/admin/testimonials');
      setTestimonials(data.data || []);
    } catch (err) {
      setError('Erreur lors du chargement des témoignages.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTestimonials = testimonials.filter(
    (t) => filterStatus === 'all' || t.status === filterStatus
  );

  const handleApprove = async (testimonialId) => {
    setActionLoading(testimonialId);
    try {
      await axiosClient.post(`/admin/testimonials/${testimonialId}/approve`);
      await loadTestimonials();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'approbation.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectSubmit = async (testimonialId, reason) => {
    setActionLoading(testimonialId);
    try {
      await axiosClient.post(`/admin/testimonials/${testimonialId}/reject`, {
        rejection_reason: reason,
      });
      setRejectingId(null);
      await loadTestimonials();
    } catch (err) {
      console.error(err);
      alert('Erreur lors du rejet.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleFeature = async (testimonialId) => {
    setActionLoading(testimonialId);
    try {
      await axiosClient.post(`/admin/testimonials/${testimonialId}/feature`);
      await loadTestimonials();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la mise à jour.');
    } finally {
      setActionLoading(null);
    }
  };

  const stats = [
    { label: 'Total', value: testimonials.length, color: 'bg-blue-100' },
    { label: 'En attente', value: testimonials.filter(t => t.status === 'pending').length, color: 'bg-yellow-100' },
    { label: 'Approuvés', value: testimonials.filter(t => t.status === 'approved').length, color: 'bg-green-100' },
    { label: 'Rejetés', value: testimonials.filter(t => t.status === 'rejected').length, color: 'bg-red-100' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-text-dark">
          Gestion des témoignages
        </h1>
        <p className="mt-2 text-text-light">
          Approuvez ou rejetez les témoignages des utilisateurs avec des commentaires
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-lg ${stat.color} p-4`}>
            <p className="text-sm font-medium text-gray-700">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="approved">Approuvés</option>
          <option value="rejected">Rejetés</option>
        </select>
      </div>

      {/* Testimonials */}
      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="card" className="h-32" />
          ))}
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-text-light">Aucun témoignage trouvé.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="font-semibold text-lg text-gray-900">{testimonial.name}</h3>
                    <span className="text-sm text-gray-600">{testimonial.role}</span>
                    <Badge className={statusColors[testimonial.status]}>
                      {statusLabels[testimonial.status]}
                    </Badge>
                    {testimonial.featured && (
                      <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        En avant
                      </Badge>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="italic text-gray-600 mb-3 border-l-4 border-primary pl-4">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Detail */}
                  {testimonial.detail && (
                    <p className="text-sm text-gray-500 mb-3">{testimonial.detail}</p>
                  )}

                  {/* Rejection reason */}
                  {testimonial.status === 'rejected' && testimonial.rejection_reason && (
                    <div className="rounded-lg bg-red-50 p-3 mt-3 border border-red-200">
                      <p className="text-sm font-medium text-red-900 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Motif du rejet
                      </p>
                      <p className="text-sm text-red-800 mt-1">{testimonial.rejection_reason}</p>
                    </div>
                  )}

                  {/* Meta */}
                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(testimonial.created_at).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 sm:flex-col">
                  {testimonial.status === 'pending' && (
                    <>
                      <Button
                        variant="primary"
                        onClick={() => handleApprove(testimonial.id)}
                        disabled={actionLoading === testimonial.id}
                        className="flex items-center gap-2 justify-center text-sm py-2 px-3"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approuver
                      </Button>
                      <Button
                        variant="white"
                        onClick={() => setRejectingId(testimonial.id)}
                        disabled={actionLoading === testimonial.id}
                        className="flex items-center gap-2 justify-center text-sm py-2 px-3"
                      >
                        <XCircle className="h-4 w-4" />
                        Rejeter
                      </Button>
                    </>
                  )}

                  {testimonial.status === 'approved' && (
                    <Button
                      variant="white"
                      onClick={() => handleFeature(testimonial.id)}
                      disabled={actionLoading === testimonial.id}
                      className="flex items-center gap-2 justify-center text-sm py-2 px-3"
                    >
                      <Star className={`h-4 w-4 ${testimonial.featured ? 'fill-current' : ''}`} />
                      {testimonial.featured ? 'Retirer' : 'Mettre en avant'}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Reject Modal */}
      {rejectingId && (
        <RejectTestimonialModal
          testimonialId={rejectingId}
          onSubmit={(reason) => handleRejectSubmit(rejectingId, reason)}
          onClose={() => setRejectingId(null)}
          isLoading={actionLoading === rejectingId}
        />
      )}
    </div>
  );
};

export default AdminTestimonials;
