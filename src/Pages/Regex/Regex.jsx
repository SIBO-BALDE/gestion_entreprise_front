// regex email
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/;
export { emailPattern  };
// regex mot de pass
// const passwordPattern = /^([@#](?=[^aeiou]{7,13}$)(?=[[:alnum:]]{7,13}$)(?=.*[A-Z]{1,}.*$).+)$/;
const passwordPattern = /^[@#](?=[^\s]{6,12}$)(?=.*[A-Z])/;
export { passwordPattern  };