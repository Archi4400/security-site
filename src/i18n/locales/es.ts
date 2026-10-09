import { BRAND, SVC } from '../../brand';

export const es = {
  meta: {
    home: {
      title: `${BRAND} — detección de amenazas para CRM SaaS propios`,
      desc: `${BRAND} detecta robo de cuentas, acciones internas, escalada de privilegios y exportaciones masivas dentro de CRM multiinquilino propios, sin llevarse sus datos.`,
    },
    solutions: {
      title: `Soluciones | ${BRAND}`,
      desc: `Qué detecta ${BRAND} dentro de un CRM propio: robo de cuentas, escalada de privilegios, fuga de datos, ataques web y postura de seguridad.`,
    },
    ato: {
      title: `Detección de robo de cuentas | ${BRAND}`,
      desc: 'Adivinación de contraseñas, fuerza bruta y fatiga de 2FA, subredes y dispositivos nuevos, viajes imposibles y sesiones robadas, detectados en el tráfico aunque el CRM no registre nada.',
    },
    priv: {
      title: `Detección de escalada de privilegios | ${BRAND}`,
      desc: 'Permisos que alguien se concede a sí mismo, nuevos administradores, un segundo factor desactivado, contactos cambiados y cuentas que no deberían existir, leídos directamente de los permisos de su base de datos.',
    },
    leak: {
      title: `Detección de fuga de datos | ${BRAND}`,
      desc: 'Exportaciones por encima del límite habitual y lectura masiva de fichas de clientes una a una, con una segunda ventana larga para la fuga lenta justo por debajo del umbral.',
    },
    attacks: {
      title: `Detección de ataques web | ${BRAND}`,
      desc: 'Ataques web conocidos según OWASP Core Rule Set, escáneres, ataques desde cuentas con sesión iniciada, sondeo de rutas y objetos e inundaciones distribuidas, con la evidencia a la vista.',
    },
    posture: {
      title: `Postura de seguridad | ${BRAND}`,
      desc: 'Administradores sin segundo factor, cuentas y administradores inactivos, demasiados administradores y acceso sin límite de intentos, con una puntuación de protección de fórmula abierta.',
    },
    portal: {
      title: `Portal del cliente | ${BRAND}`,
      desc: `El portal de ${BRAND} muestra al propietario qué ha pasado, qué está protegido, cómo le atacan y qué mejorar, con informes semanales y mensuales.`,
    },
    pricing: {
      title: `Precios | ${BRAND}`,
      desc: `Planes de ${BRAND} para un CRM en entorno de pruebas, un CRM en producción y proveedores de hosting con varias empresas de CRM tras una misma pasarela.`,
    },
    blog: {
      title: `Blog | ${BRAND}`,
      desc: `Notas del equipo de ${BRAND} sobre detección dentro de CRM propios, datos que no salen de casa y cobertura honesta.`,
    },
    contact: {
      title: `Contacto | ${BRAND}`,
      desc: `Solicite acceso a ${BRAND}, pregunte por precios o colaboración, o escriba al equipo.`,
    },
    about: {
      title: `Sobre nosotros | ${BRAND}`,
      desc: `${BRAND} lo construyen ingenieros para propietarios de CRM SaaS propios que no tienen equipo de seguridad.`,
    },
    careers: {
      title: `Trabaje con nosotros | ${BRAND}`,
      desc: `Trabaje en ${BRAND}: reglas de detección, recolectores que nunca estorban y un portal que un propietario puede leer.`,
    },
    press: {
      title: `En los medios | ${BRAND}`,
      desc: `El kit de prensa de ${BRAND}: una descripción breve, datos clave, los archivos del logotipo y un contacto para periodistas.`,
    },
    faq: {
      title: `Preguntas frecuentes | ${BRAND}`,
      desc: `Respuestas sobre ${BRAND}: qué detecta, qué sale de su infraestructura, la instalación y lo que no hace.`,
    },
    resellers: {
      title: `Hágase distribuidor | ${BRAND}`,
      desc: `Ofrezca ${BRAND} a las empresas de CRM que aloja o integra: una pasarela, un conector por empresa.`,
    },
    privacy: {
      title: `Política de privacidad | ${BRAND}`,
      desc: `Cómo trata los datos personales el sitio web de ${BRAND}.`,
    },
    terms: {
      title: `Condiciones de uso | ${BRAND}`,
      desc: `Las condiciones de uso del sitio web de ${BRAND}.`,
    },
    cookies: {
      title: `Política de cookies | ${BRAND}`,
      desc: `Qué guarda el sitio web de ${BRAND} en su navegador y por qué.`,
    },
    siteMap: {
      title: `Mapa del sitio | ${BRAND}`,
      desc: `Todas las páginas del sitio web de ${BRAND}.`,
    },
    signins: {
      title: `Por qué su CRM nunca ve un acceso fallido | ${BRAND}`,
      desc: 'Los CRM propios a menudo no anotan nada cuando falla un inicio de sesión. Cómo verlo igualmente, a partir del propio tráfico.',
    },
    allowlist: {
      title: `Lista permitida, no lista de exclusión | ${BRAND}`,
      desc: 'Por qué nos negamos a filtrar los datos enumerando lo que no debe salir, y qué sale exactamente de su infraestructura.',
    },
    score: {
      title: `Una puntuación de protección que no le castiga por ser atacado | ${BRAND}`,
      desc: 'Cómo se calcula la puntuación de protección del portal y por qué los ataques quedan fuera a propósito.',
    },
    offboarding: {
      title: `El token que sobrevivió al empleado | ${BRAND}`,
      desc: 'Un empleado se va, su cuenta se elimina y un token de API emitido hace meses sigue funcionando. Cómo se detecta, a partir del tráfico y la base de datos a la vez.',
    },
    thresholds: {
      title: `Un mismo límite para todos no sirve a nadie | ${BRAND}`,
      desc: 'Por qué un único umbral para todas las cuentas o le inunda de alertas o deja pasar la exportación lenta, y cómo se construyen los umbrales personales.',
    },
    tenancy: {
      title: `El aislamiento entre clientes pertenece a la capa de acceso | ${BRAND}`,
      desc: 'Por qué cada consulta de eventos debe llevar un identificador de cliente, y por qué el aislamiento no se deja en manos de quien escribe una regla.',
    },
    notFound: {
      title: `Página no encontrada | ${BRAND}`,
      desc: `La página que busca no está en el sitio de ${BRAND}.`,
    },
  },

  nav: {
    label: 'Principal',
    solutions: 'Soluciones',
    solutionsAll: 'Todas las soluciones',
    pricing: 'Precios',
    blog: 'Blog',
    about: 'Nosotros',
    aboutAll: 'Sobre nosotros',
    contact: 'Contacto',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    cta: 'Solicitar acceso',
  },

  menu: {
    ato: { title: 'Robo de cuentas', text: 'Adivinación, abuso de 2FA, sesiones robadas' },
    priv: { title: 'Escalada de privilegios', text: 'Permisos propios, nuevos administradores' },
    leak: { title: 'Fuga de datos', text: 'Exportaciones y lectura masiva' },
    attacks: { title: 'Ataques web', text: 'OWASP CRS, escáneres, inundaciones' },
    posture: { title: 'Postura de seguridad', text: 'Puntos débiles y la puntuación' },
    portal: { title: 'Portal del cliente', text: 'Lo que ve el propietario' },
    company: { title: 'Sobre nosotros', text: 'Quiénes somos y cómo trabajamos' },
    careers: { title: 'Trabaje con nosotros', text: 'Puestos abiertos' },
    press: { title: 'En los medios', text: 'Kit de prensa y contactos' },
    faq: { title: 'Preguntas frecuentes', text: 'Respuestas breves' },
    resellers: { title: 'Hágase distribuidor', text: 'Para hostings e integradores' },
  },

  footer: {
    blurb: `Detección de amenazas para CRM SaaS multiinquilino propios. ${BRAND} ve lo que pasa dentro del CRM sin llevarse los datos.`,
    product: 'Producto',
    company: 'Nosotros',
    legal: 'Legal',
    social: 'Síganos',
    linkedin: 'LinkedIn',
    x: 'X',
    telegram: 'Telegram',
    github: 'GitHub',
    youtube: 'YouTube',
    rights: `© 2026 ${BRAND}. Todos los derechos reservados.`,
    privacy: 'Política de privacidad',
    terms: 'Condiciones de uso',
    cookies: 'Política de cookies',
    siteMap: 'Mapa del sitio',
  },

  common: {
    cta: 'Solicitar acceso',
    contact: 'Contáctenos',
    read: 'Leer el artículo',
    back: 'Todos los artículos',
    quote: 'Pedir presupuesto',
    synthetic: 'Vista del portal con datos sintéticos',
    rules: 'Reglas',
    howCaught: 'Cómo se detecta',
    alertShows: 'Qué muestra la alerta',
    limit: 'Conviene saber',
    related: 'Otras soluciones',
  },

  close: {
    title: 'Vea lo que su CRM no le ha estado contando',
    lede: `${BRAND} trabaja con sus primeros clientes en sus entornos de pruebas antes del lanzamiento comercial. Cuéntenos cómo es su CRM y le mostraremos lo que verían las reglas.`,
  },

  panel: {
    status: 'Estado de la protección',
    since: 'Desde su última visita',
    score: 'Puntuación de protección',
    formula: 'fórmula abierta',
    rules: 'reglas activas',
    open: 'incidentes abiertos',
    waf: 'coste del WAF por petición',
    wafValue: '1,9 ms',
    i1: 'Acceso de administrador sin 2FA desde una subred nueva',
    i2: 'Token activo de un empleado eliminado',
    i3: 'Exportación por encima del límite habitual',
    i4: 'Nuevo administrador aprobado por el propietario',
    t1: '02:14',
    t2: 'ayer',
    t3: 'lun',
    t4: 'dom',
    high: 'Alta',
    mid: 'Media',
    low: 'Resuelto',
  },

  home: {
    hero: {
      kicker: 'Detección de amenazas para CRM SaaS propios',
      title: 'Vea lo que pasa dentro de su CRM. Los datos se quedan donde están.',
      lede: `${BRAND} detecta robo de cuentas, acciones internas, escalada de privilegios y exportaciones masivas, y le muestra al propietario qué ha pasado y qué hacer.`,
      secondary: 'Cómo funciona',
    },
    problem: {
      title: 'Un CRM propio no ve los ataques contra sí mismo',
      lede: 'En los CRM propios es lo normal, no la excepción, y por eso las soluciones basadas en registros se quedan sin nada que analizar.',
      items: [
        {
          trace: 'POST /login → 401 · registro: —',
          title: 'Los accesos fallidos no quedan registrados',
          text: 'Muchos CRM nunca anotan un inicio de sesión fallido. La adivinación de contraseñas, la fuerza bruta contra códigos 2FA y la lectura de fichas una a una pasan desapercibidas, y una solución basada en registros, como Wazuh o ELK, no tiene nada que recoger.',
        },
        {
          trace: 'role_permissions → admin · 2FA: desactivado',
          title: 'Nadie sabe quién es realmente administrador',
          text: 'Los permisos son filas en una tabla, sin ninguna marca de administrador. Un administrador sin segundo factor, una cuenta inactiva con permisos amplios, un administrador creado de madrugada, un empleado despedido cuya sesión sigue viva: todo está en la base de datos y nadie mira.',
        },
        {
          trace: 'salida: solo lista permitida',
          title: 'Los datos no salen de casa',
          text: 'Entregar los datos de los clientes a un servicio de seguridad externo no es una postura negociable, es una constante. Los productos en la nube piden justo eso.',
        },
        {
          trace: 'puntuación de protección: ?',
          title: 'Sin respuesta a «¿estoy protegido?»',
          text: 'Incluso cuando se recoge algo, nadie sabe decir lo protegida que está la empresa ni qué mejorar a continuación.',
        },
      ],
    },
    how: {
      title: 'Recolectores ligeros en su lado. El análisis, en el nuestro.',
      lede: 'Tres servicios pequeños funcionan junto a su aplicación, cada uno en su propio repositorio que puede revisar usted mismo. Solo los metadatos de la lista permitida llegan a nosotros, por HTTPS.',
      yours: 'Su infraestructura',
      ours: BRAND,
      line: 'HTTPS · solo metadatos',
      tap: { name: `${SVC}-tap`, text: 'Un sidecar en el pod de la aplicación. Lee el tráfico de red y une cada petición con su respuesta.', key: 'Nunca está en el camino de la petición. Si algo falla en su configuración o sus permisos, no se cae ni tumba el pod: espera y deja el motivo en el registro.' },
      waf: { name: `${SVC}-waf`, text: 'Pasa el tráfico por Coraza y OWASP Core Rule Set, recorta lo sensible y genera eventos: acceso correcto, acceso fallido, exportación, cambio de rol.', key: 'Ve el cuerpo de las peticiones, pero no tiene acceso a la base de datos.' },
      connector: { name: `${SVC}-connector`, text: 'Lee su base de datos en modo solo lectura, a partir de una lista explícita de tablas; aplica la lista permitida, almacena y envía.', key: 'Tiene acceso a la base de datos, pero nunca ve el cuerpo de las peticiones.' },
      core: { name: 'core', text: 'Recepción y deduplicación' },
      brain: { name: 'brain', text: 'Reglas y agregación de alertas' },
      baseline: { name: 'baseline', text: 'Perfiles de comportamiento' },
      notifier: { name: 'notifier', text: 'Telegram e informes' },
      portalNode: { name: 'portal', text: 'El portal del cliente' },
      kept: 'Se queda con usted',
      sent: 'Cruza la línea',
      keptItems: ['Cuerpos de las peticiones', 'Texto libre: comentarios, notas', 'User-Agent sin procesar', 'Identificadores de sesión y tokens'],
      sentItems: ['Campos de la lista permitida', 'Huellas de tokens y de User-Agent', 'Evidencia de un disparo del WAF, enmascarada'],
      install: 'Tres contenedores, cada uno configurado con un único archivo YAML, un ConfigMap en Kubernetes. Sin agentes en su código, sin cambios en el esquema, sin bróker de mensajes.',
    },
    catches: {
      title: '34 reglas, todas en funcionamiento',
      lede: 'Análisis de comportamiento sin aprendizaje automático: reglas estáticas con umbrales personales calculados a partir del historial de cada persona. El modelo de ritmo de trabajo tiene en cuenta el día de la semana, la zona horaria de la empresa y los turnos que pasan de medianoche.',
      groups: [
        { title: 'Robo de cuentas' },
        { title: 'Redes sospechosas' },
        { title: 'Cuentas que no deberían existir' },
        { title: 'Escalada de privilegios' },
        { title: 'Fuga de datos' },
        { title: 'Reconocimiento y ataques' },
        { title: 'Higiene' },
      ],
      rotation: 'Contra la rotación de direcciones: IPv6 se cuenta por red /64, las direcciones de una misma subred IPv4 /24 se suman y la adivinación dirigida a una cuenta se cuenta por cuenta, vengan de donde vengan los intentos.',
    },
    diff: {
      title: 'Donde ve lo que otros no ven',
      venn: { traffic: 'Tráfico', database: 'Base de datos', both: 'quién actuó y quién es' },
      items: [
        { title: 'Tráfico y base de datos a la vez', text: 'Los productos de seguridad de API ven el comportamiento, pero no saben quién es administrador. Las herramientas de postura conocen los permisos, pero solo lo que la aplicación cuenta de sí misma. Unir ambos permite reglas como «un administrador entra sin 2FA desde una subred nueva».' },
        { title: 'Funciona sin registro de auditoría', text: 'Un acceso fallido se ve por el código de estado de la respuesta en el tráfico, aunque el CRM no lo anote en ninguna parte.' },
        { title: 'Los datos se quedan con usted', text: 'Solo salen los campos de una lista permitida explícita. Una lista de exclusión queda descartada como método, para que un campo nuevo nunca se filtre por accidente.' },
        { title: 'La alerta muestra la evidencia', text: 'Un disparo del WAF muestra qué parte de la petición era el ataque: hasta 256 caracteres alrededor de la coincidencia. Con credenciales, solo la coincidencia y hasta 32 caracteres a su alrededor. La empresa puede desactivar la evidencia.' },
        { title: 'Usted ve lo que sale', text: 'El conector tiene su propia página local protegida con contraseña: un registro de lo enviado tras la lista permitida, el estado de las fuentes y una prueba en seco; pegue una ficha y vea qué saldría.' },
        { title: 'Separación de accesos por diseño', text: 'La parte que ve el cuerpo de las peticiones no accede a la base de datos; la que accede a la base de datos nunca ve los cuerpos. Comprometer una no da la imagen completa.' },
        { title: 'Aislamiento de inquilinos en la capa de acceso', text: 'Toda consulta de eventos debe llevar el identificador del inquilino: el aislamiento está en la capa de acceso, no en manos de quien escribe una regla.' },
        { title: 'Cobertura honesta', text: 'No «34 reglas activadas», sino qué escenarios de protección funcionan de verdad con los datos de esta empresa y qué les falta, según los eventos que llegan y no según la configuración.' },
      ],
    },
    showcase: {
      title: 'Un portal que el propietario puede leer',
      lede: 'Una aplicación web independiente para la empresa cliente, en inglés y ruso, con tema claro y oscuro. No un panel que un ingeniero tenga que descifrar.',
      label: 'Pantallas del portal',
      pause: 'Pausar el cambio de pantallas',
      tabs: {
        status: { name: 'Estado de la protección', text: 'Qué ha pasado desde la última visita, el tráfico del día, los incidentes abiertos y la puntuación de protección.' },
        incident: { name: 'Tarjeta de incidente', text: 'Qué ha pasado, quién, desde dónde, la ruta del ataque, si llegó a su objetivo, la evidencia y qué hacer, con tarjetas e historias relacionadas.' },
        coverage: { name: 'Qué está protegido', text: 'Qué escenarios de protección funcionan con sus datos y qué datos les faltan.' },
        score: { name: 'Puntuación de protección', text: 'Una puntuación de 0 a 100 con fórmula abierta. Solo cuenta lo que la empresa puede mejorar por sí misma; los ataques no, así que la puntuación nunca le castiga por ser atacado.' },
      },
      incident: {
        title: 'Token activo de un empleado eliminado',
        who: 'Cuenta',
        whoValue: 'm.ortega · Ventas',
        from: 'Desde',
        fromValue: 'Subred conocida de la oficina',
        reached: 'Llegó al objetivo',
        reachedValue: 'Leyó 14 fichas de clientes',
        action: 'Qué hacer',
        actionValue: 'Revocar la sesión y rotar el token',
      },
      coverage: {
        c1: 'Robo de cuentas',
        c2: 'Escalada de privilegios',
        c3: 'Fuga de datos',
        c4: 'Reglas de comportamiento',
        works: 'Funciona',
        partial: 'Faltan datos',
        missing: 'Registro de accesos no conectado',
      },
      score: {
        f1: 'Administradores con 2FA',
        f2: 'Sin administradores inactivos',
        f3: 'Límite de intentos de acceso',
        f4: 'Cuentas inactivas cerradas',
      },
    },
    numbers: {
      title: 'Medido, no prometido',
      lede: 'Cada cifra procede de nuestro banco de pruebas frente a una aplicación real, no de la producción de un cliente.',
      waf: { value: '~{n} ms', text: 'de análisis del WAF por petición con un perfil de tráfico real de CRM' },
      core: { value: '~{n}', text: 'peticiones por segundo en un solo núcleo' },
      joined: { value: '{n}', text: 'de 1500 peticiones unidas a sus respuestas, sin paquetes perdidos' },
      latency: { value: '{n} ms', text: 'p95 desde la captura hasta la recepción en nuestro lado' },
    },
    limits: {
      title: 'Lo que no hace, dicho desde el principio',
      lede: 'Nuestro lector es un propietario técnico que lo comprobará. Así que esto es lo que no debe esperar.',
      items: [
        { title: 'Avisa, no actúa', text: 'No bloquea direcciones IP, no cierra sesiones, no desactiva usuarios. Los modos semiautomático y automático están previstos, no disponibles.' },
        { title: 'WebSocket no se analiza', text: 'Los chats, cotizaciones y notificaciones por WebSocket no se analizan en absoluto.' },
        { title: 'Las dos primeras semanas, solo alertas firmes', text: 'El WAF, los privilegios y la postura funcionan desde el primer día; las reglas de comportamiento necesitan historial. Cargar su registro de accesos, si lo tiene, acorta ese plazo.' },
        { title: 'Telegram y el portal, nada más', text: 'Cada destinatario filtra por gravedad y por regla. Todavía no hay correo, ni Slack, ni escalado por tiempo.' },
        { title: 'Sin análisis entre clientes, nunca', text: 'Es el precio de «sus datos se quedan con usted», y preferimos decirlo nosotros.' },
      ],
    },
    compare: {
      title: 'Frente a la alternativa honesta',
      lede: 'No frente a Salt ni a las herramientas de postura, sino frente a contratar a un ingeniero para montarlo con Wazuh y ModSecurity.',
      caption: `${BRAND} frente a una solución montada internamente`,
      col: 'Pregunta',
      us: BRAND,
      diy: 'Wazuh + ModSecurity, montado internamente',
      rows: [
        { q: 'Ve los accesos fallidos que el CRM no registra', us: 'Sí, por el código de estado de la respuesta', diy: 'Solo lo que la aplicación escribe en sus registros' },
        { q: 'Sabe quién es administrador', us: 'Lee los permisos de la base de datos', diy: 'Solo con desarrollo a medida' },
        { q: 'Reglas para amenazas de CRM', us: '34 reglas listas con umbrales personales', diy: 'Las escribe y ajusta su ingeniero' },
        { q: 'Dónde están los datos', us: 'En su infraestructura; salen los metadatos permitidos', diy: 'En su infraestructura' },
        { q: 'Qué recibe el propietario', us: 'Un portal, informes y una puntuación de protección', diy: 'Un panel que tiene que leer un ingeniero' },
      ],
    },
  },

  solutions: {
    head: {
      title: 'Lo que detecta dentro de su CRM',
      lede: 'Cinco grupos de protección, un portal. Cada grupo es un conjunto de reglas que trabajan con el tráfico y la base de datos a la vez.',
    },
    ato: {
      title: 'Robo de cuentas',
      lede: 'Contraseñas y sesiones robadas, detectadas en el tráfico, incluso en un CRM que nunca registra un acceso fallido.',
      rules: [
        { id: 'id.bruteforce', text: 'Adivinación de contraseñas' },
        { id: 'id.bruteforce_success', text: 'Adivinación seguida de un acceso correcto' },
        { id: 'id.2fa_bruteforce', text: 'Fuerza bruta contra el código 2FA' },
        { id: 'id.2fa_fatigue', text: 'Fatiga de 2FA: una avalancha de solicitudes' },
        { id: 'id.new_ip', text: 'Acceso desde una subred nueva' },
        { id: 'id.new_country', text: 'Acceso desde un país nuevo' },
        { id: 'id.new_ua', text: 'Acceso desde un dispositivo nuevo' },
        { id: 'id.impossible_travel', text: 'Viaje imposible' },
        { id: 'id.session_moved', text: 'Una sesión que salta a otro dispositivo o país, señal de un token robado' },
        { id: 'id.off_hours', text: 'Acceso fuera del ritmo de trabajo de la persona' },
        { id: 'id.non_browser_client', text: 'Un cliente que no es un navegador en una ruta de la interfaz' },
        { id: 'id.tor_session', text: 'Trabajo a través de Tor' },
        { id: 'id.hosting_session', text: 'Trabajo desde hostings en la nube o VPS que la plantilla no suele usar' },
      ],
      how: 'Un acceso fallido aparece en el código de estado de la respuesta, así que la adivinación se ve aunque el CRM no anote nada. Los umbrales personales salen del historial de cada persona; el modelo de ritmo de trabajo conoce el día de la semana, la zona horaria de la empresa y los turnos de noche.',
      shows: 'Una tarjeta por acceso: una IP nueva, un dispositivo nuevo, un país nuevo y un desplazamiento en menos de media hora forman una sola tarjeta cuya gravedad crece con el número de señales, no cinco alertas.',
      limit: 'Una sesión robada mientras su dueño no trabaja no se ve si el atacante repite el token desde el mismo navegador y a través de un proxy en el país del dueño. Una sesión que usan a la vez el dueño y el atacante, sí.',
    },
    priv: {
      title: 'Escalada de privilegios',
      lede: 'Quién es administrador se lee de sus tablas de permisos; no hace falta ninguna marca de administrador.',
      rules: [
        { id: 'priv.self_grant', text: 'Permisos que alguien se concede a sí mismo' },
        { id: 'priv.new_admin', text: 'Un nuevo administrador' },
        { id: 'priv.2fa_disabled', text: 'Un segundo factor desactivado' },
        { id: 'priv.contact_changed', text: 'Un correo o mensajero de contacto cambiado' },
        { id: 'id.vanished_account', text: 'Un token que funciona para un empleado eliminado' },
        { id: 'id.unknown_account', text: 'Una cuenta que no está en su base de datos' },
        { id: 'id.unknown_tokens', text: 'Un flujo de tokens desconocidos desde una misma dirección' },
      ],
      how: 'El conector lee, en modo solo lectura, los permisos que usted indica. El tráfico muestra quién actúa; la base de datos, quién es. Juntos permiten reglas como «un token funciona para un empleado que ya no existe».',
      shows: 'Quién cambió qué, para quién, cuándo y desde dónde, con las tarjetas relacionadas de la misma cuenta reunidas en una sola historia.',
      limit: 'Las reglas de privilegios son alertas firmes: funcionan desde el primer día, sin esperar historial.',
    },
    leak: {
      title: 'Fuga de datos',
      lede: 'Exportaciones por encima de lo normal, y la forma más discreta de esquivar «solo vigilamos las exportaciones».',
      rules: [
        { id: 'dlp.export_over_limit', text: 'Una exportación por encima del límite habitual' },
        { id: 'dlp.read_volume', text: 'Leer muchas más fichas de lo habitual' },
        { id: 'dlp.enumeration', text: 'Leer fichas una a una, en secuencia' },
      ],
      how: 'Los límites son personales y se aprenden del historial de cada persona. Cada regla tiene una segunda ventana, larga, así que también se detecta una exportación lenta mantenida justo por debajo del umbral.',
      shows: 'Cuánto se leyó o exportó, frente al volumen habitual de la persona, en qué ventana y qué hacer a continuación.',
      limit: 'Las reglas de comportamiento necesitan historial: durante las dos primeras semanas esperan, salvo que se pueda cargar su registro de accesos para completarlo.',
    },
    attacks: {
      title: 'Ataques web',
      lede: 'OWASP Core Rule Set sobre su tráfico real, más lo que ocurre después de iniciar sesión.',
      rules: [
        { id: 'waf.hit', text: 'Ataques web conocidos según OWASP CRS' },
        { id: 'waf.scanner', text: 'Escáneres' },
        { id: 'waf.authenticated_attack', text: 'Un ataque desde una cuenta con sesión iniciada, incluida una serie de intentos débiles de distinto tipo' },
        { id: 'recon.path_scan', text: 'Escaneo de rutas' },
        { id: 'authz.probing', text: 'Sondeo de objetos con denegaciones de autorización' },
        { id: 'net.distributed_flood', text: 'Una inundación distribuida o adivinación desde una botnet, una o dos peticiones por dirección' },
      ],
      how: `${SVC}-waf ejecuta Coraza con OWASP Core Rule Set en unos 1,9 ms por petición con un perfil de tráfico real de CRM. Las peticiones se entregan al motor correctamente, lo que redujo los falsos positivos en la prueba de referencia de GoTestWAF de 55 a 13.`,
      shows: 'La evidencia: hasta 256 caracteres del valor alrededor de la coincidencia. Con credenciales (Authorization, Cookie, cabeceras sensibles) solo la coincidencia y hasta 32 caracteres a su alrededor. La empresa puede desactivar la evidencia y ver solo dónde saltó la regla.',
      limit: 'OWASP CRS no decodifica Base64 en los parámetros de consulta, así que esas cargas no se detectan.',
    },
    posture: {
      title: 'Postura de seguridad',
      lede: 'Lo que hay en la base de datos y facilita un ataque, y una puntuación que dice qué corregir.',
      rules: [
        { id: 'posture.admin_without_2fa', text: 'Un administrador sin segundo factor' },
        { id: 'posture.dormant_account', text: 'Cuentas inactivas' },
        { id: 'posture.dormant_admin', text: 'Administradores inactivos' },
        { id: 'posture.too_many_admins', text: 'Demasiados administradores' },
        { id: 'posture.no_rate_limit', text: 'Acceso sin límite de intentos' },
      ],
      how: 'Las reglas de postura leen el estado de las cuentas y los permisos en su base de datos, y el límite de intentos en el tráfico. Funcionan desde el primer día.',
      shows: 'Una puntuación de protección de 0 a 100 con fórmula abierta. Solo cuenta lo que la empresa puede mejorar por sí misma; los ataques quedan fuera, así que sufrir un ataque nunca la baja.',
      limit: 'La puntuación mide lo que usted controla. No es una promesa de que no pueda pasar nada.',
    },
  },

  portal: {
    head: {
      title: 'El portal del cliente',
      lede: 'Una aplicación web para la empresa cliente en inglés y ruso, clara y oscura. Responde a la pregunta del propietario: cuánto estamos protegidos y qué deberíamos mejorar.',
    },
    screensTitle: 'Todas las pantallas del portal',
    screens: [
      { title: 'Estado de la protección', text: 'La pantalla principal: qué ha pasado desde la última visita, el tráfico del día, los incidentes abiertos y la puntuación de protección.' },
      { title: 'Incidentes', text: 'Un listado y una tarjeta de amenaza: qué pasó, quién, desde dónde, la ruta del ataque, si llegó a su objetivo, la evidencia, qué hacer; tarjetas e historias relacionadas.' },
      { title: 'Tráfico', text: '«Cómo me atacan»: la proporción de tráfico atacado y el origen de los ataques por país, red del proveedor y dirección.' },
      { title: 'Accesos', text: 'Seguridad de los inicios de sesión: 2FA, accesos sospechosos, actividad.' },
      { title: 'Permisos', text: 'Cuentas de la plantilla, administradores, quién no tiene segundo factor, quién lleva tiempo sin entrar, cambios de permisos.' },
      { title: 'Qué está protegido', text: 'Qué escenarios de protección funcionan con los datos de la empresa y qué datos les faltan.' },
      { title: 'Puntuación de protección', text: 'Una puntuación de 0 a 100 con fórmula abierta: solo lo que la empresa puede mejorar por sí misma.' },
      { title: 'Registro', text: 'Lo que hicimos con los incidentes de la empresa: detectado, comunicado, en curso, cerrado.' },
      { title: 'Informes', text: 'Semanales y mensuales, generados automáticamente, archivados en el portal, en PDF en inglés y ruso. El informe terminado llega a los chats de Telegram de la empresa suscritos a ese periodo.' },
      { title: 'Ajustes', text: 'Usuarios y roles con un único propietario por empresa, destinatarios de Telegram filtrados por gravedad y regla, historial de envíos, el estado del tap, el waf y el conector, la seguridad del acceso.' },
    ],
    noise: {
      title: 'Hecho contra el ruido',
      lede: 'Las falsas alarmas son la razón principal por la que este tipo de sistemas se apagan en la segunda semana.',
      repeat: 'Lo mismo 4 veces más · agrupado en un solo mensaje',
      story: 'Historia · 3 tarjetas de una misma cuenta',
      items: [
        'Desactive una regla para la empresa, añada excepciones por ruta o silencie una alerta concreta durante un tiempo.',
        'Las repeticiones se agrupan en un solo mensaje: «lo mismo N veces más».',
        'Una tarjeta por acceso, con una gravedad que crece con el número de señales.',
        'Incidentes como historias: las tarjetas de una misma cuenta o dirección, reunidas.',
      ],
    },
  },

  pricing: {
    head: {
      title: 'Precios',
      lede: `${BRAND} se presupuesta por instalación, después de ver su perfil de tráfico y el número de inquilinos. Todos los planes incluyen las 34 reglas y el portal completo.`,
    },
    onRequest: 'Precio a consultar',
    plans: [
      {
        name: 'Piloto',
        for: 'Para un CRM en un entorno de pruebas, mientras ajustamos juntos las reglas con sus datos.',
        points: ['Tres recolectores en su entorno de pruebas', 'Todas las reglas, alertas firmes desde el primer día', 'Revisión semanal con el equipo', 'Página de prueba en seco para comprobar qué sale'],
      },
      {
        name: 'Corporativo',
        for: 'Para un CRM en producción, con sus propios inquilinos y dominios.',
        points: ['Recolectores en producción', 'Reglas de comportamiento con umbrales personales', 'Informes semanales y mensuales', 'Destinatarios de Telegram filtrados por gravedad'],
      },
      {
        name: 'Hosting',
        for: 'Para quien aloja varias empresas de CRM tras una misma pasarela compartida.',
        points: ['Un WAF para toda la entrada', 'Un conector y claves por empresa', 'Un portal independiente para cada empresa', 'Tráfico separado por dominio antes del análisis'],
      },
    ],
    featured: 'El más solicitado',
    includedTitle: 'En todos los planes',
    included: [
      '34 reglas de detección en siete grupos',
      'Portal del cliente en inglés y ruso, claro y oscuro',
      'Puntuación de protección con fórmula abierta',
      'Informes semanales y mensuales en PDF',
      'Alertas en Telegram y en el portal',
      'La página local del conector con prueba en seco',
    ],
  },

  blog: {
    head: {
      title: 'Blog',
      lede: 'Notas del equipo sobre detección dentro de CRM propios.',
    },
    minutes: '{n} min de lectura',
    latest: 'Últimas publicaciones',
    posts: {
      offboarding: {
        tag: 'Detección',
        date: '6 de octubre de 2026',
        title: 'El token que sobrevivió al empleado',
        lede: 'Un empleado se va, su cuenta se elimina y un token de API emitido hace meses sigue funcionando. Así se detecta, y por eso tiene su propia regla.',
        cover: 'Dos personas en una mesa de madera con un cuaderno, tazas de café, una tableta y una bolsa de cuero',
        figures: [
          {
            alt: 'Una cartera, un teléfono, un reloj, unas gafas y unos auriculares ordenados en filas sobre una superficie gris',
            caption: 'Lo que un empleado devuelve el último día. Un token de API no está en la lista.',
          },
        ],
        body: [
          'En un CRM propio, la baja de un empleado suele significar una sola cosa: la cuenta se elimina o se desactiva. Se devuelve el portátil, la contraseña deja de funcionar y todos siguen adelante. Lo que nadie revisa es el token de API que esa persona creó hace medio año para una integración: nunca estuvo ligado a la página de acceso, así que no se enteró.',
          'El token sigue respondiendo. Las peticiones firmadas con él parecen tráfico de integración como cualquier otro, la aplicación las acepta y en muchos CRM no se anota nada, porque una petición con token no es un inicio de sesión.',
          'Aquí se unen las dos fuentes. El tráfico muestra qué credencial lleva cada petición, como huella y nunca el token en sí. La base de datos muestra qué cuentas existen y a quién pertenecen. Un token que sigue funcionando para una cuenta que ya no existe dispara id.vanished_account; una cuenta que la base de datos no conoce dispara id.unknown_account.',
          'La alerta dice lo ocurrido con palabras claras —un token activo de un empleado eliminado— junto con la cuenta, desde dónde llegaron las peticiones y a qué accedieron. Qué hacer es igual de claro: revocar la sesión y rotar el token.',
        ],
      },
      thresholds: {
        tag: 'Detección',
        date: '29 de septiembre de 2026',
        title: 'Un mismo límite para todos no sirve a nadie',
        lede: 'Por qué un único umbral o le inunda de alertas o deja pasar la exportación lenta, y cómo se construyen en su lugar los umbrales personales.',
        cover: 'Foto en blanco y negro de una mano sobre un ratón junto a un teclado y una taza',
        figures: [
          {
            alt: 'Un escritorio visto desde arriba: un monitor, un teclado, una tableta, unas gafas y cuadernos',
            caption: 'La misma exportación es rutina para una persona e inusual para otra.',
          },
        ],
        body: [
          'Un límite fijo parece justo: alertar cuando alguien exporte más de quinientas fichas al día. En la práctica, el jefe de ventas que exporta cada lunes lo dispara todas las semanas, y la persona que lee cuatrocientas fichas al día durante un mes nunca lo hace.',
          'Por eso cada umbral es personal. Se calcula a partir del propio historial de esa persona, y el modelo de ritmo de trabajo conoce el día de la semana, la zona horaria de la empresa y los turnos que pasan de medianoche. Una exportación del lunes es normal para una persona e inusual para otra.',
          'Cada regla tiene además una segunda ventana, larga. Una exportación lenta mantenida justo por debajo del umbral diario se va sumando, y la ventana larga detecta lo que la corta dejaría pasar.',
          'Nada de esto es aprendizaje automático. Las reglas son estáticas y legibles; solo se aprenden los números que contienen. Cuando salta una alerta, se ve qué umbral superó y por qué ese umbral es el que es.',
        ],
      },
      signins: {
        tag: 'Detección',
        date: '22 de septiembre de 2026',
        title: 'Por qué su CRM nunca ve un acceso fallido',
        lede: 'Los CRM propios a menudo no anotan nada cuando falla un inicio de sesión. Así es como se puede ver igualmente, a partir del propio tráfico.',
        cover: 'Un hombre con un teléfono en la mano delante de un portátil abierto',
        figures: [
          {
            alt: 'Una mano que escribe en un cuaderno junto a un portátil y un reloj de pulsera',
            caption: 'La aplicación nunca anota el intento fallido. El tráfico sí lo lleva.',
          },
        ],
        body: [
          'Pregunte al propietario de un CRM propio cuántos accesos fallidos tuvo la semana pasada y la respuesta sincera suele ser «no lo sabemos». La aplicación nunca los anotó. No hay registro de intentos fallidos, ni identificador de sesión en los registros, y la auditoría cubre solo lo que alguien se acordó de añadir.',
          'Ese vacío no es un fallo de un producto concreto: es lo normal. Y por eso la vía clásica de reunir registros en Wazuh o ELK se queda corta: no hay nada que reunir. La adivinación de contraseñas, la fuerza bruta contra códigos 2FA y la lectura de fichas de clientes una a una no dejan rastro en un registro que nunca se escribió.',
          'El tráfico, en cambio, sí está. Cada intento de acceso es una petición, y cada respuesta tiene un código de estado. Un sidecar que lee el tráfico junto a la aplicación, sin estar en el camino de la petición, puede unir cada petición con su respuesta y generar el evento que la aplicación nunca anotó: acceso fallido.',
          'A partir de ahí, las reglas funcionan como lo harían con un registro de auditoría perfecto: adivinación, adivinación seguida de un acceso correcto, una avalancha de solicitudes 2FA, una subred o un país nuevos. El CRM no tuvo que cambiar ni una línea de código.',
        ],
      },
      allowlist: {
        tag: 'Privacidad',
        date: '15 de septiembre de 2026',
        title: 'Lista permitida, no lista de exclusión: qué sale de su infraestructura',
        lede: 'Por qué nos negamos a filtrar los datos enumerando lo que no debe salir, y qué sale exactamente.',
        cover: 'Una máquina de escribir antigua con una hoja de papel sobre fondo blanco',
        figures: [
          {
            alt: 'Primer plano de las teclas redondas de una máquina de escribir antigua',
            caption: 'Un campo nuevo se queda en casa hasta que alguien decida que puede salir.',
          },
        ],
        body: [
          'Una lista de exclusión dice: envíe todo menos estos campos. Funciona hasta que alguien añade una columna llamada notes_internal y nadie actualiza la lista. Entonces el campo nuevo sale, sin ruido, en la siguiente sincronización.',
          'Una lista permitida dice lo contrario: envíe solo estos campos. Una columna nueva se queda en casa hasta que alguien decida otra cosa. Por eso el conector aplica una lista permitida explícita y por eso la lista de exclusión queda descartada como método.',
          'Lo que nunca sale: los cuerpos de las peticiones, el texto libre como comentarios y notas, el User-Agent sin procesar (solo su huella), los identificadores de sesión y los propios tokens (solo sus huellas). Tampoco salen los valores de los parámetros de consulta, con una excepción deliberada.',
          'La excepción es la evidencia de un disparo del WAF: hasta 256 caracteres del valor alrededor de la coincidencia, para que la alerta pueda mostrar cuál fue el ataque. Si el valor es una credencial, solo se muestra la coincidencia y hasta 32 caracteres a su alrededor, nunca el valor completo. Una empresa puede desactivar la evidencia por completo y ver solo dónde saltó una regla.',
          'Y no tiene que creernos sin más. El conector tiene su propia página local protegida con contraseña, con un registro de lo enviado y una prueba en seco: pegue una ficha y vea exactamente qué saldría.',
        ],
      },
      score: {
        tag: 'Portal',
        date: '8 de septiembre de 2026',
        title: 'Una puntuación de protección que no le castiga por ser atacado',
        lede: 'Cómo se calcula la puntuación del portal y por qué los ataques quedan fuera a propósito.',
        cover: 'Un portátil, un cuaderno abierto, unos auriculares y una cámara sobre un escritorio de madera',
        figures: [
          {
            alt: 'Un portátil blanco cerrado, libros y un pequeño calendario de mesa que marca el 18',
            caption: 'La puntuación cuenta lo que la empresa puede corregir por sí misma, no cuántas veces la atacaron.',
          },
        ],
        body: [
          'La mayoría de las puntuaciones de seguridad mezclan dos cosas: lo bien configurado que está usted y la mala suerte que ha tenido esta semana. Un pico de ataques hunde el número, el propietario se alarma y nada de lo que haga lo arreglará, porque los ataques nunca dependieron de él.',
          'La puntuación de protección del portal es un número de 0 a 100 con fórmula abierta. Todo lo que contiene es algo que la empresa puede mejorar por sí misma: administradores con segundo factor, cuentas inactivas cerradas, administradores inactivos retirados, un límite de intentos de acceso.',
          'Los ataques se cuentan en otro sitio, en las pantallas de Tráfico e Incidentes, y nunca en la puntuación. Que le ataquen no es un fallo; dejar a un administrador sin 2FA, sí.',
          'Junto a la puntuación está la pantalla de cobertura, que responde a otra pregunta: qué escenarios de protección funcionan realmente con sus datos y qué datos les faltan todavía. No «34 reglas activadas», sino lo que de verdad funciona.',
        ],
      },
      tenancy: {
        tag: 'Arquitectura',
        date: '1 de septiembre de 2026',
        title: 'El aislamiento entre clientes pertenece a la capa de acceso',
        lede: 'Por qué cada consulta de eventos debe llevar un identificador de cliente, y por qué eso no se deja en manos de quien escribe una regla.',
        cover: 'Un escritorio junto a una ventana con un portátil, una lámpara y un portalápices',
        figures: [
          {
            alt: 'La fachada de un edificio de viviendas de madera con muchas ventanas y un todoterreno blanco aparcado delante',
            caption: 'Muchos clientes bajo un mismo techo, y ninguna puerta entre ellos confiada a la costumbre.',
          },
        ],
        body: [
          'Un CRM multicliente guarda muchas empresas clientes en un solo sistema, y el análisis que lo protege también. Los eventos de un cliente nunca deben aparecer en las reglas, los informes o el portal de otro: ni por diseño ni por error.',
          'La forma habitual de equivocarse es convertir el aislamiento en una costumbre: cada autor de reglas se acuerda de añadir el filtro por cliente. Funciona hasta que una regla escrita con prisa lo olvida, y el error sigue invisible hasta que alguien ve datos que no son suyos.',
          'Por eso el aislamiento está un nivel más abajo. Cada consulta de eventos debe llevar un identificador de cliente, y la capa de acceso rechaza la que no lo lleve. Una regla no puede olvidar el filtro, porque sin él no recibe nada.',
          'La misma idea separa las partes del sistema: la parte que ve los cuerpos de las peticiones no tiene acceso a la base de datos, y la que tiene acceso a la base de datos nunca ve los cuerpos. Comprometer una no da la imagen completa.',
        ],
      },
    },
  },

  contact: {
    head: {
      title: 'Hable con el equipo',
      lede: 'Solicite acceso, pregunte por precios o colaboración, o cuéntenos cómo es su CRM. Respondemos en un día laborable.',
    },
    name: 'Su nombre',
    email: 'Correo de trabajo',
    company: 'Empresa',
    topic: 'Asunto',
    topics: {
      access: 'Solicitar acceso',
      pricing: 'Precios',
      reseller: 'Colaboración',
      press: 'Prensa',
      careers: 'Empleo',
      other: 'Otra cosa',
    },
    message: 'Mensaje',
    messageHint: 'Su CRM, el número de inquilinos y dónde funciona, si puede contarlo.',
    consent: 'Acepto que mis datos se usen para responder a esta solicitud, tal como describe la política de privacidad.',
    send: 'Enviar',
    required: 'Obligatorio',
    errName: 'Escriba su nombre.',
    errEmail: 'Escriba un correo con el formato nombre@empresa.com.',
    errMessage: 'Escriba unas palabras sobre su solicitud.',
    errConsent: 'Acepte el uso de sus datos para que podamos responder.',
    summary: '{n} campos necesitan revisión.',
    summaryOne: 'Un campo necesita revisión.',
    doneTitle: 'Gracias, hemos recibido su mensaje',
    doneText: 'Le responderemos a la dirección indicada en un día laborable.',
    again: 'Enviar otro mensaje',
    direct: 'Escríbanos directamente',
    support: 'Soporte y acceso',
    legal: 'Cuestiones legales',
    pressMail: 'Prensa',
  },

  about: {
    head: {
      title: 'Hecho para propietarios sin equipo de seguridad',
      lede: `${BRAND} lo hacen ingenieros para propietarios y CTO de CRM SaaS propios: productos con muchos inquilinos y nadie que se dedique a la seguridad.`,
    },
    story: {
      title: 'Por qué lo construimos',
      text: [
        'Los CRM propios guardan datos reales de clientes y reciben ataques reales, pero rara vez avisan de ninguna de las dos cosas. El consejo habitual, recoger los registros, falla cuando los registros nunca se escribieron. El producto habitual, un servicio en la nube, pide los datos que el propietario no va a entregar.',
        `${BRAND} toma una tercera vía: recolectores ligeros que funcionan junto a la aplicación y se pueden revisar línea a línea, y el análisis en nuestro lado, alimentado solo con metadatos de la lista permitida.`,
      ],
    },
    principles: {
      title: 'Cómo trabajamos',
      items: [
        { title: 'Mostrar el porqué, no solo afirmarlo', text: 'La separación de accesos, la lista permitida y la prueba en seco muestran por qué los datos no se filtran. El portal muestra qué protección funciona de verdad, no «todo activado».' },
        { title: 'Tono de ingeniería', text: 'Tranquilo, concreto, sin historias de miedo y sin «impulsado por IA». Nuestro lector es un propietario técnico que lo comprobará.' },
        { title: 'Decir los límites nosotros mismos', text: 'Lo que el producto no hace está escrito en la página de inicio, no en letra pequeña.' },
      ],
    },
    status: {
      title: 'Dónde estamos',
      text: 'Antes del primer lanzamiento comercial. Trabajamos con nuestros primeros clientes, CRM SaaS entre los que hay una plataforma de trading, en sus entornos de pruebas, y el sistema se lanzará completo, cuando todo esté listo.',
    },
    facts: {
      rules: 'reglas de detección',
      services: 'servicios en el sistema',
      collectors: 'recolectores en su lado',
    },
    next: 'Más sobre nosotros',
  },

  careers: {
    head: {
      title: 'Trabaje con nosotros',
      lede: 'Un equipo pequeño que construye detección que los propietarios pueden leer. Buscamos ingenieros a los que les guste enseñar su trabajo.',
    },
    how: {
      title: 'Cómo trabajamos',
      items: [
        'Cada recolector es un repositorio que un cliente puede revisar: escribimos código que no nos avergüenza enseñar.',
        'Las reglas se juzgan por lo que detectan en perfiles de tráfico reales, no por cuántas hay.',
        'En remoto, con horas en común para quienes trabajan juntos.',
      ],
    },
    rolesTitle: 'Puestos abiertos',
    roles: [
      { title: 'Ingeniero de detección', text: 'Diseñar y ajustar reglas de robo de cuentas, escalada de privilegios y fuga de datos; responsabilizarse de sus umbrales y su ruido.', where: 'En remoto' },
      { title: 'Ingeniero de backend', text: 'Recepción, deduplicación y el motor de reglas en nuestro lado; rendimiento y aislamiento de inquilinos en la capa de acceso.', where: 'En remoto' },
      { title: 'Ingeniero de front-end', text: 'El portal del cliente: tarjetas de incidentes, cobertura e informes que entienda alguien que no es ingeniero.', where: 'En remoto' },
    ],
    apply: 'Enviar candidatura',
    none: '¿Ningún puesto encaja? Escríbanos igualmente y cuéntenos qué construiría.',
  },

  press: {
    head: {
      title: 'En los medios',
      lede: `Todo lo que un periodista necesita para escribir sobre ${BRAND}. Para entrevistas y comentarios, escriba a la dirección de prensa de abajo.`,
    },
    about: {
      title: `Sobre ${BRAND}`,
      text: `${BRAND} es un sistema de detección de amenazas para CRM SaaS multiinquilino propios. Ve lo que pasa dentro del CRM (robo de cuentas, acciones internas, escalada de privilegios, exportaciones masivas y ataques al perímetro web) sin sacar los datos de la infraestructura del cliente. Los recolectores ligeros funcionan en el lado del cliente; el análisis, en el nuestro, y solo recibe metadatos de la lista permitida.`,
    },
    factsTitle: 'Datos clave',
    facts: [
      '34 reglas de detección en siete grupos, sin aprendizaje automático',
      'Tres recolectores en el lado del cliente, cada uno un repositorio revisable',
      'Unos 1,9 ms de análisis del WAF por petición, medidos en un banco de pruebas',
      'Alertas en Telegram y en el portal del cliente; informes semanales y mensuales',
      'Estado: antes del primer lanzamiento comercial',
    ],
    logoTitle: 'Logotipo',
    logoText: 'Use el logotipo tal cual, sobre fondo oscuro o claro, con espacio libre alrededor.',
    logoDark: 'Logotipo para fondos oscuros (SVG)',
    logoLight: 'Logotipo para fondos claros (SVG)',
    contactTitle: 'Contacto de prensa',
    contactText: 'Respondemos a los periodistas en un día laborable.',
  },

  faqPage: {
    head: {
      title: 'Preguntas frecuentes',
      lede: 'Respuestas breves. Si falta algo, pregúntenos directamente.',
    },
    more: '¿Le queda alguna pregunta?',
  },

  resellers: {
    head: {
      title: 'Hágase distribuidor',
      lede: 'Para quienes alojan varias empresas de CRM tras una misma entrada y para integradores que crean y mantienen CRM para otros.',
    },
    who: {
      title: 'Para quién es',
      items: [
        { title: 'Proveedores de hosting', text: 'Una pasarela, muchas empresas de CRM, cada una con su base de datos y sus dominios. Un WAF sirve a toda la entrada; cada empresa recibe su propio conector y sus claves.' },
        { title: 'Integradores y estudios', text: 'Crea o mantiene CRM para clientes sin equipo de seguridad. Añada detección sin tocar su código ni su esquema.' },
      ],
    },
    gets: {
      title: 'Qué obtiene',
      items: [
        'Condiciones de socio acordadas de forma individual, según el tamaño de su base',
        'Un piloto en una de sus empresas, puesto en marcha con nuestro equipo',
        'Un portal e informes independientes para cada empresa a la que da servicio',
        'Tráfico separado por dominio antes del análisis: los eventos de una empresa van solo a su conector',
      ],
    },
    steps: {
      title: 'Cómo empezar',
      items: [
        { title: 'Cuéntenos su configuración', text: 'Cuántas empresas, una pasarela o varias, dónde funciona.' },
        { title: 'Haga un piloto', text: 'Instalamos juntos en una empresa y ajustamos las reglas con sus datos.' },
        { title: 'Despliegue el resto', text: 'Añada empresas, un conector cada vez.' },
      ],
    },
    apply: 'Solicitar ser distribuidor',
  },

  legal: {
    updated: 'Última actualización: 1 de octubre de 2026',
    contents: 'En esta página',
  },

  siteMap: {
    head: {
      title: 'Mapa del sitio',
      lede: 'Todas las páginas del sitio.',
    },
    main: 'Principal',
    legalGroup: 'Legal',
    home: 'Inicio',
  },

  notFound: {
    title: 'Esta página no existe',
    lede: 'Puede que la dirección tenga un error o que la página se haya movido.',
    home: 'Volver a la página de inicio',
  },

  ui: {
    skip: 'Saltar al contenido',
    error: 'Los datos no están disponibles ahora.',
    retry: 'Reintentar',
    language: 'Idioma',
    theme: 'Tema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    menu: 'Menú',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    pause: 'Pausa',
  },
};
