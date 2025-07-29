import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { Usuario } from '../../../schemas/usuario.js';
import { usuarioRepository } from '../../../services/usuario.repository.js';
import { UCUError } from '../../../util/index.js';
import { Departamento } from '../../../schemas/departamento.js';
import { departamentoRepository } from '../../../services/departamentos.repository.js';
import { Localidad, LocalidadUsuario } from '../../../schemas/localidad.js';
import { localidadesRepository } from '../../../services/localidades.repository.js';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      params: Type.Object({
        id_usuario: Type.Integer(),
      }),
      response: {
        200: Usuario,
        404: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ["usuarios"],
      summary: "Obtener usuario",
      description : "Obtener el usuario a partir de su id",
      security: [
        { bearerAuth: [] }
      ]
    },
    // TODO: falta admin auth
    handler: async function (request, reply) {
      const { id_usuario } = request.params as { id_usuario: number };

      const result = await usuarioRepository.getById(id_usuario);

      if (!result) {
        throw new UCUError("Usuario no encontrado.");
      }

      return reply.status(200).send(result as Usuario);
    }
  })

  fastify.put('/', {
    schema: {
      params: Type.Object({
        id_usuario: Type.Integer(),
      }),
      body: Type.Omit(Usuario, ["user_id"]),
      response: {
        201: Type.Object({
          user: Usuario,
          message: Type.String(),
        }),
        400: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ["usuarios"],
      summary: "Modificar usuario",
      description : "Modificar usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      const body = request.body as Omit<Usuario, "user_id">;
      try {
        const updated = await usuarioRepository.update(String(request.params.id_usuario), body);

        return reply
          .status(201)
          .send({ user: updated, message: "Usuario actualizado exitosamente." });
      } catch (err: any) {
        throw new UCUError((err as Error).message);
      }
    }
  })

  fastify.get('/departamentos', {
    schema: {
      params: Type.Object({
        id_usuario: Type.Integer(),
      }),
      response: {
        200: Type.Array(Departamento),
        404: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ["usuarios"],
      summary: "Obtener deptos usuario",
      description : "Obtener departamentos del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    // TODO: falta auth admin
    handler: async function (request, reply) {
      return departamentoRepository.getAll();
    }
  })
  
  fastify.get('/departamentos/:id_departamento/localidades', {
    schema: {
      params: Type.Object({
        id_usuario: Type.Integer(),
        id_departamento: Type.Integer(),
      }),
      response: {
        200: Type.Array(Localidad),
        404: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ["usuarios"],
      summary: "Localidades usuario.",
      description : "Obtener las localidades de un determinado departamento del usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    // TODO: falta admin auth
    handler: async function (request, reply) {
      return usuarioRepository.getLocalidades(request.params.id_usuario, request.params.id_departamento);
    }
  })
  
  fastify.post('/departamentos/:id_departamento/localidades', {
    schema: {
      params: Type.Object({
        id_usuario: Type.Integer(),
        id_departamento: Type.Integer(),
      }),
      body: Type.Omit(LocalidadUsuario, ["departamento", "usuario", "id_usuario", "id_departamento"]),
      response: {
        200: Localidad,
        404: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ["usuarios"],
      summary: "Crear Localidad",
      description : "Crear una localidad asignada a un usuario.",
      security: [
        { bearerAuth: [] }
      ]
    },
    // TODO: falta admin auth
    handler: async function (request, reply) {
      const localidadUsuario = { ...request.params, id_localidad: request.body.id_localidad, nombre: request.body.nombre } as LocalidadUsuario;
      return localidadesRepository.create(localidadUsuario)
    }
  })

  fastify.delete('/departamentos/:id_departamento/localidades/:id_localidad', {
    schema: {
      params: Type.Object({
        id_usuario: Type.Integer(),
        id_departamento: Type.Integer(),
        id_localidad: Type.Integer(),
      }),
      response: {
        204: Type.Object({
          message: Type.String(),
        }),
        404: Type.Object({
          message: Type.String(),
        }),
      },
      tags: ["usuarios"],
      summary: "Borrar localidad",
      description : "Borrar localidad.",
      security: [
        { bearerAuth: [] }
      ]
    },
    // TODO: falta admin auth
    handler: async function (request, reply) {
      await usuarioRepository.removeLocalidad(request.params.id_usuario, request.params.id_departamento, request.params.id_localidad);
      return reply.status(204).send({ message: "Localidad eliminada." });
    }
  })

}

export default usuariosRoutes
