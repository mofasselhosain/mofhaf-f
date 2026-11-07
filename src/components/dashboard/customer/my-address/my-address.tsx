
"use client";

import { useState } from "react";
import {
  MapPin,
  Plus,
  Home,
  BriefcaseBusiness,
  MoreHorizontal,
  Pencil,
  Trash2,
  Star,
  Truck,
  MapPinned,
  CheckCircle2,
  Phone,
  UserRound,
  Building2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

type Address = {
  id: string;
  name: string;
  phone: string;
  type: "Home" | "Office" | "Other";
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

const initialAddresses: Address[] = [
  {
    id: "1",
    name: "Mofassel Hosain",
    phone: "+880 1700-000000",
    type: "Home",
    address: "House 12, Road 04, West Medda",
    city: "Brahmanbaria",
    state: "Chattogram",
    postalCode: "3400",
    country: "Bangladesh",
    isDefault: true,
  },
  {
    id: "2",
    name: "Mofassel Hosain",
    phone: "+880 1700-000000",
    type: "Office",
    address: "Level 3, Business Center",
    city: "Dhaka",
    state: "Dhaka",
    postalCode: "1212",
    country: "Bangladesh",
    isDefault: false,
  },
  {
    id: "3",
    name: "Mofassel Hosain",
    phone: "+880 1700-000000",
    type: "Other",
    address: "College Road, Main Market",
    city: "Cumilla",
    state: "Chattogram",
    postalCode: "3500",
    country: "Bangladesh",
    isDefault: false,
  },
];

const emptyAddress: Address = {
  id: "",
  name: "",
  phone: "",
  type: "Home",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "Bangladesh",
  isDefault: false,
};

export default function CustomerAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>(
    initialAddresses
  );

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Address>(emptyAddress);

  const openAddDialog = () => {
    setEditingId(null);
    setForm(emptyAddress);
    setOpen(true);
  };

  const openEditDialog = (address: Address) => {
    setEditingId(address.id);
    setForm({ ...address });
    setOpen(true);
  };

  const handleSave = () => {
    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.postalCode.trim()
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (editingId) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...form, id: editingId }
            : form.isDefault
              ? { ...item, isDefault: false }
              : item
        )
      );

      toast.success("Address updated successfully!");
    } else {
      const newAddress = {
        ...form,
        id: crypto.randomUUID(),
        isDefault: addresses.length === 0 || form.isDefault,
      };

      setAddresses((prev) => [
        ...(newAddress.isDefault
          ? prev.map((item) => ({ ...item, isDefault: false }))
          : prev),
        newAddress,
      ]);

      toast.success("New address added successfully!");
    }

    setOpen(false);
    setForm(emptyAddress);
  };

  const deleteAddress = (id: string) => {
    const target = addresses.find((item) => item.id === id);

    if (target?.isDefault && addresses.length > 1) {
      toast.error("Set another default address before deleting this one.");
      return;
    }

    setAddresses((prev) => prev.filter((item) => item.id !== id));
    toast.success("Address deleted successfully!");
  };

  const setDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isDefault: item.id === id,
      }))
    );

    toast.success("Default address updated!");
  };

  const getAddressIcon = (type: Address["type"]) => {
    if (type === "Home") return Home;
    if (type === "Office") return BriefcaseBusiness;
    return MapPin;
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>My Account</span>
            <span>/</span>
            <span className="text-foreground">My Addresses</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Addresses
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage your shipping and delivery addresses.
          </p>
        </div>

        <Button type="button" onClick={openAddDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Add New Address
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <MapPinned className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Saved Addresses
              </p>
              <h3 className="text-2xl font-bold">
                {addresses.length}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Default Address
              </p>
              <h3 className="text-lg font-bold">
                {addresses.find((a) => a.isDefault)?.type || "Not set"}
              </h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Delivery Locations
              </p>
              <h3 className="text-2xl font-bold">
                {new Set(addresses.map((a) => a.city)).size}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Address list */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Saved Addresses</h2>
          <p className="text-sm text-muted-foreground">
            Choose where you want your orders delivered.
          </p>
        </div>

        {addresses.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center py-14 text-center">
              <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">
                No addresses saved yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first delivery address to get started.
              </p>
              <Button onClick={openAddDialog} className="mt-5 gap-2">
                <Plus className="h-4 w-4" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {addresses.map((item) => {
              const AddressIcon = getAddressIcon(item.type);

              return (
                <Card
                  key={item.id}
                  className={`group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                    item.isDefault
                      ? "border-primary/50"
                      : "hover:border-primary/30"
                  }`}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-3 text-primary">
                        <AddressIcon className="h-5 w-5" />
                      </div>

                      <div>
                        <CardTitle className="text-base">
                          {item.type} Address
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {item.isDefault
                            ? "Primary delivery location"
                            : "Saved delivery location"}
                        </CardDescription>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger >
                        <Button
                        type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => openEditDialog(item)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit Address
                        </DropdownMenuItem>

                        {!item.isDefault && (
                          <DropdownMenuItem
                            onClick={() => setDefault(item.id)}
                          >
                            <Star className="mr-2 h-4 w-4" />
                            Set as Default
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                          onClick={() => deleteAddress(item.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Address
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {item.isDefault && (
                      <Badge className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Default Address
                      </Badge>
                    )}

                    <Separator />

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 font-semibold">
                        <UserRound className="h-4 w-4 text-muted-foreground" />
                        {item.name}
                      </div>

                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>
                          {item.address}, {item.city}, {item.state},{" "}
                          {item.postalCode}, {item.country}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {item.phone}
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-2">
                      <Button
                      type="button"
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2"
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>

                      {!item.isDefault && (
                        <Button
                        type="button"
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                          onClick={() => setDefault(item.id)}
                        >
                          Set Default
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit Address" : "Add New Address"}
            </DialogTitle>
            <DialogDescription>
              Enter your delivery details carefully.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Phone Number *</Label>
              <Input
                placeholder="+880 1XXXXXXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Address Type</Label>
              <Select
                value={form.type}
               onValueChange={(value) => {
    if (!value) return;

    setForm({
      ...form,
      type: value,
    });
  }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                value={form.country}
                onChange={(e) =>
                  setForm({ ...form, country: e.target.value })
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Street Address *</Label>
              <Input
                placeholder="House, road, area, street"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>City *</Label>
              <Input
                placeholder="Enter city"
                value={form.city}
                onChange={(e) =>
                  setForm({ ...form, city: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>State / Division</Label>
              <Input
                placeholder="Enter division"
                value={form.state}
                onChange={(e) =>
                  setForm({ ...form, state: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Postal Code *</Label>
              <Input
                placeholder="Enter postal code"
                value={form.postalCode}
                onChange={(e) =>
                  setForm({ ...form, postalCode: e.target.value })
                }
              />
            </div>

            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isDefault}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      isDefault: e.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-primary"
                />
                Set as default address
              </label>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingId ? "Save Changes" : "Add Address"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
