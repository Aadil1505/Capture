interface Profile {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    profile_picture_url: string | null;
    updated_at: string;
}

// Types
interface Event {
    id: number;
    name: string;
    event_code: string;
    created_by: string;
    status: 'active' | 'inactive';
}
  
  interface EventParticipant {
    id: number;
    event_id: number;
    user_id: string;
    status: 'active' | 'inactive';
}
  
  interface EventPhoto {
    id: number;
    event_id: number;
    user_id: string;
    photo_url: string;
}

interface Metadata {
  eTag: string;
  size: number;
  mimetype: string;
  cacheControl: string;
  lastModified: string;
  contentLength: number;
  httpStatusCode: number;
}

interface StorageObject {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Metadata;
}

interface EventDetails {
  id: number;
  name: string;
  event_code: string;
  created_by: string;
  created_at: string;
}