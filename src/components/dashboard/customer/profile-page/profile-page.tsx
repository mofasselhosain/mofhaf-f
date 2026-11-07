
"use client";

import { useState } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  UserRound,
  ShieldCheck,
  Pencil,
  Package,
  Heart,
  ShoppingBag,
  CheckCircle2,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const customer = {
  name: "Mofassel Hosain",
  email: "mofassel@example.com",
  phone: "+880 1700-000000",
  gender: "Male",
  birthday: "15 March 2000",
  memberSince: "January 2025",
  address: "Brahmanbaria, Chattogram, Bangladesh",
  avatar: "",
};

const stats = [
  { title: "Total Orders", value: "24", icon: Package },
  { title: "Completed", value: "18", icon: CheckCircle2 },
  { title: "Wishlist", value: "12", icon: Heart },
  { title: "Total Spent", value: "৳24,500", icon: ShoppingBag },
];

export default function CustomerProfilePage() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(customer);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Connect your profile update API here.
    console.log("Updated customer:", form);
    setEditing(false);
  };

  return (
    <div className="min-h-screen space-y-6 bg-muted/30 p-4 md:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your personal information and account settings.
          </p>
        </div>

        <Button onClick={() => setEditing(!editing)}>
          <Pencil className="mr-2 size-4" />
          {editing ? "Cancel Editing" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Banner */}
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 md:h-40" />

        <CardContent className="relative pb-6">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <Avatar className="size-24 border-4 border-background shadow-md">
                <AvatarImage src={customer.avatar} />
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  MH
                </AvatarFallback>
              </Avatar>

              <div className="pb-1">
                <h2 className="text-xl font-bold">{form.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {form.email}
                </p>
                <Badge className="mt-2" variant="secondary">
                  <ShieldCheck className="mr-1 size-3" />
                  Verified Customer
                </Badge>
              </div>
            </div>

            <Button variant="outline" size="sm">
              <Camera className="mr-2 size-4" />
              Change Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((item) => (
          <Card key={item.title} className="shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <item.icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {item.title}
                </p>
                <h3 className="text-xl font-bold">{item.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Profile Information */}
      <div className="grid gap-6 lg:grid-cols-3">

        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <UserRound className="size-5 text-primary" />
                Personal Information
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Your personal details and contact information.
              </p>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="grid gap-5 pt-6 sm:grid-cols-2">
            {[
              { label: "Full Name", key: "name", icon: UserRound },
              { label: "Email Address", key: "email", icon: Mail },
              { label: "Phone Number", key: "phone", icon: Phone },
              { label: "Gender", key: "gender", icon: UserRound },
              { label: "Date of Birth", key: "birthday", icon: CalendarDays },
            ].map((field) => (
              <div key={field.key} className="space-y-2">
                <Label>{field.label}</Label>
                <div className="relative">
                  <field.icon className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    className="pl-10"
                    value={form[field.key as keyof typeof form]}
                    disabled={!editing}
                    onChange={(e) =>
                      handleChange(field.key, e.target.value)
                    }
                  />
                </div>
              </div>
            ))}

            {editing && (
              <div className="flex gap-2 sm:col-span-2">
                <Button onClick={handleSave}>Save Changes</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setForm(customer);
                    setEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Details */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              Account Details
            </CardTitle>
          </CardHeader>

          <Separator />

          <CardContent className="space-y-5 pt-6">
            <div>
              <p className="text-sm text-muted-foreground">
                Account Status
              </p>
              <Badge className="mt-2 bg-green-100 text-green-700 hover:bg-green-100">
                Active
              </Badge>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Email Verification
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                <CheckCircle2 className="size-4 text-green-600" />
                Verified
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Member Since
              </p>
              <p className="mt-1 text-sm font-semibold">
                {customer.memberSince}
              </p>
            </div>

            <Separator />

            <Button variant="outline" className="w-full">
              Change Password
            </Button>
          </CardContent>
        </Card>

      </div>

      {/* Address */}
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="size-5 text-primary" />
              Default Shipping Address
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Your default delivery location.
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 size-4" />
            Edit Address
          </Button>
        </CardHeader>

        <Separator />

        <CardContent className="pt-5">
          <p className="font-semibold">{form.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {form.address}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {form.phone}
          </p>
          <Badge variant="secondary" className="mt-3">
            Default Address
          </Badge>
        </CardContent>
      </Card>

    </div>
  );
}
