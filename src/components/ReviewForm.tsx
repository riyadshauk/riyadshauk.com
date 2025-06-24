"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ReviewForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    subject: "",
    rating: "",
    review: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => form.append(key, value));
      if (photo) form.append("photo", photo);

      const response = await fetch('/api/submit-review', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          role: "",
          subject: "",
          rating: "",
          review: "",
        });
      } else {
        const errorData = await response.json();
        console.error('Review submission failed:', errorData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a Review</CardTitle>
        <p className="text-sm text-muted-foreground">
          Share your experience! Your review will be sent to me for approval before being displayed on the website.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="review-name">Name *</Label>
              <Input
                id="review-name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="review-email">Email *</Label>
              <Input
                id="review-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="review-role">Your Role</Label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="software-engineer">Software Engineer</SelectItem>
                  <SelectItem value="cs-student">CS Student</SelectItem>
                  <SelectItem value="bootcamp-graduate">Bootcamp Graduate</SelectItem>
                  <SelectItem value="career-changer">Career Changer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-subject">Subject Tutored</Label>
              <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ds-algo">Data Structures & Algorithms</SelectItem>
                  <SelectItem value="leetcode">LeetCode / HackerRank / CodeSignal</SelectItem>
                  <SelectItem value="interview-prep">SWE Interview Prep</SelectItem>
                  <SelectItem value="fundamentals">Computer Science & Programming Fundamentals</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript / Node.js / TypeScript</SelectItem>
                  <SelectItem value="golang">Golang</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-rating">Rating *</Label>
            <Select value={formData.rating} onValueChange={(value) => handleInputChange("rating", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent (5/5)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ Very Good (4/5)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ Good (3/5)</SelectItem>
                <SelectItem value="2">⭐⭐ Fair (2/5)</SelectItem>
                <SelectItem value="1">⭐ Poor (1/5)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-text">Your Review *</Label>
            <Textarea
              id="review-text"
              value={formData.review}
              onChange={(e) => handleInputChange("review", e.target.value)}
              required
              rows={4}
              placeholder="Share your experience with Riyad&#39;s tutoring. What did you learn? How did it help you? What would you recommend to others?"
              className="min-h-[120px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-photo">Photo (optional)</Label>
            <Input
              id="review-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Photo preview"
                className="w-20 h-20 rounded-full object-cover border mt-2"
              />
            )}
          </div>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">
                Thank you for your review! It has been saved and will be displayed on the website. I may contact you if I have any questions.
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">
                There was an error submitting your review. Please try again or contact me directly at riyad.shauk@gmail.com
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 