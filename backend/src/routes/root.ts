import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { WebSocket } from '@fastify/websocket';

const root: FastifyPluginAsyncTypebox = async (fastify): Promise<void> => {
  fastify.register(async function () {
    fastify.route({
      method: 'GET',
      url: '/',
      handler: async (req, reply) => {
        return { root: true }
      },
      // onRequest : [fastify.authenticate],
      wsHandler: (socket:WebSocket, req) => {
        socket.send('Bienvenido cliente.')
        fastify.websocketServer.clients.forEach( (cliente) => {
          cliente.send("Cantidad clientes: " + fastify.websocketServer.clients.size);
        });
        socket.on("close", () => {
          console.log("Cliente desconectado.");
        });
        
        socket.on("error", () => {
          console.log("Cliente con error.");
        });

        socket.on('message', chunk => {
          fastify.websocketServer.clients.forEach( (cliente) => {
          if (cliente !== socket){
            cliente.send(chunk.toString());
          }
        });
          console.log(chunk.toString());
        })
      }
    })
  })
}

export default root