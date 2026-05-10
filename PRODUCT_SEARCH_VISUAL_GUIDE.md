# Product Search Filter - Visual Reference Guide

## UI Layout

### Search Page Structure
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Explore Products                                       │
│  Browse our curated collection of self-improvement...   │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  🔍 [Search input field]                          ✕    │
│  Found 24 products matching "books"                     │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ Product  │  │ Product  │  │ Product  │  │ Product  ││
│  │  Image   │  │  Image   │  │  Image   │  │  Image   ││
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤│
│  │ BOOKS    │  │ JOURNALS │  │ GADGETS  │  │ WELLNESS ││
│  │ Title    │  │ Title    │  │ Title    │  │ Title    ││
│  │ Desc...  │  │ Desc...  │  │ Desc...  │  │ Desc...  ││
│  │ ★★★★★   │  │ ★★★★★   │  │ ★★★★★   │  │ ★★★★★   ││
│  │ [View]   │  │ [View]   │  │ [View]   │  │ [View]   ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ Product  │  │ Product  │  │ Product  │  │ Product  ││
│  │  Image   │  │  Image   │  │  Image   │  │  Image   ││
│  ├──────────┤  ├──────────┤  ├──────────┤  ├──────────┤│
│  │ BOOKS    │  │ JOURNALS │  │ GADGETS  │  │ WELLNESS ││
│  │ Title    │  │ Title    │  │ Title    │  │ Title    ││
│  │ Desc...  │  │ Desc...  │  │ Desc...  │  │ Desc...  ││
│  │ ★★★★★   │  │ ★★★★★   │  │ ★★★★★   │  │ ★★★★★   ││
│  │ [View]   │  │ [View]   │  │ [View]   │  │ [View]   ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Search Input Component

### Default State
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 Search by title, category, description, or keywords… │
└─────────────────────────────────────────────────────────┘
```

### With Text
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 books                                            ✕   │
└─────────────────────────────────────────────────────────┘
Found 8 products matching "books"
```

### Focus State
```
┌─────────────────────────────────────────────────────────┐
│ 🔍 books                                            ✕   │
└─────────────────────────────────────────────────────────┘
(Border turns black)
```

## Product Card Component

### Card Structure
```
┌──────────────────────────────┐
│                              │
│      Product Image           │
│    (Square, Colorful)        │
│                              │
├──────────────────────────────┤
│ CATEGORY BADGE               │
│                              │
│ Product Title (2 lines max)  │
│                              │
│ Short description text       │
│ (2 lines max)                │
│                              │
├──────────────────────────────┤
│ ★★★★★ 4.5 (128 reviews)     │
│                              │
│                    [View →]  │
└──────────────────────────────┘
```

### Hover State
```
┌──────────────────────────────┐
│                              │
│      Product Image           │
│    (Zoomed 105%)             │
│    [Quick View overlay]      │
│                              │
├──────────────────────────────┤
│ CATEGORY BADGE               │
│                              │
│ Product Title (darker)       │
│                              │
│ Short description text       │
│                              │
├──────────────────────────────┤
│ ★★★★★ 4.5 (128 reviews)     │
│                              │
│                    [View →]  │
└──────────────────────────────┘
(Card lifted up, border darker, shadow increased)
```

## Empty State

### No Results
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                        🔍                              │
│                                                         │
│              No products found                         │
│                                                         │
│  We couldn't find any products matching "xyz"          │
│                                                         │
│              [Clear search]                            │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Responsive Layouts

### Mobile (< 640px)
```
┌─────────────────────────┐
│ 🔍 [Search input]   ✕   │
├─────────────────────────┤
│ ┌─────────────────────┐ │
│ │   Product Card      │ │
│ │   (1 column)        │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │   Product Card      │ │
│ │   (1 column)        │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │   Product Card      │ │
│ │   (1 column)        │ │
│ └─────────────────────┘ │
└─────────────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────────────┐
│ 🔍 [Search input]                    ✕   │
├──────────────────────────────────────────┤
│ ┌──────────────┐  ┌──────────────┐      │
│ │ Product Card │  │ Product Card │      │
│ │  (2 columns) │  │  (2 columns) │      │
│ └──────────────┘  └──────────────┘      │
│ ┌──────────────┐  ┌──────────────┐      │
│ │ Product Card │  │ Product Card │      │
│ │  (2 columns) │  │  (2 columns) │      │
│ └──────────────┘  └──────────────┘      │
└──────────────────────────────────────────┘
```

### Desktop (> 1024px)
```
┌────────────────────────────────────────────────────────────────┐
│ 🔍 [Search input]                                          ✕   │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Product  │ │ Product  │ │ Product  │ │ Product  │           │
│ │  Card    │ │  Card    │ │  Card    │ │  Card    │           │
│ │(4 cols)  │ │(4 cols)  │ │(4 cols)  │ │(4 cols)  │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Product  │ │ Product  │ │ Product  │ │ Product  │           │
│ │  Card    │ │  Card    │ │  Card    │ │  Card    │           │
│ │(4 cols)  │ │(4 cols)  │ │(4 cols)  │ │(4 cols)  │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
└────────────────────────────────────────────────────────────────┘
```

