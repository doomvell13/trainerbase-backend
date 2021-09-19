import { Request } from 'express';
import { ClientDocument } from '../clients/client.schema';

interface RequestWithClient extends Request {
  client: ClientDocument;
}

export default RequestWithClient;
