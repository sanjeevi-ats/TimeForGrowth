# Development Server - Running Guide

## ✅ Server Status: RUNNING

The Time For Growth application is now running with both backend and frontend!

---

## Access Information

### Frontend URL
```
http://localhost:3001
```

### Development Server Details
- **Framework**: Next.js 14.2.35
- **Port**: 3001 (Port 3000 was in use)
- **Status**: ✅ Ready
- **Start Time**: 3.1 seconds
- **Environment**: .env.local loaded

---

## What's Running

### Backend (Integrated in Next.js)
- ✅ API routes (`/api/*`)
- ✅ Sanity CMS integration
- ✅ Server-side rendering
- ✅ Database connections
- ✅ Authentication (NextAuth)

### Frontend (React)
- ✅ Next.js pages
- ✅ React components
- ✅ Client-side routing
- ✅ Framer Motion animations
- ✅ Tailwind CSS styling

---

## Testing the Product Search Filter

### 1. Visit Homepage
```
http://localhost:3001
```
- See all products displayed
- Hero slider with animations
- Category cards
- Product sections (Books, Journals, Gadgets, Wellness)

### 2. Visit Search Page
```
http://localhost:3001/search
```
- See search input with placeholder
- All products displayed in grid
- Try typing to filter products

### 3. Test Search Functionality
**Try these searches:**
- Type "books" → See only book products
- Type "productivity" → See products with "productivity" in title/description
- Type "journal" → See journal products
- Type "gadgets" → See gadget products
- Type "wellness" → See wellness products
- Type "xyz" → See "No products found" state

### 4. Test Search Features
- **Real-time filtering**: Type and see results update instantly
- **Case-insensitive**: Try "BOOKS", "Books", "books" - all work
- **Multi-field search**: Search by title, category, description, tags
- **Clear button**: Click X to clear search
- **Responsive grid**: Resize browser to see 1/2/4 column layout

### 5. Test Product Cards
- **Hover effects**: Cards lift up, images zoom
- **Product links**: Click "View" button to see product details
- **Ratings**: See star ratings and review counts
- **Images**: See product images in full color

### 6. Test URL Parameters
```
http://localhost:3001/search?q=books
```
- Page loads with "books" search pre-filled
- Results show only book products
- Shareable search links work

---

## Key Pages to Test

### Homepage
```
http://localhost:3001
```
- Hero slider with animations
- Category cards (Books, Journals, Gadgets, Wellness)
- Product sections
- Testimonials
- Newsletter signup

### Search Page
```
http://localhost:3001/search
```
- Real-time product search
- Responsive grid layout
- Product filtering
- Empty state handling

### Product Detail Page
```
http://localhost:3001/products/[slug]
```
- Click any product to see details
- Full product information
- Affiliate links
- Related products

### About Page
```
http://localhost:3001/about
```
- About section content
- Mission statement
- Product categories

---

## API Endpoints

### Search API
```
GET /api/search?q=search-term
```
- Returns Algolia search results
- Used by SearchModal component

### Subscribe API
```
POST /api/subscribe
```
- Newsletter subscription
- Email validation

### Auth API
```
GET /api/auth/[...nextauth]
```
- NextAuth authentication
- Admin login

---

## Development Features

### Hot Reload
- Changes to files automatically reload
- No need to restart server
- Instant feedback during development

### TypeScript Support
- Full type checking
- IntelliSense in editor
- Error detection

### Tailwind CSS
- Utility-first CSS framework
- Real-time class compilation
- Responsive design support

### Framer Motion
- Smooth animations
- Spring physics
- Gesture support

---

## Troubleshooting

### Port Already in Use
If port 3001 is also in use, the server will try the next available port.
Check the console output for the actual port being used.

### Slow Performance
- Clear browser cache (Ctrl+Shift+Delete)
- Restart development server
- Check system resources

### Search Not Working
- Verify Sanity connection in .env.local
- Check browser console for errors
- Verify products exist in Sanity CMS

