# Mobile Product Card - Visual Layout Guide

## Mobile Layout (< 640px)
```
┌─────────────────────────────────┐
│  PRODUCT CARD (Vertical)        │
├─────────────────────────────────┤
│                                 │
│    ┌─────────────────────────┐  │
│    │                         │  │
│    │    PRODUCT IMAGE        │  │ 100% width
│    │    (100% × 128px)       │  │ 128px height
│    │                         │  │
│    └─────────────────────────┘  │
│                                 │
│  📚 CATEGORY TAG                │
│                                 │
│  Product Title That Wraps       │
│  to Two Lines Maximum           │
│                                 │
│  Short description text that    │
│  shows only 2 lines on mobile   │
│                                 │
│  ⭐⭐⭐⭐⭐ 4.5 / 5              │
│                                 │
│  ┌─────────────────────────┐    │
│  │   🛒 Buy Now            │    │
│  └─────────────────────────┘    │
│                                 │
└─────────────────────────────────┘

Padding: 12px
Gap: 12px between elements
```

## Tablet Layout (640px - 1024px)
```
┌──────────────────────────────────────────────────────┐
│  PRODUCT CARD (Horizontal)                           │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐  📚 CATEGORY TAG                      │
│  │          │                                        │
│  │  PRODUCT │  Product Title That Can Wrap          │
│  │  IMAGE   │  to Three Lines on Tablet             │
│  │          │                                        │
│  │ 160×160  │  Short description text that shows    │
│  │          │  up to 3 lines on tablet devices      │
│  │          │                                        │
│  │          │  ⭐⭐⭐⭐⭐ 4.5 / 5                    │
│  │          │                                        │
│  │          │  📍 Shopping from India — We'll       │
│  │          │  find the best available store        │
│  │          │                                        │
│  │          │  ┌──────────────────────────────┐    │
│  │          │  │   🛒 Buy Now                 │    │
│  │          │  └──────────────────────────────┘    │
│  │          │                                        │
│  └──────────┘                                        │
│                                                      │
└──────────────────────────────────────────────────────┘

Padding: 24px
Gap: 24px between image and content
Image: 160px × 160px (flex-shrink-0)
Content: flex-1 (takes remaining space)
```

## Desktop Layout (1024px+)
```
┌────────────────────────────────────────────────────────────────┐
│  PRODUCT CARD (Horizontal - Premium)                           │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐  📚 CATEGORY TAG                            │
│  │              │                                              │
│  │   PRODUCT    │  Product Title That Can Wrap to Three       │
│  │   IMAGE      │  Lines on Desktop Displays                  │
│  │              │                                              │
│  │  192×224     │  Short description text that shows up to    │
│  │  to          │  3 lines with better readability on         │
│  │  240×256     │  desktop screens                            │
│  │              │                                              │
│  │              │  ⭐⭐⭐⭐⭐ 4.5 / 5                        │
│  │              │                                              │
│  │              │  📍 Shopping from India — We'll find the    │
│  │              │  best available store for this product      │
│  │              │                                              │
│  │              │  ┌────────────────────────────────────┐    │
│  │              │  │   🛒 Buy Now                       │    │
│  │              │  └────────────────────────────────────┘    │
│  │              │                                              │
│  └──────────────┘                                              │
│                                                                │
└────────────────────────────────────────────────────────────────┘

Padding: 24px
Gap: 24px between image and content
Image: 192-240px × 224-256px (flex-shrink-0)
Content: flex-1 (takes remaining space)
```

## Component Structure

```
ProductCard (horizontal variant)
│
├── Outer Container
│   └── flex flex-col sm:flex-row gap-3 sm:gap-6
│       └── Responsive: vertical on mobile, horizontal on tablet+
│
├── Image Section (Left on tablet+, Top on mobile)
│   ├── Link wrapper
│   ├── Image container
│   │   ├── w-full sm:w-32 md:w-40 lg:w-48
│   │   ├── h-32 sm:h-40 md:h-48 lg:h-56
│   │   └── object-cover with hover scale
│   └── Rounded corners + overflow hidden
│
└── Content Section (Right on tablet+, Bottom on mobile)
    ├── flex-1 min-w-0 (prevents overflow)
    │
    ├── Top Section
    │   ├── Category Badge
    │   ├── Product Title (line-clamp-2 sm:line-clamp-3)
    │   ├── Short Description (line-clamp-2 sm:line-clamp-3)
    │   ├── Star Rating
    │   └── Location Info (hidden on mobile)
    │
    └── Bottom Section
        └── Buy Now Button (full width)
```

