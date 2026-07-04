  
  function toggleCalculadora() {
  const calc = document.querySelector(".calculadora");
  if (calc.style.display === "none") {
    calc.style.display = "block";
  } else {
    calc.style.display = "none";
  }
}

function accesoRapido(texto) {
  const select = document.getElementById('plantilla');
  const option = document.querySelector(`option[value="${texto}"]`);
  if (option) {
    select.value = texto; // Selecciona la plantilla correspondiente
    const event = new Event('change');
    select.dispatchEvent(event);
  }
}

const plantillas = {

  "CON ACTUALIZACIÓN DE SEGMENTACIÓN": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre}, base a las evidencias adjuntas, el mismo cumplió con los pagos correspondientes con la empresa. Adicional les comento, que las referencias crediticias, así como la segmentación del cliente se actualizaron correctamente\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "NO SE PUEDE ACTUALIZAR SEGMENTACIÓN": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para venta nueva, cédula {cedula}, a nombre de {nombre}, base a las evidencias adjuntas, el mismo cumplió con los pagos correspondientes con la empresa. Adicional les comento, que las referencias crediticias del cliente se actualizaron correctamente. En cuanto a la modificación de segmentación del cliente, debe de solicitarse por medio de caso Qflow, a control de altas\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "Visto Bueno Carta de Descargo": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para carta de descargo, cédula {cedula}, a nombre del cliente {nombre}, con base a las evidencias adjuntas, el mismo cumplió con los pagos correspondientes con la empresa. Las referencias crediticias fueron actualizadas correctamente.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",
  "Visto Bueno": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre}, con base a las evidencias adjuntas, el mismo cumplió con los pagos correspondientes con la empresa. Las referencias crediticias fueron actualizadas correctamente.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "Visto Bueno Activo": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre}, con base a las evidencias adjuntas, el cliente evidencia servicio activo y a la fecha de revisión no cuenta con facturas vencidas.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",



  "NC APLICADA": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para la venta nueva cédula {cedula}, a nombre del cliente {nombre}, con base a la política de excepción para la apertura de ventas el mismo se le aplicó una nota de crédito el pasado {fechaNC}, por el monto de ¢ {monto}.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",


  "Cero pagos": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre},ya que registra saldos bajo el Código NOTA DE CREDITO POR CLIENTE CERO PAGOS CASO VISTO CON GERENCIA DE OPERACIONES Y FINANCIERA DE CR, el monto pendiente es de ¢{monto}.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "Cero pagos(CON TERMINAL)": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre},ya que registra saldos bajo el Código NOTA DE CREDITO POR CLIENTE CERO PAGOS CASO VISTO CON GERENCIA DE OPERACIONES Y FINANCIERA DE CR, el monto pendiente es de  ¢{monto}.\n\nEl cliente tiene penalidad por retiro anticipado, no se encuentra evidencia del pago en ONBASE o interacciones anteriores que los respalden.\n\n    I. Fecha de activación: {fecha_activacion}\n    II. Fecha de expiración: {fecha_expiracion}\n    III. Fecha de desactivación: {fecha_desactivacion}\n    IV. Terminal ligado: {terminal}\n\nSe adjunta documentación como respaldo de lo mencionado. Si mantienen evidencia que demuestre lo contrario, hacerla llegar para validar nuevamente el caso.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "LIMPIEZA DE SALDOS WRITE OFF": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nSe procede con visto bueno para la venta nueva, cédula {cedula}, a nombre del cliente {nombre}, con base a la política de excepción para la apertura de ventas se le aplicó al mismo se le aplicó una nota de crédito, por el monto de ¢{monto}. Adicional les comento, que las referencias crediticias, así como la segmentación del cliente se actualizaron correctamente.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "LIMPIEZA DE SALDOS": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEstimados Sres.\n\nSe procede con visto bueno para la venta nueva, cédula {cedula}, a nombre del cliente {nombre}, con base a la política de excepción para la apertura de ventas se le aplicó una nota de crédito por el monto de ¢{monto}. Las referencias crediticias y la segmentación del cliente se actualizaron correctamente.\n\nNOTA: Si la venta no se concreta, deben solicitar la anulación de la nota de crédito hoy mismo por medio del WhatsApp 70024600, opción Soporte Comercial.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "WRITTE OFF(CON TERMINAL)": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre}, ya que cuenta con saldos bajo el Código NOTA DE CRÉDITO POR CLIENTE WRITTE OFF, CASO VISTO CON GERENCIA DE OPERACIONES Y FINANCIERA DE CR, el monto pendiente es de ¢{monto}.\n\nEl cliente tiene penalidad por retiro anticipado, no se encuentra evidencia del pago en ONBASE o interacciones anteriores que los respalden.\n\n    I. Fecha de activación: {fecha_activacion}\n    II. Fecha de expiración: {fecha_expiracion}\n    III. Fecha de desactivación: {fecha_desactivacion}\n    IV. Terminal ligado: {terminal}\n\nSe adjunta documentación como respaldo de lo mencionado. Si mantienen evidencia que demuestre lo contrario, hacerla llegar para validar nuevamente el caso.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "WRITTE OFF(SIN TERMINAL)": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, del cliente {nombre}, cédula {cedula}, ya que cuenta con saldos bajo el Código NOTA DE CREDITO POR CLIENTE WRITTE OFF, CASO VISTO CON GERENCIA DE OPERACIONES Y FINANCIERA DE CR, el monto pendiente es de ¢{monto}.\n\nSe adjunta documentación como respaldo de lo mencionado, sí mantienen evidencia que demuestre lo contrario, favor hacerla llegar para validar nuevamente el caso.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "SIN FORMALIZACION": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, del cliente {nombre}, cédula {cedula}, ya que no hay evidencia en ONBASE de la baja de los equipos DTH, ni gestión o caso Qflow. Adicional, registra saldos bajo el Código NOTA DE CREDITO POR CLIENTE WRITTE OFF, CASO VISTO CON GERENCIA DE OPERACIONES Y FINANCIERA DE CR,el monto pendiente es de ¢ {monto}.\n\nSe adjunta documentación como respaldo de lo mencionado, sí mantienen evidencia que demuestre lo contrario, favor hacerla llegar para validar nuevamente el caso.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",


  "TERMINAL LIGADO (Financiamiento y facturas pendientes)": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre}, ya que existen facturas pendientes y no hay evidencia de pago o interacciones anteriores que lo respalden.\n\nFacturas pendientes: ¢ {monto} \n\nAdicional, muestra penalidad por retiro anticipado y no se hay evidencia del pago en ONBASE o interacciones anteriores que lo respalden.\n\n    I. Fecha de activación: {fecha_activacion}\n    II. Fecha de expiración: {fecha_expiracion}\n    III. Fecha de desactivación: {fecha_desactivacion}\n    IV. Terminal ligado: {terminal}\n\nSe adjunta documentación como respaldo de lo mencionado. Si mantienen evidencia que demuestre lo contrario, hacerla llegar para validar nuevamente el caso.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "TERMINAL LIGADO (Solo debe finaciamiento)": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, cédula {cedula}, a nombre del cliente {nombre}, ya que el cliente muestra las siguientes penalidades por retiro anticipado pendiente, ya que no se encuentra evidencia del pago en ONBASE o interacciones anteriores que los respalden.\n\n    I. Fecha de activación: {fecha_activacion}\n    II. Fecha de expiración: {fecha_expiracion}\n    III. Fecha de desactivación: {fecha_desactivacion}\n    IV. Terminal ligado: {terminal}\n\nSe adjunta documentación como respaldo de lo mencionado. Si mantienen evidencia que demuestre lo contrario, hacerla llegar para validar nuevamente el caso.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",


  "Facturas Pendientes": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede visto bueno para venta nueva, cédula {cedula}, nombre del cliente {nombre}, ya que cuenta con facturas pendientes y no hay evidencia de pago o interacciones anteriores que lo respalden.\n\nFacturas pendientes: ¢{monto} {facturasPendientesTexto}\n\nSe adjunta documentación como respaldo de lo mencionado. Si mantienen evidencia que demuestre lo contrario, favor hacerla llegar para validar nuevamente el caso.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  //RECHAZOS 

  "CASO DUPLICADO": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nCompañeros el caso de este cliente ya ingreso anteriormente a análisis, por lo cual ya cuenta con respuesta a la solicitud.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "Rechazo por Cédula Alterado": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\n El caso se rechaza debido a sospechas de alteración en el documento de identidad.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "Rechazo por Cédula No Legible": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEl caso se rechaza por no adjuntar el documento de identidad legible y claro, fundamental para realizar el trámite.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "Rechazo por Contrato Activo": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo procede el análisis, el cliente tiene servicios activos. El análisis de buró no aplica para segundas ni terceras ventas, únicamente para clientes desactivados en su totalidad.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",

  "CÉDULA AMBAS CARAS": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEl caso se rechaza por no adjuntar el documento de identidad por ambas caras, fundamental para realizar el trámite \n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "CONTROL DE ALTAS": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nNo es posible brindar visto bueno debido a que la identificación del cliente se muestra errónea en el sistema, por favor, enviar el caso a control de altas para su debido análisis y corrección.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "NO COINCIDE (cuando la información de la plantilla no coincide con la fotografía)": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEl caso se rechaza por no coincidir el documento de identidad con la información adjunta.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "FECHA SIN FORMATO": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nCompañeros el caso se rechaza por motivo que el documento presenta alteraciones físicas y la fecha de vencimiento no coincide con Migracion y Extranjeria. \n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "SIN CÉDULA": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEl caso se rechaza por no adjuntar el documento de identidad, fundamental para realizar el trámite.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "SIN INFOMACIÓN": "Buen día,\n\nEl caso se rechaza por no venir la plantilla completa. Deben completarla y enviarla junto con la cédula del cliente por ambos lados.\n\nBuenas tardes\n\nSu apoyo con la validación del caso \n\nNombre del cliente: xxxxxxxxxxx\n\nCédula del cliente: xxxxxxxxxxx\n\n**Solicitud visto bueno**\n\nAdjuntar documento de identidad por ambos lados (legible) \n\nCorreo de respuesta: máximo 2 direcciones electrónicas\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "CONTACTO": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nPara brindarle una mejor atención, me brinda por favor su nombre completo y a cuál agente autorizado pertenece\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

  "SIN REGISTROS": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEl análisis no procede ya que el cliente no posee registros con Claro.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!. ",

  "DOCUMENTO VENCIDO": "Fecha:{fecha}\nHora:{hora}\n\nBuen día,\n\nEl análisis no procede ya que el documento de identidad no se encuentra vigente, \n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",


};

