export const setField = (
  [fieldName, fieldValue]: [string, string],
  state,
  { setIn, changeValue },
) => {
  changeValue(state, fieldName, () => fieldValue);
};
