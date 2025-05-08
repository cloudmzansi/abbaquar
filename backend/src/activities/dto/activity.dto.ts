export class CreateActivityDto {
  title: string;
  description: string;
  category: string;
}

export class UpdateActivityDto {
  title?: string;
  description?: string;
  category?: string;
} 