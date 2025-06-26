document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscription-form');
  const fields = {
    fullname: form.fullname,
    email: form.email,
    password: form.password,
    password2: form.password2,
    age: form.age,
    phone: form.phone,
    address: form.address,
    city: form.city,
    postalcode: form.postalcode,
    dni: form.dni,
  };

  const errorMessages = {
    fullname: "El nombre completo debe tener más de 6 letras y al menos un espacio.",
    email: "Formato de email inválido.",
    password: "La contraseña debe tener al menos 8 caracteres, letras y números.",
    password2: "Las contraseñas deben coincidir.",
    age: "Debe ser un número entero mayor o igual a 18.",
    phone: "Teléfono inválido (mínimo 7 dígitos, sin espacios ni símbolos).",
    address: "La dirección debe tener al menos 5 caracteres y un espacio.",
    city: "La ciudad debe tener al menos 3 caracteres.",
    postalcode: "El código postal debe tener al menos 3 caracteres.",
    dni: "El DNI debe tener 7 u 8 dígitos.",
  };

  function validateFullname(value) {
    return value.length > 6 && value.includes(' ') && /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/.test(value);
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validatePassword(value) {
    return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
  }

  function validatePassword2(value) {
    return value === fields.password.value;
  }

  function validateAge(value) {
    const num = Number(value);
    return Number.isInteger(num) && num >= 18;
  }

  function validatePhone(value) {
    return /^\d{7,}$/.test(value);
  }

  function validateAddress(value) {
    return value.length >= 5 && value.includes(' ');
  }

  function validateCity(value) {
    return value.length >= 3;
  }

  function validatePostalcode(value) {
    return value.length >= 3;
  }

  function validateDNI(value) {
    return /^\d{7,8}$/.test(value);
  }

  const validators = {
    fullname: validateFullname,
    email: validateEmail,
    password: validatePassword,
    password2: validatePassword2,
    age: validateAge,
    phone: validatePhone,
    address: validateAddress,
    city: validateCity,
    postalcode: validatePostalcode,
    dni: validateDNI,
  };

  function showError(field) {
    const container = field.parentElement;
    const small = container.querySelector('.error-message');
    small.textContent = errorMessages[field.name];
  }

  function clearError(field) {
    const container = field.parentElement;
    const small = container.querySelector('.error-message');
    small.textContent = '';
  }

  Object.values(fields).forEach(field => {
    field.addEventListener('blur', () => {
      if (!validators[field.name](field.value.trim())) {
        showError(field);
      } else {
        clearError(field);
      }
    });

    field.addEventListener('focus', () => {
      clearError(field);
    });
  });

  const formTitle = document.getElementById('form-title');
  fields.fullname.addEventListener('keydown', () => {
    setTimeout(() => {
      const val = fields.fullname.value.trim();
      formTitle.textContent = val ? `HOLA ${val.toUpperCase()}` : 'HOLA';
    }, 0);
  });

  fields.fullname.addEventListener('focus', () => {
    const val = fields.fullname.value.trim();
    formTitle.textContent = val ? `HOLA ${val.toUpperCase()}` : 'HOLA';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let errors = [];
    Object.values(fields).forEach(field => {
      if (!validators[field.name](field.value.trim())) {
        showError(field);
        errors.push(errorMessages[field.name]);
      } else {
        clearError(field);
      }
    });

    if (errors.length) {
      alert('Errores:\n' + errors.join('\n'));
    } else {
      const data = {
        Nombre: fields.fullname.value.trim(),
        Email: fields.email.value.trim(),
        Edad: fields.age.value.trim(),
        Teléfono: fields.phone.value.trim(),
        Dirección: fields.address.value.trim(),
        Ciudad: fields.city.value.trim(),
        'Código Postal': fields.postalcode.value.trim(),
        DNI: fields.dni.value.trim()
      };

      let msg = "Suscripción exitosa con los datos:\n";
      for (const key in data) {
        msg += `${key}: ${data[key]}\n`;
      }
      alert(msg);
      form.reset();
      formTitle.textContent = "HOLA";
    }
  });
});
