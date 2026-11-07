
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquareText,
  Star,
  Pencil,
  Trash2,
  ShoppingBag,
  Plus,
  X,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Review = {
  id: string;
  product: string;
  image: string;
  orderId: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  status: "PUBLISHED" | "PENDING";
  verified: boolean;
  helpful: number;
};

type PendingProduct = {
  id: string;
  name: string;
  image: string;
  orderId: string;
};

const initialReviews: Review[] = [
  {
    id: "1",
    product: "Wireless Bluetooth Headphones",
    image: "/products/headphone.jpg",
    orderId: "MFH-1024",
    rating: 5,
    title: "Excellent sound quality!",
    comment:
      "The sound quality is amazing. Battery backup is excellent and the design is very comfortable. Highly recommended!",
    date: "Oct 28, 2026",
    status: "PUBLISHED",
    verified: true,
    helpful: 24,
  },
  {
    id: "2",
    product: "Smart Watch Pro",
    image: "/products/watch.jpg",
    orderId: "MFH-1021",
    rating: 4,
    title: "Great product for the price",
    comment:
      "Very good smartwatch with useful features. The display is clear and battery performance is good.",
    date: "Oct 25, 2026",
    status: "PUBLISHED",
    verified: true,
    helpful: 12,
  },
  {
    id: "3",
    product: "Premium Running Sneakers",
    image: "/products/shoes.jpg",
    orderId: "MFH-1018",
    rating: 5,
    title: "Very comfortable",
    comment: "Good quality and comfortable for everyday walking.",
    date: "Oct 20, 2026",
    status: "PENDING",
    verified: true,
    helpful: 0,
  },
];

const initialPending: PendingProduct[] = [
  {
    id: "p1",
    name: "4K Mini Action Camera",
    image: "/products/camera.jpg",
    orderId: "MFH-1029",
  },
  {
    id: "p2",
    name: "Foldable Mini Drone",
    image: "/products/drone.jpg",
    orderId: "MFH-1030",
  },
];

