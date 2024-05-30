import { LearningRoutes } from "../../core/interfaces";

export { userEmailValidator } from "./validators/user-email.validator";
export { FirebaseUtils } from './firebase'

export const routeByLearningPath: Record<string, string> = {
  [LearningRoutes.Visual]: '/inicio/rutas-aprendizaje/visual',
  [LearningRoutes.Auditory]: '/inicio/rutas-aprendizaje/auditivo',
  [LearningRoutes.Kinesthetic]: '/inicio/rutas-aprendizaje/kinestesico',
  [LearningRoutes.Mixed]: '/inicio/rutas-aprendizaje/mixto',
};
