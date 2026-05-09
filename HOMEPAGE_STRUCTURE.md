# Homepage Structure - Visual Overview

**Current Implementation**: Advanced Premium Homepage with Hero Slider  
**Status**: ✅ Production Ready

---

## Page Layout (Top to Bottom)

```
┌─────────────────────────────────────────────────────────────┐
│                      HEADER (STICKY)                        │
│  Logo | Nav Links | Search Bar | Region | Admin Link       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                   HERO SLIDER (FULL WIDTH)                 │
│                                                             │
│              "Better Choices Create a Better Life"         │
│         "Discover tools and resources for growth..."       │
│                                                             │
│         [Explore Products]  [Start Improving]              │
│                                                             │
│              ◄ Navigation Arrows ►                         │
│                  ● ● ● (Pagination)                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         TOP SELF-IMPROVEMENT BOOKS        [View More →]    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Book 1   │  │ Book 2   │  │ Book 3   │  │ Book 4   │   │
│  │ Image    │  │ Image    │  │ Image    │  │ Image    │   │
│  │ Title    │  │ Title    │  │ Title    │  │ Title    │   │
│  │ Desc     │  │ Desc     │  │ Desc     │  │ Desc     │   │
│  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         BEST GROWTH JOURNALS              [View More →]    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Journal 1 │  │Journal 2 │  │Journal 3 │  │Journal 4 │   │
│  │ Image    │  │ Image    │  │ Image    │  │ Image    │   │
│  │ Title    │  │ Title    │  │ Title    │  │ Title    │   │
│  │ Desc     │  │ Desc     │  │ Desc     │  │ Desc     │   │
│  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         PRODUCTIVITY GADGETS              [View More →]    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Gadget 1  │  │Gadget 2  │  │Gadget 3  │  │Gadget 4  │   │
│  │ Image    │  │ Image    │  │ Image    │  │ Image    │   │
│  │ Title    │  │ Title    │  │ Title    │  │ Title    │   │
│  │ Desc     │  │ Desc     │  │ Desc     │  │ Desc     │   │
│  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│         TOP WELLNESS ESSENTIALS          [View More →]    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Wellness 1│  │Wellness 2│  │Wellness 3│  │Wellness 4│   │
│  │ Image    │  │ Image    │  │ Image    │  │ Image    │   │
│  │ Title    │  │ Title    │  │ Title    │  │ Title    │   │
│  │ Desc     │  │ Desc     │  │ Desc     │  │ Desc     │   │
│  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │  │ ★ 4.8    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              WHAT OUR USERS SAY                            │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ ★★★★★       │  │ ★★★★★       │  │ ★★★★★       │     │
│  │ "Great      │  │ "Excellent  │  │ "Amazing    │     │
│  │  platform"  │  │  selection" │  │  resources" │     │
│  │ - Sarah     │  │ - Michael   │  │ - Emma      │     │
│  │ Entrepreneur│  │ Student     │  │ Coach       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    STAY UPDATED                            │
│                                                             │
│         Get weekly tips and exclusive recommendations      │
│                                                             │
│         [Email Input] [Subscribe Button]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                        FOOTER                              │
│  Links | Social | Copyright | Affiliate Disclosure        │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
HomePage (app/page.tsx)
├── AdvancedHeroSlider
│   ├── Swiper (Carousel)
│   │   ├── SwiperSlide 1
│   │   ├── SwiperSlide 2
│   │   └── SwiperSlide 3
│   ├── Navigation Arrows
│   └── Pagination Dots
│
├── AdvancedCategorySection (Books)
│   ├── Section Header
│   ├── View More Button
│   └── Product Grid
│       ├── AdvancedProductCard 1
│       ├── AdvancedProductCard 2
│       ├── AdvancedProductCard 3
│       └── AdvancedProductCard 4
│
├── AdvancedCategorySection (Journals)
│   ├── Section Header
│   ├── View More Button
│   └── Product Grid
│       ├── AdvancedProductCard 1
│       ├── AdvancedProductCard 2
│       ├── AdvancedProductCard 3
│       └── AdvancedProductCard 4
│
├── AdvancedCategorySection (Gadgets)
│   ├── Section Header
│   ├── View More Button
│   └── Product Grid
│       ├── AdvancedProductCard 1
│       ├── AdvancedProductCard 2
│       ├── AdvancedProductCard 3
│       └── AdvancedProductCard 4
│
├── AdvancedCategorySection (Wellness)
│   ├── Section Header
│   ├── View More Button
│   └── Product Grid
│       ├── AdvancedProductCard 1
│       ├── AdvancedProductCard 2
│       ├── AdvancedProductCard 3
│       └── AdvancedProductCard 4
│
├── AdvancedTestimonialsSection
│   ├── Section Header
│   └── Testimonial Cards (3)
│       ├── Rating Stars
│       ├── Testimonial Text
│       └── Author Info
│
└── AdvancedNewsletterSection
    ├── Section Header
    ├── Email Input
    └── Subscribe Button
```

