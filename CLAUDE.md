# Claude Development Instructions

## ⚠️ CRITICAL: Mobile-First Design Requirement

**ALL DESIGNS MUST BE MOBILE-FIRST DESIGNS**

- Start with mobile layout and scale up to desktop
- All inputs should be full width on mobile devices
- Use responsive design patterns with `sm:`, `md:`, `lg:` prefixes
- Test mobile experience first before desktop
- Ensure touch-friendly interactions and appropriate spacing

## Tech Stack

This project uses:

- **Nuxt 4** - The latest version of the Vue.js framework with Cloudflare Workers deployment
- **Typst.ts** - TypeScript bindings for Typst document compilation
- **shadcn-vue** - Component library for consistent UI components
- **Pinia** - State management with automatic persistence to localStorage
- **Tailwind CSS** - Utility-first CSS framework
- **@vuepic/vue-datepicker** - Month/year date picker component

## Deployment

- **Cloudflare Workers** - Deployed via `wrangler.toml` configuration
- **Git Integration** - Automatic deployment on push to main branch via Workers Builds
- **Build Command**: `npm run build`
- **Deploy Command**: `npx wrangler deploy`

## Project Structure & Component System

### Component Architecture Overview

The application follows a consistent, reusable component architecture:

#### Core Components

1. **AddButton** (`app/components/AddButton.vue`)
    - Reusable dashed-border button for adding new items
    - Consistent styling with Plus icon from lucide-vue-next
    - Props: `label: string`
    - Emits: `click` event

2. **FormContainer** (`app/components/FormContainer.vue`)
    - Main wrapper for all form sections
    - Integrates EditableHeader for in-place title editing
    - Supports `header-actions` slot for column placement controls
    - Props: `title`, `isEmpty`, `emptyMessage`, `addButtonLabel`, `showAddButton`, `editable`
    - Handles empty states and add button placement

3. **FormCard** (`app/components/FormCard.vue`)
    - Individual item cards with built-in delete functionality
    - Integrates ConfirmationModal for destructive actions
    - Props: `title`, `confirmTitle`, `confirmMessage`
    - Uses shadcn-vue Card components for consistent styling

4. **EditableHeader** (`app/components/EditableHeader.vue`)
    - In-place header editing with save/cancel controls
    - Uses native input with border styling
    - Keyboard shortcuts: Enter to save, Escape to cancel
    - Focus management and text selection

5. **ConfirmationModal** (`app/components/ConfirmationModal.vue`)
    - Reusable modal for delete confirmations
    - Props: `isOpen`, `title`, `message`, `confirmText`, `cancelText`
    - Red destructive button styling with AlertTriangle icon
    - Backdrop click handling

6. **MonthYearPicker** (`app/components/MonthYearPicker.vue`)
    - Custom date picker using @vuepic/vue-datepicker
    - Month-only selection with YYYY-MM format
    - Props: `modelValue`, `label`, `placeholder`, `disabled`
    - Handles various date formats from the picker library

#### Form Components

All form components follow the same pattern:

- Use `FormContainer` as wrapper
- Use `FormCard` for individual items
- Direct store integration (no prop drilling)
- Column placement controls for movable sections
- Consistent field layouts with responsive grids

**Form Components:**

- `PersonalInfoForm.vue` - Personal information and social links
- `ExperienceForm.vue` - Work experience with achievements
- `EducationForm.vue` - Education with graduation scores
- `SkillsForm.vue` - Skills with categories and descriptions
- `VolunteeringForm.vue` - Volunteer work with achievements
- `ProjectsForm.vue` - Projects with URLs and descriptions
- `LanguagesForm.vue` - Languages with proficiency levels

### CSS Styling Guidelines

- **NEVER modify styles in the `app/components/ui/` directory** - these are shadcn-vue components
- **ALL app-specific CSS overrides must go in `app/assets/css/app.css`**
- Components should NOT contain `<style>` blocks for app-wide styling
- Use Tailwind utility classes for component-specific styling
- The `app.css` file is loaded globally via `nuxt.config.ts`

