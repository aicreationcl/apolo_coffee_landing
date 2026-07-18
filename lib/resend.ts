import { Resend } from "resend";

// El constructor de Resend lanza eagerly si no recibe una key (incluso vía
// process.env), lo que rompería el build/arranque del servidor antes de que
// el usuario configure RESEND_API_KEY. Se pasa un placeholder para que la
// instanciación nunca falle; el envío real (`resend.emails.send()`) sí
// fallará limpiamente hasta que se configure la key real, y ese error ya
// está capturado en app/api/contact/route.ts.
export const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_configure_in_env");
