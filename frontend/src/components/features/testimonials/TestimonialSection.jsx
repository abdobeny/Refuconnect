import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import Badge from '../../ui/Badge';
import Skeleton from '../../ui/Skeleton';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const statusConfig = {
  pending: {
    badge: { variant: 'light', label: 'En attente' },
    icon: Clock,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  approved: {
    badge: { variant: 'solid', label: 'Approuvé' },
    icon: CheckCircle2,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  rejected: {
    badge: { variant: 'muted', label: 'Rejeté' },
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
};

const TestimonialCard = ({ testimonial }) => {
  const config = statusConfig[testimonial.status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Card className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.role}</p>
          </div>
          <Badge variant={config.badge.variant}>{config.badge.label}</Badge>
        </div>

        {/* Quote */}
        <blockquote className="italic text-gray-600 border-l-4 border-primary pl-3">
          "{testimonial.quote}"
        </blockquote>

        {/* Detail */}
        {testimonial.detail && (
          <p className="text-sm text-gray-500">{testimonial.detail}</p>
        )}

        {/* Rejection Reason */}
        {testimonial.status === 'rejected' && testimonial.rejection_reason && (
          <div className={`${config.bgColor} rounded-lg p-3 border border-red-200`}>
            <p className="text-sm font-medium text-red-900 flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4" />
              Motif du rejet
            </p>
            <p className="text-sm text-red-800 leading-relaxed">
              {testimonial.rejection_reason}
            </p>
          </div>
        )}

        {/* Meta */}
        <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
          {new Date(testimonial.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </Card>
  );
};

const TestimonialSection = ({ testimonials, loading }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-40" />
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed border-2 border-primary/20">
        <MessageSquare className="mx-auto h-10 w-10 text-primary/40 mb-3" />
        <p className="text-gray-600 mb-4">
          Vous n'avez pas encore partagé de témoignage.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Votre témoignage aide d'autres personnes à comprendre l'impact du refuge.
        </p>
        <Link to="/animaux" className="inline-flex items-center gap-2">
          <Button variant="primary" className="inline-flex items-center gap-2">
            Partager mon histoire
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Card>
    );
  }

  const pendingCount = testimonials.filter(t => t.status === 'pending').length;
  const approvedCount = testimonials.filter(t => t.status === 'approved').length;
  const rejectedCount = testimonials.filter(t => t.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-blue-50 p-3 text-center border border-blue-200">
          <p className="text-2xl font-bold text-blue-900">{testimonials.length}</p>
          <p className="text-xs text-blue-800 mt-1">Témoignages publiés</p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-3 text-center border border-yellow-200">
          <p className="text-2xl font-bold text-yellow-900">{pendingCount}</p>
          <p className="text-xs text-yellow-800 mt-1">En attente de modération</p>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center border border-green-200">
          <p className="text-2xl font-bold text-green-900">{approvedCount}</p>
          <p className="text-xs text-green-800 mt-1">Approuvés et visibles</p>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {rejectedCount > 0 && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          <p className="font-medium mb-2">
            ⚠️ {rejectedCount} témoignage{rejectedCount > 1 ? 's' : ''} rejeté{rejectedCount > 1 ? 's' : ''}
          </p>
          <p>
            Consultez les motifs de rejet ci-dessus et n'hésitez pas à soumettre un nouveau témoignage après modifications.
          </p>
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;
