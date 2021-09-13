import { Request } from 'express';
import { UserDocument } from '../users/user.schema';
import { ClientDocument } from '../clients/client.schema';

interface RequestWithUser extends Request {
  user: UserDocument;
  client: ClientDocument;
}

export default RequestWithUser;
