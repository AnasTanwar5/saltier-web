import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import {
  getAppetizers,
  saveAppetizers,
  getCoupons,
  deleteCoupon,
  Appetizer,
  Coupon,
} from "@/lib/data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, LogOut, Search, UtensilsCrossed, Ticket, ImagePlus, Download } from "lucide-react";
import { format } from "date-fns";
import * as XLSX from "xlsx";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [appetizers, setAppetizers] = useState<Appetizer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAppetizer, setEditingAppetizer] = useState<Appetizer | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "", image: "" });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      navigate("/admin");
      return;
    }

    const loadData = async () => {
      try {
        const [appetizersData, couponsData] = await Promise.all([
          getAppetizers(),
          getCoupons(),
        ]);
        setAppetizers(appetizersData);
        setCoupons(couponsData);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin");
  };

  const handleDeleteCoupon = async (couponId: string) => {
    try {
      await deleteCoupon(couponId);
      const updatedCoupons = await getCoupons();
      setCoupons(updatedCoupons);
    } catch (error) {
      console.error('Failed to delete coupon:', error);
      alert('Failed to delete coupon. Please try again.');
    }
  };

  const handleDownloadExcel = () => {
    if (coupons.length === 0) {
      alert("No coupons to export");
      return;
    }

    // Create rows for Excel
    const excelData: (string | number)[][] = [];
    
    // Header row
    excelData.push([
      "Coupon Code", 
      "User Type", 
      "Name", 
      "Roll Number", 
      "Email",
      "Appetizer Name", 
      "Quantity", 
      "Price (₹)", 
      "Total (₹)"
    ]);
    
    coupons.forEach((coupon) => {
      const couponTotal = coupon.items.reduce(
        (sum, item) => sum + (item.appetizer.price || 0) * item.quantity,
        0
      );
      
      coupon.items.forEach((item, index) => {
        const itemTotal = (item.appetizer.price || 0) * item.quantity;
        excelData.push([
          index === 0 ? coupon.code : "", // Only show code on first row
          index === 0 ? (coupon.userType || "-") : "", // User type on first row
          index === 0 ? (coupon.userName || "-") : "", // Name on first row
          index === 0 ? (coupon.rollNo || "-") : "", // Roll number on first row
          index === 0 ? (coupon.email || "-") : "", // Email on first row
          item.appetizer.name,
          item.quantity,
          item.appetizer.price || 0,
          index === 0 ? couponTotal : "", // Only show total on first row
        ]);
      });
      
      // Add empty row between coupons for readability
      excelData.push([]);
    });

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // Set column widths
    ws["!cols"] = [
      { wch: 20 }, // Coupon Code
      { wch: 12 }, // User Type
      { wch: 25 }, // Name
      { wch: 15 }, // Roll Number
      { wch: 30 }, // Email
      { wch: 30 }, // Appetizer Name
      { wch: 10 }, // Quantity
      { wch: 12 }, // Price
      { wch: 12 }, // Total
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Coupons");

    // Download
    XLSX.writeFile(wb, `coupons_${format(new Date(), "yyyy-MM-dd")}.xlsx`);
  };

  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = reject;
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    try {
      // Compress image before converting to base64
      const compressedBase64 = await compressImage(file, 800, 0.8);
      setFormData((prev) => ({ ...prev, image: compressedBase64 }));
      setImagePreview(compressedBase64);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  const handleSaveAppetizer = async () => {
    if (!formData.name.trim() || !formData.description.trim()) return;
    
    const price = parseFloat(formData.price) || 0;

    try {
      if (editingAppetizer) {
        const id = editingAppetizer._id || editingAppetizer.id;
        if (!id) {
          alert('Cannot update: missing appetizer ID');
          return;
        }
        // Update via API
        const { appetizerAPI } = await import('@/lib/api');
        await appetizerAPI.update(id, {
          name: formData.name,
          description: formData.description,
          price: price,
          image: formData.image || editingAppetizer.image,
        });
        // Reload appetizers
        const refreshed = await getAppetizers();
        setAppetizers(refreshed);
      } else {
        // Create new via API
        const { appetizerAPI } = await import('@/lib/api');
        await appetizerAPI.create({
          name: formData.name,
          description: formData.description,
          price: price,
          image: formData.image || undefined,
        });
        // Reload appetizers
        const refreshed = await getAppetizers();
        setAppetizers(refreshed);
      }

      setIsDialogOpen(false);
      setEditingAppetizer(null);
      setFormData({ name: "", description: "", price: "", image: "" });
      setImagePreview(null);
    } catch (error) {
      console.error('Failed to save appetizer:', error);
      alert('Failed to save appetizer. Please try again.');
    }
  };

  const handleDeleteAppetizer = async (id: string) => {
    try {
      // Import API directly for delete
      const { appetizerAPI } = await import('@/lib/api');
      // Use _id if available, otherwise use id
      const appetizer = appetizers.find(a => (a._id || a.id) === id);
      const deleteId = appetizer?._id || appetizer?.id || id;
      await appetizerAPI.delete(deleteId);
      // Reload appetizers
      const refreshed = await getAppetizers();
      setAppetizers(refreshed);
    } catch (error) {
      console.error('Failed to delete appetizer:', error);
      alert('Failed to delete appetizer. Please try again.');
    }
  };

  const openEditDialog = (appetizer: Appetizer) => {
    setEditingAppetizer(appetizer);
    setFormData({ 
      name: appetizer.name, 
      description: appetizer.description,
      price: appetizer.price?.toString() || "0",
      image: appetizer.image || "" 
    });
    setImagePreview(appetizer.image || null);
    setIsDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingAppetizer(null);
    setFormData({ name: "", description: "", price: "", image: "" });
    setImagePreview(null);
    setIsDialogOpen(true);
  };

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-8 px-4">
        <div className="container max-w-6xl mx-auto">
          {/* Dashboard header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-foreground">
                Admin Dashboard
              </h2>
              <p className="text-muted-foreground mt-1">
                Manage appetizers and view generated coupons
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 rounded-full border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="appetizers" className="space-y-6">
            <TabsList className="bg-secondary p-1 rounded-full">
              <TabsTrigger
                value="appetizers"
                className="rounded-full data-[state=active]:bg-wine data-[state=active]:text-primary-foreground gap-2 px-6"
              >
                <UtensilsCrossed className="h-4 w-4" />
                Appetizers
              </TabsTrigger>
              <TabsTrigger
                value="coupons"
                className="rounded-full data-[state=active]:bg-wine data-[state=active]:text-primary-foreground gap-2 px-6"
              >
                <Ticket className="h-4 w-4" />
                Coupons
              </TabsTrigger>
            </TabsList>

            {/* Appetizers Tab */}
            <TabsContent value="appetizers" className="space-y-4">
              <div className="flex justify-end">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={openAddDialog}
                      className="gap-2 rounded-full bg-wine hover:bg-wine-light text-primary-foreground btn-elegant"
                    >
                      <Plus className="h-4 w-4" />
                      Add Appetizer
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-xl">
                        {editingAppetizer ? "Edit Appetizer" : "Add New Appetizer"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          className="bg-background border-border"
                          placeholder="e.g., Foie Gras Torchon"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="bg-background border-border min-h-[100px]"
                          placeholder="A short, elegant description..."
                        />
                      </div>
                      
                      {/* Price */}
                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, price: e.target.value }))
                          }
                          className="bg-background border-border"
                          placeholder="e.g., 15.00"
                        />
                      </div>
                      
                      {/* Image Upload */}
                      <div className="space-y-2">
                        <Label>Image</Label>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-wine/50 transition-colors"
                        >
                          {imagePreview ? (
                            <div className="relative">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <p className="text-xs text-muted-foreground text-center mt-2">
                                Click to change image
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2 py-4">
                              <ImagePlus className="h-8 w-8 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground">
                                Click to upload image
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Max 500KB recommended
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleSaveAppetizer}
                        className="w-full bg-wine hover:bg-wine-light text-primary-foreground rounded-full btn-elegant"
                      >
                        {editingAppetizer ? "Save Changes" : "Add Appetizer"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="card-elegant overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="font-serif font-semibold">Name</TableHead>
                      <TableHead className="font-serif font-semibold">Description</TableHead>
                      <TableHead className="font-serif font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appetizers.map((appetizer) => (
                      <TableRow key={appetizer._id || appetizer.id} className="border-border">
                        <TableCell className="font-medium">{appetizer.name}</TableCell>
                        <TableCell className="text-muted-foreground max-w-md truncate">
                          {appetizer.description}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(appetizer)}
                              className="h-8 w-8 hover:bg-secondary"
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteAppetizer(appetizer._id || appetizer.id || '')}
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Coupons Tab */}
            <TabsContent value="coupons" className="space-y-4">
              {/* Download Button - Prominent */}
              <div className="flex justify-end">
                <Button
                  onClick={handleDownloadExcel}
                  size="lg"
                  className="gap-2 rounded-full bg-wine hover:bg-wine-light text-primary-foreground btn-elegant shadow-lg"
                >
                  <Download className="h-5 w-5" />
                  Download Excel Report
                </Button>
              </div>

              {/* Search */}
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search coupon codes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border rounded-full"
                />
              </div>

              <div className="card-elegant overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="font-serif font-semibold">Code</TableHead>
                      <TableHead className="font-serif font-semibold">User Type</TableHead>
                      <TableHead className="font-serif font-semibold">Name</TableHead>
                      <TableHead className="font-serif font-semibold">Roll No</TableHead>
                      <TableHead className="font-serif font-semibold">Items</TableHead>
                      <TableHead className="font-serif font-semibold">Date & Time</TableHead>
                      <TableHead className="font-serif font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCoupons.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No coupons generated yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCoupons.map((coupon) => (
                        <TableRow key={coupon._id || coupon.id} className="border-border">
                          <TableCell className="font-mono font-semibold text-wine">
                            {coupon.code}
                          </TableCell>
                          <TableCell>
                            <span className="text-sm capitalize">
                              {coupon.userType || "-"}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium">
                            {coupon.userName || "-"}
                          </TableCell>
                          <TableCell>
                            {coupon.rollNo || "-"}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {coupon.items.map((item, idx) => (
                                <div key={idx} className="text-sm">
                                  <span className="text-foreground">{item.appetizer.name}</span>
                                  <span className="text-muted-foreground ml-2">×{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(coupon.createdAt), "MMM d, yyyy 'at' h:mm a")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteCoupon(coupon._id || coupon.id || '')}
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