---

## Responsive Breakpoints

### Mobile (< 640px)
```
┌─────────────────────────────┐
│      HEADER (COMPACT)       │
│  Logo | Menu | Search Icon  │
└─────────────────────────────┘

┌─────────────────────────────┐
│   HERO SLIDER (FULL WIDTH)  │
│                             │
│  Title (smaller)            │
│  Subtitle (smaller)         │
│  [Button 1]                 │
│  [Button 2]                 │
│                             │
└─────────────────────────────┘

┌─────────────────────────────┐
│  SECTION TITLE [View More]  │
│                             │
│  ┌─────────────────────┐   │
│  │ Product 1           │   │
│  │ Image               │   │
│  │ Title               │   │
│  │ Desc                │   │
│  │ ★ 4.8               │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Product 2           │   │
│  │ Image               │   │
│  │ Title               │   │
│  │ Desc                │   │
│  │ ★ 4.8               │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────────┐
│         HEADER (FULL)                │
│  Logo | Nav | Search | Region | Admin│
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│    HERO SLIDER (FULL WIDTH)          │
│                                      │
│  Title (medium)                      │
│  Subtitle (medium)                   │
│  [Button 1] [Button 2]               │
│                                      │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│  SECTION TITLE        [View More →]  │
│                                      │
│  ┌──────────┐  ┌──────────┐         │
│  │Product 1 │  │Product 2 │         │
│  │ Image    │  │ Image    │         │
│  │ Title    │  │ Title    │         │
│  │ Desc     │  │ Desc     │         │
│  │ ★ 4.8    │  │ ★ 4.8    │         │
│  └──────────┘  └──────────┘         │
│                                      │
│  ┌──────────┐  ┌──────────┐         │
│  │Product 3 │  │Product 4 │         │
│  │ Image    │  │ Image    │         │
│  │ Title    │  │ Title    │         │
│  │ Desc     │  │ Desc     │         │
│  │ ★ 4.8    │  │ ★ 4.8    │         │
│  └──────────┘  └──────────┘         │
│                                      │
└──────────────────────────────────────┘
```

