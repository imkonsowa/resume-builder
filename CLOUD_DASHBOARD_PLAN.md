# Cloud Dashboard Migration Plan

## Overview
Create a separate dashboard for authenticated users that saves resumes directly to PocketBase, completely separate from the local storage implementation.

## Architecture Decision

### Current State
- Single resume store using localStorage with optional `serverId` for syncing
- Mixed concerns between local and cloud storage
- Manual sync required for each resume
- If statements scattered throughout to handle auth state

### Proposed State
- **Local Path**: `/` and `/builder` - Uses localStorage only (existing implementation)
- **Cloud Path**: `/dashboard/*` - Uses PocketBase directly (new implementation)
- Complete separation of concerns
- No sync logic needed - cloud dashboard always saves to API

## Implementation Plan

### Phase 1: Infrastructure Setup

#### 1.1 Route Structure
```
/dashboard/                  # Cloud resumes list (authenticated users)
/dashboard/editor/[id]       # Edit existing cloud resume
/dashboard/editor/new        # Create new cloud resume
/dashboard/templates         # Browse resume templates (future)
/dashboard/settings          # User account settings
```

#### 1.2 Auth Middleware
```typescript
// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  
  if (!authStore.isLoggedIn) {
    return navigateTo('/')
  }
})
```

#### 1.3 Cloud Resume Store
```typescript
// stores/cloudResume.ts
interface CloudResumeState {
  resumes: CloudResume[]
  activeResume: CloudResume | null
  isLoading: boolean
  error: string | null
  lastSaved: string | null
}

export const useCloudResumeStore = defineStore('cloudResume', {
  state: (): CloudResumeState => ({
    resumes: [],
    activeResume: null,
    isLoading: false,
    error: null,
    lastSaved: null
  }),
  
  // No persistence - always fetch from API
  
  actions: {
    async fetchResumes() {
      const pb = usePocketBase()
      const authStore = useAuthStore()
      this.isLoading = true
      
      try {
        this.resumes = await pb.collection('resumes').getFullList({
          filter: `created_by = "${authStore.user.id}"`,
          sort: '-updated'
        })
      } catch (error) {
        this.error = error.message
      } finally {
        this.isLoading = false
      }
    },
    
    async createResume(name: string) {
      const pb = usePocketBase()
      const authStore = useAuthStore()
      
      const resume = await pb.collection('resumes').create({
        created_by: authStore.user.id,
        name,
        data: defaultResumeData,
        published: false
      })
      
      await this.fetchResumes()
      return resume.id
    },
    
    async loadResume(id: string) {
      const pb = usePocketBase()
      this.activeResume = await pb.collection('resumes').getOne(id)
    },
    
    async updateField(field: keyof ResumeData, value: any) {
      if (!this.activeResume) return
      
      const pb = usePocketBase()
      const updatedData = {
        ...this.activeResume.data,
        [field]: value
      }
      
      this.activeResume = await pb.collection('resumes').update(
        this.activeResume.id,
        { data: updatedData }
      )
      
      this.lastSaved = new Date().toISOString()
    },
    
    async deleteResume(id: string) {
      const pb = usePocketBase()
      await pb.collection('resumes').delete(id)
      await this.fetchResumes()
    }
    
    // Add all other CRUD methods similar to current store
    // but with direct API calls instead of local state mutations
  }
})
```

### Phase 2: Page Implementation

#### 2.1 Dashboard Home
```vue
<!-- pages/dashboard/index.vue -->
<template>
  <div>
    <DashboardHeader />
    <div class="container">
      <div class="flex justify-between mb-6">
        <h1>My Cloud Resumes</h1>
        <Button @click="createNewResume">
          Create New Resume
        </Button>
      </div>
      
      <!-- Reuse ResumesGrid component -->
      <ResumesGrid 
        :resumes="cloudStore.resumes"
        @edit="navigateToEditor"
        @delete="deleteResume"
        @duplicate="duplicateResume"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const cloudStore = useCloudResumeStore()
await cloudStore.fetchResumes()
</script>
```