const StarRating = ({
  rating,
  interactive = false,
  onChange,
}: {
  rating: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={!interactive}
        onClick={() => onChange?.(star)}
        aria-label={`Rate ${star} stars`}
        className={interactive ? "cursor-pointer" : "cursor-default"}
      >
        <Star
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      </button>
    ))}
  </div>
);

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [pendingProducts, setPendingProducts] =
    useState(initialPending);

  const [filter, setFilter] = useState("ALL");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<PendingProduct | null>(null);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");

  const publishedReviews = reviews.filter(
    (review) => review.status === "PUBLISHED"
  );

  const averageRating = publishedReviews.length
    ? (
        publishedReviews.reduce((sum, review) => sum + review.rating, 0) /
        publishedReviews.length
      ).toFixed(1)
    : "0.0";

  const filteredReviews = useMemo(() => {
    if (filter === "ALL") return reviews;
    return reviews.filter((review) => review.status === filter);
  }, [reviews, filter]);

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setSelectedProduct(null);
    setRating(5);
    setTitle("");
    setComment("");
  };

  const openNewReview = (product?: PendingProduct) => {
    resetForm();
    setSelectedProduct(product ?? null);
    setShowForm(true);
  };

  const openEditReview = (review: Review) => {
    setEditingId(review.id);
    setSelectedProduct({
      id: review.id,
      name: review.product,
      image: review.image,
      orderId: review.orderId,
    });
    setRating(review.rating);
    setTitle(review.title);
    setComment(review.comment);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !comment.trim()) {
      toast.error("Please complete all review fields");
      return;
    }

    if (editingId) {
      setReviews((previous) =>
        previous.map((review) =>
          review.id === editingId
            ? { ...review, rating, title, comment }
            : review
        )
      );
      toast.success("Review updated successfully!");
    } else {
      const newReview: Review = {
        id: crypto.randomUUID(),
        product: selectedProduct?.name ?? "Product",
        image: selectedProduct?.image ?? "/products/camera.jpg",
        orderId: selectedProduct?.orderId ?? "MFH-NEW",
        rating,
        title,
        comment,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "PENDING",
        verified: !!selectedProduct,
        helpful: 0,
      };

      setReviews((previous) => [newReview, ...previous]);

      if (selectedProduct) {
        setPendingProducts((previous) =>
          previous.filter((product) => product.id !== selectedProduct.id)
        );
      }

      toast.success("Review submitted for approval!");
    }

    resetForm();
  };

  const deleteReview = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    setReviews((previous) =>
      previous.filter((review) => review.id !== id)
    );
    toast.success("Review deleted successfully");
  };

  const markHelpful = (id: string) => {
    setReviews((previous) =>
      previous.map((review) =>
        review.id === id
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
    toast.success("Thanks for your feedback!");
  };

  const pendingCount = reviews.filter(
    (review) => review.status === "PENDING"
  ).length;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-7 px-3 py-6 sm:px-6 lg:px-8">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-foreground">My Reviews</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Reviews & Ratings
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Share your shopping experience and manage your feedback.
          </p>
        </div>

        <Button onClick={() => openNewReview()} className="gap-2">
          <Plus className="h-4 w-4" />
          Write a Review
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Reviews"
          value={reviews.length}
          icon={<MessageSquareText />}
          description="All submitted reviews"
        />

        <StatCard
          title="Published Reviews"
          value={publishedReviews.length}
          icon={<CheckCircle2 />}
          description="Successfully published"
        />

        <StatCard
          title="Pending Reviews"
          value={pendingCount}
          icon={<Clock />}
          description="Waiting for approval"
        />

        <StatCard
          title="Average Rating"
          value={averageRating}
          icon={<Star />}
          description="Your published rating"
        />
      </div>

      {/* Review Form */}
      {showForm && (
        <Card className="border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>
                {editingId ? "Edit Your Review" : "Write a Product Review"}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Share your honest experience with this product.
              </p>
            </div>

            <Button
              size="icon"
              variant="ghost"
              onClick={resetForm}
              aria-label="Close review form"
            >
              <X className="h-5 w-5" />
            </Button>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">

              {selectedProduct && (
                <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {selectedProduct.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Order #{selectedProduct.orderId}
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Your Rating
                </label>
                <StarRating
                  rating={rating}
                  interactive
                  onChange={setRating}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Review Title
                </label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: Excellent product quality!"
                  maxLength={100}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Your Experience
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others about product quality, delivery, and your experience..."
                  rows={5}
                  maxLength={1000}
                  required
                />
                <p className="text-right text-xs text-muted-foreground">
                  {comment.length}/1000
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button type="submit">
                  {editingId ? "Update Review" : "Submit Review"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pending Products */}
      {pendingProducts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  Products Waiting for Review
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Share your experience with recently purchased products.
                </p>
              </div>
              <Badge variant="secondary">
                {pendingProducts.length} Products
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2">
            {pendingProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border p-3"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Order #{product.orderId}
                  </p>
                  <Button
                    size="sm"
                    variant="link"
                    className="h-auto px-0"
                    onClick={() => openNewReview(product)}
                  >
                    Write Review <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <CardTitle>My Product Reviews</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage all your product feedback.
              </p>
            </div>

            <Badge variant="outline">
              {filteredReviews.length} Reviews
            </Badge>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "All Reviews", value: "ALL" },
              { label: "Published", value: "PUBLISHED" },
              { label: "Pending", value: "PENDING" },
            ].map((tab) => (
              <Button
                key={tab.value}
                size="sm"
                variant={filter === tab.value ? "default" : "outline"}
                onClick={() => setFilter(tab.value)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {filteredReviews.length === 0 ? (
            <div className="py-12 text-center">
              <MessageCircle className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
              <h3 className="font-semibold">No reviews found</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You haven't submitted any reviews in this category.
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row">

                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={review.image}
                      alt={review.product}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold">
                        {review.product}
                      </h3>

                      <Badge
                        variant={
                          review.status === "PUBLISHED"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {review.status === "PUBLISHED"
                          ? "Published"
                          : "Pending"}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <StarRating rating={review.rating} />

                      <span className="text-xs text-muted-foreground">
                        {review.rating}.0
                      </span>

                      {review.verified && (
                        <Badge
                          variant="outline"
                          className="gap-1 text-green-600"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Verified Purchase
                        </Badge>
                      )}
                    </div>

                    <h4 className="text-sm font-semibold">
                      {review.title}
                    </h4>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {review.comment}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-xs text-muted-foreground">
                        Order #{review.orderId} · {review.date}
                      </div>

                      <div className="flex flex-wrap items-center gap-1">
                        {review.status === "PUBLISHED" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markHelpful(review.id)}
                          >
                            <MessageCircle className="mr-1 h-4 w-4" />
                            Helpful ({review.helpful})
                          </Button>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditReview(review)}
                        >
                          <Pencil className="mr-1 h-4 w-4" />
                          Edit
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteReview(review.id)}
                        >
                          <Trash2 className="mr-1 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  description,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <CardContent className="flex items-center justify-between gap-3 p-5">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}
