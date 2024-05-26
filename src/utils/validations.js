
export const validate = (type, value) => {

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,14}$/;
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const nicknameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  //nickname regex permite introducir letras en mayuscula y minúscula, numeros y guiones tanto bajos como estándar, con entre 3 y 15 caracateres.


  // const nameRegex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u

  // switch (type) {
  //     case "name":
  //     case "nombre":
  //     case "surname":
  //     case "firstName":
  //     case "lastName":

  //       if (!nameRegex.test(value) || value.length > 50) {
  //         return "Por favor, el nombre debe tener un formato valido.";
  //       }

  //       return "";

  switch (type) {
    case "email":
    case "e-mail":
    case "correo":
    case "mail":

      if (!emailRegex.test(value)) {
        return "Por favor, el formato de email debe de ser correcto.";
      }

      return "";

    case "password":
    case "contraseña":

      if (!passwordRegex.test(value)) {
        return "Su contraseña debe tener 8 caracteres, simbolo y mayúscula";
      }

      return "";

    case "nickname":


      if (!nicknameRegex.test(value)) {
        return "Tu nickname debe tener 3-15 caracteres y usar solo guiones, letras y numeros"
      }
      return ""

    case "turntable":
      if (value && value.length < 3 || value && value.length > 250) {
        return "Se necesitan entre 3 y 250 caracteres en tu equipo y RRSS's"
      }
      return ""

    case "description":

      if (value.length > 1000 || value.length < 3) {
        return "La descripción debe tener entre 3 y 1000 caracteres"
      }
      return ""

    case "title":

      if (value.length < 3 || value.length > 250) {
        return "Por favor, el título debe tener entre 3 y 250 caracteres.";
      }

      return "";

    case "comment":

      if (value.length > 1000 || value.length < 3) {
        return "El comentario debe tener entre 3 y 1000 caracteres.";
      }

      return "";

    case "url":

      if (value.length < 3 || value.length > 250) {
        return "Por favor, la url debe tener entre 3 y 250 caracteres.";
      }

      return "";

    default:
      console.log("No matches found")
  }

}