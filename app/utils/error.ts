export function parseGraphqlError(err: any, defaultMessage?: string): Error {
  const errors = err && err.graphQLErrors;
  let message = defaultMessage || '';
  if (errors && errors[0]) {
    const message = errors[0].message;
    return new Error(message);
  } else return new Error(message);
}
