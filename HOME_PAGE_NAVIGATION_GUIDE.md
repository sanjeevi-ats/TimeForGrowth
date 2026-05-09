# 🏠 Home Page Navigation Guide

## Where is the Home Page Used?

The home page is the **main landing page** of the Time For Growth website. It's accessed through multiple navigation points throughout the site.

---

## 📍 Navigation Points to Home Page

### 1. **Navbar - "Home" Link**
```
Location: Header component (components/layout/Header.tsx)
Link: { href: "/", label: "Home" }
```

**Visual:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Time For Growth  [Home] [Products] [About] [Search] │
│                          ↑                                  │
│                     Clicks here                             │
│                     Goes to: /                              │
└─────────────────────────────────────────────────────────────┘
```

### 2. **Logo Click**
```
Location: Header component (components/layout/Header.tsx)
Link: <Link href="/">
```

**Visual:**
```
┌─────────────────────────────────────────────────────────────┐
│ [🔵 Logo] Time For Growth  [Home] [Products] [About]       │
│   ↑                                                         │
│   Clicks here                                               │
│   Goes to: /                                                │
└─────────────────────────────────────────────────────────────┘
```

### 3. **Footer - "Home" Link**
```
Location: Footer component (components/layout/Footer.tsx)
Link: { href: "/", label: "Home" }
```

**Visual:**
```
┌─────────────────────────────────────────────────────────────┐
│ FOOTER                                                      │
│ Quick Links:                                                │
│ • Home ← Clicks here, goes to /                            │
│ • Products                                                  │
│ • About                                                     │
└─────────────────────────────────────────────────────────────┘
```

### 4. **Direct URL Access**
```
URL: https://time4growth.in/
URL: https://time4growth.in
```

---

## 🗺️ Complete Navigation Map

```
┌─────────────────────────────────────────────────────────────┐
│                        HEADER                               │
│  [Logo] → /  [Home] → /  [Products]  [About]  [Admin]     │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                     HOME PAGE (/)                           │
│                                                             │
│  1. Hero Section                                            │
│     • Title: "Better Choices Create a Better Life"         │
│     • Button: "START YOUR JOURNEY" → /products             │
│     • Category Icons:                                       │
│       - Book → /products?category=books                     │
│       - Journal → /products?category=journals               │
│       - Gadgets → /products?category=gadgets                │
│       - Wellness → /products?category=wellness              │
│                                                             │
│  2. Marquee Strip                                           │
│                                                             │
│  3. TOP SELF-IMPROVEMENT BOOKS                              │
│     • Shows book products                                   │
│     • Click product → /products/[slug]                      │
│                                                             │
│  4. BEST GROWTH JOURNALS                                    │
│     • Shows journal products                                │
│     • Click product → /products/[slug]                      │
│                                                             │
│  5. PRODUCTIVITY GADGETS                                    │
│     • Shows gadget products                                 │
│     • Click product → /products/[slug]                      │
│                                                             │
│  6. TOP WELLNESS ESSENTIALS                                 │
│     • Shows wellness products                               │
│     • Click product → /products/[slug]                      │
│                                                             │
│  7. WHY TRUST US                                            │
│                                                             │
│  8. TOP WELLNESS ESSENTIALS (Steps)                         │
│                                                             │
│  9. JOIN OUR SELF-IMPROVEMENT JOURNEY                       │
│     • Newsletter signup                                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                               │
│  Quick Links: [Home] → /  [Products]  [About]              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔗 Navigation Flow

### From Home Page to Other Pages

```
HOME PAGE (/)
├── Click "START YOUR JOURNEY" → /products
├── Click Book Icon → /products?category=books
├── Click Journal Icon → /products?category=journals
├── Click Gadgets Icon → /products?category=gadgets
├── Click Wellness Icon → /products?category=wellness
├── Click Product Card → /products/[slug]
├── Click "Products" in Navbar → /products
├── Click "About" in Navbar → /about
└── Click "Admin" in Navbar → /admin/dashboard
```

