# Development Guide - Time For Growth

**Last Updated**: May 9, 2026

---

## Quick Start

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Visit `http://localhost:3000`

### Build for Production
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

---

## Project Structure

```
Time-For-Growth-main/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage (MAIN FILE)
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   ├── api/                     # API routes
│   ├── admin/                   # Admin panel
│   ├── products/                # Product pages
│   └── ...
├── components/
│   ├── home/
│   │   ├── AdvancedPremiumHome.tsx  # ACTIVE COMPONENTS
│   │   ├── PremiumHomeSections.tsx  # Previous version
│   │   └── HomeSections.tsx         # Original version
│   ├── layout/
│   │   └── Header.tsx           # Navbar with search
│   ├── search/
│   │   └── SearchModal.tsx      # Search modal
│   └── ...
├── lib/
│   ├── sanity.ts                # Sanity CMS client
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Utilities
├── public/                       # Static assets
└── ...
```

---

## Key Files to Know

### Homepage (`app/page.tsx`)
- Fetches all products from Sanity CMS
- Renders 4 category sections
- Uses AdvancedPremiumHome components
- Detects user region from cookies

### Components (`components/home/AdvancedPremiumHome.tsx`)
- **AdvancedHeroSlider**: Full-width carousel
- **AdvancedCategorySection**: Product section with filtering
- **AdvancedProductCard**: Individual product card
- **AdvancedTestimonialsSection**: Testimonials
- **AdvancedNewsletterSection**: Newsletter signup

### Header (`components/layout/Header.tsx`)
- Sticky navbar
- Search bar (opens SearchModal)
- Region selector
- Navigation links
- Admin link

---

## Making Changes

### Adding a New Product Section

1. Open `app/page.tsx`
2. Add a new `<AdvancedCategorySection />` component:

```tsx
<AdvancedCategorySection 
  products={allProducts} 
  categoryName="YourCategory" 
  categorySlug="your-category"
  sectionTitle="YOUR SECTION TITLE"
  region={region}
/>
```

3. Run `npm run build` to verify

### Modifying Hero Slider

1. Open `components/home/AdvancedPremiumHome.tsx`
2. Find the `slides` array in `AdvancedHeroSlider` function
3. Update slide content:

```tsx
const slides = [
  {
    title: "Your Title",
    subtitle: "Your subtitle",
    cta1: "Button 1",
    cta2: "Button 2",
  },
  // ... more slides
];
```

4. Run `npm run build` to verify

### Changing Colors

1. Open `components/home/AdvancedPremiumHome.tsx`
2. Update Tailwind classes:
   - `bg-black` → `bg-[#yourcolor]`
   - `text-white` → `text-[#yourcolor]`
   - `border-gray-200` → `border-[#yourcolor]`

3. Run `npm run build` to verify

### Updating Search Bar

1. Open `components/layout/Header.tsx`
2. Modify the search input section
3. Update placeholder, styling, or behavior
4. Run `npm run build` to verify

---

## Design System Reference

### Colors
```
Black:       #000000
White:       #FFFFFF
Light Gray:  #F5F5F5
Gray:        #E0E0E0, #999, #666
```

### Spacing
```
Container:   max-w-7xl (1280px)
Padding:     px-4 sm:px-6 lg:px-8
Vertical:    py-20 to py-24
Gap:         gap-4 to gap-8
```

### Typography
```
Hero Title:  text-5xl sm:text-6xl lg:text-7xl
Section:     text-4xl
Body:        text-sm to text-lg
Weight:      font-black (headings), font-medium (body)
```

### Rounded Corners
```
Cards:       rounded-2xl
Buttons:     rounded-full
Inputs:      rounded-full
```

### Shadows
```
Light:       shadow-lg
Heavy:       shadow-xl
Hover:       shadow-2xl
```

---

## Common Tasks

### Add a New Testimonial

1. Open `components/home/AdvancedPremiumHome.tsx`
2. Find `AdvancedTestimonialsSection` function
3. Add to `testimonials` array:

