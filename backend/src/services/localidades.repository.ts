import { Localidad, LocalidadUsuario } from "../schemas/localidad.js";
import { BaseRepository } from "./base.repository.js";
import { myPool } from "./database.service.js";

class LocalidadesRepository extends BaseRepository<Localidad> {
    getAll(): Promise<{ id_localidad: number; id_departamento: number; nombre: string; }[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<{ id_localidad: number; id_departamento: number; nombre: string; }> {
        throw new Error("Method not implemented.");
    }
    getOneBy(data: Partial<{ id_localidad: number; id_departamento: number; nombre: string; }>): Promise<{ id_localidad: number; id_departamento: number; nombre: string; }> {
        throw new Error("Method not implemented.");
    }
    findAll(data: Partial<{ id_localidad: number; id_departamento: number; nombre: string; }>): Promise<{ id_localidad: number; id_departamento: number; nombre: string; }[]> {
        throw new Error("Method not implemented.");
    }
    async create(data: LocalidadUsuario): Promise<Localidad> {
        const consulta = "INSERT INTO localidades (id_localidad, id_departamento, id_usuario, nombre) VALUES ($1, $2, $3, $4) RETURNING *";
        const res = await myPool.query(consulta,[data.id_localidad, data.id_departamento, data.id_usuario, data.nombre]);
        return res.rows[0];
    }
    update(id: string, data: Partial<{ id_localidad: number; id_departamento: number; nombre: string; }>): Promise<{ id_localidad: number; id_departamento: number; nombre: string; }> {
        throw new Error("Method not implemented.");
    }
    erase(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export const localidadesRepository = new LocalidadesRepository();