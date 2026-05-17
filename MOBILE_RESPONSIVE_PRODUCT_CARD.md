# Mobile-Responsive Product Card Implementation

## Overview
Enhanced the `ProductCard` component with a mobile-optimized `horizontal` variant that provides a side-by-side layout for product details. The layout is fully responsive and adapts seamlessly from mobile to desktop.

## Layout Structure

### Mobile (< 640px)
- **Full-width vertical layout** with image on top
- Image: 100% width × 128px height
- Content below image with proper spacing
- Optimized for thumb-friendly interaction
- Compact padding (12px)

### Tablet (640px - 1024px)
- **Horizontal flex layout** with image on left
- Image: 160px width × 160px height
- Content on right side
- Medium padding (24px)
- Better use of screen real estate

### Desktop (1024px+)
- **Full horizontal layout** with larger image
- Image: 192px-240px width × 224px-256px height
- Spacious content area on right
- Full padding (24px)
- Premium presentation

## Key Features

### Image Optimization
```tsx
// Responsive image sizing with object-cover
<Image
  src={urlFor(mainImage).width(400).height(500).url()}
  alt={mainImage.alt || product.name}
  fill
  className="object-cover group-hover:scale-105 transition-transform duration-500"
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, (max-width: 1024px) 160px, 192px"
/>
```

**Benefits:**
- `object-cover` maintains aspect ratio without distortion
- Responsive `sizes` attribute ensures optimal image loading
- Smooth hover scale effect (105%) for interactivity
- Proper aspect ratio handling across all screen sizes

### Content Hierarchy
1. **Category Badge** - Small, inline tag
2. **Product Title** - Bold, line-clamped (2-3 lines)
3. **Short Description** - Truncated for mobile (2 lines), expanded on tablet (3 lines)
4. **Rating** - Star display with numeric value
5. **Additional Info** - Desktop-only location/shopping info
6. **Call-to-Action** - Full-width "Buy Now" button

### Responsive Typography
```
Mobile:
- Title: text-base (16px)
- Description: text-xs (12px)
- Button: text-xs (12px)

Tablet:
- Title: text-lg (18px)
- Description: text-sm (14px)
- Button: text-sm (14px)

Desktop:
- Title: text-xl (20px)
- Description: text-sm (14px)
- Button: text-base (16px)
```

### Spacing & Padding
```
Mobile:
- Card padding: 12px
- Gap between image/content: 12px
- Internal gaps: 8px-12px

Tablet/Desktop:
- Card padding: 24px
- Gap between image/content: 24px
- Internal gaps: 12px-16px
```

## Tailwind Classes Used

### Layout
- `flex flex-col sm:flex-row` - Vertical on mobile, horizontal on tablet+
- `gap-3 sm:gap-6` - Responsive gap between image and content
- `flex-1 min-w-0` - Content takes remaining space, prevents overflow
- `flex-shrink-0` - Image maintains fixed size

### Image Container
- `w-full sm:w-32 md:w-40 lg:w-48` - Responsive width
- `h-32 sm:h-40 md:h-48 lg:h-56` - Responsive height
- `rounded-md overflow-hidden` - Rounded corners with clipping
- `bg-[#F5F5F5]` - Light gray background

### Text
- `line-clamp-2 sm:line-clamp-3` - Responsive text truncation
- `text-xs sm:text-sm md:text-base` - Responsive font sizes
- `text-[#666]` - Secondary text color

### Interactive Elements
- `hover:scale-105 transition-transform duration-500` - Image zoom on hover
- `hover:bg-gray-800 active:bg-gray-900` - Button states
- `hover:shadow-md transition-shadow` - Card hover effect

## Color Scheme
- **Primary**: Black (#000000)
- **Secondary**: Dark Gray (#666666)
- **Background**: White (#FFFFFF)
- **Border**: Light Gray (#E0E0E0)
- **Accent**: Light Gray (#F5F5F5)

## Component Props

```tsx
interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "horizontal";
  className?: string;
}
```

### Variants
1. **default** - Traditional vertical card (grid layout)
2. **compact** - Small card for sidebars/related products
3. **horizontal** - Side-by-side layout (mobile-optimized)

## Usage Example

```tsx
// In products page
<ProductCard product={product} variant="horizontal" />

// With custom styling
<ProductCard 
  product={product} 
  variant="horizontal"
  className="mb-4"
/>
```

## Responsive Breakpoints

| Breakpoint | Width | Layout | Image Size |
|-----------|-------|--------|-----------|
| Mobile | < 640px | Vertical | 100% × 128px |
| Tablet | 640px - 1024px | Horizontal | 160px × 160px |
| Desktop | 1024px+ | Horizontal | 192-240px × 224-256px |

## Performance Optimizations

1. **Image Optimization**
   - Responsive `sizes` attribute for optimal loading
   - Sanity CDN image transformation (width/height)
   - Lazy loading by default with Next.js Image

2. **CSS Optimization**
   - Minimal transitions (only on hover)
   - Hardware-accelerated transforms (scale)
   - Efficient Tailwind classes

3. **Layout Stability**
   - `flex-shrink-0` prevents image squishing
   - `min-w-0` prevents content overflow
   - Fixed aspect ratios prevent layout shift

## Accessibility Features

- Semantic HTML structure
- Proper alt text for images
- Clear visual hierarchy
- Sufficient color contrast
- Touch-friendly button sizes (min 44px on mobile)
- Proper link semantics

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes
- Graceful degradation for older browsers

## Future Enhancements

1. **Price Display** - Add price information to the card
2. **Stock Status** - Show availability/stock levels
3. **Quick Add to Cart** - Direct cart functionality
4. **Wishlist** - Heart icon for favorites
5. **Comparison** - Checkbox for product comparison
6. **Reviews** - Inline review snippets
7. **Badges** - "New", "Sale", "Popular" indicators

## Testing Checklist

- [ ] Mobile (320px - 480px) - Vertical layout, proper spacing
- [ ] Tablet (640px - 1024px) - Horizontal layout, readable text
- [ ] Desktop (1024px+) - Full layout, premium appearance
- [ ] Image loading - Proper aspect ratio, no distortion
- [ ] Text overflow - No text breaking layout
- [ ] Button interaction - Hover/active states work
- [ ] Touch targets - Buttons are 44px+ on mobile
- [ ] Performance - Images load efficiently
- [ ] Accessibility - Screen reader friendly

## Related Files

- `components/products/ProductCard.tsx` - Main component
- `app/products/page.tsx` - Products listing page
- `lib/types.ts` - Product type definitions
- `lib/sanity.ts` - Sanity client configuration
