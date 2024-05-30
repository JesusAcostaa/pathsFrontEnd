import { Pipe, PipeTransform } from '@angular/core';
import { LearningRoutes } from '../../../core/interfaces';

@Pipe({
  name: 'formatLearningStyle',
  standalone: true,
})
export class FormatLearningStylePipe implements PipeTransform {
  transform(value: LearningRoutes | undefined): string {
    return {
      [LearningRoutes.Visual]: 'Visual',
      [LearningRoutes.Auditory]: 'Auditivo',
      [LearningRoutes.Kinesthetic]: 'Kinestésico',
      [LearningRoutes.Mixed]: 'Mixto',
    }[value ?? LearningRoutes.Mixed];
  }
}
