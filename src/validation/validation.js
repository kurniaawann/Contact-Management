import { ResponseError } from "../error/response-error.js";

const validate = (scheme, request) => {
  const result = scheme.validate(request, {
    abortEarly: false, //menampilkan error yang di butuhkan
    allowUnknown: false, //melakukan rejecct saat ada field yang tidak di ketahui
  });
  if (result.error) {
    console.log(result.error.message);
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
};

export { validate };
