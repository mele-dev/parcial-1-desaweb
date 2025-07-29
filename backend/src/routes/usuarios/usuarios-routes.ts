import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../services/usuario.repository.js';
import { Usuario } from '../../schemas/usuario.js';
import { UCUError } from '../../util/index.js';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  
  fastify.get('/', {
    schema: {
      response: {
        200: Type.Array(Usuario),
      },
      tags: ["usuarios"],
      summary: "Obtener listado de usuarios",
      description : "Obtener listado de usuarios",
      security: [
        { bearerAuth: [] }
      ]
    },
    // TODO: falta hacer que solo admins puedan
    handler: async function (request, reply) {
      return usuarioRepository.getAll();
    }
  })

  fastify.post('/', {
    schema: {
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
      summary: "Crear usuario",
      description : "Crear usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      const body = request.body as Omit<Usuario, "user_id">;
      try {
        const created = await usuarioRepository.create(body);

        return reply
          .status(201)
          .send({ user: created, message: "Usuario registrado exitosamente." });
      } catch (err: any) {
        if (err?.code === "23505") {
          // se supone que es un duplicate key
          throw new UCUError("Usuario ya registrado.");
        }
        throw new UCUError((err as Error).message);
      }
    }
  })

}

export default usuariosRoutes
