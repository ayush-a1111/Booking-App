import { CrudRepository } from './crud-repository.js';
import db from '../models/index.js';

const { Event } = db;

class EventRepository extends CrudRepository {
    constructor() {
        super(Event);
    }
}

export { EventRepository };
