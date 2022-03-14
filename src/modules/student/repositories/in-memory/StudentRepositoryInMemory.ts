import { Student } from "../../Entities/Student";
import { IStudentRepository } from "../IStudentRepository";

class StudentRepositoryInMemory implements IStudentRepository {

  students: Student[] = [];

  async create(student: Student): Promise<void> {
    this.students.push(student)
  }
  async buyCourse(): Promise<void> {
    this.students[0].courses.push("Novo curso")
  }
  async winRewards(user_id: string): Promise<void> {
    if (this.students[0].mean < 7 || this.students[0].finishedCourses < 12) {
      return
    }
    this.students[0].coins += 3;
    this.students[0].hasVoucher = true;
    this.students[0].isPremium = true;
  }
  async exchangeCoinsForCriptocurrency(): Promise<void> {
    this.students[0].criptocurrency += 3;
    this.students[0].coins = 0;
  }
  async findById(user_id: string): Promise<Student> {
    return this.students[0]
  }
  async subscribeToARealProject(user_id: any): Promise<void> {
    if (!this.students[0].hasVoucher) {
      return
    }

    this.students[0].hasVoucher = false;
    this.students[0].realProjects.push('realProjectItem')
  }

}


export { StudentRepositoryInMemory };