## Color Scheme

### Search Input
- **Border**: #E5E7EB (gray-200)
- **Border Hover**: #D1D5DB (gray-300)
- **Border Focus**: #000000 (black)
- **Background**: #FFFFFF (white)
- **Text**: #000000 (black)
- **Placeholder**: #9CA3AF (gray-400)
- **Icon**: #9CA3AF (gray-400)

### Product Card
- **Border**: #E5E7EB (gray-200)
- **Border Hover**: #D1D5DB (gray-300)
- **Background**: #FFFFFF (white)
- **Title**: #000000 (black)
- **Title Hover**: #1F2937 (gray-800)
- **Description**: #4B5563 (gray-600)
- **Category**: #6B7280 (gray-500)
- **Rating**: #FBBF24 (yellow-400)
- **Button**: #000000 (black)
- **Button Hover**: #111827 (gray-900)

### Empty State
- **Icon**: #E5E7EB (gray-200)
- **Title**: #000000 (black)
- **Text**: #4B5563 (gray-600)

## Typography

### Headings
- **Page Title**: 36px (sm: 48px), font-black, black
- **Page Subtitle**: 18px, gray-600

### Search Input
- **Placeholder**: 16px, gray-400
- **Text**: 16px, black

### Product Card
- **Category**: 12px, uppercase, gray-500
- **Title**: 16px, font-bold, black
- **Description**: 14px, gray-600
- **Rating**: 12px, font-semibold, black
- **Review Count**: 12px, gray-500

### Empty State
- **Title**: 20px, font-bold, black
- **Text**: 16px, gray-600

## Spacing

### Search Input
- **Padding**: 16px (px-4 py-4)
- **Border**: 2px
- **Border Radius**: 12px (rounded-xl)
- **Max Width**: 896px (max-w-2xl)

### Results Grid
- **Gap**: 24px (gap-6)
- **Padding**: 32px (py-12 sm:py-16)
- **Max Width**: 1280px (max-w-7xl)

### Product Card
- **Padding**: 16px (p-4 sm:p-5)
- **Border Radius**: 12px (rounded-xl)
- **Space Between Elements**: 12px (space-y-3)

## Animations

### Results Grid
- **Duration**: 300ms
- **Easing**: ease-out
- **Stagger**: 50ms per item
- **Effect**: Fade in + slide up

### Product Card Hover
- **Duration**: 300ms
- **Easing**: easeOut
- **Effect**: Lift up (-12px)

### Image Hover
- **Duration**: 500ms
- **Effect**: Scale 105%

### Button Hover
- **Duration**: Spring physics
- **Stiffness**: 400
- **Damping**: 17
- **Effect**: Scale 108%

### Button Click
- **Duration**: Spring physics
- **Effect**: Scale 95%

## Interaction States

### Search Input
- **Default**: Gray border, white background
- **Hover**: Darker gray border
- **Focus**: Black border, white background
- **With Text**: Clear button visible

### Product Card
- **Default**: Gray border, white background
- **Hover**: Darker border, lifted up, increased shadow
- **Image Hover**: Zoomed 105%, overlay appears

### Button
- **Default**: Black background, white text
- **Hover**: Darker black, scaled up
- **Click**: Scaled down

## Accessibility

### Focus Indicators
- **Search Input**: Black border on focus
- **Clear Button**: Visible focus outline
- **Product Card**: Visible focus outline
- **View Button**: Visible focus outline

### Color Contrast
- **Text on White**: 21:1 (AAA)
- **Gray Text**: 7:1 (AA)
- **Button**: 21:1 (AAA)

### Touch Targets
- **Search Input**: 44px minimum height
- **Clear Button**: 44px minimum
- **Product Card**: 44px minimum interactive area
- **View Button**: 44px minimum

## Responsive Breakpoints

| Breakpoint | Width | Columns | Padding |
|-----------|-------|---------|---------|
| Mobile | < 640px | 1 | 16px |
| Tablet | 640px - 1024px | 2 | 24px |
| Desktop | > 1024px | 4 | 32px |

## Animation Timings

| Element | Duration | Delay | Easing |
|---------|----------|-------|--------|
| Results Grid | 300ms | - | ease-out |
| Grid Items | 300ms | 50ms × index | ease-out |
| Card Hover | 300ms | - | easeOut |
| Image Hover | 500ms | - | linear |
| Button Hover | Spring | - | spring |

---

**Last Updated**: May 10, 2026
**Version**: 1.0
**Status**: Complete
