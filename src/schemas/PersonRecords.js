import {Model} from 'radiks'

class PersonRecords extends Model {
   static className = 'PersonRecords';

  static schema={
    Name:String,
    records:[]
  }
}
