import React, { useState } from 'react';
import { useBoutique } from '../context/BoutiqueContext';
import { Dress, DressCategory, DressSize, BookingStatus, Booking } from '../types';
import {
  LayoutDashboard,
  Shirt,
  Calendar,
  Users,
  Settings as SettingsIcon,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  MessageCircle,
  Save,
  X,
  Sparkles,
  DollarSign,
  TrendingUp,
  MapPin,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    dresses,
    bookings,
    customers,
    settings,
    updateSettings,
    addDress,
    updateDress,
    deleteDress,
    updateBookingStatus,
    navigateTo,
    addToast,
  } = useBoutique();

  const [activeTab, setActiveTab] = useState<'overview' | 'dresses' | 'bookings' | 'customers' | 'settings'>('overview');

  // Dress Modal State
  const [isDressModalOpen, setIsDressModalOpen] = useState(false);
  const [editingDressId, setEditingDressId] = useState<string | null>(null);

  // Dress Form state
  const [dressName, setDressName] = useState('');
  const [dressArabicName, setDressArabicName] = useState('');
  const [dressSubtitle, setDressSubtitle] = useState('');
  const [dressCategory, setDressCategory] = useState<DressCategory>('Evening Dresses');
  const [dressRentalPrice, setDressRentalPrice] = useState<number>(1800);
  const [dressDepositPrice, setDressDepositPrice] = useState<number>(1000);
  const [dressSizes, setDressSizes] = useState<DressSize[]>(['S', 'M', 'L']);
  const [dressColors, setDressColors] = useState<string>('Champagne, Gold');
  const [dressFabric, setDressFabric] = useState('Silk Chiffon with Crystal Beading');
  const [dressSilhouette, setDressSilhouette] = useState('Mermaid / Column');
  const [dressLength, setDressLength] = useState('Floor-Length with Sweep Train');
  const [dressDescription, setDressDescription] = useState('');
  const [dressImageUrl, setDressImageUrl] = useState('');
  const [dressFeatured, setDressFeatured] = useState(false);
  const [dressNewArrival, setDressNewArrival] = useState(true);
  const [dressStatus, setDressStatus] = useState<'available' | 'reserved' | 'maintenance'>('available');

  // Dress filter in admin
  const [dressSearch, setDressSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Booking search in admin
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('all');

  // Settings form state
  const [boutiqueName, setBoutiqueName] = useState(settings.name);
  const [boutiqueAddress, setBoutiqueAddress] = useState(settings.address);
  const [boutiqueHours, setBoutiqueHours] = useState(settings.openingHours);
  const [boutiquePhone, setBoutiquePhone] = useState(settings.phone);
  const [boutiqueWhatsapp, setBoutiqueWhatsapp] = useState(settings.whatsappNumber);
  const [boutiqueInstagram, setBoutiqueInstagram] = useState(settings.instagram);

  // Metrics calculation
  const totalDresses = dresses.length;
  const activeRentals = bookings.filter((b) => b.status === 'active' || b.status === 'confirmed').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.rentalPrice, 0);

  // Open Add Dress Modal
  const handleOpenAddDress = () => {
    setEditingDressId(null);
    setDressName('');
    setDressArabicName('');
    setDressSubtitle('Haute Couture Evening Gown');
    setDressCategory('Evening Dresses');
    setDressRentalPrice(1850);
    setDressDepositPrice(1000);
    setDressSizes(['S', 'M', 'L']);
    setDressColors('Champagne, Gold');
    setDressFabric('Silk Satin & Hand Embroidered Crystals');
    setDressSilhouette('A-Line');
    setDressLength('Floor-Length');
    setDressDescription('A breathtaking gown designed for memorable celebrations.');
    setDressImageUrl('/assets/dresses/WhatsApp%20Image%202026-10-05%20at%202.40.51%20PM%20(1).jpeg');
    setDressFeatured(false);
    setDressNewArrival(true);
    setDressStatus('available');
    setIsDressModalOpen(true);
  };

  // Open Edit Dress Modal
  const handleOpenEditDress = (d: Dress) => {
    setEditingDressId(d.id);
    setDressName(d.name);
    setDressArabicName(d.arabicName || '');
    setDressSubtitle(d.subtitle);
    setDressCategory(d.category);
    setDressRentalPrice(d.rentalPrice);
    setDressDepositPrice(d.depositPrice);
    setDressSizes(d.sizes);
    setDressColors(d.colors.join(', '));
    setDressFabric(d.fabric);
    setDressSilhouette(d.silhouette);
    setDressLength(d.length);
    setDressDescription(d.description);
    setDressImageUrl(d.images[0]);
    setDressFeatured(d.featured);
    setDressNewArrival(d.isNewArrival);
    setDressStatus(d.availabilityStatus);
    setIsDressModalOpen(true);
  };

  // Save or Update Dress
  const handleSaveDress = (e: React.FormEvent) => {
    e.preventDefault();
    const colorsArray = dressColors.split(',').map((c) => c.trim()).filter(Boolean);
    const dressData: Partial<Dress> = {
      name: dressName,
      arabicName: dressArabicName,
      subtitle: dressSubtitle,
      category: dressCategory,
      rentalPrice: Number(dressRentalPrice),
      depositPrice: Number(dressDepositPrice),
      sizes: dressSizes,
      colors: colorsArray,
      fabric: dressFabric,
      silhouette: dressSilhouette,
      length: dressLength,
      description: dressDescription,
      images: [dressImageUrl],
      featured: dressFeatured,
      isNewArrival: dressNewArrival,
      availabilityStatus: dressStatus,
    };

    if (editingDressId) {
      updateDress(editingDressId, dressData);
      addToast('Dress Updated', `${dressName} has been modified successfully.`, 'success');
    } else {
      addDress({
        ...dressData,
        sku: `GLAM-${Math.floor(1000 + Math.random() * 9000)}`,
        rentalDuration: '3 Days',
        occasions: ['Evening', 'Celebration', 'Party'],
        rating: 5.0,
        reviewsCount: 1,
        slug: dressName.toLowerCase().replace(/\s+/g, '-'),
      } as Omit<Dress, 'id'>);
      addToast('Dress Created', `${dressName} has been added to GLAM collection.`, 'success');
    }

    setIsDressModalOpen(false);
  };

  // Toggle dress status
  const handleToggleStatus = (d: Dress) => {
    const nextStatus = d.availabilityStatus === 'available' ? 'reserved' : 'available';
    updateDress(d.id, { availabilityStatus: nextStatus });
    addToast('Status Changed', `${d.name} is now marked as ${nextStatus}.`, 'info');
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      name: boutiqueName,
      address: boutiqueAddress,
      openingHours: boutiqueHours,
      phone: boutiquePhone,
      whatsappNumber: boutiqueWhatsapp,
      instagram: boutiqueInstagram,
    });
    addToast('Settings Saved', 'Boutique contact information updated.', 'success');
  };

  const handleWhatsAppCustomer = (phone: string, ref: string, dressName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const msg = `Hello from GLAM Boutique New Damietta! Regarding your booking #${ref} for ${dressName}...`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Filtered lists
  const filteredDresses = dresses.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(dressSearch.toLowerCase()) || d.sku.toLowerCase().includes(dressSearch.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || d.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.referenceNumber.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.dressName.toLowerCase().includes(bookingSearch.toLowerCase());
    const matchesStatus = bookingStatusFilter === 'all' || b.status === bookingStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-[#F4E8D2] text-[#A48F70] min-h-screen pt-28 sm:pt-36 pb-24 font-sans selection:bg-[#C3A684] selection:text-[#F4E8D2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C3A684]/20 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C3A684] font-bold">
              <span className="w-2 h-2 bg-[#C3A684] animate-pulse" />
              <span>Boutique Management Hub</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#A48F70] mt-1">
              GLAM Admin Portal
            </h1>
            <p className="text-xs text-[#A6927B] font-serif italic mt-0.5">
              Lebanon Street, New Damietta • Daily Operations & Inventory
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleOpenAddDress}
              className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#C3A684] text-[#F4E8D2] text-xs font-bold uppercase tracking-wider hover:bg-[#B99263] hover:text-white shadow-xs flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4 text-[#F4E8D2]" />
              <span>Add New Dress</span>
            </button>

            <button
              onClick={() => navigateTo('collection')}
              className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#302016] border border-[#C3A684]/30 text-[#A48F70] text-xs font-semibold uppercase tracking-wider hover:bg-[#F4E8D2] flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#C3A684]" />
              <span>Live Website</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'dresses', label: `Dresses (${dresses.length})`, icon: Shirt },
            { id: 'bookings', label: `Bookings (${bookings.length})`, icon: Calendar },
            { id: 'customers', label: `Customers (${customers.length})`, icon: Users },
            { id: 'settings', label: 'Boutique Settings', icon: SettingsIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#C3A684] text-[#F4E8D2] shadow-xs'
                    : 'bg-[#302016] text-[#A6927B] hover:text-[#A48F70] border border-[#C3A684]/20 hover:border-[#C3A684]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F4E8D2]' : 'text-[#C3A684]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Metrics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#302016] p-6 border border-[#C3A684]/20 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A6927B] block">Total Dresses</span>
                <p className="font-serif text-3xl sm:text-4xl font-light text-[#A48F70]">{totalDresses}</p>
                <p className="text-[11px] text-[#C3A684] font-medium">In New Damietta Atelier</p>
              </div>

              <div className="bg-[#302016] p-6 border border-[#C3A684]/20 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A6927B] block">Active / Confirmed</span>
                <p className="font-serif text-3xl sm:text-4xl font-light text-[#A48F70]">{activeRentals}</p>
                <p className="text-[11px] text-[#C3A684] font-medium">Reservations locked</p>
              </div>

              <div className="bg-[#302016] p-6 border border-[#C3A684]/20 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A6927B] block">Pending Requests</span>
                <p className="font-serif text-3xl sm:text-4xl font-light text-amber-400">{pendingBookings}</p>
                <p className="text-[11px] text-amber-300 font-medium">Awaiting fitting schedule</p>
              </div>

              <div className="bg-[#302016] p-6 border border-[#C3A684]/20 shadow-xs space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#A6927B] block">Rental Volume</span>
                <p className="font-serif text-2xl sm:text-3xl font-light text-[#A48F70]">
                  {totalRevenue.toLocaleString()} EGP
                </p>
                <p className="text-[11px] text-[#C3A684] font-medium">Recorded bookings</p>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Recent Booking Requests */}
              <div className="lg:col-span-8 bg-[#302016] p-6 border border-[#C3A684]/20 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-[#C3A684]/15 mb-4">
                  <h3 className="font-serif text-xl font-light text-[#A48F70]">
                    Recent Booking Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-[#C3A684] hover:underline font-medium"
                  >
                    View All ({bookings.length})
                  </button>
                </div>

                <div className="divide-y divide-[#C3A684]/10">
                  {bookings.slice(0, 5).map((b) => (
                    <div key={b.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.dressImage}
                          alt=""
                          className="w-12 h-14 object-cover bg-[#F4E8D2] border border-[#C3A684]/20"
                        />
                        <div>
                          <span className="text-[11px] font-mono text-[#A6927B]">#{b.referenceNumber}</span>
                          <h4 className="font-serif text-sm font-normal text-[#A48F70]">{b.dressName}</h4>
                          <p className="text-xs text-[#A6927B]">
                            {b.customerName} • {b.eventDate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'confirmed'
                              ? 'bg-[#C3A684]/20 text-[#C3A684] border border-[#C3A684]/40'
                              : b.status === 'pending'
                              ? 'bg-amber-900/30 text-amber-300 border border-amber-600/40'
                              : 'bg-[#F4E8D2] text-[#A6927B] border border-[#C3A684]/20'
                          }`}
                        >
                          {b.status}
                        </span>

                        <button
                          onClick={() => handleWhatsAppCustomer(b.customerPhone, b.referenceNumber, b.dressName)}
                          className="p-2 bg-[#C3A684] text-[#F4E8D2] hover:bg-[#B99263] hover:text-white transition-colors border border-[#B99263]/40 shadow-xs"
                          title="WhatsApp Client"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-[#302016] p-6 border border-[#C3A684]/20 shadow-xs space-y-4">
                  <h3 className="font-serif text-xl font-light text-[#A48F70]">
                    Quick Actions
                  </h3>

                  <button
                    onClick={handleOpenAddDress}
                    className="w-full py-3 bg-[#F4E8D2] hover:border-[#C3A684] text-[#A48F70] text-xs font-semibold uppercase tracking-wider border border-[#C3A684]/25 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-[#C3A684]" />
                    <span>Add New Dress to Catalog</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="w-full py-3 bg-[#F4E8D2] hover:border-[#C3A684] text-[#A48F70] text-xs font-semibold uppercase tracking-wider border border-[#C3A684]/25 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#C3A684]" />
                    <span>Review Pending Bookings ({pendingBookings})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-3 bg-[#F4E8D2] hover:border-[#C3A684] text-[#A48F70] text-xs font-semibold uppercase tracking-wider border border-[#C3A684]/25 flex items-center justify-center gap-2 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-[#C3A684]" />
                    <span>Update Boutique Hours / WhatsApp</span>
                  </button>
                </div>

                {/* Atelier Information Card */}
                <div className="bg-[#261811] p-6 text-[#A48F70] border border-[#C3A684]/30 space-y-3">
                  <div className="flex items-center gap-2 text-[#C3A684] text-xs font-bold uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>New Damietta Atelier</span>
                  </div>
                  <p className="text-xs text-[#A6927B]">
                    Lebanon Street, Al-Helou Building • Open Daily 1:00 PM – 9:00 PM
                  </p>
                  <div className="pt-2 text-xs text-[#C3A684]">
                    WhatsApp: {settings.whatsappNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DRESSES MANAGEMENT */}
        {activeTab === 'dresses' && (
          <div className="bg-[#302016] border border-[#C3A684]/20 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search dress */}
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-4 h-4 text-[#A6927B]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search dresses by name or SKU..."
                  value={dressSearch}
                  onChange={(e) => setDressSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                >
                  <option value="all">All Categories</option>
                  <option value="Evening Dresses">Evening Dresses</option>
                  <option value="Engagement Dresses">Engagement Dresses</option>
                  <option value="Wedding Guest Dresses">Wedding Guest</option>
                  <option value="Party Dresses">Party Dresses</option>
                  <option value="Formal Dresses">Formal Dresses</option>
                  <option value="Black Dresses">Black Dresses</option>
                </select>

                <button
                  onClick={handleOpenAddDress}
                  className="px-4 py-2 bg-[#C3A684] text-[#F4E8D2] text-xs font-bold uppercase tracking-wider hover:bg-[#B99263] hover:text-white flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F4E8D2]" />
                  <span>Add Dress</span>
                </button>
              </div>
            </div>

            {/* Dress Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#A6927B]">
                <thead className="bg-[#F4E8D2] text-[#A48F70] uppercase font-serif tracking-wider text-[11px] border-b border-[#C3A684]/20">
                  <tr>
                    <th className="py-3 px-4">Dress</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Rental Rate</th>
                    <th className="py-3 px-4">Sizes</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A684]/10">
                  {filteredDresses.map((dress) => (
                    <tr key={dress.id} className="hover:bg-[#F4E8D2]/60 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={dress.images[0]}
                            alt=""
                            className="w-10 h-14 object-cover bg-[#F4E8D2] border border-[#C3A684]/20"
                          />
                          <div>
                            <span className="font-mono text-[10px] text-[#A6927B]/70 block">
                              {dress.sku}
                            </span>
                            <span className="font-serif font-normal text-[#A48F70] text-sm block">
                              {dress.name}
                            </span>
                            {dress.arabicName && (
                              <span className="text-[11px] text-[#C3A684]">{dress.arabicName}</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#A6927B]">{dress.category}</td>
                      <td className="py-3 px-4 font-serif font-normal text-[#A48F70]">
                        {dress.rentalPrice.toLocaleString()} EGP
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#A48F70]">{dress.sizes.join(', ')}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleStatus(dress)}
                          className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                            dress.availabilityStatus === 'available'
                              ? 'bg-[#C3A684]/20 text-[#C3A684] border-[#C3A684]/40 hover:bg-[#C3A684]/30'
                              : 'bg-amber-900/30 text-amber-300 border-amber-600/40 hover:bg-amber-900/50'
                          }`}
                        >
                          {dress.availabilityStatus}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigateTo('dress-details', { id: dress.id })}
                            className="p-1.5 hover:bg-[#F4E8D2] text-[#A6927B] hover:text-[#A48F70] transition-colors"
                            title="View on site"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEditDress(dress)}
                            className="p-1.5 hover:bg-[#F4E8D2] text-[#C3A684] hover:text-white transition-colors"
                            title="Edit dress"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete ${dress.name}?`)) {
                                deleteDress(dress.id);
                                addToast('Dress Removed', `${dress.name} was removed from collection.`, 'info');
                              }
                            }}
                            className="p-1.5 hover:bg-red-950/40 text-rose-400 hover:text-rose-300 transition-colors"
                            title="Delete dress"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-[#302016] border border-[#C3A684]/20 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full sm:w-auto">
                <Search className="w-4 h-4 text-[#A6927B]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by client, reference number, or dress..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <select
                value={bookingStatusFilter}
                onChange={(e) => setBookingStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending Requests</option>
                <option value="confirmed">Confirmed</option>
                <option value="active">Active (Picked Up)</option>
                <option value="completed">Completed (Returned)</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#A6927B]">
                <thead className="bg-[#F4E8D2] text-[#A48F70] uppercase font-serif tracking-wider text-[11px] border-b border-[#C3A684]/20">
                  <tr>
                    <th className="py-3 px-4">Ref #</th>
                    <th className="py-3 px-4">Client Info</th>
                    <th className="py-3 px-4">Dress</th>
                    <th className="py-3 px-4">Event Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A684]/10">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-[#F4E8D2]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#A48F70]">
                        #{b.referenceNumber}
                      </td>
                      <td className="py-3 px-4">
                        <strong className="text-[#A48F70] block">{b.customerName}</strong>
                        <span className="text-[#A6927B]/75">{b.customerPhone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <img src={b.dressImage} alt="" className="w-8 h-10 object-cover bg-[#F4E8D2] border border-[#C3A684]/20" />
                          <div>
                            <span className="font-serif font-normal text-[#A48F70] block">{b.dressName}</span>
                            <span className="text-[10px] text-[#A6927B]/70">Size {b.size}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#A48F70]">{b.eventDate}</span>
                        <span className="text-[10px] text-[#A6927B]/70 block">Return: {b.returnDate}</span>
                      </td>
                      <td className="py-3 px-4 font-serif font-normal text-[#A48F70]">
                        {b.rentalPrice.toLocaleString()} EGP
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as BookingStatus)}
                          className="px-2 py-1 text-[11px] bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] font-semibold uppercase tracking-wider focus:outline-none focus:border-[#C3A684]"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleWhatsAppCustomer(b.customerPhone, b.referenceNumber, b.dressName)}
                          className="px-3 py-1.5 bg-[#C3A684] text-[#F4E8D2] hover:bg-[#B99263] hover:text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors border border-[#B99263]/30"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER MANAGEMENT */}
        {activeTab === 'customers' && (
          <div className="bg-[#302016] border border-[#C3A684]/20 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#C3A684]/15">
              <div>
                <h3 className="font-serif text-xl font-light text-[#A48F70]">Client Directory</h3>
                <p className="text-xs text-[#A6927B] font-serif italic">Registered and reservation clients in New Damietta</p>
              </div>
              <span className="text-xs font-bold text-[#C3A684]">
                {customers.length} Clients Registered
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#A6927B]">
                <thead className="bg-[#F4E8D2] text-[#A48F70] uppercase font-serif tracking-wider text-[11px] border-b border-[#C3A684]/20">
                  <tr>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Phone Number</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Total Bookings</th>
                    <th className="py-3 px-4 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C3A684]/10">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-[#F4E8D2]/60 transition-colors">
                      <td className="py-3 px-4">
                        <strong className="text-[#A48F70] text-sm block font-serif font-normal">{c.name}</strong>
                        <span className="text-[10px] text-[#A6927B]/70">Joined {c.createdAt}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#A48F70]">{c.phone}</td>
                      <td className="py-3 px-4 text-[#A6927B]">{c.email}</td>
                      <td className="py-3 px-4 font-bold text-[#C3A684]">{c.totalBookings} rentals</td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={`https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-[#C3A684] text-[#F4E8D2] hover:bg-[#B99263] hover:text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition-colors border border-[#B99263]/30"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: BOUTIQUE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-[#302016] border border-[#C3A684]/20 p-8 sm:p-12 shadow-xs max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-light text-[#A48F70]">Boutique Settings</h3>
              <p className="text-xs text-[#A6927B] font-serif italic mt-1">
                Configure official address, contact lines, and opening hours displayed across the website.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">
                  Boutique Name
                </label>
                <input
                  type="text"
                  value={boutiqueName}
                  onChange={(e) => setBoutiqueName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] text-sm focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">
                  Location Address
                </label>
                <input
                  type="text"
                  value={boutiqueAddress}
                  onChange={(e) => setBoutiqueAddress(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] text-sm focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={boutiqueHours}
                  onChange={(e) => setBoutiqueHours(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] text-sm focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={boutiquePhone}
                    onChange={(e) => setBoutiquePhone(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] text-sm focus:outline-none focus:border-[#C3A684]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={boutiqueWhatsapp}
                    onChange={(e) => setBoutiqueWhatsapp(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] text-sm focus:outline-none focus:border-[#C3A684]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={boutiqueInstagram}
                  onChange={(e) => setBoutiqueInstagram(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] text-sm focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-[#C3A684] text-[#F4E8D2] text-xs font-bold uppercase tracking-widest hover:bg-[#B99263] hover:text-white transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4 text-[#F4E8D2]" />
                  <span>Save Boutique Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* ADD / EDIT DRESS MODAL */}
      {isDressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-xs">
          <div className="relative bg-[#302016] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#C3A684]/30 my-8 text-[#A48F70]">
            <button
              onClick={() => setIsDressModalOpen(false)}
              className="absolute top-5 right-5 p-2 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-[#A48F70]" />
            </button>

            <h2 className="font-serif text-2xl font-light text-[#A48F70] mb-1">
              {editingDressId ? 'Edit Dress Details' : 'Add New Dress to Collection'}
            </h2>
            <p className="text-xs text-[#A6927B] font-serif italic mb-6">
              Fill in the fashion specifications for this garment in the GLAM catalog.
            </p>

            <form onSubmit={handleSaveDress} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Dress Name *</label>
                  <input
                    type="text"
                    required
                    value={dressName}
                    onChange={(e) => setDressName(e.target.value)}
                    placeholder="e.g. Celestial Champagne Gown"
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Arabic Name</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={dressArabicName}
                    onChange={(e) => setDressArabicName(e.target.value)}
                    placeholder="e.g. فستان سهرة شامبين مطرز"
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Category</label>
                  <select
                    value={dressCategory}
                    onChange={(e) => setDressCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                  >
                    <option value="Evening Dresses">Evening Dresses</option>
                    <option value="Engagement Dresses">Engagement Dresses</option>
                    <option value="Wedding Guest Dresses">Wedding Guest</option>
                    <option value="Party Dresses">Party Dresses</option>
                    <option value="Formal Dresses">Formal Dresses</option>
                    <option value="Black Dresses">Black Dresses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Rental Price (EGP) *</label>
                  <input
                    type="number"
                    required
                    value={dressRentalPrice}
                    onChange={(e) => setDressRentalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Deposit (EGP)</label>
                  <input
                    type="number"
                    value={dressDepositPrice}
                    onChange={(e) => setDressDepositPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={dressImageUrl}
                  onChange={(e) => setDressImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] placeholder-[#A6927B]/50 focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Fabric</label>
                  <input
                    type="text"
                    value={dressFabric}
                    onChange={(e) => setDressFabric(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Silhouette</label>
                  <input
                    type="text"
                    value={dressSilhouette}
                    onChange={(e) => setDressSilhouette(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#A48F70] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={dressDescription}
                  onChange={(e) => setDressDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F4E8D2] border border-[#C3A684]/25 text-[#A48F70] focus:outline-none focus:border-[#C3A684]"
                />
              </div>

              <div className="flex gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dressFeatured}
                    onChange={(e) => setDressFeatured(e.target.checked)}
                    className="accent-[#C3A684]"
                  />
                  <span className="text-[#A48F70]">Featured Collection</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dressNewArrival}
                    onChange={(e) => setDressNewArrival(e.target.checked)}
                    className="accent-[#C3A684]"
                  />
                  <span className="text-[#A48F70]">New Arrival Badge</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#C3A684]/20">
                <button
                  type="button"
                  onClick={() => setIsDressModalOpen(false)}
                  className="px-6 py-2.5 border border-[#C3A684]/30 text-[#A48F70] hover:bg-white/5 font-semibold uppercase tracking-wider text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#C3A684] text-[#F4E8D2] font-bold uppercase tracking-wider hover:bg-[#B99263] hover:text-white text-xs transition-colors shadow-md"
                >
                  Save Dress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

