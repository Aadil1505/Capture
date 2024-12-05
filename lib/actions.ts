// lib/supabase-db.ts
import { supabase } from './supabase';
import { Alert } from 'react-native';
import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system';





// Profile Functions
export const getProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    Alert.alert('Error', 'Failed to fetch profile');
    console.error('Error:', error);
    return null;
  }
};


export const updateProfile = async (userId: string, updates: any) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to update profile');
    console.error('Error:', error);
    return false;
  }
};

// Event Functions
export const createEvent = async (name: string, userId: string): Promise<Event | null> => {
  try {
    // Generate a random 6-character event code
    const event_code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const { data, error } = await supabase
      .from('events')
      .insert({
        name,
        event_code,
        created_by: userId,
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    Alert.alert('Error', 'Failed to create event');
    console.error('Error:', error);
    return null;
  }
};

export const joinEvent = async (eventCode: string, userId: string): Promise<boolean> => {
  try {
    // First, get the event details
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id')
      .eq('event_code', eventCode)
      .single();

    if (eventError) throw eventError;
    if (!event) throw new Error('Event not found');

    // Set any existing active participation to inactive
    await supabase
      .from('event_participants')
      .update({ status: 'inactive' })
      .eq('user_id', userId)
      .eq('status', 'active');

    // Join the new event
    const { error } = await supabase
      .from('event_participants')
      .insert({
        event_id: event.id,
        user_id: userId,
        status: 'active'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to join event');
    console.error('Error:', error);
    return false;
  }
};

export const leaveEvent = async (userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('event_participants')
      .update({ status: 'inactive' })
      .eq('user_id', userId)
      .eq('status', 'active');

    if (error) throw error;
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to leave event');
    console.error('Error:', error);
    return false;
  }
};

export const getCurrentEvent = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('event_participants')
      .select(`
        *,
        event:events(*)
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export async function uploadImageToSupabase(uri: string, userId: string) {
    try {
        const event = await getCurrentEvent(userId)
        const eventId = event.event_id

      // Read the file
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) {
        throw new Error('File does not exist');
      }
  
      // Read file content as base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      // Convert base64 to ArrayBuffer
      const arrayBuffer = decode(base64);
  
      // Generate unique filename using the event name as a folder
      const fileName = `${eventId}/${userId}/${Date.now()}.jpg`;
  
      // Upload to Supabase using ArrayBuffer
      const { data, error } = await supabase.storage
        .from('pictures')
        .upload(`${fileName}`, arrayBuffer, {
          contentType: 'image/jpeg',
          upsert: false
        });
  
      if (error) {
        throw error;
      }
  
      // Get public URL
      const {data: { publicUrl }} = supabase.storage.from("pictures").getPublicUrl(fileName);
      console.log(publicUrl)

      await addPhotoRecord(eventId, userId, publicUrl);
  
      return publicUrl;
  
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
}

export async function addPhotoRecord(eventId: string, userId: string, photoUrl: string) {
    try {
  
      const { data, error } = await supabase
        .from('event_photos')
        .insert({
          event_id: eventId,
          user_id: userId,
          photo_url: photoUrl
        })
        .select()
        .single();
  
      if (error) throw error;
      return data;
  
    } catch (error) {
      console.error('Error adding photo record:', error);
      throw error;
    }
}

export const getEventPhotos = async (eventId: number) => {
    try {
      const { data, error } = await supabase
        .from('event_photos')
        .select(`*`)
        .eq('event_id', eventId)
        .order('uploaded_at', { ascending: false });
  
      if (error) throw error;
      return { data: data || [], error: null };
      
    } catch (error) {
      console.error('Error fetching event photos:', error);
      return { data: null, error };
    }
};

export const getUserPhotos = async (UserId: string) => {
    try {
      const { data, error } = await supabase
        .from('event_photos')
        .select(`*`)
        .eq('user_id', UserId)
        .order('uploaded_at', { ascending: false });
  
      if (error) throw error;
      return { data: data || [], error: null };
      
    } catch (error) {
      console.error('Error fetching event photos:', error);
      return { data: null, error };
    }
};

export const getUserById = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', userId)
        .single();
  
      if (error) throw error;
      return { data, error: null };
      
    } catch (error) {
      console.error('Error fetching user:', error);
      return { data: null, error };
    }
  };

export const deletePhoto = async (photoId: number, userId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('event_photos')
      .delete()
      .eq('id', photoId)
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  } catch (error) {
    Alert.alert('Error', 'Failed to delete photo');
    console.error('Error:', error);
    return false;
  }
};

// Real-time subscriptions
export const subscribeToEventPhotos = (eventId: number, onUpdate: () => void) => {
  return supabase
    .channel('event_photos')
    .on('postgres_changes', 
      {
        event: '*',
        schema: 'public',
        table: 'event_photos',
        filter: `event_id=eq.${eventId}`
      },
      () => {
        onUpdate();
      }
    )
    .subscribe();
};