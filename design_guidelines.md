# Smart Attendance System Design Guidelines

## Design Approach
**Desktop-like Application UI** - Create a clean, modern web interface that mimics desktop application aesthetics with professional styling and structured layouts.

## Color Palette
- **Primary Color**: Teal/Cyan (#14b8a6 or similar modern teal)
- **Purpose**: Professional, eye-friendly color scheme that conveys trust and efficiency
- Use teal/cyan for primary actions, headers, and interactive elements

## Typography
- **Font Family**: Use clear, modern sans-serif (Inter, Poppard, or similar via Google Fonts)
- **Hierarchy**:
  - Page title: text-3xl font-bold
  - Employee names: text-xl font-semibold
  - Table headers: text-sm font-medium uppercase
  - Body text: text-base
- **RTL Support**: Full right-to-left layout for Arabic content (`dir="rtl"`)

## Layout System
- **Spacing**: Use Tailwind units of 4, 6, 8 for consistent spacing (p-4, gap-6, m-8)
- **Container**: max-w-7xl centered layout
- **Grid**: Employee cards in responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)

## Core Components

### Employee Cards
- Card-based layout with subtle shadow and border
- Each card contains:
  - Employee number and name prominently displayed
  - Two action buttons side-by-side: Check In (دخول) and Check Out (خروج)
  - Font Awesome icons: `fa-arrow-right-to-bracket` for check-in, `fa-arrow-right-from-bracket` for check-out
  - Smart state management: Disable used button, enable opposite action

### Action Buttons
- Large, prominent buttons with icons
- Teal background for enabled state
- Gray/disabled state for inactive buttons
- Icons positioned before text (RTL layout)
- Clear visual feedback on click

### Attendance Log Table
- Full-width table with alternating row colors
- Columns (RTL order): الوقت (Time), نوع الحركة (Action Type), التاريخ (Date), الاسم (Name), رقم الموظف (Employee Number)
- Sticky header for easy scrolling
- Border styling for clear cell separation
- Action type badges: Green for check-in, Red for check-out

## Functionality Guidelines
- **One-Click Action**: No forms or additional inputs required
- **Automatic Timestamps**: System records exact date and time on button click
- **State Prevention**: Block duplicate consecutive actions (no double check-ins)
- **Local Persistence**: All data stored in localStorage, no backend required

## Visual Style
- Clean, minimalist design avoiding clutter
- Subtle shadows and borders for depth
- Professional spacing and alignment
- Desktop-optimized but responsive for tablets
- Modern, flat design aesthetic

## Data Display
- Chronological log showing most recent entries first
- Clear visual distinction between check-in (green accent) and check-out (red accent) actions
- Date formatted in Arabic locale
- 24-hour time format

## Images
No images required - this is a functional business application focused on efficiency and clarity.