#### 2.2 Cloud Editor
```vue
<!-- pages/dashboard/editor/[id].vue -->
<template>
  <!-- Reuse ALL existing form components -->
  <PersonalInfoForm />
  <ExperienceForm />
  <EducationForm />
  <!-- etc... -->
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const cloudStore = useCloudResumeStore()

// Load resume on mount
await cloudStore.loadResume(route.params.id)

// Auto-save functionality
const { pause, resume } = useIntervalFn(() => {
  cloudStore.saveToCloud()
}, 5000) // Auto-save every 5 seconds
</script>
```

### Phase 3: Feature Differentiation

#### Local-Only Features
- Offline access
- Privacy-first (no account needed)
- Import/Export JSON
- Quick start

#### Cloud-Only Features
- Auto-save
- Access from anywhere
- Publish resume with unique URL
- Resume templates
- Version history (future)
- Collaboration (future)
- Analytics on published resumes (future)

### Phase 4: User Navigation

#### Updated Navigation Flow
```
Not Logged In:
- Homepage → Local Builder
- "Your Resumes" → Local resumes list

Logged In:
- Homepage shows both options:
  - "Use Local Builder" → /builder
  - "Use Cloud Dashboard" → /dashboard
- Can still access local resumes
- Additional "Cloud Dashboard" menu item
```

### Phase 5: Migration Helper (Optional)

#### Import Local to Cloud
```typescript
// composables/useResumeMigration.ts
export const useResumeMigration = () => {
  const uploadLocalToCloud = async (localResumeId: string) => {
    const localStore = useResumeStore()
    const cloudStore = useCloudResumeStore()
    
    const localResume = localStore.resumes[localResumeId]
    if (!localResume) return
    
    const cloudId = await cloudStore.createResume(localResume.name)
    await cloudStore.updateResumeData(cloudId, localResume.data)
    
    return cloudId
  }
  
  return {
    uploadLocalToCloud
  }
}
```

## Benefits of This Approach

1. **Clean Separation**: No mixing of local and cloud logic
2. **Independent Evolution**: Can add cloud features without affecting local
3. **Better UX**: Clear distinction for users
4. **Simpler Code**: No complex sync logic
5. **Progressive Enhancement**: Users can use both systems
6. **Easy Rollback**: If cloud fails, local still works

## Technical Considerations

### API Rate Limiting
- Implement debounced auto-save
- Batch updates where possible
- Show save status to user

### Error Handling
```typescript
// composables/useCloudError.ts
export const useCloudError = () => {
  const handleApiError = (error: any) => {
    const { toast } = useToast()
    
    if (error.status === 401) {
      navigateTo('/login')
    } else if (error.status === 429) {
      toast.error('Too many requests. Please wait.')
    } else {
      toast.error('Failed to save. Will retry.')
      // Add to retry queue
    }
  }
}
```

### Performance
- Lazy load dashboard routes
- Implement optimistic updates
- Cache resume list
- Use skeleton loaders

## Timeline Estimate

- **Phase 1**: 2-3 hours (Infrastructure setup)
- **Phase 2**: 3-4 hours (Page implementation)
- **Phase 3**: 2 hours (Feature differentiation)
- **Phase 4**: 1 hour (Navigation updates)
- **Phase 5**: 2 hours (Migration helper - optional)

**Total**: 10-12 hours for full implementation

## Risks & Mitigation

| Risk | Mitigation |
|------|------------|
| API downtime | Local fallback option always available |
| Data loss | Auto-save + version history |
| Performance issues | Pagination + lazy loading |
| User confusion | Clear onboarding + tooltips |

## Decision Points

1. **Auto-save frequency**: Every change vs every 5 seconds vs manual save
2. **Offline handling**: Queue changes vs block editing
3. **Conflict resolution**: Last write wins vs version comparison
4. **Free tier limits**: Number of resumes, storage size
5. **Publishing**: Subdomain vs path-based URLs

## Next Steps

1. [ ] Review and refine this plan
2. [ ] Decide on decision points above
3. [ ] Create PocketBase collections if needed
4. [ ] Start with Phase 1 implementation
5. [ ] Test with small user group
6. [ ] Iterate based on feedback