### Images Not Loading
- Check image URLs in Sanity
- Verify Next.js Image configuration
- Check CORS settings

### Animations Laggy
- Check browser performance
- Reduce number of products
- Check GPU acceleration enabled

---

## Browser DevTools

### React DevTools
- Install React DevTools extension
- Inspect component hierarchy
- Check component props and state

### Network Tab
- Monitor API calls
- Check response times
- Verify data loading

### Console Tab
- Check for errors
- View console logs
- Debug issues

### Performance Tab
- Monitor rendering performance
- Check animation smoothness
- Identify bottlenecks

---

## Testing Checklist

### Search Functionality
- [ ] Type in search input
- [ ] See products filter in real-time
- [ ] Try different search terms
- [ ] Click clear button
- [ ] Check "No products found" state
- [ ] Test URL parameters

### UI/UX
- [ ] Check responsive layout (mobile/tablet/desktop)
- [ ] Verify smooth animations
- [ ] Test hover effects
- [ ] Check product card display
- [ ] Verify images load
- [ ] Test product links

### Performance
- [ ] Search is instant (< 100ms)
- [ ] No lag when typing
- [ ] Smooth animations (60fps)
- [ ] Images lazy load
- [ ] No console errors

### Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on mobile browser

---

## Common Commands

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm run start
```

### Run Linter
```bash
npm run lint
```

### Run Type Check
```bash
npm run type-check
```

---

## Environment Variables

### Required (.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-api-token
```

### Optional
```
NEXT_PUBLIC_ALGOLIA_APP_ID=your-app-id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your-search-key
ALGOLIA_ADMIN_KEY=your-admin-key
```

---

## File Structure

### Key Directories
```
Time-For-Growth-main/
├── app/                          # Next.js app directory
│   ├── page.tsx                 # Homepage
│   ├── search/
│   │   └── page.tsx             # Search page
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx         # Product detail
│   └── api/                     # API routes
├── components/
│   ├── search/
│   │   ├── ProductSearchFilter.tsx  # Search filter component
│   │   └── SearchModal.tsx          # Search modal
│   ├── home/
│   │   └── AdvancedPremiumHome.tsx  # Home components
│   └── layout/
│       └── Header.tsx           # Navigation header
├── lib/
│   ├── sanity.ts               # Sanity client
│   └── types.ts                # TypeScript types
└── public/                      # Static assets
```

---

## Next Steps

### 1. Test Search Functionality
- Visit http://localhost:3001/search
- Type in search input
- Verify real-time filtering works

### 2. Test Product Links
- Click on any product
- Verify product detail page loads
- Check all information displays correctly

### 3. Test Responsive Design
- Resize browser window
- Check mobile layout (1 column)
- Check tablet layout (2 columns)
- Check desktop layout (4 columns)

### 4. Test Performance
- Open DevTools (F12)
- Go to Performance tab
- Record while searching
- Check for smooth animations

### 5. Test Browser Compatibility
- Test in different browsers
- Test on mobile device
- Check touch interactions

---

## Support

### Documentation
- See PRODUCT_SEARCH_FILTER_IMPLEMENTATION.md for technical details
- See PRODUCT_SEARCH_QUICK_REFERENCE.md for quick reference
- See PRODUCT_SEARCH_VISUAL_GUIDE.md for UI/UX details

### Issues
- Check browser console for errors
- Check network tab for failed requests
- Verify environment variables are set
- Check Sanity CMS connection

---

## Server Information

| Item | Value |
|------|-------|
| **URL** | http://localhost:3001 |
| **Framework** | Next.js 14.2.35 |
| **Port** | 3001 |
| **Status** | ✅ Running |
| **Start Time** | 3.1 seconds |
| **Environment** | .env.local |

---

**Server Started**: May 10, 2026
**Status**: ✅ RUNNING
**Ready for Testing**: ✅ YES
