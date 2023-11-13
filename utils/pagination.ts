import { PaginationType } from '../types/pagination';
import { PaginationSchema } from '../schemas/pagination';

/**
 * Gets pagination options from query params of the request.
 * Parses the given query object and returns a PaginationType object.
 *
 * @param query The req.query object.
 *
 * @returns A promise that resolves to a PaginationType object either parsed from the query or with default values.
 */
export async function getPaginationOptionsFromQuery(query: qs.ParsedQs): Promise<PaginationType> {
  const pagination = await PaginationSchema.parseAsync(query);
  return pagination;
}
