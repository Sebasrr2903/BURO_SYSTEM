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
      "Rechazo por Cédula Alterado": "Buen día,\n\n El caso se rechaza debido a sospechas de alteración en el documento de identidad. Les solicitamos enviar un video que permita verificar la autenticidad del documento.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

      "Rechazo por Cédula No Legible": "Buen día,\n\nEl caso se rechaza por no adjuntar el documento de identidad legible y claro, fundamental para realizar el trámite.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",
      
      "Rechazo por Contrato Activo": "Buen día,\n\nNo procede el análisis, el cliente tiene servicios activos. El análisis de buró no aplica para segundas ni terceras ventas, únicamente para clientes desactivados en su totalidad.\n\n\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!",
      
      "CÉDULA AMBAS CARAS": " Buen día,\n\nEl caso se rechaza por no adjuntar el documento de identidad por ambas caras, fundamental para realizar el trámite \n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",   
      
      "CONTROL DE ALTAS": "Buen día,\n\nNo es posible brindar visto bueno debido a que la identificación del cliente se muestra errónea en el sistema, por favor, enviar el caso a control de altas para su debido análisis y corrección.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",
             
      "NO COINCIDE (cuando la información de la plantilla no coincide con la fotografía)": "Buen día,\n\nEl caso se rechaza por no coincidir el documento de identidad con la información adjunta.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

      "FECHA SIN FORMATO": "Buen día,\n\nEl caso se rechaza por motivo que el documento presenta alteraciones físicas  y  no coincide con Migracion y Extranjeria. \n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

      "SIN CÉDULA": " Buen día,\n\nEl caso se rechaza por no adjuntar el documento de identidad, fundamental para realizar el trámite.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",

      "SIN INFOMACIÓN": "Buen día,\n\nEl caso se rechaza por no venir la plantilla completa. Deben completarla y enviarla junto con la cédula del cliente por ambos lados.\n\nBuenas tardes\n\nSu apoyo con la validación del caso \n\nNombre del cliente: xxxxxxxxxxx\n\nCédula del cliente: xxxxxxxxxxx\n\n**Solicitud visto bueno**\n\nAdjuntar documento de identidad por ambos lados (legible) \n\nCorreo de respuesta: máximo 2 direcciones electrónicas\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",
      
      "CONTACTO": "Buen día,\n\nPara brindarle una mejor atención, me brinda por favor su nombre completo y a cuál agente autorizado pertenece\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",
      
      "SIN REGISTROS": "Buen día,\n\nEl análisis no procede ya que el cliente no posee registros con Claro.\n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!. ",
      
      "DOCUMENTO VENCIDO": "Buen día,\n\nEl análisis no procede ya que el documento de identidad no se encuentra vigente, \n\nCualquier duda adicional con gusto.\n\n\n¡Nos encantó atenderte el día de hoy!\nSu número de gestión es:{gestion}\nAnte cualquier duda o inconveniente que tengás podés comunicarte a los siguientes medios:\n📱 WhatsApp: 7002 4600\n¡Qué pases un excelente día!.",


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
             seleccion === "Visto Bueno Carta de Descargo" ||
            seleccion === "Visto Bueno Activo" ||
            seleccion === "WRITTE OFF(SIN TERMINAL)" ||
            seleccion === "LIMPIEZA DE SALDOS" ||
            seleccion === "LIMPIEZA DE SALDOS WRITE OFF"||
            seleccion === "Facturas Pendientes"||
            seleccion === "TERMINAL LIGADO (Solo debe finaciamiento)"||
            seleccion === "CON ACTUALIZACIÓN DE SEGMENTACIÓN"||
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
            seleccion === "LIMPIEZA DE SALDOS WRITE OFF"||
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

  

     function copiarTexto() {
            const texto = document.getElementById("resultado");
            texto.select();
            document.execCommand("copy");

            
            document.getElementById("nombre").value = "";
            document.getElementById("gestion").value = "";
            document.getElementById("cedula").value = "";
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
          document.getElementById("calcDisplay").value = calcInput;
        }

     function calculate() {
            try {
             
              const sanitizedInput = calcInput.replace(/\./g, '').replace(/,/g, '.');

             
              const result = eval(sanitizedInput);

              
              const formattedResult = result.toLocaleString('en-US', { minimumFractionDigits: 2 });

              
              calcInput = formattedResult;
              document.getElementById("calcDisplay").value = calcInput;
            } catch (e) {
              
              document.getElementById("calcDisplay").value = "Error";
              calcInput = "";
            }
  }

        function clearCalc() {
          calcInput = "";
          document.getElementById("calcDisplay").value = "";
        }

        // Actualiza calcInput al escribir o pegar
        document.getElementById("calcDisplay").addEventListener("input", function(e) {
          calcInput = this.value;
        });

        // Calcular con tecla Enter
        document.getElementById("calcDisplay").addEventListener("keydown", function(e) {
          if (e.key === "Enter") {
            calculate();
          }
        });


      function filtrar(texto) {
        const input = document.getElementById('filtroPlantilla');
        input.value = texto;
        input.dispatchEvent(new Event('input'));
      }

      function toggleCalculadora() {
        const calc = document.querySelector(".calculadora");
        if (calc.style.display === "none") {
          calc.style.display = "block";
        } else {
          calc.style.display = "none";
        }
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
window.onload = function() {
  actualizarLista();
  renderIndice();
};


