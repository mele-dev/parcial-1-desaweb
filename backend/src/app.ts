import * as path from 'node:path'
import AutoLoad, { AutoloadPluginOptions } from '@fastify/autoload'
import { fileURLToPath } from 'node:url'
import { FastifyPluginAsync } from 'fastify'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export type AppOptions = {
} & Partial<AutoloadPluginOptions>;

const options: AppOptions = {};

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: opts,
    forceESM: true
  })

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: opts,
    routeParams : true,
    forceESM: true
  })

  // fastify.setErrorHandler(async (error, request, reply) => {
  //   if (error instanceof UCUNoAutorizadoError){
  //     const {usuario} = request.body as {usuario:string};
      
  //     fastify.log.trace("Login no exitoso para usuario: " + usuario);
  //     fastify.log.debug("Login no exitoso para usuario: " + usuario);
  //     fastify.log.info("Login no exitoso para usuario: " + usuario);
  //     fastify.log.warn("Login no exitoso para usuario: " + usuario);
  //     fastify.log.error("Login no exitoso para usuario: " + usuario);
  //     fastify.log.fatal("Login no exitoso para usuario: " + usuario);
  //     reply.code(401);
  //     return {
  //       message : error.message
  //     }
  //   }
  // })
}

export default app
export { app, options }
