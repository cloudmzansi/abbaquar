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
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Pencil, Plus, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { Activity } from '../Dashboard';
import { api } from '@/lib/api';

interface ActivitiesPanelProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  isLoading: boolean;
}

const activitySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  displayOn: z.enum(['home', 'activities', 'both']),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

export const ActivitiesPanel = ({ activities, setActivities, isLoading }: ActivitiesPanelProps) => {
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
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: '',
      description: '',
      displayOn: 'activities',
    },
  });

  const displayOn = watch('displayOn');

  const handleAddOrUpdate = async (data: ActivityFormValues) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('displayOn', data.displayOn);
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      if (editingId) {
        // Update existing activity
        await api.upload(`activities/${editingId}`, formData);
        
        setActivities(prevActivities => 
          prevActivities.map(activity => 
            activity.id === editingId 
              ? { 
                  ...activity, 
                  ...data,
                  image: imageFile ? URL.createObjectURL(imageFile) : activity.image 
                } 
              : activity
          )
        );
        
        toast.success('Activity updated successfully');
      } else {
        // Add new activity
        const newActivity = await api.upload('activities', formData);
        
        setActivities(prevActivities => [...prevActivities, newActivity]);
        
        toast.success('Activity added successfully');
      }
      
      // Reset form
      reset();
      setEditingId(null);
      setImageFile(null);
    } catch (error) {
      toast.error('Failed to save activity. Please try again.');
      console.error('Error saving activity:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingId(activity.id);
    setValue('title', activity.title);
    setValue('description', activity.description);
    setValue('displayOn', activity.displayOn);
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
    setImageFile(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this activity?')) return;
    
    try {
      await api.delete(`activities/${id}`);
      setActivities(activities.filter(activity => activity.id !== id));
      toast.success('Activity deleted successfully');
    } catch (error) {
      toast.error('Failed to delete activity');
      console.error('Error deleting activity:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Add/Edit Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Activity' : 'Add New Activity'}</CardTitle>
          <CardDescription>
            {editingId 
              ? 'Update the activity details below' 
              : 'Fill in the details to add a new activity'
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
                  placeholder="Enter activity title" 
                  {...register('title')} 
                  disabled={submitting}
                  className={errors.title ? 'border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="displayOn">Display On</Label>
                <Select 
                  disabled={submitting}
                  value={displayOn} 
                  onValueChange={(value) => setValue('displayOn', value as 'home' | 'activities' | 'both')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select where to display" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="activities">Activities Page</SelectItem>
                    <SelectItem value="both">Both Pages</SelectItem>
                  </SelectContent>
                </Select>
                {errors.displayOn && (
                  <p className="text-sm text-red-500">{errors.displayOn.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the activity" 
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
                      <Pencil className="mr-2 h-4 w-4" /> Update Activity
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" /> Add Activity
                    </>
                  )}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Activities List */}
      <div>
        <h3 className="text-lg font-medium mb-4">Current Activities</h3>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No activities found. Add your first activity above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity) => (
              <Card key={activity.id} className="overflow-hidden">
                {activity.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={activity.image} 
                      alt={activity.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{activity.title}</CardTitle>
                  <CardDescription>
                    Displayed on: {activity.displayOn === 'both' 
                      ? 'Home & Activities pages' 
                      : `${activity.displayOn.charAt(0).toUpperCase() + activity.displayOn.slice(1)} page`
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{activity.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(activity)}
                    disabled={submitting}
                  >
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(activity.id)}
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