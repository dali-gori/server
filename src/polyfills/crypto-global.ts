// Make Node's crypto module available as a global like in browsers
import * as nodeCrypto from 'crypto';

// if your runtime already has a global crypto, don't overwrite it
if (!(globalThis as any).crypto) {
    (globalThis as any).crypto = nodeCrypto as unknown as Crypto;
}

// For extra safety if only randomUUID is needed:
if (!(globalThis as any).crypto.randomUUID && 'randomUUID' in nodeCrypto) {
    (globalThis as any).crypto.randomUUID = (nodeCrypto as any).randomUUID.bind(nodeCrypto);
}