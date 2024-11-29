// Can only run on server.
import "server-only";

import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // true: updates every 60s.
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
  token,
});

// If there is no token:
if (!writeClient.config().token) {
    throw new Error("Write token not found.");
}
