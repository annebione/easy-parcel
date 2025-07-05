import sql from 'better-sqlite3';
import xss from 'xss';
import { randomUUID } from 'crypto';
const db =  sql('easy-parcel.db');

import { LabelResponseData } from '@/types/labels.types';


export async function createLabel(data: LabelResponseData) {
    const sanitizedLabel = {
        id: randomUUID(),
        user_id: randomUUID(),
        label_url: xss(data.label_url),
    };    
    return db.prepare('INSERT INTO labels (id, user_id, label_url) VALUES (?, ?, ?)').run(
        sanitizedLabel.id,
        sanitizedLabel.user_id,
        sanitizedLabel.label_url
    );
  }