export const STUDENT_USERNAME_REGX = /^[a-zA-Z][a-zA-Z0-9]{3,32}\S$/;
export const FULLNAME_REGEX = /^(^[A-Za-z]{3,16})([ ]{1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})$/;
export const PASSWORD_REGEX = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])?(?=.*[\W]).{8,64})$/;
export const UUID_ALL_VERSIONS_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const NAME_REGEX = /^([A-Z][a-z])\w+$/;
