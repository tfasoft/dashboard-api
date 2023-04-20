import env from "$app/env/index.js";

export default {
  mongodb: {
    atlas: env.MONGO_ATLAS,
    host: env.MONGODB_HOST,
    port: env.MONGODB_PORT,
    collection: env.MONGODB_COLLECTION,
  },
};
