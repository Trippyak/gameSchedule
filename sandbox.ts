import { create, verify } from "https://deno.land/x/djwt@v2.4/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

const hash = bcrypt.hashSync("apples");
console.log(hash);

// const key1 = await crypto.subtle.generateKey(
//     { name: "HMAC", hash: "SHA-512" },
//     true,
//     ["sign", "verify"],
//   );

// const key2 = await crypto.subtle.generateKey(
//     { name: "HMAC", hash: "SHA-512" },
//     true,
//     ["sign", "verify"],
// );

// const payload = {
//     id: "123"
// }

// console.log(key1);

// const jwt = await create({alg: "HS512", typ: "JWT"}, payload, key1);
// console.log(jwt);

// const extractedPayload = await verify(jwt, key1);
// console.log(extractedPayload);


// const fatal = await verify(jwt, key2);
// console.log(extractedPayload);
