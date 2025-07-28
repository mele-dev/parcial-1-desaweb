import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { usuarioRepository } from '../../services/usuario.repository.js';

const usuariosRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  
  fastify.get('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener listado de usuarios",
      description : "Obtener listado de usuarios",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      return usuarioRepository.getAll();
    }
  })

  fastify.patch('/', {
    schema: {
      tags: ["usuarios"],
      summary: "Crear usuario",
      description : "Crear usuario",
      security: [
        { bearerAuth: [] }
      ]
    },
    handler: async function (request, reply) {
      throw new Error("No implementado.");
    }
  })

}

export default usuariosRoutes