## Responsive Breakpoints

### Mobile (< 640px)
- **Layout**: Vertical stack
- **Image**: Full width, 128px height
- **Padding**: 12px
- **Gap**: 12px
- **Font Sizes**: Smaller (xs, base)
- **Line Clamps**: 2 lines for text
- **Use Case**: Thumb-friendly, quick scanning

### Tablet (640px - 1024px)
- **Layout**: Horizontal flex
- **Image**: 160px width, 160px height
- **Padding**: 24px
- **Gap**: 24px
- **Font Sizes**: Medium (sm, lg)
- **Line Clamps**: 3 lines for text
- **Use Case**: Balanced view, good readability

### Desktop (1024px+)
- **Layout**: Horizontal flex
- **Image**: 192-240px width, 224-256px height
- **Padding**: 24px
- **Gap**: 24px
- **Font Sizes**: Larger (base, xl)
- **Line Clamps**: 3 lines for text
- **Use Case**: Premium presentation, full details

## Spacing Details

### Mobile (12px base unit)
```
Card Padding:        12px (all sides)
Image/Content Gap:   12px
Category/Title Gap:  8px
Title/Desc Gap:      8px
Desc/Rating Gap:     8px
Rating/Button Gap:   12px
Button Padding:      8px vertical, 12px horizontal
```

### Tablet/Desktop (24px base unit)
```
Card Padding:        24px (all sides)
Image/Content Gap:   24px
Category/Title Gap:  8px
Title/Desc Gap:      8px
Desc/Rating Gap:     8px
Rating/Info Gap:     12px
Info/Button Gap:     12px
Button Padding:      10px vertical, 16px horizontal
```

## Image Sizing Strategy

### Mobile
- **Width**: 100% (full card width minus padding)
- **Height**: 128px (fixed)
- **Aspect Ratio**: Varies based on image
- **Behavior**: Full-width, maintains aspect with object-cover

### Tablet
- **Width**: 160px (fixed)
- **Height**: 160px (fixed)
- **Aspect Ratio**: 1:1 (square)
- **Behavior**: Fixed size, flex-shrink-0 prevents squishing

### Desktop
- **Width**: 192-240px (responsive)
- **Height**: 224-256px (responsive)
- **Aspect Ratio**: ~0.85:1 (portrait)
- **Behavior**: Larger fixed size, maintains proportions

## Text Truncation

### Product Title
- Mobile: 2 lines max (line-clamp-2)
- Tablet+: 3 lines max (line-clamp-3)
- Font: Bold, black color

### Description
- Mobile: 2 lines max (line-clamp-2)
- Tablet+: 3 lines max (line-clamp-3)
- Font: Regular, gray color

### Category
- Always single line
- Inline badge style
- Small font size

## Interactive States

### Image Hover
```
Default:  scale(1) opacity(1)
Hover:    scale(1.05) opacity(1)
Duration: 500ms
Easing:   ease-in-out
```

### Button States
```
Default:  bg-black text-white
Hover:    bg-gray-800
Active:   bg-gray-900
Focus:    outline-2 outline-offset-2
```

### Card Hover
```
Default:  shadow-none
Hover:    shadow-md
Duration: 300ms
```

## Color Palette

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Background | White | #FFFFFF | Card background |
| Text Primary | Black | #000000 | Titles, headings |
| Text Secondary | Gray | #666666 | Descriptions, meta |
| Border | Light Gray | #E0E0E0 | Card border, dividers |
| Background Alt | Light Gray | #F5F5F5 | Image placeholder |
| Button Primary | Black | #000000 | CTA button |
| Button Hover | Dark Gray | #1F2937 | Button hover state |

## Accessibility Considerations

1. **Touch Targets**: Minimum 44px × 44px on mobile
2. **Color Contrast**: WCAG AA compliant (4.5:1 for text)
3. **Text Sizing**: Readable at all breakpoints
4. **Semantic HTML**: Proper heading hierarchy
5. **Alt Text**: Descriptive image alt attributes
6. **Focus States**: Visible focus indicators
7. **Link Semantics**: Proper link elements

## Performance Notes

- Image sizes optimized for each breakpoint
- Lazy loading enabled by default
- Minimal CSS transitions (only on hover)
- Hardware-accelerated transforms
- No layout shifts (fixed dimensions)
- Efficient Tailwind class usage

## Browser Compatibility

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Responsive design works on all screen sizes
