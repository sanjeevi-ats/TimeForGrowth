# Product Card - Quick Reference Guide

## Usage

### Basic Usage
```tsx
import ProductCard from "@/components/products/ProductCard";

// Horizontal variant (mobile-responsive side-by-side)
<ProductCard product={product} variant="horizontal" />

// Default variant (vertical card)
<ProductCard product={product} variant="default" />

// Compact variant (small card)
<ProductCard product={product} variant="compact" />
```

### With Custom Styling
```tsx
<ProductCard 
  product={product} 
  variant="horizontal"
  className="mb-4 shadow-lg"
/>
```

## Responsive Breakpoints

| Screen Size | Layout | Image Size | Padding | Gap |
|------------|--------|-----------|---------|-----|
| Mobile < 640px | Vertical | 100% × 128px | 12px | 12px |
| Tablet 640-1024px | Horizontal | 160px × 160px | 24px | 24px |
| Desktop 1024px+ | Horizontal | 192-240px × 224-256px | 24px | 24px |

## Component Structure

```
ProductCard (horizontal)
├── Image Container (Left on tablet+, Top on mobile)
│   ├── Responsive sizing
│   ├── object-cover
│   └── Hover scale effect
└── Content Container (Right on tablet+, Bottom on mobile)
    ├── Category Badge
    ├── Product Title (line-clamped)
    ├── Short Description (line-clamped)
    ├── Star Rating
    ├── Location Info (desktop only)
    └── Buy Now Button
```

## Key Features

### ✅ Mobile Optimized
- Full-width vertical layout on mobile
- Thumb-friendly button sizes (44px+)
- Optimized image loading
- Compact spacing

### ✅ Responsive Images
- Adaptive sizing for each breakpoint
- Responsive `sizes` attribute
- Sanity CDN optimization
- Hover scale effect

### ✅ Text Handling
- Line clamping (2 lines mobile, 3 lines tablet+)
- Prevents text overflow
- Responsive font sizes
- Proper hierarchy

### ✅ Interactive Elements
- Hover effects on image and card
- Active button states
- Smooth transitions
- Touch-friendly

### ✅ Accessibility
- Semantic HTML
- Proper alt text
- Color contrast (WCAG AA)
- Keyboard navigation

## Tailwind Classes Cheat Sheet

### Layout
```
flex flex-col sm:flex-row    # Vertical mobile, horizontal tablet+
gap-3 sm:gap-6              # 12px mobile, 24px tablet+
flex-1 min-w-0              # Content takes space, prevents overflow
flex-shrink-0               # Image maintains size
```

### Sizing
```
w-full sm:w-32 md:w-40 lg:w-48    # Responsive width
h-32 sm:h-40 md:h-48 lg:h-56      # Responsive height
```

### Text
```
text-base sm:text-lg md:text-xl   # Responsive font size
line-clamp-2 sm:line-clamp-3      # 2 lines mobile, 3 tablet+
font-bold text-black              # Bold, primary color
```

### Spacing
```
p-3 sm:p-6                        # 12px mobile, 24px tablet+
mb-1 sm:mb-2                      # Responsive margin
gap-2                             # Space between elements
```

### Colors
```
bg-white                          # Card background
text-black                        # Primary text
text-[#666]                       # Secondary text
border-[#E0E0E0]                  # Border color
bg-[#F5F5F5]                      # Image placeholder
```

### Interactive
```
hover:scale-105 transition-transform duration-500    # Image hover
hover:bg-gray-800 active:bg-gray-900                 # Button states
hover:shadow-md transition-shadow duration-300       # Card hover
```

## Image Optimization

### Sanity CDN Transform
```tsx
urlFor(mainImage).width(400).height(500).url()
```
- Pre-transforms to 400×500px
- Reduces file size
- Maintains aspect ratio

### Responsive Sizes
```tsx
sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, (max-width: 1024px) 160px, 192px"
```
- Mobile: 100vw (full viewport)
- Tablet: 160px
- Desktop: 192px

### Object Cover
```tsx
className="object-cover"
```
- Maintains aspect ratio
- Fills container
- No distortion

## Responsive Behavior

### Mobile (< 640px)
```
┌─────────────────────┐
│ Image (100% × 128px)│
├─────────────────────┤
│ Category            │
│ Title (2 lines)     │
│ Description (2 ln)  │
│ Rating              │
│ Button              │
└─────────────────────┘
```

### Tablet (640px - 1024px)
```
┌──────────────────────────────────┐
│ Image (160×160) │ Category       │
│                 │ Title (3 lines)│
│                 │ Description    │
│                 │ Rating         │
│                 │ Info           │
│                 │ Button         │
└──────────────────────────────────┘
```

### Desktop (1024px+)
```
┌────────────────────────────────────────┐
│ Image (192×224) │ Category             │
│                 │ Title (3 lines)      │
│                 │ Description (3 lines)│
│                 │ Rating               │
│                 │ Info                 │
│                 │ Button               │
└────────────────────────────────────────┘
```

## Color Palette

| Element | Color | Hex |
|---------|-------|-----|
| Background | White | #FFFFFF |
| Text Primary | Black | #000000 |
| Text Secondary | Gray | #666666 |
| Border | Light Gray | #E0E0E0 |
| Placeholder | Light Gray | #F5F5F5 |
| Button Hover | Dark Gray | #1F2937 |

## Common Customizations

### Change Button Text
```tsx
// In ProductCard.tsx, line ~60
🛒 Buy Now  →  Your Custom Text
```

### Adjust Image Size
```tsx
// Change width classes
w-full sm:w-32 md:w-40 lg:w-48  →  w-full sm:w-40 md:w-48 lg:w-56

// Change height classes
h-32 sm:h-40 md:h-48 lg:h-56  →  h-40 sm:h-48 md:h-56 lg:h-64
```

### Modify Spacing
```tsx
// Change gap
gap-3 sm:gap-6  →  gap-4 sm:gap-8

// Change padding
p-3 sm:p-6  →  p-4 sm:p-8
```

### Adjust Text Truncation
```tsx
// Change line clamps
line-clamp-2 sm:line-clamp-3  →  line-clamp-1 sm:line-clamp-2
```

## Performance Tips

1. **Image Loading**
   - Use responsive `sizes` attribute
   - Let Sanity CDN pre-transform
   - Next.js Image handles optimization

2. **CSS Performance**
   - Minimal transitions (hover only)
   - Hardware-accelerated transforms
   - Efficient Tailwind classes

3. **Layout Stability**
   - Fixed dimensions prevent shift
   - `flex-shrink-0` prevents squishing
   - `min-w-0` prevents overflow

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ✅ All screen sizes

## Accessibility Checklist

- ✅ Semantic HTML
- ✅ Proper alt text
- ✅ Color contrast (WCAG AA)
- ✅ Touch targets (44px+)
- ✅ Keyboard navigation
- ✅ Focus states
- ✅ Screen reader friendly

## Related Files

- `components/products/ProductCard.tsx` - Main component
- `app/products/page.tsx` - Products listing
- `lib/types.ts` - Type definitions
- `lib/sanity.ts` - Sanity configuration

## Documentation

- `MOBILE_RESPONSIVE_PRODUCT_CARD.md` - Full documentation
- `MOBILE_PRODUCT_CARD_VISUAL_GUIDE.md` - Visual layouts
- `PRODUCT_CARD_IMPLEMENTATION_DETAILS.md` - Technical details
- `PRODUCT_CARD_QUICK_REFERENCE.md` - This file

## Support

For questions or issues:
1. Check the documentation files
2. Review the component code
3. Test on different screen sizes
4. Verify image loading
5. Check console for errors
