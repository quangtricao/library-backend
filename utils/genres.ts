import { TitleQueryParamSchema } from '../schemas/genre';
import { TitleQueryParamsType } from '../types/genres';

export async function getTitleFromQuery(query: qs.ParsedQs): Promise<TitleQueryParamsType> {
  const result = await TitleQueryParamSchema.parseAsync(query);
  return result;
}
