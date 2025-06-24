"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Review } from "@/db/schema";

export function ReviewsDisplay() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews?limit=6');
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews);
        } else {
          setError('Failed to load reviews');
        }
      } catch {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Unable to load reviews at this time.</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No reviews yet. Be the first to leave one!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              {review.photoUrl ? (
                <img
                  src={review.photoUrl}
                  alt={review.name + " photo"}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary mr-4"
                />
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {review.name}
                  {!review.verified && (
                    <Badge variant="destructive" className="text-xs">Unverified</Badge>
                  )}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {review.role || 'Student'}
                </p>
              </div>
            </div>
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < review.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <Badge variant="secondary" className="text-xs">
                {review.rating}/5
              </Badge>
            </div>
            <p className="text-muted-foreground">
              &ldquo;{review.review}&rdquo;
            </p>
            {review.subject && (
              <div className="mt-3">
                <Badge variant="outline" className="text-xs">
                  {review.subject}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 