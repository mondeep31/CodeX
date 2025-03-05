interface User {
    name: string;
    id: string;
  }
  
interface Room {
    id: string;
    name: string;
    users: User[];
    code: string;
    language: string;
  }
  
export interface RoomData {
    [roomId: string]: Room;
  }
  