### From Other Pages to Home Page

```
ANY PAGE
├── Click Logo → /
├── Click "Home" in Navbar → /
└── Click "Home" in Footer → /
```

---

## 📂 File Structure

```
Time-For-Growth-main/
├── app/
│   ├── page.tsx ← HOME PAGE (Route: /)
│   ├── layout.tsx ← Root layout (includes Header & Footer)
│   ├── products/
│   │   └── page.tsx ← Products page
│   ├── about/
│   │   └── page.tsx ← About page
│   └── admin/
│       └── dashboard/
│           └── page.tsx ← Admin dashboard
├── components/
│   ├── layout/
│   │   ├── Header.tsx ← Navigation with "Home" link
│   │   └── Footer.tsx ← Footer with "Home" link
│   └── home/
│       └── HomeSections.tsx ← Home page sections
```

---

## 🎯 How Users Access Home Page

### 1. **First Visit**
```
User types: time4growth.in
Browser loads: / (Home Page)
```

### 2. **From Products Page**
```
User on: /products
User clicks: "Home" in navbar or Logo
Browser loads: / (Home Page)
```

### 3. **From Category Filter**
```
User on: /products?category=books
User clicks: "Home" in navbar or Logo
Browser loads: / (Home Page)
```

### 4. **From Product Detail**
```
User on: /products/atomic-habits
User clicks: "Home" in navbar or Logo
Browser loads: / (Home Page)
```

### 5. **From Admin Panel**
```
User on: /admin/dashboard
User clicks: "Home" in navbar or Logo
Browser loads: / (Home Page)
```

---

## 🔄 Navigation Code

### Header Component (Navbar)
```typescript
const navLinks = [
  { href: "/", label: "Home" },        // ← Home link
  { href: "/products", label: "Products" },
  { href: "/reviews", label: "Reviews" },
  { href: "/buying-guides", label: "Buying Guides" },
  { href: "/about", label: "About" },
];

// Logo link
<Link href="/" className="...">
  <Image src="/logo.png" alt="Time For Growth" />
  <span>Time For Growth</span>
</Link>

// Nav links
{navLinks.map((link) => (
  <Link key={link.href} href={link.href}>
    {link.label}
  </Link>
))}
```

### Footer Component
```typescript
const footerLinks = {
  quickLinks: {
    links: [
      { href: "/", label: "Home" },    // ← Home link
      { href: "/products", label: "Products" },
      { href: "/reviews", label: "Reviews" },
      { href: "/about", label: "About" },
    ],
  },
};
```

---

## 📱 Responsive Navigation

### Desktop
```
┌────────────────────────────────────────────────────────┐
│ [Logo] Time For Growth  [Home] [Products] [About]     │
│                          ↑                             │
│                     Visible & Clickable                │
└────────────────────────────────────────────────────────┘
```

### Mobile
```
┌────────────────────────────────────────────────────────┐
│ [Logo]                              [☰ Menu]           │
│                                                        │
│ Menu Opens:                                            │
│ • Home ← Clickable                                     │
│ • Products                                             │
│ • About                                                │
└────────────────────────────────────────────────────────┘
```

---

## 🎯 Key Points

1. **Home Page Route**: `/` (root route)
2. **File Location**: `app/page.tsx`
3. **Navigation Points**: 
   - Navbar "Home" link
   - Logo click
   - Footer "Home" link
   - Direct URL access

4. **Always Accessible**: Home page is accessible from every page via navbar and footer

5. **Default Landing**: When users visit the site, they land on the home page

---

## ✅ Summary

The home page (`/`) is:
- ✅ The main landing page
- ✅ Accessible via navbar "Home" link
- ✅ Accessible via logo click
- ✅ Accessible via footer "Home" link
- ✅ The default route when visiting the site
- ✅ Always visible in navigation
- ✅ Contains category icons that link to filtered products
- ✅ Contains product sections that link to product details

---

*Last Updated: May 2, 2026*
*Status: Production Ready*
