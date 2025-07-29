import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../util/index.js';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Usuario } from '../schemas/usuario.js';



const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || ''  //El or es porque no puede ser undefined
};

const jwtPlugin = fp<FastifyJWTOptions>(async (fastify) => {
  //Recordar que string '' es falsy.
  if (!jwtOptions.secret) throw new UCUError("Falta setear el secret.");
  fastify.register(jwt,jwtOptions)
  
  fastify.decorate('authenticate', async function (req:FastifyRequest , rep:FastifyReply) {
    const url = req.routeOptions.url; //  /auth/login
    if (url != "/auth/login")   //Si no es la ruta de logueo...
      await req.jwtVerify();    //Verifico el token y eso.
  })
});

export default jwtPlugin;

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: Usuario;
    user: Usuario;
  }
}

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate(req:FastifyRequest , rep:FastifyReply): Promise<void>;
    authenticateAdmin(request: FastifyRequest, reply: FastifyReply): Promise<void>;
  }
}
