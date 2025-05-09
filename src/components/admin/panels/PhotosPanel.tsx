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
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Photo } from '../Dashboard';
import { api } from '@/lib/api';

interface PhotosPanelProps {
  photos: Photo[];
  setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
  isLoading: boolean;
}

const photoSchema = z.object({
  category: z.enum(['events', 'activity', 'community']),
});

type PhotoFormValues = z.infer<typeof photoSchema>;

export const PhotosPanel = ({ photos, setPhotos, isLoading }: PhotosPanelProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [categoryTab, setCategoryTab] = useState<'events' | 'activity' | 'community'>('events');

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      category: 'events',
    },
  });

  const category = watch('category');

  const handleUpload = async (data: PhotoFormValues) => {
    if (!imageFile) {
      toast.error('Please select an image to upload');
      return;
    }
    
    setSubmitting(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('category', data.category);
      
      const newPhoto = await api.upload('photos/upload', formData, (progress) => {
        setUploadProgress(progress);
      });
      
      setPhotos(prevPhotos => [...prevPhotos, newPhoto]);
      
      toast.success('Photo uploaded successfully');
      
      // Reset form
      reset();
      setImageFile(null);
      setUploadProgress(0);
    } catch (error) {
      toast.error('Failed to upload photo. Please try again.');
      console.error('Error uploading photo:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;
    
    try {
      await api.delete(`photos/${id}`);
      setPhotos(photos.filter(photo => photo.id !== id));
      toast.success('Photo deleted successfully');
    } catch (error) {
      toast.error('Failed to delete photo');
      console.error('Error deleting photo:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const filteredPhotos = (cat: string) => {
    return photos.filter(photo => photo.category === cat);
  };

  return (
    <div className="space-y-8">
      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Photo</CardTitle>
          <CardDescription>
            Add new photos to the gallery by selecting a category and uploading an image
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(handleUpload)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Select Image</Label>
                <Input 
                  id="image" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  disabled={submitting}
                  className="cursor-pointer"
                />
                {imageFile && (
                  <div className="mt-2">
                    <img 
                      src={URL.createObjectURL(imageFile)} 
                      alt="Preview" 
                      className="h-40 w-full object-cover rounded-md" 
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  disabled={submitting}
                  value={category} 
                  onValueChange={(value) => setValue('category', value as 'events' | 'activity' | 'community')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="events">Events</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="community">Community</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>
            
            {/* Progress bar */}
            {submitting && uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="text-sm text-gray-500">{Math.round(uploadProgress)}% uploaded</div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="justify-end">
            <Button 
              type="submit"
              disabled={submitting || !imageFile}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload Photo
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Gallery */}
      <div>
        <h3 className="text-lg font-medium mb-4">Photo Gallery</h3>
        
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No photos found. Upload your first photo above.
          </div>
        ) : (
          <Tabs 
            value={categoryTab} 
            onValueChange={(value) => setCategoryTab(value as 'events' | 'activity' | 'community')}
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="activity">Activities</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>
            
            <TabsContent value="events">
              <PhotoGrid 
                photos={filteredPhotos('events')} 
                onDelete={handleDelete} 
                isSubmitting={submitting}
              />
            </TabsContent>
            
            <TabsContent value="activity">
              <PhotoGrid 
                photos={filteredPhotos('activity')} 
                onDelete={handleDelete} 
                isSubmitting={submitting}
              />
            </TabsContent>
            
            <TabsContent value="community">
              <PhotoGrid 
                photos={filteredPhotos('community')} 
                onDelete={handleDelete} 
                isSubmitting={submitting}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

interface PhotoGridProps {
  photos: Photo[];
  onDelete: (id: string) => Promise<void>;
  isSubmitting: boolean;
}

const PhotoGrid = ({ photos, onDelete, isSubmitting }: PhotoGridProps) => {
  if (photos.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No photos in this category. Upload some above.
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <div 
          key={photo.id} 
          className="group relative aspect-square overflow-hidden rounded-md bg-gray-100"
        >
          <img 
            src={photo.image} 
            alt="Gallery photo" 
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onDelete(photo.id)}
            disabled={isSubmitting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}; 