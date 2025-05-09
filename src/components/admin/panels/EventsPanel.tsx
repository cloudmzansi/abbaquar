import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Pencil, Plus, Calendar, Clock, MapPin, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Event } from '../Dashboard';
import { api } from '@/lib/api';
import { format } from 'date-fns';

interface EventsPanelProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  isLoading: boolean;
}

const eventSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  date: z.string().min(1, { message: 'Date is required' }),
  fromTime: z.string().min(1, { message: 'Start time is required' }),
  toTime: z.string().min(1, { message: 'End time is required' }),
  venue: z.string().min(1, { message: 'Venue is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  displayOn: z.enum(['home', 'events', 'both']),
});

type EventFormValues = z.infer<typeof eventSchema>;

export const EventsPanel = ({ events, setEvents, isLoading }: EventsPanelProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      fromTime: '',
      toTime: '',
      venue: '',
      description: '',
      displayOn: 'events',
    },
  });

  const displayOn = watch('displayOn');

  const handleAddOrUpdate = async (data: EventFormValues) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('date', data.date);
      formData.append('fromTime', data.fromTime);
      formData.append('toTime', data.toTime);
      formData.append('venue', data.venue);
      formData.append('description', data.description);
      formData.append('displayOn', data.displayOn);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      if (editingId) {
        // Update existing event
        await api.upload(`events/${editingId}`, formData);
        
        setEvents(prevEvents => 
          prevEvents.map(event => 
            event.id === editingId 
              ? { 
                  ...event, 
                  ...data,
                  image: imageFile ? URL.createObjectURL(imageFile) : event.image 
                } 
              : event
          )
        );
        
        toast.success('Event updated successfully');
      } else {
        // Add new event
        const newEvent = await api.upload('events', formData);
        
        setEvents(prevEvents => [...prevEvents, newEvent]);
        
        toast.success('Event added successfully');
      }
      
      // Reset form
      reset();
      setEditingId(null);
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to save event. Please try again.');
      console.error('Error saving event:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setValue('title', event.title);
    setValue('date', event.date);
    setValue('fromTime', event.fromTime);
    setValue('toTime', event.toTime);
    setValue('venue', event.venue);
    setValue('description', event.description);
    setValue('displayOn', event.displayOn);
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await api.delete(`events/${id}`);
      setEvents(events.filter(event => event.id !== id));
      toast.success('Event deleted successfully');
    } catch (error) {
      toast.error('Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM do, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Event' : 'Add New Event'}</CardTitle>
          <CardDescription>
            {editingId 
              ? 'Update the event details below' 
              : 'Fill in the details to add a new event'
            }
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleAddOrUpdate)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  placeholder="Enter event title" 
                  {...register('title')} 
                  disabled={submitting}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  {...register('date')} 
                  disabled={submitting}
                  className={errors.date ? 'border-red-500' : ''}
                />
                {errors.date && (
                  <p className="text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromTime">Start Time</Label>
                <Input 
                  id="fromTime" 
                  type="time"
                  {...register('fromTime')} 
                  disabled={submitting}
                  className={errors.fromTime ? 'border-red-500' : ''}
                />
                {errors.fromTime && (
                  <p className="text-sm text-red-500">{errors.fromTime.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="toTime">End Time</Label>
                <Input 
                  id="toTime" 
                  type="time"
                  {...register('toTime')} 
                  disabled={submitting}
                  className={errors.toTime ? 'border-red-500' : ''}
                />
                {errors.toTime && (
                  <p className="text-sm text-red-500">{errors.toTime.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOn">Display On</Label>
                <Select 
                  disabled={submitting}
                  value={displayOn} 
                  onValueChange={(value) => setValue('displayOn', value as 'home' | 'events' | 'both')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select where to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="events">Events Page</SelectItem>
                    <SelectItem value="both">Both Pages</SelectItem>
                  </SelectContent>
                </Select>
                {errors.displayOn && (
                  <p className="text-sm text-red-500">{errors.displayOn.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input 
                id="venue" 
                placeholder="Enter event venue" 
                {...register('venue')} 
                disabled={submitting}
                className={errors.venue ? 'border-red-500' : ''}
              />
              {errors.venue && (
                <p className="text-sm text-red-500">{errors.venue.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the event" 
                {...register('description')} 
                disabled={submitting}
                className={errors.description ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Image (Optional)</Label>
              <Input 
                id="image" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                disabled={submitting}
                className="cursor-pointer"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {editingId && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCancel}
                disabled={submitting}
              >
                <X className="mr-2 h-4 w-4" /> Cancel
              </Button>
            )}
            <Button 
              type="submit"
              disabled={submitting}
              className={`${editingId ? '' : 'ml-auto'}`}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingId ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  {editingId ? (
                    <>
                      <Pencil className="mr-2 h-4 w-4" /> Update Event
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Add Event
                    </>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Events List */}
      <div>
        <h3 className="text-lg font-medium mb-4">Upcoming Events</h3>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No events found. Add your first event above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                {event.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>
                    Displayed on: {event.displayOn === 'both' 
                      ? 'Home & Events pages' 
                      : `${event.displayOn.charAt(0).toUpperCase() + event.displayOn.slice(1)} page`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    {formatDate(event.date)}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    {event.fromTime} - {event.toTime}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    {event.venue}
                  </div>
                  <p className="text-gray-700 pt-2">{event.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(event)}
                    disabled={submitting}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                    disabled={submitting}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}; 