### File Organization

```
app/
├── assets/css/
│   ├── tailwind.css      # Tailwind imports and base styles
│   └── app.css           # Custom app overrides and component styling
├── components/
│   ├── ui/               # shadcn-vue components (DO NOT MODIFY)
│   ├── *.vue            # App-specific components
├── stores/
│   ├── resume.ts         # Main resume data store
│   └── settings.ts       # App settings store
├── composables/
│   ├── useConfirmation.ts # Confirmation modal composable
│   ├── useTemplate.ts     # Template management
│   └── *.ts              # Other composables
├── types/
│   └── resume.ts         # TypeScript interfaces
└── pages/
    └── *.vue             # Application pages
```

## Code Style Guidelines

- **Indentation: 4 spaces** - ESLint configured with strict 4-space indentation
- **TypeScript Strict Mode** - All components must use proper typing, no `any` types
- **Component Props** - Use proper TypeScript interfaces with `defineProps<Props>()`
- **Emits** - Use `defineEmits<{ eventName: [param: type] }>()`
- **Store Integration** - Use stores directly via `useResumeStore()`, avoid prop drilling
- **Composables** - Use composables for reusable logic (e.g., `useConfirmation()`)

## Template System & Column Layout

### Two-Column Template Configuration

Templates support flexible column placement via `TemplateLayoutConfig`:

```typescript
interface TemplateLayoutConfig {
  isTwoColumn: boolean;
  leftColumnRatio?: string;    // "7fr"
  rightColumnRatio?: string;   // "3fr"
  movableSections?: string[];  // ["skills", "projects", "languages", "volunteering"]
}
```

### Section Placement System

**Fixed Sections:**

- Left Column: Experience, Education
- Right Column: Contact Info, Social Links

**Movable Sections:**

- Skills, Projects, Languages, Volunteering
- Can be placed in either left or right column
- Controlled via dropdown in FormContainer header-actions slot

### Template Integration

Use `useTemplate()` composable:

```typescript
const templateConfig = useTemplate();
templateConfig.canMoveSection('skills') // boolean
templateConfig.isCurrentTemplateTwoColumn() // boolean
```

## Data Structure & Types

### Core Interfaces (`app/types/resume.ts`)

```typescript
interface ResumeData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  summary: string;

  // Dynamic Arrays
  experiences: Experience[];
  education: Education[];
  volunteering: Volunteering[];
  skills: SkillItem[];
  socialLinks: SocialLink[];
  projects: Project[];
  languages: Language[];

  // Configuration
  sectionOrder: SectionOrder;
  sectionHeaders: SectionHeaders;
  sectionPlacement: SectionPlacement;
}

interface Experience {
  company: string;
  position: string;
  location: string;
  companyUrl?: string;
  startDate: string;        // YYYY-MM format
  endDate: string;          // YYYY-MM format
  isPresent?: boolean;
  achievements: Array<{ text: string }>;
}

interface SocialLink {
  platform: string;        // 'linkedin', 'github', 'twitter', etc.
  url: string;
  customLabel?: string;     // For 'other' platform
}
```

### Multi-Resume Support

The app supports multiple resumes:

```typescript
interface Resume {
  id: string;              // "resume-1", "resume-2", etc.
  name: string;            // User-defined name
  data: ResumeData;        // Resume content
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
}
```

## Store Management (`app/stores/`)

### Resume Store (`resume.ts`)

**Multi-Resume Management:**

- `createResume(name?: string): string` - Create new resume
- `setActiveResume(id: string)` - Switch active resume
- `deleteResume(id: string)` - Delete resume
- `duplicateResume(id: string): string` - Clone resume

**CRUD Operations Pattern:**