```tsx
{
  name: "Person Name",
  role: "Their Role",
  text: "Their testimonial text",
  rating: 5,
}
```

### Update Newsletter Section

1. Open `components/home/AdvancedPremiumHome.tsx`
2. Find `AdvancedNewsletterSection` function
3. Update heading, subtitle, or button text

### Change Product Grid Columns

1. Open `components/home/AdvancedPremiumHome.tsx`
2. Find grid class in `AdvancedCategorySection`:
   ```tsx
   className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
   ```
3. Change `lg:grid-cols-4` to desired number

### Adjust Auto-Slide Speed

1. Open `components/home/AdvancedPremiumHome.tsx`
2. Find Swiper `autoplay` prop:
   ```tsx
   autoplay={{ delay: 5000, disableOnInteraction: false }}
   ```
3. Change `5000` (milliseconds) to desired speed

---

## Styling Guide

### Using Tailwind CSS

All styling uses Tailwind CSS classes. Common patterns:

```tsx
// Responsive text size
className="text-sm sm:text-base lg:text-lg"

// Responsive grid
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"

// Hover effects
className="hover:scale-110 hover:shadow-xl transition-all duration-300"

// Responsive padding
className="px-4 sm:px-6 lg:px-8 py-20"

// Conditional classes
className={cn(
  "base-class",
  condition && "conditional-class"
)}
```

### Adding Custom Styles

If Tailwind doesn't have what you need:

1. Add to `app/globals.css`:
```css
.custom-class {
  /* your styles */
}
```

2. Use in component:
```tsx
className="custom-class"
```

---

## Animation Guide

### Framer Motion

Used for entrance animations:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Content
</motion.div>
```

### Tailwind Transitions

Used for hover effects:

```tsx
className="transition-all duration-300 hover:scale-110"
```

### Swiper Animations

Hero slider uses Swiper's fade effect:

```tsx
<Swiper
  effect="fade"
  autoplay={{ delay: 5000 }}
  // ...
>
```

---

## Testing

### Build Test
```bash
npm run build
```

### Lint Test
```bash
npm run lint
```

### Manual Testing Checklist
- [ ] Hero slider displays and auto-slides
- [ ] Category sections show products
- [ ] Search bar opens modal
- [ ] Navigation links work
- [ ] Responsive on mobile/tablet/desktop
- [ ] Hover animations smooth
- [ ] Newsletter form works
- [ ] No console errors

---

## Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables
Required in `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=https://yourdomain.com
```

---

## Troubleshooting

### Build Fails
1. Check for TypeScript errors: `npm run build`
2. Clear cache: `rm -rf .next`
3. Reinstall dependencies: `npm install`

### Styles Not Applying
1. Check Tailwind class names are correct
2. Verify `globals.css` is imported in `layout.tsx`
3. Restart dev server

### Images Not Loading
1. Check image URL is valid
2. Verify Sanity image configuration
3. Check Next.js Image component props

### Search Not Working
1. Verify SearchModal component exists
2. Check `/api/search` endpoint
3. Verify Algolia configuration

---

## Performance Tips

1. **Images**: Use Next.js Image component (already done)
2. **Lazy Loading**: Use Framer Motion's `whileInView`
3. **Code Splitting**: Next.js handles automatically
4. **CSS**: Tailwind purges unused styles
5. **Caching**: Set appropriate cache headers

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Swiper Documentation](https://swiperjs.com/)
- [Sanity CMS Documentation](https://www.sanity.io/docs)

---

## Support

For issues or questions:
1. Check `PROJECT_STATUS_SUMMARY.md`
2. Check `VERIFICATION_CHECKLIST.md`
3. Check `ADVANCED_HERO_SLIDER_GUIDE.md`
4. Review component source code
5. Check console for errors

---

## Version History

- **v1.0** (May 9, 2026): Advanced hero slider with full-width carousel, 4 category sections, search bar, testimonials, newsletter
- **v0.2** (Previous): Premium homepage with category sections
- **v0.1** (Original): Initial home page with category icons

---

**Last Updated**: May 9, 2026  
**Status**: Production Ready ✅
