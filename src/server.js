import app from './app.js'
import { startGraphQLServer } from './graphql/server.js';

const PORT=process.env.PORT || 5500;

await startGraphQLServer(app)

app.listen(PORT, () =>{
    console.log(`✅ servidor NodeJs corriendo en el puerto ${PORT}`);
});