function actualizarLista() {
  const filtro = ''; // Como no hay campo de búsqueda, puedes dejarlo vacío
  const select = document.getElementById("plantilla");
  select.innerHTML = ""; // Limpiar las opciones

  Object.keys(plantillas).forEach(nombre => {
    // El filtro ahora está vacío, por lo que mostrará todas las plantillas
    const option = document.createElement("option");
    option.value = nombre;
    option.textContent = nombre;
    select.appendChild(option);
  });

  // Si no hay resultados, muestra un mensaje
  if (select.options.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No se encontraron plantillas";
    option.disabled = true;
    select.appendChild(option);
  }
}

document.getElementById("plantilla").addEventListener("change", function () {
  const seleccion = this.value.trim();

  const writteOffCampos = document.getElementById("writteOffCampos");
  const checkboxes = document.getElementById("checkboxes");
  const formulario = document.getElementById("formulario");
  const campoFecha = document.getElementById("campoFecha");
  const montoInput = document.getElementById("montoInput");

  checkboxes.style.display = (seleccion === "Facturas Pendientes") ? "block" : "none";

  campoFecha.style.display = (seleccion === "NC APLICADA") ? "block" : "none";

  if (
    seleccion === "WRITTE OFF(CON TERMINAL)" ||
    seleccion === "Cero pagos(CON TERMINAL)" ||
    seleccion === "SIN FORMALIZACION" ||
    seleccion === "TERMINAL LIGADO (Financiamiento y facturas pendientes)" ||
    seleccion === "NC APLICADA" ||
    seleccion === "Cero pagos" ||
    seleccion === "Visto Bueno" ||
    seleccion === "CASO DUPLICADO" ||
    seleccion === "SIN REGISTROS" ||
    seleccion === "DOCUMENTO VENCIDO" ||
    seleccion === "CONTROL DE ALTAS" ||
    seleccion === "Rechazo por Cédula Alterado" ||
    seleccion === "Visto Bueno Carta de Descargo" ||
    seleccion === "Visto Bueno Activo" ||
    seleccion === "WRITTE OFF(SIN TERMINAL)" ||
    seleccion === "LIMPIEZA DE SALDOS" ||
    seleccion === "LIMPIEZA DE SALDOS WRITE OFF" ||
    seleccion === "Facturas Pendientes" ||
    seleccion === "TERMINAL LIGADO (Solo debe finaciamiento)" ||
    seleccion === "CON ACTUALIZACIÓN DE SEGMENTACIÓN" ||
    seleccion === "NO SE PUEDE ACTUALIZAR SEGMENTACIÓN"


  ) {
    formulario.style.display = "block";
  } else {
    formulario.style.display = "none";
  }


  if (
    seleccion === "Cero pagos(CON TERMINAL)" ||
    seleccion === "WRITTE OFF(CON TERMINAL)" ||
    seleccion === "TERMINAL LIGADO (Financiamiento y facturas pendientes)" ||
    seleccion === "TERMINAL LIGADO (Solo debe finaciamiento)"
  ) {
    writteOffCampos.style.display = "block";
  } else {
    writteOffCampos.style.display = "none";
  }

  if (
    seleccion === "Cero pagos(CON TERMINAL)" ||
    seleccion === "WRITTE OFF(CON TERMINAL)" ||
    seleccion === "TERMINAL LIGADO (Financiamiento y facturas pendientes)" ||
    seleccion === "SIN FORMALIZACION" ||
    seleccion === "NC APLICADA" ||
    seleccion === "Cero pagos" ||
    seleccion === "WRITTE OFF(SIN TERMINAL)" ||
    seleccion === "LIMPIEZA DE SALDOS" ||
    seleccion === "LIMPIEZA DE SALDOS WRITE OFF" ||
    seleccion === "Facturas Pendientes"



  ) {
    montoInput.style.display = "block";
  } else {
    montoInput.style.display = "none";
  }

});
function generarPlantilla() {
  const plantillaKey = document.getElementById("plantilla").value;
  const ahora = new Date();
  const dia = String(ahora.getDate()).padStart(2, '0');
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const anio = ahora.getFullYear();

  let horaNum = ahora.getHours();
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  const periodo = horaNum >= 12 ? 'p.m.' : 'a.m.';
  horaNum = horaNum % 12;
  horaNum = horaNum ? horaNum : 12; // 0 => 12

  const horaFormateada = `${horaNum}:${minutos} ${periodo}`;
  const fechaFormateada = `${dia}/${mes}/${anio}`;

  const gestion = document.getElementById("gestion").value.trim().toUpperCase();
  const nombre = document.getElementById("nombre").value.trim().toUpperCase();
  const cedula = document.getElementById("cedula").value.trim();
  const monto = document.getElementById("monto").value.trim();
  const terminal = document.getElementById("terminal").value.trim();
  const fecha_activacion = document.getElementById("fecha_activacion").value.trim();
  const fecha_expiracion = document.getElementById("fecha_expiracion").value.trim();
  const fecha_desactivacion = document.getElementById("fecha_desactivacion").value.trim();
  const distribuidor = document.getElementById("distribuidor").value.trim().toUpperCase();


  document.getElementById("errorGestion").classList.add("d-none");
  document.getElementById("errorNombre").classList.add("d-none");
  document.getElementById("errorCedula").classList.add("d-none");
  document.getElementById("errorDistribuidor").classList.add("d-none");


  let hayError = false;



 if (!distribuidor) {

    document
        .getElementById("errorDistribuidor")
        .classList.remove("d-none");

    document
        .getElementById("distribuidor")
        .classList.add("is-invalid");

    hayError = true;

} else {

   document
        .getElementById("distribuidor")
        .classList.remove("is-invalid");

}
  if (!gestion) {
    document.getElementById("errorGestion").classList.remove("d-none");
    document.getElementById("gestion").classList.add("is-invalid");
    hayError = true;
  } else {
    document.getElementById("gestion").classList.remove("is-invalid");
  }

  if (
    plantillasProcede.includes(plantillaKey) ||
    plantillasNoProcede.includes(plantillaKey)
  ) {

    if (!nombre) {
      document.getElementById("errorNombre").classList.remove("d-none");
      document.getElementById("nombre").classList.add("is-invalid");
      hayError = true;
    } else {
      document.getElementById("nombre").classList.remove("is-invalid");
    }

    if (!cedula) {
      document.getElementById("errorCedula").classList.remove("d-none");
      document.getElementById("cedula").classList.add("is-invalid");
      hayError = true;
    } else {
      document.getElementById("cedula").classList.remove("is-invalid");
    }
  }

  if (hayError) {
    return;
  }

  let fechaInput = document.getElementById("fecha").value.trim();
  let fecha = "";
  if (fechaInput) {
    const partes = fechaInput.split("-");
    fecha = `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  const suspendido = document.getElementById('suspendido').checked;
  const sinCumplirAno = document.getElementById('sinCumplirAno').checked;
  const menos2750 = document.getElementById('menos2750').checked;
  const finaciamiento = document.getElementById('finaciamiento').checked;

  let facturasPendientesTexto = "";
  if (suspendido) facturasPendientesTexto += "servicio está suspendido. ";
  if (sinCumplirAno) facturasPendientesTexto += "las facturas no cumple con el año antigüedad. ";
  if (finaciamiento) facturasPendientesTexto += "Adicional cliente no aplica para limpieza tiene Financiamiento abierto. ";
  if (menos2750) facturasPendientesTexto += "";

  let texto = plantillas[plantillaKey]
    .replace("{nombre}", nombre)
    .replace("{gestion}", gestion)
    .replace("{fecha}", fechaFormateada)
    .replace("{hora}", horaFormateada)
    .replace("{cedula}", cedula)
    .replace("{monto}", monto)
    .replace("{fecha_activacion}", fecha_activacion)
    .replace("{fecha_expiracion}", fecha_expiracion)
    .replace("{fecha_desactivacion}", fecha_desactivacion)
    .replace("{terminal}", terminal)
    .replace("{fechaNC}", fecha) // si usas fecha para nota de crédito
    .replace("{facturasPendientesTexto}", facturasPendientesTexto);

  document.getElementById("resultado").value = texto || "Selecciona una plantilla válida.";

  let resultado = "RECHAZO";

  if (plantillasProcede.includes(plantillaKey)) {
    resultado = "PROCEDE";
  }

  if (plantillasNoProcede.includes(plantillaKey)) {
    resultado = "NO PROCEDE";
  }

  fetch("/guardar-plantilla/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      distribuidor: distribuidor,
      gestion: gestion,
      cedula: cedula,
      nombre_cliente: nombre,
      nombre_plantilla: plantillaKey,
      resultado: resultado,
      respuesta: texto
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log("Guardado correctamente", data);
    })
    .catch(error => {
      console.error("Error:", error);

    });
}


function recuperarUltimaGestion() {

    Swal.fire({
        title: "¿Recuperar última gestión?",
        text: "La gestión será eliminada del historial para evitar duplicados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Recuperar",
        cancelButtonText: "Cancelar"
    }).then((result) => {

        if (!result.isConfirmed) {
            return;
        }

        fetch("/ultima-gestion/")
        .then(r => r.json())
        .then(data => {

            if (!data.success) {
                return;
            }

            document.getElementById(
                "distribuidor"
            ).value = data.distribuidor;

            document.getElementById(
                "gestion"
            ).value = data.gestion;

            document.getElementById(
                "cedula"
            ).value = data.cedula;

            document.getElementById(
                "nombre"
            ).value = data.nombre_cliente;

            document.getElementById(
                "plantillaSelect"
            ).value = data.plantilla;

        });

    });

}
function soloNumeros(input) {
    input.value = input.value.replace(/\D/g, '');
}

function soloLetras(input) {
    input.value = input.value
        .replace(/[^A-ZÁÉÍÓÚÑÜ\s]/gi, '')
        .toUpperCase();
}

function soloDistribuidor(input) {
    input.value = input.value
        .replace(/[^A-ZÁÉÍÓÚÑÜ&\-\s]/gi, '')
        .toUpperCase();
}

function seleccionarGestion(index){

    indiceActual = index;

    mostrarGestion();

    llenarHistorial();

}

function llenarHistorial() {
    
document.getElementById("contador").innerText =
    `Gestión ${indiceActual + 1} de ${historialActual.length}`;

    let html = "";

    historialActual.forEach((item, index) => {

        html += `
            <button
                type="button"
                class="list-group-item list-group-item-action ${index === indiceActual ? 'active' : ''}"
                onclick="seleccionarGestion(${index})">

                ${item.fecha} - ${item.resultado} - ${item.distribuidor}

            </button>
        `;

    });

    document.getElementById("listaHistorial").innerHTML = html;

}


function generarNueva() {

    document.getElementById(
        "cedula"
    ).value = datosCedula.cedula || "";

    document.getElementById(
        "nombre"
    ).value = datosCedula.nombre_cliente || "";

    bootstrap.Modal.getInstance(
        document.getElementById(
            "modalCedulaExiste"
        )
    ).hide();

    document.getElementById(
        "gestion"
    ).focus();
}

function verificarAntesDeGenerar() {

    const cedula = document
        .getElementById("cedula")
        .value.trim();

    if (!cedula) {

        generarPlantilla();
        copiarTexto();
        return;
    }

    fetch(`/verificar-cedula/?cedula=${encodeURIComponent(cedula)}`)
        .then(r => r.json())
        .then(data => {

            if (!data.existe) {

                generarPlantilla();
                copiarTexto();
                return;

            }

            historialActual = data.historial;
            indiceActual = 0;

            llenarHistorial();
            mostrarGestion();

            new bootstrap.Modal(
                document.getElementById("modalCedulaExiste")
            ).show();

        });

}



let historialActual = [];
let indiceActual = 0;
let datosCedula = {};

function verificarCedula() {

    const cedula = document
        .getElementById("cedula")
        .value.trim();

    if (!cedula) {

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Campo cédula obligatorio',
            showConfirmButton: false,
            timer: 2500
        });

        return;
    }

    fetch(`/verificar-cedula/?cedula=${cedula}`)
    .then(response => response.json())
    .then(data => {

        if (!data.existe) {

            Swal.fire({
                icon: "success",
                title: "Sin registros",
                text: "No existen gestiones para esta cédula.",
                confirmButtonText: "Aceptar"
            });

            return;
        }

        datosCedula = data;

        historialActual = data.historial;
        indiceActual = 0;

        llenarHistorial();

        mostrarGestion();

        new bootstrap.Modal(
            document.getElementById("modalCedulaExiste")
        ).show();

    });

}
function generarYCopiar() {

    bootstrap.Modal
        .getInstance(document.getElementById("modalCedulaExiste"))
        .hide();

    generarPlantilla();

    copiarTexto();

}

function siguiente() {

    if (indiceActual < historialActual.length - 1) {

        indiceActual++;

        mostrarGestion();

    }

}

function anterior() {

    if (indiceActual > 0) {

        indiceActual--;

        mostrarGestion();

    }

}

function mostrarGestion() {

    const g = historialActual[indiceActual];

    document.getElementById("fechaHistorial").textContent =
        g.fecha;

    document.getElementById("usuarioHistorial").textContent =
        g.usuario;

    document.getElementById("resultadoHistorial").textContent =
        g.resultado;

    document.getElementById("distribuidorHistorial").textContent =
        g.distribuidor;

    document.getElementById("respuestaAnterior").value =
        g.respuesta;

    document.getElementById("contador").textContent =
        `Gestión ${indiceActual + 1} de ${historialActual.length}`;

    document.getElementById("btnAnterior").disabled =
        indiceActual === 0;

    document.getElementById("btnSiguiente").disabled =
        indiceActual === historialActual.length - 1;

    llenarHistorial();

}


function copiarRespuestaModal() {

    const respuesta =
        document.getElementById(
            "modalRespuesta"
        ).value;

    navigator.clipboard.writeText(
        respuesta
    );

    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Respuesta copiada',
        showConfirmButton: false,
        timer: 2000
    });

}




function copiarTexto() {
  const texto = document.getElementById("resultado");
  texto.select();
  document.execCommand("copy");


  document.getElementById("nombre").value = "";
  document.getElementById("gestion").value = "";
  document.getElementById("cedula").value = "";
  document.getElementById("distribuidor").value = "";
  if (document.getElementById("monto")) document.getElementById("monto").value = "";

  if (document.getElementById("fecha_activacion")) document.getElementById("fecha_activacion").value = "";
  if (document.getElementById("fecha_expiracion")) document.getElementById("fecha_expiracion").value = "";
  if (document.getElementById("fecha_desactivacion")) document.getElementById("fecha_desactivacion").value = "";
  if (document.getElementById("terminal")) document.getElementById("terminal").value = "";

  if (document.getElementById("fecha")) document.getElementById("fecha").value = "";

  const radios = document.querySelectorAll("input[type='radio']");
  radios.forEach(r => r.checked = false);

}







// Cargar al iniciar
window.onload = actualizarLista;

let calcInput = "";

function appendCalc(value) {

    calcInput += value;

    document.getElementById(
        "calcDisplay"
    ).value = calcInput;
}

function calculate() {

    try {

        document.getElementById(
            "calcOperacion"
        ).innerText = calcInput;

        let expression =
            calcInput
            .trim()
            .replace(/\s/g, "");

        // Si tiene coma, asumimos formato CR/ES
        if (expression.includes(",")) {

            expression = expression
                .replace(/\./g, "")
                .replace(/,/g, ".");
        }

        const result = eval(expression);

        const formattedResult =
            Number(result).toLocaleString(
                "es-CR",
                {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }
            );

        calcInput = formattedResult;

        document.getElementById(
            "calcDisplay"
        ).value = formattedResult;

    } catch (error) {

        console.error(error);

        document.getElementById(
            "calcDisplay"
        ).value = "Error";

        calcInput = "";
    }
}

function clearCalc() {

    calcInput = "";

    document.getElementById(
        "calcDisplay"
    ).value = "";

    document.getElementById(
        "calcOperacion"
    ).innerText = "";
}

document.getElementById(
    "calcDisplay"
).addEventListener("input", function () {

    calcInput = this.value;
});

document.getElementById(
    "calcDisplay"
).addEventListener("keydown", function (e) {

    if (e.key === "Enter") {

        calculate();
    }
});

function toggleCalculadora() {

    const calc =
        document.querySelector(
            ".calculadora"
        );

    calc.style.display =
        calc.style.display === "none"
        ? "block"
        : "none";
}

const plantillasProcede = [
  "CON ACTUALIZACIÓN DE SEGMENTACIÓN",
  "NO SE PUEDE ACTUALIZAR SEGMENTACIÓN",
  "Visto Bueno Carta de Descargo",
  "Visto Bueno",
  "Visto Bueno Activo",
  "NC APLICADA",
  "LIMPIEZA DE SALDOS",
  "LIMPIEZA DE SALDOS WRITE OFF"
];

const plantillasNoProcede = [
  "Facturas Pendientes",
  "Cero pagos",
  "Cero pagos(CON TERMINAL)",
  "WRITTE OFF(CON TERMINAL)",
  "WRITTE OFF(SIN TERMINAL)",
  "SIN FORMALIZACION",
  "TERMINAL LIGADO (Solo debe finaciamiento)",
  "TERMINAL LIGADO (Financiamiento y facturas pendientes)"
];

// Guardar favoritos en navegador (opcional)
let favoritos = JSON.parse(localStorage.getItem("favoritosPlantillas") || "{}");

function toggleFavorito(nombre) {
  favoritos[nombre] = !favoritos[nombre];
  localStorage.setItem("favoritosPlantillas", JSON.stringify(favoritos));
  renderIndice();
}

function renderIndice() {
  const soloFavoritos = document.getElementById("toggleFavoritos").checked;

  const ulProcede = document.getElementById("listaProcede");
  ulProcede.innerHTML = "";
  plantillasProcede.forEach(nombre => {
    if (!soloFavoritos || favoritos[nombre]) {
      const li = document.createElement("li");
      li.innerHTML = `<span onclick="toggleFavorito('${nombre}')" style="cursor:pointer;">${favoritos[nombre] ? "⭐" : "☆"}</span><button onclick="accesoRapido('${nombre}')">${nombre}</button> `;
      ulProcede.appendChild(li);
    }
  });

  const ulNoProcede = document.getElementById("listaNoProcede");
  ulNoProcede.innerHTML = "";
  plantillasNoProcede.forEach(nombre => {
    if (!soloFavoritos || favoritos[nombre]) {
      const li = document.createElement("li");
      li.innerHTML = `<span onclick="toggleFavorito('${nombre}')" style="cursor:pointer;">${favoritos[nombre] ? "⭐" : "☆"}</span><button onclick="accesoRapido('${nombre}')">${nombre}</button>`;
      ulNoProcede.appendChild(li);
    }
  });
}
function toggleSeccion(id) {
  const section = document.getElementById(id);
  section.style.display = (section.style.display === "none") ? "block" : "none";
}

// Inicializar al cargar
window.onload = function () {
  actualizarLista();
  renderIndice();
};



let temporizadorAdvertencia;
let temporizadorLogout;

function reiniciarSesion() {

    clearTimeout(
        temporizadorAdvertencia
    );

    clearTimeout(
        temporizadorLogout
    );

    temporizadorAdvertencia = setTimeout(() => {

        Swal.fire({
            icon: "warning",
            title: "Sesión próxima a expirar",
            text: "Su sesión se cerrará en 5 minutos por inactividad."
        });

    }, 115 * 60 * 1000);

    temporizadorLogout = setTimeout(() => {

        window.location.href = "/logout/";

    }, 120 * 60 * 1000);

}

document.addEventListener(
    "mousemove",
    reiniciarSesion
);

document.addEventListener(
    "keydown",
    reiniciarSesion
);

document.addEventListener(
    "click",
    reiniciarSesion
);

reiniciarSesion();


