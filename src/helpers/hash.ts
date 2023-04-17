// import { sha512 } from 'js-sha512';
// export default (s) => sha512(s);
import * as crypto from 'crypto';
export default (s) => crypto.createHash('sha512').update(s).digest('hex');
// const hash = crypto.createHash('sha256');
// hash.update(data);
