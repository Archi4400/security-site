import { BRAND, SVC } from '../../brand';

export const faqEs = {
  items: [
    {
      q: `¿Qué es ${BRAND}?`,
      a: `${BRAND} es un sistema de detección de amenazas para CRM SaaS multiinquilino propios. Detecta robo de cuentas, acciones internas, escalada de privilegios, exportaciones masivas y ataques al perímetro web, y le muestra al propietario qué ha pasado y qué hacer. No es un WAF: el WAF es uno de sus siete servicios y una fuente de eventos entre muchas.`,
    },
    {
      q: '¿Para quién es?',
      a: 'Para propietarios y CTO de CRM SaaS propios o autoalojados, con muchos inquilinos y sin equipo de seguridad, sobre todo cuando la aplicación cuenta poco de sí misma: sin registro de accesos fallidos, sin identificador de sesión, con una auditoría incompleta. También para quien aloja varias empresas de CRM tras una misma pasarela.',
    },
    {
      q: '¿Funciona con Salesforce o HubSpot?',
      a: 'No. Los grandes CRM SaaS ya los cubren sus propios fabricantes y los productos de postura que se construyen encima. Nosotros trabajamos para CRM propios, a propósito.',
    },
    {
      q: '¿Qué sale de nuestra infraestructura?',
      a: 'Solo los campos de una lista permitida explícita, como metadatos y por HTTPS. Los cuerpos de las peticiones, el texto libre, el User-Agent sin procesar, los identificadores de sesión y los tokens nunca salen; de los tres últimos, solo sus huellas. La única excepción deliberada es la evidencia de un disparo del WAF, con las credenciales enmascaradas, y se puede desactivar.',
    },
    {
      q: '¿Cómo lo comprobamos?',
      a: `${SVC}-connector tiene su propia página local protegida con contraseña: un registro de lo enviado tras la lista permitida, el estado de las fuentes y una prueba en seco; pegue una ficha y vea qué saldría.`,
    },
    {
      q: '¿Qué implica la instalación?',
      a: 'Tres contenedores, cada uno configurado con un único archivo YAML, un ConfigMap en Kubernetes. Sin agentes en su código, sin cambios en el esquema de la base de datos, sin bróker de mensajes.',
    },
    {
      q: '¿Ralentizará nuestra aplicación?',
      a: `${SVC}-tap lee el tráfico junto a la aplicación y nunca está en el camino de la petición; si algo falla, espera y deja el motivo en el registro en lugar de tumbar el pod. El análisis del WAF cuesta unos 1,9 ms por petición en nuestro banco de pruebas.`,
    },
    {
      q: '¿Bloquea los ataques?',
      a: 'No. Avisa en Telegram y en el portal; no bloquea direcciones, no cierra sesiones ni desactiva usuarios. Los modos semiautomático y automático están previstos.',
    },
    {
      q: '¿Cuándo empiezan a funcionar las reglas de comportamiento?',
      a: 'Necesitan historial, así que un cliente nuevo recibe alertas firmes (WAF, privilegios, postura) durante las dos primeras semanas. Si tiene un registro de accesos, el historial se puede cargar desde él para acortar ese plazo.',
    },
    {
      q: '¿Dónde llegan las alertas?',
      a: 'A Telegram y al portal del cliente. Cada destinatario filtra por gravedad y por regla. El correo y Slack todavía no están disponibles.',
    },
  ],
};
