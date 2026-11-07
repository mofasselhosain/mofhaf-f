
"use client";

import { useState } from "react";
import {
  User,
  ShieldCheck,
  Bell,
  Globe,
  ShoppingBag,
  Lock,
  Trash2,
  Save,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Camera,
  CheckCircle2,
  MapPin,
  CreditCard,
  Badge,
} from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function CustomerSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Mofassel",
    lastName: "Hosain",
    email: "customer@example.com",
    phone: "+880 1700-000000",
    address: "Comilla, Bangladesh",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    deliveryUpdates: true,
    paymentAlerts: true,
    promotionalEmails: false,
    smsNotifications: true,
    productRecommendations: false,
    securityAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    language: "English",
    currency: "BDT",
    country: "Bangladesh",
    productUpdates: true,
    personalizedOffers: true,
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirmPassword: "",
  });

  const saveProfile = () => {
    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.email.trim()
    ) {
      toast.error("Please complete the required profile fields.");
      return;
    }

    toast.success("Profile settings saved successfully!");
  };

  const saveNotifications = () => {
    toast.success("Notification preferences updated!");
  };

  const savePreferences = () => {
    toast.success("Shopping preferences updated!");
  };

  const updatePassword = () => {
    if (
      !password.current ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      toast.error("Please fill in all password fields.");
      return;
    }

    if (password.newPassword.length < 8) {
      toast.error("Password must contain at least 8 characters.");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Password update request validated.");
    setPassword({
      current: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const navigation = [
    { value: "profile", label: "Personal Information", icon: User },
    { value: "security", label: "Security", icon: ShieldCheck },
    { value: "notifications", label: "Notifications", icon: Bell },
    { value: "preferences", label: "Preferences", icon: Globe },
    { value: "shopping", label: "Shopping Preferences", icon: ShoppingBag },
  ];

  const notificationItems = [
    {
      key: "orderUpdates" as const,
      title: "Order Updates",
      description: "Receive updates when your order is confirmed.",
    },
    {
      key: "deliveryUpdates" as const,
      title: "Delivery Notifications",
      description: "Get updates about shipping and delivery.",
    },
    {
      key: "paymentAlerts" as const,
      title: "Payment Alerts",
      description: "Receive payment and transaction notifications.",
    },
    {
      key: "promotionalEmails" as const,
      title: "Promotional Emails",
      description: "Get exclusive discounts and special offers.",
    },
    {
      key: "smsNotifications" as const,
      title: "SMS Notifications",
      description: "Receive important updates through SMS.",
    },
    {
      key: "productRecommendations" as const,
      title: "Product Recommendations",
      description: "Discover products based on your interests.",
    },
    {
      key: "securityAlerts" as const,
      title: "Security Alerts",
      description: "Get notified about important account activity.",
    },
  ];

  return (
    <div className="min-h-screen space-y-6 p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-primary">Settings</span>
        </div>

        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Account Settings
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your personal information, security and shopping experience.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-emerald-600" />
            Your account is protected
          </div>
        </div>
      </div>

      {/* Account Summary */}
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="size-16 border">
                <AvatarImage src="/images/profile.png" />
                <AvatarFallback>MH</AvatarFallback>
              </Avatar>

              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 size-7 rounded-full"
                onClick={() => toast.info("Connect your profile image uploader.")}
              >
                <Camera className="size-3.5" />
              </Button>
            </div>

            <div>
              <h2 className="text-lg font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {profile.email}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                <CheckCircle2 className="size-3.5" />
                Active Customer
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/60 px-4 py-3">
            <p className="text-xs text-muted-foreground">Account ID</p>
            <p className="font-semibold">MOF-CUS-10245</p>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-5"
      >
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 rounded-xl border bg-card p-2">
          {navigation.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className="gap-2 px-3 py-2.5 text-xs sm:text-sm"
            >
              <item.icon className="size-4" />
              <span>{item.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Personal Information */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your account details and contact information.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={saveProfile} className="gap-2">
                  <Save className="size-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security">
          <div className="space-y-5">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="size-5" />
                  Change Password
                </CardTitle>
                <CardDescription>
                  Keep your MOFHAF account secure with a strong password.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-5">
                {[
                  {
                    label: "Current Password",
                    key: "current" as const,
                    placeholder: "Enter current password",
                  },
                  {
                    label: "New Password",
                    key: "newPassword" as const,
                    placeholder: "Enter new password",
                  },
                  {
                    label: "Confirm New Password",
                    key: "confirmPassword" as const,
                    placeholder: "Confirm new password",
                  },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label>{field.label}</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={field.placeholder}
                        value={password[field.key]}
                        onChange={(e) =>
                          setPassword({
                            ...password,
                            [field.key]: e.target.value,
                          })
                        }
                        className="pr-11"
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 size-8"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                  Password should contain at least 8 characters. Use a
                  combination of uppercase letters, lowercase letters,
                  numbers and symbols.
                </div>

                <Button onClick={updatePassword} className="gap-2">
                  <ShieldCheck className="size-4" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of protection to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-600">
                    <Smartphone className="size-5" />
                  </div>
                  <div>
                    <p className="font-medium">Two-factor authentication</p>
                    <p className="text-xs text-muted-foreground">
                      Verify your identity when signing in.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => toast.info("Connect your 2FA verification API.")}
                >
                  Configure 2FA
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>
                  Manage devices where your account is signed in.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Current device</p>
                  <p className="text-xs text-muted-foreground">
                    This browser · Active session
                  </p>
                </div>
                <Badge variant="secondary">Current</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose which updates you want to receive from MOFHAF.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-1">
              {notificationItems.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <Label className="cursor-pointer font-medium">
                      {item.title}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        [item.key]: checked,
                      }))
                    }
                  />
                </div>
              ))}

              <Separator className="my-4" />

              <div className="flex justify-end">
                <Button onClick={saveNotifications} className="gap-2">
                  <Save className="size-4" />
                  Save Notifications
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language and Region */}
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Language & Region</CardTitle>
              <CardDescription>
                Customize your shopping experience based on your region.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({
                        ...prev,
                        language: value ?? "",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Bangla">বাংলা (Bangla)</SelectItem>
                      <SelectItem value="Hindi">हिन्दी (Hindi)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({
                        ...prev,
                        currency: value ?? "",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">BDT - Bangladeshi Taka</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label>Country / Region</Label>
                  <Select
                    value={preferences.country}
                    onValueChange={(value) =>
                      setPreferences((prev) => ({
                        ...prev,
                        country: value ?? "",
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="United States">United States</SelectItem>
                      <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex justify-end">
                <Button onClick={savePreferences} className="gap-2">
                  <Save className="size-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shopping Preferences */}
        <TabsContent value="shopping">
          <Card>
            <CardHeader>
              <CardTitle>Shopping Preferences</CardTitle>
              <CardDescription>
                Personalize your shopping experience and product discovery.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Personalized Product Recommendations</Label>
                  <p className="text-xs text-muted-foreground">
                    Show products based on your browsing and shopping history.
                  </p>
                </div>

                <Switch
                  checked={preferences.productUpdates}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      productUpdates: checked,
                    }))
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <Label>Exclusive Offers</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive special discounts and personalized offers.
                  </p>
                </div>

                <Switch
                  checked={preferences.personalizedOffers}
                  onCheckedChange={(checked) =>
                    setPreferences((prev) => ({
                      ...prev,
                      personalizedOffers: checked,
                    }))
                  }
                />
              </div>

              <Separator />

              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="size-5 text-primary" />
                  <div>
                    <h3 className="font-semibold">Favorite Categories</h3>
                    <p className="text-xs text-muted-foreground">
                      Manage your favorite product categories.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {["Electronics", "Fashion", "Home & Living", "Beauty", "Gadgets"].map(
                    (category) => (
                      <Badge
                        key={category}
                        
                        className="px-3 py-1.5"
                      >
                        {category}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={savePreferences} className="gap-2">
                  <Save className="size-4" />
                  Save Shopping Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Danger Zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="size-5" />
            Account Management
          </CardTitle>
          <CardDescription>
            Manage or permanently deactivate your MOFHAF account.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-xs text-muted-foreground">
              Permanently delete your account and associated personal data.
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={() =>
              toast.info("Connect an account deletion confirmation flow.")
            }
          >
            <Trash2 className="mr-2 size-4" />
            Delete Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
