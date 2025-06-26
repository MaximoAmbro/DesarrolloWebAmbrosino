document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('subscription-form');
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  const modalCloseBtn = document.getElementById('modal-close');

  // Objeto con referencias a campos
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

  // Validaciones y errores (igual que antes)
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

  // Validadores (igual que antes)
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

  // Mostrar/ocultar errores (igual que antes)
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

  // Validar en blur y limpiar en focus (igual que antes)
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

  // Actualizar título dinámico
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

  // Mostrar modal y ocultar modal
  function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('visible');
  }
  function hideModal() {
    modal.classList.remove('visible');
  }
  modalCloseBtn.addEventListener('click', hideModal);

  // Cargar datos de localStorage si hay
  window.onload = () => {
    const savedData = localStorage.getItem('subscriptionData');
    if (savedData) {
      const data = JSON.parse(savedData);
      for (const key in data) {
        if (fields[key]) {
          fields[key].value = data[key];
        }
      }
      if (fields.fullname.value.trim()) {
        formTitle.textContent = `HOLA ${fields.fullname.value.trim().toUpperCase()}`;
      }
    }
  };

  // Función para enviar datos por GET con query params
  function sendData(data) {
    const baseUrl = 'http://curso-dev-2021.herokuapp.com/newsletter';
    const queryParams = new URLSearchParams(data).toString();
    const url = `${baseUrl}?${queryParams}`;

    fetch(url, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          handleSuccess(data);
        } else {
          handleFailure();
        }
      })
      .catch(() => {
        handleFailure();
      });
  }

  // Manejar éxito: guardar en localStorage y mostrar modal
  function handleSuccess(data) {
    localStorage.setItem('subscriptionData', JSON.stringify(data));
    showModal('Suscripción enviada con éxito. ¡Gracias!');
  }

  // Manejar fracaso: mostrar modal
  function handleFailure() {
    showModal('Error al enviar la suscripción. Intente más tarde.');
  }

  // Submit del formulario
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
      showModal('Errores:\n' + errors.join('\n'));
    } else {
      // Recolectar datos para enviar (sin password 2)
      const dataToSend = {
        nombre: fields.fullname.value.trim(),
        email: fields.email.value.trim(),
        password: fields.password.value.trim(),
        edad: fields.age.value.trim(),
        telefono: fields.phone.value.trim(),
        direccion: fields.address.value.trim(),
        ciudad: fields.city.value.trim(),
        codigopostal: fields.postalcode.value.trim(),
        dni: fields.dni.value.trim()
      };
      sendData(dataToSend);
      form.reset();
      formTitle.textContent = "HOLA";
    }
  });
});
