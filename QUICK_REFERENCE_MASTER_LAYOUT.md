# Quick Reference: Master Layout Structure

## The Master Reference (Source of Truth)

All home page sections now follow this exact structure:

```typescript
<section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="mb-12">
    <h2 className="text-3xl font-black text-black">{title}</h2>
  </div>
  <div className="stagger-children grid grid-cols-2 tablet:grid-cols-4 gap-4">
    {/* content */}
  </div>
</section>
```

---

## Key CSS Classes Explained

### Container Width
- **`max-w-7xl`** = Maximum width of 1280px (Tailwind default)
- Used for all sections to ensure consistent width

### Horizontal Padding (Responsive)
- **`px-4`** = 16px padding on mobile (< 640px)
- **`sm:px-6`** = 24px padding on tablet (640px - 1024px)
- **`lg:px-8`** = 32px padding on desktop (> 1024px)

### Vertical Spacing
- **`py-20`** = 80px padding top and bottom
- Creates consistent breathing room between sections

### Center Alignment
- **`mx-auto`** = Margin auto on left and right
- Centers the container on the page

### Grid Layout
- **`grid`** = CSS Grid display
- **`grid-cols-2`** = 2 columns on mobile
- **`tablet:grid-cols-4`** = 4 columns on tablet and up
- **`gap-4`** = 16px gap between grid items

### Animation Classes
- **`stagger-children`** = Enables staggered animation for child elements
- **`animate-on-scroll`** = Triggers animation when element enters viewport

---

## All Sections Using Master Layout

### 1. HeroSection
```typescript
<div className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
```
✅ Uses master structure

### 2. CategoryGrid (BEST GROWTH JOURNALS)
```typescript
<div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```
✅ Uses master structure

### 3. CategoryProductsSection (BOOKS, JOURNALS, GADGETS, WELLNESS)
```typescript
<section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```
✅ Uses master structure

### 4. StatsParallaxStrip (WHY TRUST US)
```typescript
<div className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```
✅ Uses master structure

### 5. EmailBanner (JOIN OUR JOURNEY)
```typescript
<div className="relative z-10 py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
```
✅ Uses master structure

---

## Alignment Checklist

When adding new sections to the home page, ensure:

- [ ] Container uses `max-w-7xl`
- [ ] Container uses `mx-auto` for centering
- [ ] Container uses `px-4 sm:px-6 lg:px-8` for padding
- [ ] Section uses `py-20` for vertical spacing
- [ ] Grids use `grid-cols-2 tablet:grid-cols-4 gap-4`
- [ ] Grids use `stagger-children` class
- [ ] Cards use `animate-on-scroll` class
- [ ] All sections align with other sections

---

## Responsive Behavior

### Mobile (< 640px)
- Container width: Full width with `px-4` padding
- Grid: 2 columns
- Effective width: 100% - 32px

### Tablet (640px - 1024px)
- Container width: Full width with `sm:px-6` padding
- Grid: 4 columns
- Effective width: 100% - 48px

### Desktop (> 1024px)
- Container width: `max-w-7xl` (1280px) with `lg:px-8` padding
- Grid: 4 columns
- Effective width: 1280px - 64px = 1216px

---

## Common Mistakes to Avoid

❌ **DON'T** use different container widths:
```typescript
// Wrong
<div className="max-w-5xl mx-auto">  // ❌ Different width
<div className="max-w-3xl mx-auto">  // ❌ Different width
```

✅ **DO** use consistent container width:
```typescript
// Correct
<div className="max-w-7xl mx-auto">  // ✅ Same width
<div className="max-w-7xl mx-auto">  // ✅ Same width
```

---

❌ **DON'T** forget center alignment:
```typescript
// Wrong
<div className="max-w-7xl px-4 sm:px-6 lg:px-8">  // ❌ Not centered
```

✅ **DO** include mx-auto:
```typescript
// Correct
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  // ✅ Centered
```

---

❌ **DON'T** use inconsistent grid layouts:
```typescript
// Wrong
<div className="grid grid-cols-3 gap-6">  // ❌ Different columns
<div className="grid grid-cols-2 gap-4">  // ❌ Different gap
```

✅ **DO** use consistent grid layout:
```typescript
// Correct
<div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">  // ✅ Consistent
<div className="grid grid-cols-2 tablet:grid-cols-4 gap-4">  // ✅ Consistent
```

---

## File Location

**Master Layout Implementation**: `components/home/HomeSections.tsx`

**Key Components**:
- `CategoryProductsSection` - Master reference component
- `HeroSection` - Updated to match master
- `CategoryGrid` - Updated to match master
- `StatsParallaxStrip` - Updated to match master
- `EmailBanner` - Updated to match master

---

## Quick Copy-Paste Template

For new sections, use this template:

```typescript
export function NewSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h2 className="text-3xl font-black text-black">Section Title</h2>
      </div>
      <div className="stagger-children grid grid-cols-2 tablet:grid-cols-4 gap-4">
        {/* Your content here */}
      </div>
    </section>
  );
}
```

---

## Verification

To verify a section uses the master layout:

1. Check container has `max-w-7xl`
2. Check container has `mx-auto`
3. Check container has `px-4 sm:px-6 lg:px-8`
4. Check section has `py-20`
5. Check grids have `grid-cols-2 tablet:grid-cols-4 gap-4`
6. Check grids have `stagger-children`
7. Check cards have `animate-on-scroll`

If all checks pass ✅, the section uses the master layout correctly.

---

## Summary

**Master Layout = Perfect Alignment**

All home page sections now use:
- ✅ Same container width (`max-w-7xl`)
- ✅ Same padding (`px-4 sm:px-6 lg:px-8`)
- ✅ Same spacing (`py-20`)
- ✅ Same grid layout (`grid-cols-2 tablet:grid-cols-4 gap-4`)
- ✅ Same alignment (`mx-auto`)
- ✅ Same animations (`stagger-children`, `animate-on-scroll`)

Result: **Cohesive, professional, perfectly aligned home page** 🎯
