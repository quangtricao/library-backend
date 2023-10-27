import { CollectionType } from '../types/db';

const CREATED = 'CREATED';

type STATUS_TYPES = typeof CREATED;

function constructLogMessage(
  status: STATUS_TYPES,
  key: keyof CollectionType,
  id: string
) {
  return `[INFO]: ${status.toLowerCase()} record '${id}' in '${key}' collection`;
}

function created(key: keyof CollectionType, id: string) {
  console.log(constructLogMessage(CREATED, key, id));
}

export default {
  created,
};
