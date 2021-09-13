import { Request } from 'express';
import { ClientDocument } from '../clients/client.schema';

interface RequestWithClient extends Request {
  user: ClientDocument;
}

export default RequestWithClient;
