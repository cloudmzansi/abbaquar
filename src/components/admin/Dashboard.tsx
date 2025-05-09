import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from './AdminLayout';
import { ActivitiesPanel } from './panels/ActivitiesPanel';
import { EventsPanel } from './panels/EventsPanel';
import { PhotosPanel } from './panels/PhotosPanel';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export type Activity = {
  id: string;
  title: string;
  description: string;
  image?: string;
  displayOn: 'home' | 'activities' | 'both';
};

export type Event = {
  id: string;
  title: string;
  date: string;
  fromTime: string;
  toTime: string;
  venue: string;
  description: string;
  image?: string;
  displayOn: 'home' | 'events' | 'both';
};

export type Photo = {
  id: string;
  image: string;
  category: 'events' | 'activity' | 'community';
};

export const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'activities';
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  // Fetch data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [activitiesData, eventsData, photosData] = await Promise.all([
          api.get<Activity[]>('activities'),
          api.get<Event[]>('events'),
          api.get<Photo[]>('photos')
        ]);
        
        setActivities(activitiesData);
        setEvents(eventsData);
        setPhotos(photosData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <AdminLayout title="Admin Dashboard">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities">
          <ActivitiesPanel 
            activities={activities} 
            setActivities={setActivities}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="events">
          <EventsPanel 
            events={events} 
            setEvents={setEvents}
            isLoading={isLoading}
          />
        </TabsContent>
        
        <TabsContent value="photos">
          <PhotosPanel 
            photos={photos} 
            setPhotos={setPhotos}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}; 