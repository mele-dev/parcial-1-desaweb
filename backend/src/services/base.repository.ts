export abstract class BaseRepository<T> {
    
  abstract getAll(): Promise<T[]>

  abstract getById(id: number): Promise<T>

  abstract getOneBy(data: Partial<T>): Promise<T>

  abstract findAll(data: Partial<T>): Promise<T[]>

  abstract create(data: T): Promise<T>

  abstract update(id: string, data: Partial<T>): Promise<T>

  abstract erase(id: number): Promise<void>
}

