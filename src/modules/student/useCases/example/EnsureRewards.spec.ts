import { Student } from "../../Entities/Student";
import { StudentRepositoryInMemory } from "../../repositories/in-memory/StudentRepositoryInMemory";
import { IStudentRepository } from "../../repositories/IStudentRepository";

let studentRepositoryInMemory: IStudentRepository;

describe("Ensure rewards", () => {
  beforeEach(() => {
    studentRepositoryInMemory = new StudentRepositoryInMemory();
  });
  it("should be able to buy a new course with coins", async () => {

    const userData: Student = {
      coins: 3,
      courses: [],
      criptocurrency: 0,
      finishedCourses: 12,
      hasVoucher: true,
      id: '1',
      isPremium: true,
      mean: 7,
      name: 'Test user',
      realProjects: [],
    };

    await studentRepositoryInMemory.create(userData);

    await studentRepositoryInMemory.buyCourse();

    const student = await studentRepositoryInMemory.findById('1');

    expect(student.courses.length).toEqual(1);
  });

  it("should be able to join real projects", async () => {
    const userData: Student = {
      coins: 3,
      courses: [],
      criptocurrency: 0,
      finishedCourses: 12,
      hasVoucher: true,
      id: '1',
      isPremium: true,
      mean: 7,
      name: 'Test user',
      realProjects: [],
    };

    await studentRepositoryInMemory.create(userData);

    await studentRepositoryInMemory.subscribeToARealProject('1');

    const student = await studentRepositoryInMemory.findById('1');

    expect(student.hasVoucher).toEqual(false);
    expect(student.realProjects.length).toEqual(1);
  });

  it("should be able to exchange coins for criptocurrency", async () => {
    const userData: Student = {
      coins: 3,
      courses: [],
      criptocurrency: 0,
      finishedCourses: 12,
      hasVoucher: true,
      id: '1',
      isPremium: true,
      mean: 7,
      name: 'Test user',
      realProjects: [],
    };

    await studentRepositoryInMemory.create(userData);


    await studentRepositoryInMemory.exchangeCoinsForCriptocurrency();

    const student = await studentRepositoryInMemory.findById('1');

    expect(student.criptocurrency).toBeGreaterThan(0);
    expect(student.coins).toEqual(0);
  });
});