### Desktop (> 1024px)
```
┌────────────────────────────────────────────────────────────┐
│              HEADER (FULL)                                 │
│  Logo | Nav | Search | Region | Admin                     │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│         HERO SLIDER (FULL WIDTH)                           │
│                                                            │
│  Title (large)                                             │
│  Subtitle (large)                                          │
│  [Button 1] [Button 2]                                     │
│                                                            │
│  ◄ Navigation Arrows ►                                     │
│      ● ● ● (Pagination)                                    │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│  SECTION TITLE                         [View More →]       │
│                                                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐     │
│  │Product 1 │ │Product 2 │ │Product 3 │ │Product 4 │     │
│  │ Image    │ │ Image    │ │ Image    │ │ Image    │     │
│  │ Title    │ │ Title    │ │ Title    │ │ Title    │     │
│  │ Desc     │ │ Desc     │ │ Desc     │ │ Desc     │     │
│  │ ★ 4.8    │ │ ★ 4.8    │ │ ★ 4.8    │ │ ★ 4.8    │     │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘     │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
HomePage (app/page.tsx)
    │
    ├─ getAllProducts() [Sanity CMS]
    │   └─ Returns: Product[]
    │
    ├─ Get Region from Cookies
    │   └─ Returns: "IN" | "US" | etc.
    │
    └─ Render Components
        │
        ├─ AdvancedHeroSlider
        │   └─ Static slides (no data needed)
        │
        ├─ AdvancedCategorySection (Books)
        │   ├─ Filter products by category: "books"
        │   └─ Display up to 4 products
        │
        ├─ AdvancedCategorySection (Journals)
        │   ├─ Filter products by category: "journals"
        │   └─ Display up to 4 products
        │
        ├─ AdvancedCategorySection (Gadgets)
        │   ├─ Filter products by category: "gadgets"
        │   └─ Display up to 4 products
        │
        ├─ AdvancedCategorySection (Wellness)
        │   ├─ Filter products by category: "wellness"
        │   └─ Display up to 4 products
        │
        ├─ AdvancedTestimonialsSection
        │   └─ Static testimonials (no data needed)
        │
        └─ AdvancedNewsletterSection
            └─ Form submission to /api/subscribe
```

---

## Styling Layers

```
Global Styles (app/globals.css)
    ↓
Tailwind CSS Classes
    ↓
Component-Level Styles
    ├─ Framer Motion animations
    ├─ Swiper carousel styles
    └─ Inline style props
    ↓
Responsive Breakpoints
    ├─ Mobile: < 640px
    ├─ Tablet: 640px - 1024px
    └─ Desktop: > 1024px
```

---

## Animation Layers

```
Page Load
    ├─ Hero Slider: Fade in with Framer Motion
    ├─ Section Headers: Slide up with Framer Motion
    └─ Product Cards: Staggered entrance with Framer Motion

User Interaction
    ├─ Hero Slider: Auto-slide every 5 seconds
    ├─ Product Cards: Hover zoom (scale-110)
    ├─ Buttons: Hover shadow and color change
    └─ Search Bar: Focus border change

Scroll Interaction
    ├─ Intersection Observer: Trigger animations on scroll
    ├─ Framer Motion: whileInView animations
    └─ Parallax effects: Decorative elements
```

---

## Color Scheme

```
Background Colors:
├─ Hero Section: Black (#000000)
├─ Product Sections: White (#FFFFFF)
├─ Testimonials: Light Gray (#F5F5F5)
└─ Newsletter: Black (#000000)

Text Colors:
├─ Headings: Black (#000000)
├─ Body: Gray (#333, #666)
├─ Hero Text: White (#FFFFFF)
└─ Accents: Gray (#999)

Border Colors:
├─ Cards: Light Gray (#E0E0E0)
├─ Inputs: Light Gray (#E0E0E0)
└─ Dividers: Light Gray (#E0E0E0)

Hover States:
├─ Buttons: Darker shade
├─ Cards: Shadow increase
└─ Text: Color change
```

---

## Performance Metrics

```
First Load JS:        178 kB
Homepage Size:        76.9 kB
Images:               Optimized (Next.js Image)
CSS:                  Tailwind (purged)
Animations:           GPU-accelerated (Framer Motion)
Carousel:             Lazy-loaded (Swiper)
```

---

## Accessibility Features

```
Semantic HTML:
├─ <section> for sections
├─ <h1>, <h2>, <h3> for headings
├─ <button> for buttons
└─ <a> for links

ARIA Labels:
├─ aria-label on buttons
├─ aria-haspopup on dropdowns
└─ aria-expanded on toggles

Keyboard Navigation:
├─ Tab through links and buttons
├─ Enter to activate buttons
└─ Escape to close modals

Color Contrast:
├─ Black on White: 21:1 (AAA)
├─ White on Black: 21:1 (AAA)
└─ Gray on White: 7:1 (AA)
```

---

**Last Updated**: May 9, 2026  
**Status**: Production Ready ✅
