import { Method } from 'axios';

interface Endpoint {
  url: string;
  headers: any;
  method: Method;
  params: any;
  data?: any;
}

export default Endpoint;