```typescript
// Basic field updates
updateField(field
:
keyof
ResumeData, value
:
unknown
)

// Section operations (for each section)
add
{
    Section
}
()                           // Add new item
update
{
    Section
}
(index, field, value)     // Update item field
remove
{
    Section
}
(index)                   // Remove item
move
{
    Section
}
(fromIndex, toIndex)        // Reorder items

// Achievement operations (Experience/Volunteering)
add
{
    Section
}
Achievement(sectionIndex, achievement ?)
update
{
    Section
}
Achievement(sectionIndex, achievementIndex, text)
remove
{
    Section
}
Achievement(sectionIndex, achievementIndex)
move
{
    Section
}
Achievement(sectionIndex, fromIndex, toIndex)
```

**Section Management:**

- `updateSectionHeader(section, headerText)` - Edit section titles
- `updateSectionPlacement(section, placement)` - Move sections between columns

### Settings Store (`settings.ts`)

Manages app-wide settings with persistence:

- Font selection and size
- Template selection
- Raw mode toggle
- Menu visibility states

## Confirmation System

### useConfirmation Composable (`app/composables/useConfirmation.ts`)

Promise-based confirmation system:

```typescript
const confirmation = useConfirmation();

const handleDelete = async () => {
    const confirmed = await confirmation.confirm({
        title: 'Delete Item',
        message: 'Are you sure? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel'
    });

    if (confirmed) {
        // Perform deletion
    }
};
```

## Date Handling

### MonthYearPicker Component

- **Input/Output Format**: `YYYY-MM` (e.g., "2024-07")
- **Display Format**: "Month YYYY" (e.g., "January 2024")
- **Library**: `@vuepic/vue-datepicker` with month-picker mode
- **Props**: `modelValue`, `label`, `placeholder`, `disabled`
- **Handles multiple date formats** from the picker library

## Social Links System

### Platform Configuration

Predefined platforms with icons:

```typescript
const SOCIAL_PLATFORMS = [
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'twitter', label: 'Twitter', icon: Twitter },
  { value: 'portfolio', label: 'Portfolio', icon: Globe },
  { value: 'other', label: 'Other', icon: Link }
];
```

- **Custom labels** for "other" platform type
- **Platform icons** from lucide-vue-next
- **Reordering controls** with up/down buttons

## Development Workflow

### Component Development

1. **Use existing patterns** - Check FormCard, FormContainer usage
2. **Direct store integration** - Use `useResumeStore()` directly
3. **TypeScript interfaces** - Define proper props and emits
4. **Mobile-first responsive** - Use `md:` prefixes for desktop
5. **Confirmation modals** - Use `useConfirmation()` for destructive actions

### Styling Guidelines

1. **Never modify** `app/components/ui/` directory
2. **Use Tailwind utilities** for component styling
3. **Global overrides** go in `app/assets/css/app.css`
4. **4-space indentation** enforced by ESLint
5. **No `<style>` blocks** in components for global styling

### Store Integration

1. **No prop drilling** - Access stores directly in components
2. **Use getter methods** for computed values
3. **Call action methods** for data mutations
4. **Automatic persistence** via pinia-plugin-persistedstate

## Current Feature Set

### ✅ Implemented Components

- Personal Information form with social links
- Experience form with achievements and company URLs
- Education form with graduation scores
- Skills form with categories and descriptions
- Volunteering form with achievements
- Projects form with URLs and descriptions
- Languages form with proficiency levels
- Multi-resume management system

### ✅ Template Features

- Two-column layout with 7fr:3fr ratio
- Flexible section placement (left/right columns)
- Editable section headers with in-place editing
- Column placement dropdowns for movable sections
- Responsive design with mobile-first approach

### ✅ UI/UX Features

- Consistent FormCard design system
- Promise-based confirmation modals
- Month/year date pickers with proper formatting
- Reusable AddButton component
- Social platform selection with icons
- Achievement management for experience/volunteering
- Mobile-responsive layouts with proper touch targets
