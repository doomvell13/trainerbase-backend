import { IsMongoId } from 'class-validator';

class ValidatedID {
  @IsMongoId()
  session_id: string;
}

export default ValidatedID;
