import { Student } from "../../Entities/Student";
import { StudentRepositoryInMemory } from "../../repositories/in-memory/StudentRepositoryInMemory";
import { IStudentRepository } from "../../repositories/IStudentRepository";

let studentRepositoryInMemory: IStudentRepository;

describe("Receive rewards", () => {
  beforeEach(() => {
    studentRepositoryInMemory = new StudentRepositoryInMemory();
  });
  it("should be able receive a voucher and three coins", async () => {

    const userData: Student = {
      coins: 0,
      courses: [],
      criptocurrency: 0,
      finishedCourses: 12,
      hasVoucher: false,
      id: '1',
      isPremium: false,
      mean: 7,
      name: 'Test user',
      realProjects: [],
    };

    await studentRepositoryInMemory.create(userData);

    await studentRepositoryInMemory.winRewards('1');

    const student = await studentRepositoryInMemory.findById('1');

    expect(student.hasVoucher).toEqual(true);
    expect(student.coins).toEqual(3);
    expect(student.isPremium).toEqual(true);

  });

  it("should not be able receive rewards before finish 12 courses", async () => {
    const userData: Student = {
      coins: 0,
      courses: [],
      criptocurrency: 0,
      finishedCourses: 11,
      hasVoucher: false,
      id: '1',
      isPremium: false,
      mean: 7,
      name: 'Test user',
      realProjects: [],
    };

    await studentRepositoryInMemory.create(userData);


    await studentRepositoryInMemory.winRewards('1');

    const student = await studentRepositoryInMemory.findById('1');

    expect(student.hasVoucher).toEqual(false);
    expect(student.isPremium).toEqual(false);
  });

  it("should not be able receive rewards with mean below 7", async () => {
    const userData: Student = {
      coins: 0,
      courses: [],
      criptocurrency: 0,
      finishedCourses: 12,
      hasVoucher: false,
      id: '1',
      isPremium: false,
      mean: 6,
      name: 'Test user',
      realProjects: [],
    };

    await studentRepositoryInMemory.create(userData);


    await studentRepositoryInMemory.winRewards('1');

    const student = await studentRepositoryInMemory.findById('1');

    expect(student.hasVoucher).toEqual(false);
    expect(student.isPremium).toEqual(false);
  });
});
