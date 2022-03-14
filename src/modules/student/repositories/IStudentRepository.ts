
import { Student } from '../Entities/Student';

interface IStudentRepository {
  create(student: Student): Promise<void>;
  buyCourse(): Promise<void>;
  winRewards(user_id: string): Promise<void>;
  exchangeCoinsForCriptocurrency(): Promise<void>;
  findById(user_id: string): Promise<Student>;
  subscribeToARealProject(user_id): Promise<void>;
}

export { IStudentRepository };
